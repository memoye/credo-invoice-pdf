import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import api from "@/lib/api";
import { registerFonts } from "@/lib/pdfStyles";
import { TransactionInvoicePDF } from "@/components/TransactionInvoicePDF";

export const dynamic = "force-dynamic";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ transRef: string }> }
) => {
  registerFonts();
  const searchParams = request.nextUrl.searchParams;

  const transRef = (await params).transRef;
  const environment = searchParams.get("env");

  const demoUrl = process.env.DEMO_BASE_URL;
  const liveUrl = process.env.LIVE_BASE_URL;

  const res = await api.get(`/transaction/initialize/${transRef}`, {
    baseURL: environment === "live" ? liveUrl : demoUrl,
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

  const pdf = await renderToBuffer(
    <TransactionInvoicePDF transactionDetails={res?.data.data} />
  );

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      // "Content-disposition": `attachment;filename="myDocument.pdf"`, // this triggers download
    },
    status: 200,
  });
};
