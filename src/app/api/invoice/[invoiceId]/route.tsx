import QRCode from "qrcode";
import { NextRequest } from "next/server";
import { InvoicePDF } from "@/components/InvoicePDF";
import { registerFonts } from "@/lib/pdfStyles";
import { renderToBuffer } from "@react-pdf/renderer";
import { generateQRWithLogo } from "@/lib/utils";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ invoiceId: string }> }
) => {
  registerFonts();

  const invoiceId = (await params).invoiceId;
  const searchParams = request.nextUrl.searchParams;

  const urlStr = "https://google.com";

  const qrCodeDataUrl = await generateQRWithLogo(urlStr);

  // QRCode.toDataURL(urlStr, {
  //   errorCorrectionLevel: "M",
  //   margin: 4,
  //   width: 150,

  //   scale: 4,
  // });

  const pdf = await renderToBuffer(
    <InvoicePDF qrCode={qrCodeDataUrl} selectedCustomerIndex={0} />
  );

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      // "Content-disposition": `attachment;filename="myDocument.pdf"`, // to
    },
    status: 200,
  });
};
