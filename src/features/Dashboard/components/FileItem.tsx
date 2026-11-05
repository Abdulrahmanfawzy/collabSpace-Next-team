import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"
import { RecentFile } from "../types/typesDashboard"

function FileItem({ file }: { file: RecentFile }) {
    const fileTypeColors: Record<string, string> = {
        pdf: "text-red-500",
        jsx: "text-foreground",
        tsx: "text-blue-500",
        sql: "text-blue-500",
        csv: "text-green-600",
        doc: "text-blue-600",
        docx: "text-blue-600",
      }
      
    function FileTypeIcon({ fileName }: { fileName: string }) {
        const ext = fileName.split(".").pop()?.toLowerCase() ?? "file"
        const color = fileTypeColors[ext] ?? "text-muted-foreground"
      
        return (
          <svg
            viewBox="0 0 28 34"
            className={cn("h-10 w-8 shrink-0", color)}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M17 1.5H5a3 3 0 0 0-3 3v25a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V11L17 1.5Z" />
            <path d="M17 1.5V9a2 2 0 0 0 2 2h7" />
            <text
              x="14"
              y="26"
              textAnchor="middle"
              fontSize="7.5"
              fontWeight="700"
              fill="currentColor"
              stroke="none"
            >
              {ext.slice(0, 4).toUpperCase()}
            </text>
          </svg>
        )
      }
    return (
      <li className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
        <FileTypeIcon fileName={file.name} />
  
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-medium">{file.name}</p>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            By {file.author} • {file.time}
          </p>
        </div>
  
        {file.downloadUrl ? (
          <Button variant="ghost" size="icon" asChild aria-label={`Download ${file.name}`}>
            <a href={file.downloadUrl} download>
              <Download className="size-5" />
            </a>
          </Button>
        ) : (
          <Button variant="ghost" size="icon" disabled aria-label={`Download ${file.name}`}>
            <Download className="size-5" />
          </Button>
        )}
      </li>
    )
  }
  export default FileItem