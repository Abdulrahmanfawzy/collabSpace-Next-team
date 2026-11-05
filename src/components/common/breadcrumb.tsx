import { ChevronRight } from "lucide-react"
import Link from "next/link"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-xs text-gray-400">
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <ChevronRight aria-hidden="true" size={13} />}
              {item.href && !isCurrentPage ? (
                <Link href={item.href} className="text-[#00000099]">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isCurrentPage ? "page" : undefined}
                  className={isCurrentPage ? "text-black" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
