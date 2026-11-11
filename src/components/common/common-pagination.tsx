
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CommonPaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export function CommonPagination({
  currentPage,
  lastPage,
  onPageChange,
}: CommonPaginationProps) {
  if (lastPage <= 1) return null;

  const pages: number[] = [];

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(lastPage, currentPage + 1);

  if (startPage > 1) {
    pages.push(1);
  }

  if (startPage > 2) {
    pages.push(-1);
  }

  for (let page = startPage; page <= endPage; page++) {
    pages.push(page);
  }

  if (endPage < lastPage - 1) {
    pages.push(-1);
  }

  if (endPage < lastPage) {
    pages.push(lastPage);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : ""
            }
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={`${page}-${index}`}>
            {page === -1 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={currentPage === lastPage}
            className={
              currentPage === lastPage
                ? "pointer-events-none opacity-50"
                : ""
            }
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
