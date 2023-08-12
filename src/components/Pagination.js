import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center mt-5">
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`mx-1 px-3 py-1 ${
            currentPage === pageNumber ? "bg-violet-500 text-white" : "bg-gray-300"
          }`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
