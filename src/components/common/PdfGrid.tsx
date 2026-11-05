"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Download, FileText } from "lucide-react";

import type { PDFFile } from "@/features/profile/types/profile.types";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type PDFGridProps = {
  files: PDFFile[];
  emptyMessage?: string;
};

function PDFPreview({ file }: { file: PDFFile }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex h-48 items-center justify-center overflow-hidden bg-gray-50">
      {!failed ? (
        <Document
          file={file.url}
          loading={
            <div className="flex flex-col items-center gap-2 text-text-muted">
              <FileText className="size-10" />
              <span className="text-xs">Loading preview...</span>
            </div>
          }
          onLoadSuccess={() => setLoaded(true)}
          onLoadError={() => setFailed(true)}
          error={<FileText className="size-12 text-support-red" />}
        >
          {loaded ? (
            <Page
              pageNumber={1}
              width={185}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ) : null}
        </Document>
      ) : (
        <div className="flex flex-col items-center gap-2 text-text-muted">
          <FileText className="size-12 text-support-red" />
          <span className="text-xs">Preview unavailable</span>
        </div>
      )}
    </div>
  );
}

export function PDFGrid({
  files,
  emptyMessage = "No PDF files available.",
}: PDFGridProps) {
  if (!files.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-white p-12 text-center">
        <FileText className="mx-auto size-10 text-text-muted" />
        <p className="mt-3 text-sm text-text-body">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {files.map((file) => (
        <article
          key={file.id}
          className="overflow-hidden rounded-xl  border border-border bg-white transition 
          hover:-translate-y-1 hover:shadow-md"
        >
          {/* <PDFPreview file={file} /> */}

          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className=" flex size-12 shrink-0 items-center justify-center">
                <FileText className="size-7 shrink-0 text-support-red" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-text-primary">
                  {file.name}
                </h3>

                <p className="mt-1 text-xs text-text-body">{file.author}</p>
                <p className="mt-0.5 text-[11px] text-text-muted">
                  {file.size}.{file.date}
                </p>
              </div>
              <div className="flex size-12 shrink-0 items-center justify-center">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={file.name}
                  aria-label={`Download ${file.name}`}
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg
                   text-secondary transition hover:bg-primary hover:text-white"
                >
                  <Download className="size-4.5" />
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
