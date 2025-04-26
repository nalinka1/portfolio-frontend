export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function getUniqueTags(posts: any[]): string[] {
    const tags = posts.flatMap(post => post.tags || []);
    return Array.from(new Set(tags));
}
