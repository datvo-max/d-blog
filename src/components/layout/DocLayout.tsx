"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface DocLayoutProps {
  children: React.ReactNode;
}

export default function DocLayout({ children }: DocLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-main text-text-main flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-primary text-white flex-shrink-0">
        <h2 className="text-lg font-bold">Chuyện Nghề Chuyện Ngành</h2>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-1 hover:bg-white/10 rounded"
          aria-label="Mở menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Overlay cho Mobile Sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Trái */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white overflow-y-auto transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold">Chuyện Nghề Chuyện Ngành</h2>
          <button 
            className="md:hidden p-1 hover:bg-white/10 rounded"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/" onClick={() => setIsSidebarOpen(false)} className="block p-2 rounded hover:bg-white/10 transition-colors">Trang chủ</Link>
          <a href="#" className="block p-2 rounded hover:bg-white/10 transition-colors">Thủ tục Hành chính</a>
          <a href="#" className="block p-2 rounded hover:bg-white/10 transition-colors">Văn bản Pháp quy</a>
        </nav>
      </aside>

      {/* Nội dung chính (Main Content) */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-5 md:p-8 min-h-full">
          {children}
        </div>
      </main>

    </div>
  );
}
