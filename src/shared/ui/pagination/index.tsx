import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <ul className="pagination flex gap-4">
            {pages.map((page) => (
                <li
                    key={page}
                    className={currentPage === page ? 'active text-blue-400 font-bold' : 'cursor-pointer'}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </li>
            ))}
        </ul>
    );
};

export default Pagination;