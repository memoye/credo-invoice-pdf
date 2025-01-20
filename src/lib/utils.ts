import QRCode from "qrcode";
import { Canvas, loadImage } from "canvas";
import { Installment, Invoice } from "./types";
import path from "path";

const idealViewportWidth = 1440;
const maxViewportWidth = 1920;

export const scaleValue = (
  value: number,
  defaultViewportWidth: number = 1440
) => {
  const viewportWidth =
    typeof window !== "undefined"
      ? Math.min(window.innerWidth, maxViewportWidth)
      : Math.min(defaultViewportWidth, maxViewportWidth); // Use default width during SSR
  return value * (viewportWidth / idealViewportWidth);
};

// export const scaleValue = (value: number) => {
//     const viewportWidth = Math.min(window.innerWidth, maxViewportWidth);
//     return value * (viewportWidth / idealViewportWidth);
// };

export async function generateQRWithLogo(url: string): Promise<string> {
  // Create a canvas
  const canvas = new Canvas(200, 200);
  const ctx = canvas.getContext("2d");

  // Generate QR code with a bit more space in center
  await QRCode.toCanvas(canvas, url, {
    errorCorrectionLevel: "Q",
    margin: 1,
    maskPattern: 7,
    width: 100,
    color: {
      dark: "#0536A3",
      light: "#FFFFFF",
    },
  });

  // Load and draw the logo
  const logo = await loadImage(
    path.join(process.cwd(), "public/credo-logo.svg")
  );
  const logoSize = canvas.width * 0.2; // Logo size - 20% of QR code size
  const logoX = (canvas.width - logoSize) / 2;
  const logoY = (canvas.height - logoSize) / 2;

  // Create white background for logo
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);

  // Draw the logo
  ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

  // Convert to data URL
  return canvas.toDataURL();
}

