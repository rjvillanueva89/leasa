import { useRouter } from "next/router";
import { ChangeEventHandler, memo, useCallback, useMemo } from "react";

interface Props {
  limit: number;
  totalItems: number;
}

const Pagination = ({ limit, totalItems }: Props) => {
  const { push, query } = useRouter();
  const currentPage = query.p ? Number(query.p) : 1;
  const totalPageCount = Math.ceil(totalItems / limit);
  const pages = Array.from({ length: Number(totalPageCount) }, (_, i) => i + 1);

  const startCount = (currentPage - 1) * limit + 1;
  const endCount =
    currentPage === totalPageCount
      ? totalItems
      : (currentPage - 1) * limit + limit;

  const options = useMemo(
    () =>
      pages.map((page: number, key: number) => (
        <option value={page} key={key}>
          {page}
        </option>
      )),
    [pages]
  );

  const generatePageLink = (page: number, query: any) => {
    return {
      query: {
        ...query,
        p: page,
      },
    };
  };

  const handlePrev = useCallback(() => {
    if (currentPage > 1) {
      push(generatePageLink(currentPage - 1, query));
    }
  }, [currentPage, push, query]);

  const handleNext = useCallback(() => {
    if (currentPage < pages.length) {
      push(generatePageLink(currentPage + 1, query));
    }
  }, [currentPage, push, query, pages.length]);

  const handleOnChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      const pageNumber = Number(event.currentTarget.value);
      if (currentPage !== pageNumber) {
        push(generatePageLink(pageNumber, query));
      }
    },
    [currentPage, push, query]
  );

  if (!pages.length) return null;

  return (
    <nav className="flex items-center justify-between border-t border-dashed py-2">
      <div className="text-sm text-gray-700">
        Showing {startCount} to {endCount} of {totalItems}
      </div>
      <div className="inline-flex items-center gap-1 text-xs">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="block border border-gray-300 bg-white py-2 px-2.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-20"
        >
          prev
        </button>
        <label
          htmlFor="pager"
          className="relative flex items-center border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <select
            id="pager"
            className="relative z-10 cursor-pointer appearance-none bg-transparent py-2 px-2.5 pr-8 text-center leading-tight outline-none"
            onChange={handleOnChange}
            value={currentPage}
          >
            {options}
          </select>
        </label>
        <button
          onClick={handleNext}
          disabled={currentPage === pages.length}
          className="block border border-gray-300 bg-white py-2 px-2.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-20"
        >
          next
        </button>
      </div>
    </nav>
  );
};

export default memo(Pagination);
