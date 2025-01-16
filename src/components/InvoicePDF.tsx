// import { useEffect, useState } from "react";
import {
  Page,
  Text,
  Tspan,
  View,
  Document,
  Image,
  Link,
} from "@react-pdf/renderer";
import dateFormat from "dateformat";
import {
  DocumentIcon,
  LinkIcon,
  PoweredByCredoLogo,
  SurchargeIcon,
  TagsIcon,
} from "../assets/icons";
import { invoiceStyles } from "../lib/pdfStyles";
import { Invoice } from "../lib/types";
import {
  calculateLineItemsTotal,
  calculateTax,
  formatNumber,
  formatCurrency,
} from "../lib/utils";

export type InvoicePDFProps = {
  qrCode: string;
  selectedCustomerIndex: number;
  // invoiceDetails: Invoice;
};

// /000000061123?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJbnZvaWNlVG9rZW4iLCJpbnZvaWNlSWQiOiIwMDAwMDAwNjExMjMiLCJlbWFpbCI6Im9qb3N0ZXBoZW4yNDdAZ21haWwuY29tIiwiaWF0IjoxNzM2NzUzNDM1fQ.ZfIsu2XOc9nhR89il3fFYQu0C5owoWJAiVgJb-j_L9o

const invoiceDetails: Invoice = {
  id: 62,
  name: "360 Produktiviti",
  invoiceNumber: "000000000062",
  businessCode: "00000139ZR1667987724",
  amount: 1407150,
  paidAmount: 10000,
  outstandingAmount: 1397150,
  dueDate: "2025-01-20 00:00:00",
  invoiceDate: "2025-01-13 00:00:00",
  merchantRef: "1234",
  notes: "",
  currency: "NGN",
  logoUrl:
    "https://d1njqin156mvwz.cloudfront.net/1736254765066-download.png?size=18404",
  allowInstallment: 1,
  installmentType: 0,
  enableLateFee: 0,
  enablePreReminder: 0,
  preReminderType: "DAILY",
  preReminderFrequency: 0,
  enablePostReminder: 0,
  postReminderType: "DAILY",
  postReminderFrequency: 0,
  lateFeeType: "PERCENTILE",
  lateFeeCharge: 0,
  lateFeeFrequency: 0,
  status: 0,
  items: [
    {
      id: 113,
      description: "",
      name: "a3 flyer printing",
      qty: 3,
      unitPrice: 500000,
      surcharge: 57150,
      discountCharge: 150000,
      discountType: 0,
      discountTypeValue: 10,
      discountTag: "Black FRiday",
      subTotal: 1407150,
      documents: [],
      links: [],
      tags: [],
      surcharges: [
        {
          id: 13,
          surchargeTypeValue: 3.81,
          surchargeType: 0,
          surchargeTag: "WHT",
        } as any,
      ],
    },
  ],
  tags: [],
  documents: [],
  installments: [
    {
      id: 253,
      amount: 140715,
      configuredType: 0,
      configuredValue: 10,
      outstandingAmount: 130715,
      installmentDueDate: "2025-01-20 00:00:00",
      status: 1,
      upcomingPayment: false,
      minimumAmount: 0,
      // @ts-ignore
      installmentMinimumAmount: 0,
    },
    {
      id: 254,
      amount: 140715,
      configuredType: 0,
      configuredValue: 10,
      outstandingAmount: 140715,
      installmentDueDate: "2025-01-20 00:00:00",
      status: 2,
      upcomingPayment: false,
      minimumAmount: 0,
      // @ts-ignore
      installmentMinimumAmount: 0,
    },
    {
      id: 255,
      amount: 140715,
      configuredType: 0,
      configuredValue: 10,
      outstandingAmount: 140715,
      installmentDueDate: "2025-01-20 00:00:00",
      status: 2,
      upcomingPayment: false,
      minimumAmount: 0,
      // @ts-ignore
      installmentMinimumAmount: 0,
    },
    {
      id: 256,
      amount: 140715,
      configuredType: 0,
      configuredValue: 10,
      outstandingAmount: 140715,
      installmentDueDate: "2025-01-20 00:00:00",
      status: 2,
      upcomingPayment: false,
      minimumAmount: 0,
      // @ts-ignore
      installmentMinimumAmount: 0,
    },
    {
      id: 257,
      amount: 140715,
      configuredType: 0,
      configuredValue: 10,
      outstandingAmount: 140715,
      installmentDueDate: "2025-01-20 00:00:00",
      status: 2,
      upcomingPayment: false,
      minimumAmount: 0,
      // @ts-ignore
      installmentMinimumAmount: 0,
    },
    {
      id: 258,
      amount: 703575,
      configuredType: 0,
      configuredValue: 50,
      outstandingAmount: 703575,
      installmentDueDate: "2025-01-20 00:00:00",
      status: 2,
      upcomingPayment: false,
      minimumAmount: 0,
      // @ts-ignore
      installmentMinimumAmount: 0,
    },
  ],
  customers: [
    {
      id: 127,
      customerInvoiceNumber: "000000062127",
      amount: 1407150,
      paidAmount: 10000,
      outstandingAmount: 1397150,
      status: 0,
      details: {
        id: 77,
        name: "Stephen Ojo",
        email: "ojostephen247@gmail.com",
        phoneNumber: "+234 8037395148",
        // @ts-ignore
        deliveryAddress: "",
        postalAddress: "Chief Bright Oridami Street, Lagos, Nigeria",
      },
      installments: [
        {
          id: 253,
          amount: 140715,
          configuredType: 0,
          configuredValue: 10,
          outstandingAmount: 130715,
          installmentDueDate: "2025-01-20 00:00:00",
          status: 1,
          upcomingPayment: false,
          minimumAmount: 0,
          // @ts-ignore
          installmentMinimumAmount: 0,
        },
        {
          id: 254,
          amount: 140715,
          configuredType: 0,
          configuredValue: 10,
          outstandingAmount: 140715,
          installmentDueDate: "2025-01-20 00:00:00",
          status: 2,
          upcomingPayment: false,
          minimumAmount: 0,
          // @ts-ignore
          installmentMinimumAmount: 0,
        },
        {
          id: 255,
          amount: 140715,
          configuredType: 0,
          configuredValue: 10,
          outstandingAmount: 140715,
          installmentDueDate: "2025-01-20 00:00:00",
          status: 2,
          upcomingPayment: false,
          minimumAmount: 0,
          // @ts-ignore
          installmentMinimumAmount: 0,
        },
        {
          id: 256,
          amount: 140715,
          configuredType: 0,
          configuredValue: 10,
          outstandingAmount: 140715,
          installmentDueDate: "2025-01-20 00:00:00",
          status: 2,
          upcomingPayment: false,
          minimumAmount: 0,
          // @ts-ignore
          installmentMinimumAmount: 0,
        },
        {
          id: 257,
          amount: 140715,
          configuredType: 0,
          configuredValue: 10,
          outstandingAmount: 140715,
          installmentDueDate: "2025-01-20 00:00:00",
          status: 2,
          upcomingPayment: false,
          minimumAmount: 0,
          // @ts-ignore
          installmentMinimumAmount: 0,
        },
        {
          id: 258,
          amount: 703575,
          configuredType: 0,
          configuredValue: 50,
          outstandingAmount: 703575,
          installmentDueDate: "2025-01-20 00:00:00",
          status: 2,
          upcomingPayment: false,
          minimumAmount: 0,
          // @ts-ignore
          installmentMinimumAmount: 0,
        },
      ],
    },
  ],
  businessDetails: {
    name: "British Council Demo",
    supportPhoneNumber: "+234 8037938921",
    supportAddress: "Praiseville Garden Estate Phase",
    supportEmailAddress: "stephen@genuinesols.com",
    website: "https://www.bc.com",
    facebookHandle: "spark_lite",
    twitterHandle: "spark_lite2",
    instagramHandle: "spark_lite",
    merchantInfo: {
      phoneNumber: "+234 8037938900",
      email: "test2@genuinesols.com",
      firstName: "Stephen",
      lastName: "Obi",
    },
  },
};

