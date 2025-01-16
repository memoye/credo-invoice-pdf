"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { InvoicePDF } from "./InvoicePDF";

export const ViewPDF = () => {
  return (
    <PDFViewer width={500} height={1000}>
      <InvoicePDF selectedCustomerIndex={0} />
    </PDFViewer>
  );
};
