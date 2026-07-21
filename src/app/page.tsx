import React from "react";
import { Calendar, ChevronRight, Tag } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  const categories = posts.reduce((acc, post) => {
    const category = post.category || 'Khác';
    if (!acc[category]) acc[category] = [];
    acc[category].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  return (
    <article className="space-y-16 animate-in fade-in duration-500">
      {Object.entries(categories).map(([category, catPosts]) => (
        <section key={category} className="space-y-6">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-3">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h2 className="text-2xl font-bold text-text-main">{category}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {catPosts.map((post) => (
              <Link href={`/posts/${post.slug}`} key={post.slug} className="block group flex flex-col h-full">
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow hover:border-primary/30 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {post.summary && (
                    <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3 flex-1">
                      {post.summary}
                    </p>
                  )}
                  {!post.summary && <div className="flex-1"></div>}

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div className="flex gap-2 flex-wrap">
                      {post.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                      {post.tags && post.tags.length > 2 && (
                        <span className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <span className="text-accent text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform whitespace-nowrap">
                      Đọc tiếp <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          Chưa có bài viết nào được đăng tải.
        </div>
      )}
    </article>
  );
}
