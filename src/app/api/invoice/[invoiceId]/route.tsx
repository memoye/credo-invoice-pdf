import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import api from "@/lib/api";
import { InvoicePDF } from "@/components/InvoicePDF";
import { registerFonts } from "@/lib/pdfStyles";
import { generateQRWithLogo } from "@/lib/utils";
import { Invoice } from "@/lib/types";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ invoiceId: string }> }
) => {
  registerFonts();
  const searchParams = request.nextUrl.searchParams;

  const invoiceId = (await params).invoiceId;
  const token = searchParams.get("token");

  const res = await api.get(`/invoice/customer/${invoiceId}`, {
    params: {
      token: token || "z2KTbouczuVwLkIAMXwqYXwABWCFx2gTsFeczzbb6yc",
      otp: "123456",
    },
  });

  if (res.status === 404) {
    return Response.json(
      { message: "Invoice does not exist" },
      { status: 404 }
    );
  }

  if (res.status !== 200) {
    return Response.json(
      { message: res.data.message || "Something went wrong" },
      { status: 500 }
    );
  }

  const invoiceDetails = res.data?.data as Invoice;

  const qrCodeDataUrl = await generateQRWithLogo(invoiceDetails.link);

  const selectedCustomerIndex =
    Math.max(
      0,
      invoiceDetails?.customers?.findIndex(
        (invoice) =>
          invoice.customerInvoiceNumber === invoiceDetails.invoiceNumber
      )
    ) ?? 0;

  const pdf = await renderToBuffer(
    <InvoicePDF
      qrCode={qrCodeDataUrl}
      selectedCustomerIndex={selectedCustomerIndex}
      invoiceDetails={invoiceDetails}
    />
  );

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      // "Content-disposition": `attachment;filename="myDocument.pdf"`, // this triggers download
    },
    status: 200,
  });
};
