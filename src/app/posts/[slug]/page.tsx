import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import { Calendar, Folder, Tag, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Bài viết không tồn tại",
    };
  }

  return {
    title: `${post.meta.title} | Chuyện Nghề Chuyện Ngành`,
    description: post.meta.summary || post.meta.title,
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const headings = content.match(/^(#{2,3})\s+(.+)$/gm);

  if (!headings) return [];

  return headings.map((heading) => {
    const level = heading.startsWith("###") ? 3 : 2;
    const text = heading.replace(/^(#{2,3})\s+/, "").trim();
    // Bỏ các ký tự đặc biệt (VD như markdown format trong heading) nếu cần thiết
    const cleanText = text.replace(/[*_~`]/g, "");
    return {
      id: slugger.slug(cleanText),
      text: cleanText,
      level,
    };
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return notFound();
  }

  const toc = extractToc(post.content);

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      <article className="flex-1 space-y-8 animate-in fade-in duration-500">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại trang chủ
        </Link>

        <header className="border-b border-gray-200 pb-6 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-text-main">{post.meta.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5 text-primary" />
              <span>{post.meta.date}</span>
            </div>
            {post.meta.category && (
              <div className="flex items-center">
                <Folder className="w-4 h-4 mr-1.5 text-primary" />
                <span>{post.meta.category}</span>
              </div>
            )}
            {post.meta.tags && post.meta.tags.length > 0 && (
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-1.5 text-accent" />
                <div className="flex gap-2">
                  {post.meta.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="prose prose-slate max-w-none 
            prose-headings:text-text-main prose-headings:font-semibold
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-strong:text-text-main
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-gray-700
            prose-li:text-gray-700
            prose-img:rounded-lg prose-img:border prose-img:border-gray-200 prose-img:shadow-sm">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={{
              img: ({ node, src, alt, ...props }) => {
                let imgSrc = src;
                if (imgSrc && imgSrc.startsWith('/')) {
                  imgSrc = `/d-blog${imgSrc}`;
                }
                return <img src={imgSrc} alt={alt} {...props} />;
              }
            }}
          >
            {post.content}
          </ReactMarkdown>

          <div className="mt-12 pt-6 border-t border-gray-200 text-right">
            <p className="text-sm font-medium text-text-main">
              ✍️ Tác giả: <span className="text-primary font-bold">Đạt Võ</span>
            </p>
          </div>
        </div>
      </article>

      {/* Mục lục động (TOC) - Hiển thị trên màn hình lớn */}
      {toc.length > 0 && (
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-6">
            <h3 className="font-semibold mb-4 text-text-main uppercase text-sm tracking-wider border-l-4 border-accent pl-3">
              Mục lục
            </h3>
            <ul className="space-y-2.5 text-sm border-l border-gray-200 ml-1 pl-4">
              {toc.map((item) => (
                <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                  <a
                    href={`#${item.id}`}
                    className="text-gray-600 hover:text-accent transition-colors line-clamp-2"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}
