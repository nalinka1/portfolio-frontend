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
        content: string | ReactElement; // stays the same
        readingTime: string;
    };
};

export default function BlogPost({ post }: BlogPostProps) {
    return (
        <article className="prose dark:prose-invert max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs"
                                >
                  {tag}
                </span>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <div className="blog-content">
                {typeof post.content === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                    post.content
                )}
            </div>

            <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Thanks for reading! Let me know your thoughts.
                </p>
            </footer>
        </article>
    );
}
