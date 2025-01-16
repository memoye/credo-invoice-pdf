import { StyleSheet } from "@react-pdf/renderer";

// Font.register({
//   family: "Outfit",
//   fonts: [
//     { src: "../assets/fonts/Outfit-Regular.ttf", fontWeight: 400 },
//     { src: "../assets/fonts/Outfit-Medium.ttf", fontWeight: 600 },
//   ],
// });

// Font.register({
//   family: "BellotaText",
//   src: "../assets/fonts/BellotaText-Bold.ttf",
//   fontWeight: 700,
// });

// Font.register({
//   family: "Monda",
//   src: "../assets/fonts/Monda-SemiBold.ttf",
//   fontWeight: 600,
// });

export const pdfContainer = StyleSheet.create({
  page: {
    // fontFamily: "Outfit",
    marginTop: 32,
    marginBottom: 50,
  },
  main: {
    // fontFamily: "Outfit",
    marginHorizontal: 24,
    marginBottom: 50,
  },
});

export const invoiceStyles = StyleSheet.create({
  page: pdfContainer.page,
  main: pdfContainer.main,
  heading: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 16,
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#EAECF0",
    marginBottom: 5,
  },
  headingTitle: {
    color: "#0765FF",
    // fontFamily: "Outfit",
    fontSize: 18,
    fontWeight: 600,
    marginTop: 18,
  },
  logo: {
    width: 70,
    height: 70,
  },
  meta: {
    // fontFamily: "Outfit",
    fontSize: 10,
    lineHeight: 1.3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metaItem: {
    width: 166,
    paddingTop: 4,
  },
  metaTitle: {
    color: "#667085",
  },
  metaBody: {
    color: "#1D2939",
  },
  address: {
    minHeight: 50,
  },
  metaStart: {
    display: "flex",
    gap: 14,
  },
  metaMiddle: {
    justifyContent: "space-between",
    maxHeight: 150,
    marginBottom: 2,
    paddingRight: 10,
    paddingLeft: 80,
  },
  qrCodeContainer: {
    borderWidth: 2,
    borderColor: "#0536A3",
    width: 160,
    height: 150,
    borderRadius: 10,
  },
  qrCode: {
    padding: 2,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    objectFit: "contain",
    borderRadius: 10,
    aspectRatio: 1,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // fontFamily: "Outfit",
    fontWeight: 600,
    fontSize: 10,
    color: "#344054",
    backgroundColor: "#ECF2FF",
    paddingHorizontal: 6,
    paddingVertical: 5,
    height: 23,
    marginBottom: 5,
    width: "100%",
  },
  descriptionCell: {
    width: 260,
  },
  quantityCell: {
    width: 65,
    textAlign: "right",
  },
  priceCell: {
    width: 75,
    textAlign: "right",
  },
  lineTotalCell: {
    width: 100,
    textAlign: "right",
  },
  table: {},
  tableBody: {
    flexDirection: "column",
    justifyContent: "space-between",
    fontSize: 10,
    width: "100%",
    gap: 10,
  },
  tableRow: {
    paddingHorizontal: 6,
    color: "#667085",
    borderBottomWidth: 0.5,
    borderBottomColor: "#EAECF0",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionRowCell: {
    width: 260,
    color: "#667085",
  },
  itemInfo: {
    marginBottom: 10,
    flexDirection: "column",
    gap: 4,
  },
  itemName: {
    color: "#1D2939",
  },
  badgesWrapper: {
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 5,
  },
  badge: {
    backgroundColor: "#ECF2FF",
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    color: "#0765FF",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  currency: {
    // fontFamily: "BellotaText",
    fontSize: 10,
  },
  bottomLeft: {
    width: 280,
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingTop: 5,
  },
  link: {
    // fontFamily: "Outfit",
    fontSize: 10,
    textDecoration: "none",
    lineHeight: 1.3,
    paddingBottom: 2,
    color: "#0765FF",
  },
  documentView: {
    color: "#0765FF",
    gap: 4,
  },
  invoiceNotes: {
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 8,
    marginBottom: 5,
    borderRadius: 4,
    backgroundColor: "#ECF2FF",
  },
  bottomDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textBlack: {
    color: "#1D2939",
    fontSize: 10,
  },
  textLight: {
    color: "#667085",
  },
  summaryContainer: {
    width: 220,
  },
  summaryItem: {
    color: "#667085",
    // fontFamily: "Outfit",
    fontSize: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#EAECF0",
    paddingVertical: 5,
    // marginBottom: 5,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "none",
    paddingVertical: 5,
  },
  totalLabel: {
    color: "#1D2939",
    fontSize: 10.5,
  },
  footer: {
    position: "absolute",
    bottom: 80,
    left: 24,
  },
});

export const receiptStyles = StyleSheet.create({
  page: {
    // fontFamily: "Outfit",
    backgroundColor: "#F6F6F6", //"#F9FAFB"
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    // fontFamily: "Outfit",
    width: 450,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    padding: 28,
    minHeight: 530,
    color: "#344054",
  },
  paymentStatus: {
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    fontWeight: 600,
    marginBottom: 12,
  },
  mainContent: {
    position: "relative",
    padding: 20,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#EAECF0",
    borderBottomWidth: 0,
  },
  wavyLines: {
    height: 10,
    position: "absolute",
    bottom: -5,
    left: 0,
    flexDirection: "row",
    maxWidth: "100%",
    overflow: "hidden",
  },
  mainContentHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E7",
    paddingBottom: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 22,
    height: 22,
    backgroundColor: "09090B",
    color: "#FFFFFF",
    borderRadius: "100%",
    flexShrink: 0,
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1.5,
    fontWeight: 600,
  },
  labelText: {
    color: "#344054",
    fontSize: 11.2089,
    fontWeight: 600,
  },
  businessInfo: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  businessName: {
    // fontFamily: "BellotaText",
    color: "#344054",
    fontSize: 11,
  },
  paymentAmount: {
    flex: 1,
    justifyContent: "flex-end",
  },
  amount: {
    // fontFamily: "Monda",
    fontSize: 18,
    fontWeight: 600,
    textAlign: "right",
  },
  mainContentBody: {
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E7",
    gap: 10,
    paddingBottom: 16,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    // fontFamily: "Outfit",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 11,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: 600,
  },
  currency: {
    // fontFamily: "Monda",
    fontSize: 12,
    fontWeight: 600,
  },
  footer: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: {
    flexDirection: "row",
    gap: 8,
  },
  footerRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  website: {
    // fontFamily: "Outfit",
    fontSize: 11,
    textDecoration: "none",
    fontWeight: "normal",
    color: "#344054",
  },
  socials: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
});

export const installmentTableStyles = StyleSheet.create({
  heading: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 12,
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#EAECF0",
    marginBottom: 5,
  },
  headingTitle: {
    color: "#0765FF",
    // fontFamily: "Outfit",
    fontSize: 18,
    fontWeight: 600,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#EAECF0",
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // fontFamily: "Outfit",
    fontWeight: 600,
    fontSize: 14,
    color: "#344054",
    backgroundColor: "#F9FAFB",
    minHeight: 44,
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "#EAECF0",
    borderTopWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 36,
    width: "100%",
  },
  scheduleCell: {
    width: 120,
  },
  dueDateCell: {
    width: 100,
  },
  amountCell: {
    width: 150,
  },
  paymentDateCell: {
    width: 110,
  },
  statusCell: {
    width: 80,
    paddingLeft: 10,
  },
  cellText: {
    // fontFamily: "Outfit",
    fontSize: 13,
    fontWeight: 400,
  },
  currency: {
    // fontFamily: "BellotaText",
    fontSize: 14,
  },
});
