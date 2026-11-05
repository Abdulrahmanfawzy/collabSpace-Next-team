import { FileText } from "lucide-react";

import { PDFGrid } from "@/components/common/PdfGrid";
import { profileFiles } from "../data/mock-profile";

export function ProfileFiles() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

      </div>

      <PDFGrid files={profileFiles} />
    </section>
  );
}
