import {
  Page,
  Document,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { pdfContainer } from "@/lib/pdfStyles";
import { Currency, LocaleEnum } from "currency-master";
import type { TransactionDetails } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type TransactionInvoicePDFProps = { transactionDetails: TransactionDetails };

const imageBaseURL = process.env.IMAGE_BASE_URL;
const credoLogo = `${imageBaseURL}/credo-img.png`;
const bankLogos = [
  "/CRN-Globus.png",
  "/CRN-KeyStone.png",
  "/CRN-Polaris Bank.png",
  "/CRN-Stanbic.png",
  "/CRN-SignatureBank.png",
  "/Unity.svg",
];
const poweredByETZ = `${imageBaseURL}/gateway_tag.png`;

export const TransactionInvoicePDF = ({
  transactionDetails,
}: TransactionInvoicePDFProps) => {
  const transAmountInWords = new Currency(
    String(transactionDetails?.debtAmount || 0),
    {
      toWords: {
        locale: LocaleEnum.EnglishNigeria,
      },
    }
  );

  return (
    <Document
      author={transactionDetails?.businessName}
      producer={"Credo Invoice"}
      subject={`PayOutlet / Credo Checkout`}
      title={`PayOutlet / Credo Checkout`}
    >
      <Page size="A4" style={pdfContainer.page}>
        <View style={pdfContainer.main}>
          {/*Logo*/}
          <View style={transInvStyles.poLogoContainer}>
            <Image
              src={`${imageBaseURL}/CRN-Payoutlet.png`}
              style={transInvStyles.poLogo}
            />
          </View>

          {/*Amount & CRN*/}
          <View style={transInvStyles.header}>
            <View style={[transInvStyles.tableContainer, { fontSize: 14 }]}>
              <View
                style={[
                  transInvStyles.headingTitle,
                  {
                    paddingHorizontal: 16,
                    paddingVertical: 4,
                  },
                ]}
              >
                <Text style={{ alignSelf: "center", fontSize: 12 }}>
                  Invoice Amount
                </Text>
              </View>
              <View style={{ alignSelf: "center", paddingHorizontal: 10 }}>
                <Text style={[transInvStyles.currencyText, { fontSize: 14 }]}>
                  {formatCurrency(
                    transactionDetails.debtAmount || 0,
                    transactionDetails.currency
                  )}
                </Text>
              </View>
            </View>

            <View style={[transInvStyles.tableContainer, { fontSize: 14 }]}>
              <View
                style={[
                  transInvStyles.headingTitle,
                  { paddingHorizontal: 16, paddingVertical: 4 },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                    justifyContent: "center",
                    fontSize: 12,
                  }}
                >
                  <Image
                    style={{ width: 16, height: 16, objectFit: "contain" }}
                    src={credoLogo}
                  />
                  <Text>Credo Reference Number (CRN)</Text>
                </View>
              </View>
              <View
                style={{
                  alignSelf: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Text style={{ fontWeight: 700 }}>
                  {transactionDetails.crn}
                </Text>
              </View>
            </View>
          </View>

          <ItemsTable
            title={"Biller Information"}
            items={[
              { label: "Biller Name", value: "Payoutlet / Credo Checkout" },
              {
                label: "Reference Number",
                value: transactionDetails.crn || "",
              },
              {
                label: "Transaction ID",
                value: transactionDetails.credoTransRef || "",
              },
            ]}
          />

          <ItemsTable
            title={"Payer Information"}
            items={[
              { label: "Name", value: transactionDetails.payerName || "" },
              {
                label: "Phone Number",
                value: transactionDetails.payerPhoneNumber || "",
              },
              { label: "Email", value: transactionDetails.payerInfo || "" },
            ]}
          />

          <ItemsTable
            title={"Payment Details"}
            items={[
              {
                label: "Amount",
                value: formatCurrency(
                  transactionDetails.debtAmount || 0,
                  transactionDetails.currency
                ),
                isCurrency: true,
              },
              {
                label: "Amount in Words",
                value: transAmountInWords.toWords() || "",
              },
              {
                label: "Payment Description",
                value: transactionDetails.paymentDescription || "",
              },
              {
                label: "Merchant Ref.",
                value: transactionDetails.businessTransRef || "",
              },
              {
                label: "Merchant Name",
                value: transactionDetails.businessName || "",
              },
            ]}
          />

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 12, fontWeight: 500 }}>
              Available Banks to pay using eTranzact PayOutlet
            </Text>
          </View>

          <View style={transInvStyles.banksWrapper}>
            {bankLogos.map((logo) => (
              <View>
                <Image
                  src={imageBaseURL + logo}
                  style={transInvStyles.bankLogo}
                />
              </View>
            ))}
          </View>

          <View>
            <Image src={poweredByETZ} style={transInvStyles.poweredByETZLogo} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

function ItemsTable({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: number | string; isCurrency?: boolean }[];
}) {
  return (
    <View style={transInvStyles.tableContainer}>
      <View style={[transInvStyles.headingTitle, { fontSize: 14 }]}>
        <Text>{title}</Text>
      </View>

      {items.map((item, idx, arr) => (
        <View
          style={[
            transInvStyles.tableRowItem,
            { borderBottomWidth: idx < arr.length - 1 ? 1 : 0 },
          ]}
        >
          <View style={transInvStyles.tableRowLabel}>
            <Text>{item.label}</Text>
          </View>

          <View style={transInvStyles.tableRowValue}>
            <Text style={item.isCurrency ? transInvStyles.currencyText : {}}>
              {item.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const colors = {
  accent: "#CEDDFE",
  accentLight: "#ECF2FF",
  text: "#000000",
};

const transInvStyles = StyleSheet.create({
  poLogoContainer: {
    marginBottom: 20,
    color: colors.text,
  },
  poLogo: {
    width: 120,
    objectFit: "contain",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginBottom: 20,
  },
  headingTitle: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontWeight: 600,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  currencyText: {
    fontFamily: "Monda",
    fontWeight: 700,
  },
  tableRowItem: {
    flexDirection: "row",
    borderColor: colors.accent,
    fontSize: 12,
    fontWeight: 500,
  },
  tableRowLabel: {
    width: "25%",
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.accentLight,
  },
  tableRowValue: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  banksWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: 40,
  },
  bankLogo: {
    height: 20,
    objectFit: "contain",
  },
  poweredByETZLogo: {
    height: 15,
    objectFit: "contain",
  },
});
