import { NextResponse } from "next/server";
import { searchApi } from "@/api/search.api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") ?? "";

    if (!q.trim()) {
      return NextResponse.json({
        success: true,
        data: {
          query: "",
          total: 0,
          results: {},
        },
      });
    }

    const data = await searchApi(q);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Search failed";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

