import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Items_Per_Page } from "../../app/constants";

export default function Pagination({ page, setPage, handlePage, totalItems = 97 }) {
  const totalPages = Math.ceil(totalItems / Items_Per_Page);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(e, page > 1 ? page - 1 : 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={(e) =>
            handlePage(e, page < totalPages ? page + 1 : totalPages)
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * Items_Per_Page + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                page * Items_Per_Page > totalItems
                  ? totalItems
                  : page * Items_Per_Page,
                totalItems
              )}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(e, page > 1 ? page - 1 : 1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => {
                console.log(page === pageNumber);
                return (
                  <div
                    key={pageNumber}
                    onClick={(e) => handlePage(e, pageNumber)}
                    className={`relative cursor-pointer inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${
                      page === pageNumber
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </div>
                );
              }
            )}

            <div
              onClick={(e) =>
                handlePage(e, page < totalPages ? page + 1 : totalPages)
              }
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}