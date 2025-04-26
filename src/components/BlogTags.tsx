'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function BlogTags({ tags }: { tags: string[] }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTag = searchParams?.get('tag') || null;

    // Ensure pathname has a fallback value
    const safePathname = pathname || '/blog'; // Default to '/blog' if pathname is null

    return (
        <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3 text-gray-500 dark:text-gray-400">
                Filter by Tag
            </h3>
            <div className="flex flex-wrap gap-2">
                <Link
                    href={safePathname}  // Use the safePathname here
                    className={`px-3 py-1 rounded-full text-sm ${
                        !currentTag
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                    All
                </Link>
                {tags.map((tag) => (
                    <Link
                        key={tag}
                        href={`${safePathname}?tag=${encodeURIComponent(tag)}`}  // And here
                        className={`px-3 py-1 rounded-full text-sm ${
                            currentTag === tag
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    );
}
