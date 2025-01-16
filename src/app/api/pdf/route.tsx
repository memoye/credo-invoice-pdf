import { InvoicePDF } from "@/components/InvoicePDF";
import { registerFonts } from "@/lib/pdfStyles";
import { Font, renderToBuffer } from "@react-pdf/renderer";
import path from "path";

export const GET = async () => {
  registerFonts();

  const pdf = await renderToBuffer(<InvoicePDF selectedCustomerIndex={0} />);
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      // "Content-disposition": `attachment;filename="myDocument.pdf"`, // to
    },
  });
};
