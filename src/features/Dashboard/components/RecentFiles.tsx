import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentFilesProps } from "../types/typesDashboard";
import FileItem from "./FileItem";

export default  function RecentFiles({ files, viewAllHref = "/files" }: RecentFilesProps) {
    return (
      <Card className="flex h-full min-h-[22rem] flex-col rounded-2xl border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0  pb-3">
          <CardTitle className="text-xl font-medium">Recent Files</CardTitle>
          <Link href={viewAllHref} className="text-sm text-blue-600 hover:underline">
            View All
          </Link>
        </CardHeader>
        <CardContent className="min-h-0 flex-1 overflow-y-auto p-5 pt-0">
          {files.length ? <ul className="divide-y divide-border/70">
            {files.map((f) => (
              <FileItem key={f.id} file={f} />
            ))}
          </ul> : <p className="py-8 text-center text-sm text-muted-foreground">No recent files.</p>}
        </CardContent>
      </Card>
    )
  }