export const InvoicePDF = ({
  qrCode,
  // invoiceDetails,
  selectedCustomerIndex,
}: InvoicePDFProps) => {
  const lineItemsTotalValues = calculateLineItemsTotal(
    invoiceDetails?.items ?? []
  );
  const finalTotal =
    lineItemsTotalValues?.totalLineItems -
      lineItemsTotalValues?.totalDiscounts +
      lineItemsTotalValues?.totalSurcharges || 0;

  return (
    <Document
      author={invoiceDetails?.businessDetails?.name}
      keywords={"credo,credo invoicing,invoice"}
      producer={"Credo Invoice"}
      subject={`${invoiceDetails?.name} Invoice`}
      title={`${invoiceDetails?.businessDetails?.name} Invoice`}
    >
      <Page size="A4" style={invoiceStyles.page}>
        <View style={invoiceStyles.main}>
          <View style={invoiceStyles.heading}>
            <Text style={invoiceStyles.headingTitle}>
              {invoiceDetails?.name}
            </Text>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              style={invoiceStyles.logo}
              src={invoiceDetails.logoUrl}
              cache={false}
            />
          </View>

          <View style={invoiceStyles.meta} wrap={true}>
            <View style={invoiceStyles.metaStart}>
              <View style={invoiceStyles.metaItem}>
                <Text style={invoiceStyles.metaTitle}>From:</Text>
                <View style={invoiceStyles.address}>
                  <View style={invoiceStyles.metaBody}>
                    <Text>{invoiceDetails?.businessDetails?.name}</Text>
                    <Text>
                      {invoiceDetails?.businessDetails?.merchantInfo?.email}
                    </Text>
                    <Text>
                      {
                        invoiceDetails?.businessDetails?.merchantInfo
                          ?.phoneNumber
                      }
                    </Text>
                  </View>
                </View>
              </View>
              <View style={invoiceStyles.metaItem}>
                <Text style={invoiceStyles.metaTitle}>To:</Text>
                <View style={invoiceStyles.metaBody}>
                  <Text>
                    {
                      invoiceDetails?.customers[selectedCustomerIndex]?.details
                        ?.name
                    }
                  </Text>
                  <Text>
                    {
                      invoiceDetails?.customers[selectedCustomerIndex]?.details
                        ?.email
                    }
                  </Text>
                  <Text>
                    {
                      invoiceDetails?.customers[selectedCustomerIndex]?.details
                        ?.postalAddress
                    }
                  </Text>
                  <Text>
                    {
                      invoiceDetails?.customers[selectedCustomerIndex]?.details
                        ?.phoneNumber
                    }
                  </Text>
                </View>
              </View>
            </View>

            <View style={invoiceStyles.metaMiddle}>
              <View style={invoiceStyles.metaItem}>
                <Text style={invoiceStyles.metaTitle}>Invoice No:</Text>
                <Text style={invoiceStyles.metaBody}>
                  {
                    invoiceDetails?.customers[selectedCustomerIndex]
                      ?.customerInvoiceNumber
                  }
                </Text>
              </View>

              <View style={invoiceStyles.metaItem}>
                <Text style={invoiceStyles.metaTitle}>Date:</Text>
                <Text style={invoiceStyles.metaBody}>
                  {dateFormat(
                    new Date(invoiceDetails?.invoiceDate ?? Date.now()),
                    "mmm dd, yyyy"
                  )}
                </Text>
              </View>

              <View style={invoiceStyles.metaItem}>
                <Text style={invoiceStyles.metaTitle}>Due Date:</Text>
                <Text style={invoiceStyles.metaBody}>
                  {dateFormat(
                    new Date(invoiceDetails?.dueDate ?? Date.now()),
                    "mmm dd, yyyy"
                  )}
                </Text>
              </View>
            </View>

            <>
              <View style={invoiceStyles.qrCodeContainer}>
                <Image
                  style={invoiceStyles.qrCode}
                  // @ts-expect-error style is required
                  src={{ uri: qrCode }}
                  cache={false}
                />
              </View>
            </>
          </View>

          {/* Table */}
          <View>
            {/*  Table Column  */}
            <View style={invoiceStyles.tableHeader}>
              <View style={invoiceStyles.descriptionCell}>
                <Text>Description</Text>
              </View>
              <View style={invoiceStyles.quantityCell}>
                <Text>Quantity</Text>
              </View>
              <View style={invoiceStyles.priceCell}>
                <Text>Price</Text>
              </View>
              <View style={invoiceStyles.lineTotalCell}>
                <Text>Line Total</Text>
              </View>
            </View>

            {/*  Table rows  */}
            <View style={invoiceStyles.tableBody}>
              {invoiceDetails?.items?.map((item, idx) => (
                <View key={idx} style={invoiceStyles.tableRow} wrap={false}>
                  <View
                    style={{
                      ...invoiceStyles.descriptionCell,
                      ...invoiceStyles.descriptionRowCell,
                    }}
                  >
                    <View style={invoiceStyles.itemInfo}>
                      <Text style={invoiceStyles.itemName}>{item.name}</Text>
                      <Text>{item.description}</Text>
                    </View>

                    {!!item.surcharges?.length && (
                      <View style={invoiceStyles.badgesWrapper}>
                        {item.surcharges.map((surcharge, index) => (
                          <View key={index} style={invoiceStyles.badge}>
                            <SurchargeIcon width={12} height={12} />

                            <Text style={{ textTransform: "capitalize" }}>
                              {surcharge.surchargeTag} (
                              {surcharge?.surchargeTypeValue}
                              {surcharge?.surchargeType === 0 && "%"}) ={" "}
                              <Tspan
                                // @ts-expect-error property style does not exist...
                                style={invoiceStyles.currency}
                              >
                                {formatCurrency(
                                  calculateTax(
                                    surcharge.surchargeTypeValue,
                                    surcharge.surchargeType,
                                    invoiceDetails,
                                    index
                                  ) || 0,
                                  invoiceDetails.currency ?? "NGN"
                                )}
                              </Tspan>
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {!!item.tags?.length && (
                      <View style={invoiceStyles.badgesWrapper}>
                        {item.tags?.map((doc) => (
                          <View key={doc.id} style={invoiceStyles.badge}>
                            <TagsIcon width={12} height={12} />
                            <Text>{doc.tag}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {!!item.links?.length && (
                      <View style={invoiceStyles.badgesWrapper}>
                        {item.links?.map((link) => (
                          <View key={link.id} style={invoiceStyles.badge}>
                            <LinkIcon width={12} height={12} />
                            <Text>
                              {
                                // @ts-expect-error property does not exist
                                link.name
                              }
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {!!item.documents?.length && (
                      <View style={invoiceStyles.badgesWrapper}>
                        {item.documents?.map((document) => (
                          <View key={document.id} style={invoiceStyles.badge}>
                            <LinkIcon width={12} height={12} />
                            <Link
                              style={invoiceStyles.link}
                              src={document.documentUrl}
                            >
                              {document.documentUrl
                                .split("?")[0]
                                ?.split("/")
                                ?.pop()
                                ?.split("-")
                                .slice(1)
                                .join("-")}
                            </Link>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>

                  <View style={invoiceStyles.quantityCell}>
                    <Text style={invoiceStyles.textLight}>
                      {formatNumber(item.qty)}
                    </Text>
                  </View>

                  <View style={invoiceStyles.priceCell}>
                    <Text style={invoiceStyles.currency}>
                      {formatCurrency(item.unitPrice, invoiceDetails.currency)}
                    </Text>
                  </View>

                  <View style={invoiceStyles.lineTotalCell}>
                    <Text style={invoiceStyles.currency}>
                      {formatCurrency(
                        item.qty * item.unitPrice,
                        invoiceDetails.currency ?? "NGN"
                      )}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Bottom */}
          <View style={invoiceStyles.bottomDetails}>
            <View style={invoiceStyles.bottomLeft}>
              {invoiceDetails?.notes && (
                <View style={invoiceStyles.invoiceNotes}>
                  <Text style={invoiceStyles.textBlack}>
                    {invoiceDetails?.notes}
                  </Text>
                </View>
              )}
              <View style={invoiceStyles.documentView}>
                {invoiceDetails.documents?.map((doc) => (
                  <View key={doc.id} style={invoiceStyles.badge}>
                    <DocumentIcon width={12} height={12} />
                    <Link style={invoiceStyles.link} src={doc.documentUrl}>
                      {doc.documentUrl
                        .split("?")[0]
                        .split("/")
                        .pop()
                        ?.split("-")
                        .slice(1)
                        .join("-")}
                    </Link>
                  </View>
                ))}
              </View>
            </View>
            <View style={invoiceStyles.summaryContainer}>
              <View style={invoiceStyles.summaryItem}>
                <Text>Sub Total</Text>
                <Text style={invoiceStyles.currency}>
                  {formatCurrency(
                    lineItemsTotalValues?.totalLineItems ?? 0,
                    invoiceDetails.currency ?? "NGN"
                  )}
                </Text>
              </View>

              <View style={invoiceStyles.summaryItem}>
                <Text>Total Discount</Text>
                <Text style={invoiceStyles.currency}>
                  -{" "}
                  {formatCurrency(
                    lineItemsTotalValues?.totalDiscounts ?? 0,
                    invoiceDetails.currency ?? "NGN"
                  )}
                </Text>
              </View>

              <View style={invoiceStyles.summaryItem}>
                <Text>Total Surcharges</Text>
                <Text style={invoiceStyles.currency}>
                  {formatCurrency(
                    lineItemsTotalValues?.totalSurcharges ?? 0,
                    invoiceDetails.currency ?? "NGN"
                  )}
                </Text>
              </View>

              <View style={invoiceStyles.total}>
                <Text style={invoiceStyles.totalLabel}>
                  Total ({invoiceDetails?.currency ?? "NGN"})
                </Text>
                <Text
                  style={{
                    ...invoiceStyles.currency,
                    ...invoiceStyles.totalLabel,
                  }}
                >
                  {formatCurrency(finalTotal, invoiceDetails.currency ?? "NGN")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={invoiceStyles.footer}>
          <PoweredByCredoLogo />
        </View>
      </Page>
    </Document>
  );
};
