'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function BlogPagination({
                                           totalPages,
                                           currentPage,
                                       }: {
    totalPages: number;
    currentPage: number;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex justify-center items-center space-x-4 mt-12">
            {currentPage > 1 && (
                <Link
                    href={createPageURL(currentPage - 1)}
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                >
                    Previous
                </Link>
            )}

            <span className="text-sm text-gray-600 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

            {currentPage < totalPages && (
                <Link
                    href={createPageURL(currentPage + 1)}
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                >
                    Next
                </Link>
            )}
        </div>
    );
}