export const formatCurrency = (value: number, currency: string) => {
  if (currency) {
    return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(value);
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
};

export const formatNumber = (number: number, dp: number = 0) => {
  return new Intl.NumberFormat("en-NG", {
    maximumFractionDigits: dp,
    minimumFractionDigits: dp,
  }).format(number);
};

export function calculateDiscount(values: any, itemIndex: number) {
  const originalPrice =
    values?.items[itemIndex].qty * values?.items[itemIndex].unitPrice;
  const discountType = values?.items[itemIndex].discountType;
  const discountValue = values?.items[itemIndex].discountTypeValue;

  if (discountType === 0) return (originalPrice * discountValue) / 100;
  if (discountType === 1) return discountValue;
}

export function calculateTax(
  taxValue: number,
  taxType: number,
  values: any,
  itemIndex: number
) {
  const originalPrice =
    values?.items[itemIndex].qty * values?.items[itemIndex].unitPrice;

  const discountTypeValue = values?.items[itemIndex].discountTypeValue;
  // Default discount
  const discountedPrice = originalPrice - calculateDiscount(values, itemIndex);

  // Ensure the discounted price is not negative
  const finalPrice = Math.max(
    discountTypeValue ? discountedPrice : originalPrice,
    0
  );
  // const finalPrice = Math.max(originalPrice, 0);

  // Calculate the tax based on the discounted price
  let tax;
  if (taxType === 0) {
    // Percentage tax
    tax = (finalPrice * taxValue) / 100;
  } else if (taxType === 1) {
    // Absolute tax
    tax = taxValue;
  }

  // Return the total price after tax
  return tax;
}

export const determineAmountToBePaid = (invoice: Invoice): number =>
  invoice.installmentType === 0
    ? invoice.installments.find((inst) => inst.upcomingPayment)?.amount ||
      invoice.outstandingAmount
    : invoice.outstandingAmount;

export function calculateLineItemsTotal(data: any) {
  let totalLineItems = 0;
  let totalDiscounts = 0;
  let totalSurcharges = 0;

  data.forEach((item: any) => {
    // Calculate line item total
    const qty = Number(item.qty) || 0;
    const unitPrice = Number(item.unitPrice) || 0;
    const discountTypeValue = Number(item.discountTypeValue) || 0;

    const lineTotal = qty * unitPrice;

    // Calculate discount
    let discount = 0;
    if (item.discountType === 0) {
      // Percentage discount
      discount = (lineTotal * discountTypeValue) / 100;
    } else if (item.discountType === 1) {
      // Absolute discount
      discount = discountTypeValue;
    }

    // Calculate surcharges
    let surcharges = 0;
    const applicableSurcharges = item.surcharges || item.invoiceItemsSurcharges;

    if (applicableSurcharges && applicableSurcharges.length > 0) {
      applicableSurcharges.forEach((surcharge: any) => {
        const surchargeTypeValue = Number(surcharge.surchargeTypeValue) || 0;

        if (surcharge.surchargeType === 0) {
          // Percentage surcharge
          surcharges += (lineTotal * surchargeTypeValue) / 100;
        } else if (surcharge.surchargeType === 1) {
          // Absolute surcharge
          surcharges += surchargeTypeValue;
        }
      });
    }

    // Add to totals
    totalLineItems += lineTotal;
    totalDiscounts += discount;
    totalSurcharges += surcharges;
  });

  return {
    totalLineItems: Number(totalLineItems),
    totalDiscounts: Number(totalDiscounts),
    totalSurcharges: Number(totalSurcharges),
  };
}

export const calculateInstallmentSummary = (data: any) => {
  const calculateItemTotal = (item: any) => {
    let basePrice = (item.qty ?? 0) * (item.unitPrice ?? 0);

    // Apply Discount
    if (item.discountType === 0) {
      basePrice -= (basePrice * (item.discountTypeValue ?? 0)) / 100;
    } else if (item.discountType === 1) {
      basePrice -= item.discountTypeValue ?? 0;
    }

    // Add Surcharges
    if (item.invoiceItemsSurcharges) {
      item.invoiceItemsSurcharges.forEach((surcharge: any) => {
        if (surcharge.surchargeType === 0) {
          basePrice += (basePrice * (surcharge.surchargeTypeValue ?? 0)) / 100;
        } else if (surcharge.surchargeType === 1) {
          basePrice += surcharge.surchargeTypeValue ?? 0;
        }
      });
    }

    return basePrice;
  };

  const totalInvoiceAmount = data.items.reduce((sum: number, item: any) => {
    return sum + calculateItemTotal(item);
  }, 0);

  const installmentSummary: any = [];
  const isPercentile = Number(data.installmentConfiguredType) === 0;

  data.installments?.forEach((installment: any) => {
    if (isPercentile) {
      const installmentValue =
        (totalInvoiceAmount * installment.configuredValue) / 100;
      installmentSummary.push({
        dueDate: installment.installmentDueDate,
        amount: installmentValue,
      });
    } else {
      installmentSummary.push({
        dueDate: installment.installmentDueDate,
        amount: installment.configuredValue,
      });
    }
  });
  const totalDistributed = installmentSummary.reduce(
    (sum: number, installment: any) => sum + installment.amount,
    0
  );
  const remaining = totalInvoiceAmount - totalDistributed;

  return { totalInvoiceAmount, totalDistributed, remaining };
};

export const calculateInstallments = (values: any) => {
  const calculateItemTotal = (item: any) => {
    let basePrice = (item.qty ?? 0) * (item.unitPrice ?? 0);

    // Apply Discount
    if (item.discountType === 0) {
      basePrice -= (basePrice * (item.discountTypeValue ?? 0)) / 100;
    } else if (item.discountType === 1) {
      basePrice -= item.discountTypeValue ?? 0;
    }

    // Add Surcharges
    if (item.invoiceItemsSurcharges) {
      item.invoiceItemsSurcharges.forEach((surcharge: any) => {
        if (surcharge.surchargeType === 0) {
          basePrice += (basePrice * (surcharge.surchargeTypeValue ?? 0)) / 100;
        } else if (surcharge.surchargeType === 1) {
          basePrice += surcharge.surchargeTypeValue ?? 0;
        }
      });
    }

    return basePrice;
  };

  const totalInvoiceAmount = values?.items?.reduce((sum: number, item: any) => {
    return sum + calculateItemTotal(item);
  }, 0);

  const isPercentile =
    values.installmentConfiguredType === 0 || values.installmentType === 0;

  return values?.installments?.map((installment: any) => {
    const installmentAmount = isPercentile
      ? (totalInvoiceAmount * installment.configuredValue) / 100
      : installment.configuredValue;

    return {
      ...installment,
      amount: installmentAmount,
    };
  });
};

export const invoiceStatusReducer = (status: number | string) => {
  switch (status) {
    case "Accepted":
    case "Auto - accepted":
    case 0:
      return {
        status: "Paid",
        color: "#128c2d",
        bg: "#D3F0E5",
        displayName: "Paid",
      };
    case 2:
      return {
        status: "Unpaid",
        color: "#FE7442",
        bg: "#FE74421a",
        displayName: "Unpaid",
      };
    case 1:
      return {
        status: "Partial",
        color: "#6D9AFB",
        bg: "#6D9AFB1a",
        displayName: "Partial",
      };
    case 5:
      return {
        status: "Void",
        color: "#4f62bd",
        bg: "#AFB5D9",
        displayName: "Void",
      };
    case 3:
      return {
        status: "Overdue",
        color: "#e01721",
        bg: "#e017211a",
        displayName: "Overdue",
      };
    case 4:
      return {
        status: "Draft",
        color: "#fff",
        bg: "#98A2B3",
        displayName: "Draft",
      };
    default:
      return {
        status: "Draft",
        color: "#fff",
        bg: "#98A2B3",
        displayName: "Draft",
      };
  }
};

// export const getLatestPaidInstallmentPosition = (installments: Installment[]) => {
//     // Get all paid installments (status = 0)
//     const paidInstallments = installments.filter(inst => inst.status === 0);
//
//     if (paidInstallments.length === 0) {
//         return `No installments paid`;
//     }
//
//     // Find the latest paid installment by sorting by due date
//     const latestPaidInstallment = paidInstallments.sort(
//         (a, b) => new Date(b.installmentDueDate).getTime() - new Date(a.installmentDueDate).getTime()
//     )[0];
//
//     // Find the position of the latest paid installment in the original array
//     const position = installments.findIndex(inst => inst.id === latestPaidInstallment.id) + 1;
//
//     // Calculate the ratio
//     return `${position}/${installments.length}`;
// };

export const getLatestPaidInstallmentPosition = (
  installments: Installment[],
  amountPaid: number
) => {
  // Filter installments that are paid (status = 0) and match the amountPaid
  const paidInstallments = installments.filter(
    (inst) => inst.status === 0 && inst.amount === amountPaid
  );

  // If no paid installments match the amountPaid, return a message
  if (paidInstallments.length === 0) {
    return "No installments match the paid amount";
  }

  // Sort the paid installments by installmentDueDate in descending order to get the latest paid installment
  const latestPaidInstallment = paidInstallments.sort(
    (a, b) =>
      new Date(b.installmentDueDate).getTime() -
      new Date(a.installmentDueDate).getTime()
  )[0];

  // Find the position of this latest paid installment in the original array
  const latestPaidPosition =
    installments.findIndex((inst) => inst.id === latestPaidInstallment.id) + 1; // 1-based index

  // Return the portion (position/total installments)
  return `${latestPaidPosition}/${installments.length}`;
};
