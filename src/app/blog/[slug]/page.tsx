import BlogPost from '@/components/blog/BlogPost';
import { getBlogPost } from '@/lib/blog'; // Your data fetching function

export default async function BlogPostPage({
                                               params,
                                           }: {
    params: { slug: string };
}) {
    const post = await getBlogPost(params.slug);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <BlogPost post={post} />
        </div>
    );
}
