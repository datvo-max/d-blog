import React from "react";
import { BookOpen, Calendar, ChevronRight, Tag } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <article className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-text-main mb-2">Bài viết mới nhất</h1>
        <p className="text-gray-500">Chia sẻ kiến thức, kỹ năng và những câu chuyện thực tế về nghề nghiệp.</p>
      </header>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug} className="block group">
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow hover:border-primary/30">
              <h2 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors mb-3">
                {post.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>{post.date}</span>
                </div>
                {post.category && (
                  <div className="flex items-center text-primary font-medium">
                    <BookOpen className="w-4 h-4 mr-1.5" />
                    <span>{post.category}</span>
                  </div>
                )}
              </div>

              {post.summary && (
                <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                  {post.summary}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-accent text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                  Đọc tiếp <ChevronRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            Chưa có bài viết nào được đăng tải.
          </div>
        )}
      </div>
    </article>
  );
}
