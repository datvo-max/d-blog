"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface DocLayoutProps {
  children: React.ReactNode;
}

export default function DocLayout({ children }: DocLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showZaloQR, setShowZaloQR] = useState(false);

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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white overflow-y-auto transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
          <a href="#" className="block p-2 rounded hover:bg-white/10 transition-colors">Tiện ích VNeID</a>
          <a href="#" className="block p-2 rounded hover:bg-white/10 transition-colors">Luật cư trú</a>
        </nav>
      </aside>

      {/* Nội dung chính (Main Content) */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-5 md:p-8 min-h-full">
          {children}

          <footer className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-600">
            <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center md:items-start justify-between">
              <div className="flex-1 space-y-3">
                <p>
                  <strong className="text-text-main">Miễn trừ trách nhiệm:</strong> Các bài viết trên blog này mang tính chất chia sẻ kiến thức và kinh nghiệm thực tiễn. Nội dung có thể thay đổi tùy thuộc vào quy định pháp luật và chính sách từng thời điểm.
                </p>
                <p>
                  <strong className="text-text-main">Liên hệ & Góp ý:</strong> Nếu bạn có bất kỳ thắc mắc hay góp ý nào, vui lòng liên hệ qua Zalo:
                  <button
                    onClick={() => setShowZaloQR(!showZaloQR)}
                    className="text-primary font-bold ml-1 hover:underline focus:outline-none cursor-pointer"
                  >
                    0945.235.799
                  </button>
                  .
                </p>
                {showZaloQR && (
                  <div className="mt-3 p-2 bg-white rounded-lg border border-gray-200 shadow-sm inline-block animate-in fade-in slide-in-from-top-2 duration-200">
                    <img src="/d-blog/images/qr-zalo-799.jpg" alt="Zalo QR Code" className="w-32 h-32 object-contain" />
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 flex flex-col items-center p-4 bg-white rounded-lg border border-accent/20 shadow-sm max-w-[240px] text-center">
                <p className="font-semibold text-accent mb-3 leading-tight">Nếu bạn thấy nội dung có ích, hãy mời tôi một ly cà phê nhé! ☕</p>
                <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded mb-3 overflow-hidden">
                  <img src="/d-blog/images/qr-code-tech.jpg" alt="Mã QR Techcombank" className="w-full h-full object-contain" />
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>Ngân hàng Techcombank</p>
                  <p className="font-bold">1111397777</p>
                  <p className="font-medium uppercase">Vo Tan Dat</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>

    </div>
  );
}
