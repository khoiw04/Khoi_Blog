import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
    const posts = (await getCollection('blog')).sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    )
    .filter(post => post.id.startsWith(`vi/`));
    return rss({
        title: `${SITE_TITLE} (Tiếng Việt)`,
        description: `${SITE_DESCRIPTION} - Tiếng Việt`,
        site: context.site,
        items: posts.map((post) => ({
            ...post.data,
            link: `vi/blog/${post.id}/`,
        })),
    });
}