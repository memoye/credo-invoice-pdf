"use client";

import { InvoicePDF } from "@/components/InvoicePDF";
import { ViewPDF } from "@/components/ViewPDF";
import styles from "./page.module.css";
import { PDFViewer } from "@react-pdf/renderer";

export default function Home() {
  return (
    <div className={styles.page}>
      <ViewPDF />
    </div>
  );
}
