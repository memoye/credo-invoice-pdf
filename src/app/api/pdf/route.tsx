import { InvoicePDF } from "@/components/InvoicePDF";
import { renderToBuffer } from "@react-pdf/renderer";

export const GET = async () => {
  const pdf = await renderToBuffer(<InvoicePDF selectedCustomerIndex={0} />);
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      // "Content-disposition": `attachment;filename="myDocument.pdf"`,
    },
  });
};
