import {promises as fs} from 'fs';
import path from 'path';
import {compileMDX} from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { ReactElement } from 'react';
// Types
export type BlogPost = {
    id: string;
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    content: string | ReactElement;
    readingTime: string;
};

type BlogPostMeta = Omit<BlogPost, 'content'>;

type GetBlogPostsOptions = {
    tag?: string;
    page?: number;
    limit?: number;
    includeContent?: boolean;
};

// Path to blog posts directory
const postsDirectory = path.join(process.cwd(), 'src/content/blog');

// Calculate reading time
const calculateReadingTime = (content: string): string => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
};

// Get all blog posts
export async function getBlogPosts({
                                       tag,
                                       page = 1,
                                       limit = 10,
                                       includeContent = false,
                                   }: GetBlogPostsOptions = {}): Promise<{
    posts: BlogPostMeta[];
    totalPages: number;
}> {
    try {
        const filenames = await fs.readdir(postsDirectory);
        const posts = await Promise.all(
            filenames
                .filter((filename) => filename.endsWith('.mdx'))
                .map(async (filename) => {
                    const filePath = path.join(postsDirectory, filename);
                    const fileContents = await fs.readFile(filePath, 'utf8');
                    const {data, content} = matter(fileContents);

                    const slug = filename.replace(/\.mdx$/, '');

                    return {
                        id: slug,
                        slug,
                        title: data.title || 'Untitled',
                        description: data.description || '',
                        date: data.date || new Date().toISOString(),
                        tags: data.tags || [],
                        content: includeContent ? content : '',
                        readingTime: calculateReadingTime(content),
                    };
                })
        );

        // Filter by tag if specified
        const filteredPosts = tag
            ? posts.filter((post) => post.tags.includes(tag))
            : posts;

        // Sort by date (newest first)
        filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

        // Remove content if not requested to reduce payload
        const resultPosts = includeContent
            ? paginatedPosts
            : paginatedPosts.map(({content, ...rest}) => rest);

        return {
            posts: resultPosts,
            totalPages: Math.ceil(filteredPosts.length / limit),
        };
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return {posts: [], totalPages: 0};
    }
}

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const filePath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const {data, content} = matter(fileContents);

        // Compile MDX with syntax highlighting
        const {frontmatter, content: compiledContent} = await compileMDX<{
            title: string;
            description: string;
            date: string;
            tags: string[];
        }>({
            source: content,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    rehypePlugins: [
                        rehypeSlug,
                        [
                            rehypePrettyCode,
                            {
                                theme: 'github-dark',
                                keepBackground: false,
                            },
                        ],
                        [
                            rehypeAutolinkHeadings,
                            {
                                behavior: 'append',
                                properties: {
                                    className: ['anchor-link'],
                                    ariaLabel: 'Link to section',
                                },
                            },
                        ],
                    ],
                },
            },
        });

        return {
            id: slug,
            slug,
            title: frontmatter.title || 'Untitled',
            description: frontmatter.description || '',
            date: frontmatter.date || new Date().toISOString(),
            tags: frontmatter.tags || [],
            content: compiledContent,
            readingTime: calculateReadingTime(content),
        };
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
    }
}

// Get all unique tags
export async function getBlogTags(): Promise<string[]> {
    const {posts} = await getBlogPosts();
    const tags = new Set<string>();

    posts.forEach((post) => {
        post.tags?.forEach((tag) => tags.add(tag));
    });

    return Array.from(tags).sort();
}

// Get related posts (by tags)
export async function getRelatedPosts(
    currentPostSlug: string,
    limit: number = 3
): Promise<BlogPostMeta[]> {
    const currentPost = await getBlogPost(currentPostSlug);
    if (!currentPost) return [];

    const {posts} = await getBlogPosts();

    // Filter out current post and sort by tag matches
    const relatedPosts = posts
        .filter((post) => post.slug !== currentPostSlug)
        .map((post) => {
            const commonTags = currentPost.tags.filter((tag) =>
                post.tags.includes(tag)
            );
            return {...post, commonTagsCount: commonTags.length};
        })
        .sort((a, b) => b.commonTagsCount - a.commonTagsCount)
        .slice(0, limit);

    return relatedPosts;
}
