import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentFilesProps } from "../types/typesDashboard";
import FileItem from "./FileItem";

export default  function RecentFiles({ files, viewAllHref = "/files" }: RecentFilesProps) {
    return (
      <Card className="rounded-2xl h-85 border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0  pb-3">
          <CardTitle className="text-xl font-medium">Recent Files</CardTitle>
          <Link href={viewAllHref} className="text-sm text-blue-600 hover:underline">
            View All
          </Link>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <ul className="divide-y divide-border/70">
            {files.map((f) => (
              <FileItem key={f.id} file={f} />
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }