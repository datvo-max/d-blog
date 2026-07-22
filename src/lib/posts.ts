import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  title: string;
  date: string;
  category?: string;
  tags?: string[];
  summary?: string;
  slug: string;
  image?: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

function extractFirstImage(content: string): string | undefined {
  // Match markdown image ![alt](url)
  const markdownImageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  if (markdownImageMatch && markdownImageMatch[1]) {
    return markdownImageMatch[1].trim();
  }

  // Match HTML <img> tag src
  const htmlImageMatch = content.match(/<img\s+[^>]*src=["']([^"']+)["']/i);
  if (htmlImageMatch && htmlImageMatch[1]) {
    return htmlImageMatch[1].trim();
  }

  return undefined;
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const firstImage = extractFirstImage(content);

    return {
      meta: {
        ...data,
        image: data.image || firstImage || "/images/logo-bg.jpg",
        slug: realSlug,
      } as PostMeta,
      content,
    };
  } catch (e) {
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .filter((slug) => slug.endsWith(".md"))
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .map((post) => post.meta)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
