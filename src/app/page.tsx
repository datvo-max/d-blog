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
            {catPosts.map((post) => {
              const imageSrc = post.image
                ? post.image.startsWith('/')
                  ? `/d-blog${post.image}`
                  : post.image
                : '/d-blog/images/logo-bg.jpg';

              return (
                <Link href={`/posts/${post.slug}`} key={post.slug} className="block group flex flex-col h-full">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/40 flex flex-col h-full overflow-hidden">
                    {/* Thẻ Ảnh / Header Thẻ Bài Viết */}
                    <div className="relative w-full h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary via-[#1a4a4d] to-[#153a3c] p-6 flex flex-col justify-between group-hover:scale-105 transition-transform duration-500 ease-out">
                          <div className="flex justify-between items-start">
                            <span className="bg-white/15 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium border border-white/10">
                              {post.category || 'Pháp lý'}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                              <Tag className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-white font-bold text-base line-clamp-2 drop-shadow-sm">
                              {post.title}
                            </h4>
                          </div>
                        </div>
                      )}
                      
                      {imageSrc && post.category && (
                        <span className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md font-medium shadow-sm">
                          {post.category}
                        </span>
                      )}
                    </div>

                    {/* Nội dung bài viết trong thẻ */}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1.5 text-primary" />
                            <span>{post.date}</span>
                          </div>
                        </div>

                        {post.summary && (
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                            {post.summary}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                        <div className="flex gap-1.5 flex-wrap">
                          {post.tags?.slice(0, 2).map((tag) => (
                            <span key={tag} className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                              <Tag className="w-3 h-3 mr-1 text-gray-400" />
                              {tag}
                            </span>
                          ))}
                          {post.tags && post.tags.length > 2 && (
                            <span className="flex items-center text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                        <span className="text-accent text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform whitespace-nowrap">
                          Đọc tiếp <ChevronRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
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
