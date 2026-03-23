import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // Gera uma sequência de páginas com elipses, por exemplo:
  // [1, '...', 4, 5, 6, '...', 10]
  const range = (start: number, end: number) => {
    const res = [] as number[];
    for (let i = start; i <= end; i++) res.push(i);
    return res;
  };

  const getPageItems = (current: number, total: number) => {
    const siblingCount = 1; // páginas ao redor do current
    const totalPageNumbers = siblingCount * 2 + 5;

    if (total <= totalPageNumbers) {
      return range(1, total) as (number | string)[];
    }

    const leftSiblingIndex = Math.max(current - siblingCount, 1);
    const rightSiblingIndex = Math.min(current + siblingCount, total);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < total - 1;

    // neither ellipsis
    if (!showLeftEllipsis && showRightEllipsis) {
      const leftItemCount = 3 + 2 * siblingCount;
      const pages = range(1, leftItemCount);
      return [...pages, "...", total] as (number | string)[];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightItemCount = 3 + 2 * siblingCount;
      const pages = range(total - rightItemCount + 1, total);
      return [1, "...", ...pages] as (number | string)[];
    }

    // both sides ellipsis
    const middlePages = range(leftSiblingIndex, rightSiblingIndex);
    return [1, "...", ...middlePages, "...", total] as (number | string)[];
  };

  const pages = getPageItems(currentPage, totalPages);

  return (
    <div className="flex items-center gap-2 select-none justify-center py-8">
      {/* Seta Esquerda */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-text-body-timeline-light dark:text-text-body-dark hover:opacity-70 disabled:opacity-30 cursor-pointer transition-opacity"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Números */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-text-body-timeline-light dark:text-text-body-dark text-[14px]"
              >
                ...
              </span>
            );
          }

          const isActive = currentPage === page;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`
                w-10 h-10 flex items-center justify-center rounded-full text-[14px] font-bold transition-all duration-300 cursor-pointer
                ${
                  isActive
                    ? "bg-[#0095FF] text-white shadow-[0_4px_12px_rgba(0,149,255,0.4)]"
                    : "text-text-body-timeline-light dark:text-text-body-dark hover:bg-gray-100 dark:hover:bg-white/10"
                }
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Seta Direita */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="p-2 text-text-body-timeline-light dark:text-text-body-dark hover:opacity-70 disabled:opacity-30 cursor-pointer transition-opacity"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
