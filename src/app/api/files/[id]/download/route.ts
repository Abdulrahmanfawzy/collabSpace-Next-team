import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getProjectFileDownload } from "@/api/files.api";

interface DownloadRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: DownloadRouteContext) {
  const session = await auth();
  const token = session?.backendToken;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthenticated." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const fileId = Number(id);
  if (!Number.isInteger(fileId) || fileId <= 0) {
    return NextResponse.json(
      { success: false, message: "Invalid file ID." },
      { status: 400 }
    );
  }

  const upstream = await getProjectFileDownload(fileId, token);
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      {
        success: false,
        message:
          upstream.statusText || "Unable to download this file.",
      },
      { status: upstream.ok ? 502 : upstream.status }
    );
  }

  const headers = new Headers({
    "Content-Type":
      upstream.headers.get("content-type") ?? "application/octet-stream",
    "Content-Disposition": getAttachmentDisposition(
      upstream.headers.get("content-disposition"),
      fileId,
      new URL(_request.url).searchParams.get("name")
    ),
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  });
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
}

function getAttachmentDisposition(
  upstreamDisposition: string | null,
  fileId: number,
  requestedName: string | null
): string {
  const encodedName = upstreamDisposition?.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  const quotedName = upstreamDisposition?.match(/filename="([^"]*)"/i)?.[1];
  let name = requestedName || `file-${fileId}`;

  try {
    if (encodedName) name = decodeURIComponent(encodedName);
    else if (quotedName) name = quotedName;
  } catch {
    name = `file-${fileId}`;
  }

  const safeName = name
    .replace(/[\u0000-\u001f\u007f"\\/]/g, "_")
    .trim();
  const filename = safeName || `file-${fileId}`;
  const asciiFilename = filename.replace(/[^\x20-\x7e]/g, "_");

  return `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}
