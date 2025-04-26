import BlogList from '@/components/BlogList';
import BlogTags from '@/components/BlogTags';
import { getUniqueTags } from '@/lib/utils';
import { getBlogPosts } from '@/lib/blog';
import BlogPagination from "@/components/BlogPagination";

export default async function BlogPage({
                                           searchParams,
                                       }: {
    searchParams?: {
        [key: string]: string | string[] | undefined
    };
}) {
    try {
        const tagFilter = Array.isArray(searchParams?.tag)
            ? searchParams.tag[0]
            : searchParams?.tag;

        // Safely parse page number with validation
        const pageParam = searchParams?.page;
        const parsedPage = typeof pageParam === 'string'
            ? parseInt(pageParam, 10)
            : 1;
        const currentPage = isNaN(parsedPage) || parsedPage < 1
            ? 1
            : parsedPage;

        const { posts, totalPages } = await getBlogPosts({
            tag: tagFilter,
            page: currentPage,
            limit: 5,
        });

        const allTags = getUniqueTags(posts);

        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Blog</h1>
                <BlogTags tags={allTags} />
                <BlogList posts={posts} />
                {totalPages > 1 && (
                    <BlogPagination totalPages={totalPages} currentPage={currentPage} />
                )}
            </div>
        );
    } catch (error) {
        console.error("Error in BlogPage:", error);
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Blog</h1>
                <p className="text-red-500">Error loading blog posts. Please try again later.</p>
            </div>
        );
    }
}
