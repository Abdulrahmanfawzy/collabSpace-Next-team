import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentFilesProps } from "../types/typesDashboard";
import FileItem from "./FileItem";
import { ScrollArea } from "@/components/ui/scroll-area";

export default  function RecentFiles({ files, viewAllHref = "/files" }: RecentFilesProps) {
    return (
      <Card className="flex h-85 flex-col rounded-2xl border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0  pb-3">
          <CardTitle className="text-xl font-medium">Recent Files</CardTitle>
          <Link href={viewAllHref} className="text-sm text-blue-600 hover:underline">
            View All
          </Link>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col p-5 pt-0">
          <ScrollArea className="min-h-0 flex-1 pr-3">
            <ul className="divide-y divide-border/70">
              {files.map((f) => (
                <FileItem key={f.id} file={f} />
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    )
  }
