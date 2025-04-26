'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {formatDate} from '@/lib/utils';

type BlogPost = {
    id: string;
    title: string;
    description: string;
    date: string;
    slug: string;
    tags?: string[];
};

export default function BlogList({posts}: { posts: BlogPost[] }) {
    const pathname = usePathname();

    return (
        <div className="space-y-8">
            {posts.map((post) => (
                <article key={post.id} className="group">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg transition-colors"
                    >
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {post.title}
                            </h2>
                            <time
                                dateTime={post.date}
                                className="text-sm text-gray-500 dark:text-gray-400"
                            >
                                {formatDate(post.date)}
                            </time>
                        </div>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {post.description}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                    >
                    {tag}
                  </span>
                                ))}
                            </div>
                        )}
                    </Link>
                </article>
            ))}
        </div>
    );
}
