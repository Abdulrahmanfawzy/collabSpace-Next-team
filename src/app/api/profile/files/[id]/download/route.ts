import { NextResponse } from "next/server";

import { getBackendToken } from "@/auth";

interface DownloadRouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, { params }: DownloadRouteContext) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid file ID.",
      },
      { status: 400 },
    );
  }

  const token = await getBackendToken();

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthenticated.",
      },
      { status: 401 },
    );
  }

  const baseUrl = process.env.PUBLIC_NEXT_BASEURL;

  if (!baseUrl) {
    return NextResponse.json(
      {
        success: false,
        message: "Backend URL is not configured.",
      },
      { status: 500 },
    );
  }

  const downloadUrl = `${baseUrl.replace(/\/+$/, "")}/api/v1/files/${id}/download`;

  try {
    const upstreamResponse = await fetch(downloadUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      const errorPayload = await upstreamResponse.json().catch(() => null);

      return NextResponse.json(
        {
          success: false,
          message: errorPayload?.message ?? "Unable to download this file.",
        },
        { status: upstreamResponse.status },
      );
    }

    const headers = new Headers();

    headers.set(
      "Content-Type",
      upstreamResponse.headers.get("content-type") ??
        "application/octet-stream",
    );

    headers.set(
      "Content-Disposition",
      upstreamResponse.headers.get("content-disposition") ??
        `attachment; filename="file-${id}"`,
    );

    const contentLength = upstreamResponse.headers.get("content-length");

    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    headers.set("Cache-Control", "private, no-store");

    return new Response(upstreamResponse.body, {
      status: 200,
      headers,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to connect to the file server.",
      },
      { status: 502 },
    );
  }
}
