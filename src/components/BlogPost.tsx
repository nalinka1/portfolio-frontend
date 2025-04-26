'use client';

import { formatDate } from '@/lib/utils';
import { ReactElement } from 'react';

type BlogPostProps = {
    post: {
        id: string;
        slug: string;
        title: string;
        description: string;
        date: string;
        tags: string[];
        content: string | ReactElement;
        readingTime: string;
    };
};

export default function BlogPost({ post }: BlogPostProps) {
    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                    {post.title || "Untitled"}
                </h1>
                <div className="flex flex-wrap justify-center items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>&bull;</span>
                    <span>{post.readingTime || "1 min read"}</span>
                    {post.tags.length > 0 && (
                        <>
                            <span>&bull;</span>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium"
                                    >
                    #{tag}
                  </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </header>

            <div className="prose prose-xl dark:prose-invert max-w-none">
                {typeof post.content === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                    post.content
                )}
            </div>

            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Thanks for reading! Feel free to share your thoughts below.
                </p>
            </footer>
        </article>
    );
}
