import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import api from "@/lib/api";
import { registerFonts } from "@/lib/pdfStyles";
import { TransactionInvoicePDF } from "@/components/TransactionInvoicePDF";
import { AxiosError } from "axios";

export const dynamic = "force-dynamic";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ transRef: string }> }
) => {
  try {
    registerFonts();
    const searchParams = request.nextUrl.searchParams;

    const transRef = (await params).transRef;
    const environment = searchParams.get("env");

    const demoUrl = process.env.DEMO_BASE_URL;
    const liveUrl = process.env.LIVE_BASE_URL;

    try {
      const res = await api.get(`/transaction/initialize/${transRef}`, {
        baseURL: environment === "live" ? liveUrl : demoUrl,
      });

      const pdf = await renderToBuffer(
        <TransactionInvoicePDF transactionDetails={res?.data.data} />
      );

      return new Response(pdf, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-disposition": `attachment;filename="${res?.data.data.crn}-Invoice.pdf"`, // this triggers download
        },
        status: 200,
      });
    } catch (error) {
      return Response.json(
        { message: (error as Error).message || "Internal server error" },
        { status: (error as AxiosError).status || 500 }
      );
    }
  } catch (error) {
    return Response.json(
      { message: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
};
