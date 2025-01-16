"use client";

import { InvoicePDF } from "@/components/InvoicePDF";
import styles from "./page.module.css";
import { PDFViewer } from "@react-pdf/renderer";

export default function Home() {
  return (
    <div className={styles.page}>
      <PDFViewer>
        <InvoicePDF selectedCustomerIndex={0} />
      </PDFViewer>
    </div>
  );
}
