"use client";

import React, { useState } from "react";

import Link from "next/link";
import BackToTop from "@/components/common/BackToTop";

interface DocLayoutProps {
  children: React.ReactNode;
}

export default function DocLayout({ children }: DocLayoutProps) {
  const [showZaloQR, setShowZaloQR] = useState(false);
  const [showBankInfo, setShowBankInfo] = useState(false);

  return (
    <div className="min-h-screen bg-bg-main text-text-main flex justify-center">
      <main className="w-full max-w-5xl p-4 md:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-sm p-5 md:p-8 min-h-full">
          <header className="mb-10 pb-6 border-b border-gray-100 flex flex-col items-center text-center">
            <Link href="/" className="inline-block group">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary transition-colors group-hover:text-accent">
                Chuyện Nghề Chuyện Ngành
              </h1>
            </Link>
            <p className="mt-3 text-gray-500 font-medium">Chia sẻ kiến thức, kỹ năng và những câu chuyện thực tế về nghề nghiệp</p>
          </header>

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
                <button 
                  onClick={() => setShowBankInfo(!showBankInfo)}
                  className="font-semibold text-accent mb-2 hover:underline focus:outline-none transition-colors"
                >
                  Nếu bạn thấy nội dung có ích, hãy mời tôi một ly cà phê nhé! ☕
                </button>
                
                {showBankInfo && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col items-center mt-2">
                    <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded mb-3 overflow-hidden">
                      <img src="/d-blog/images/qr-code-tech.jpg" alt="Mã QR Techcombank" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>Ngân hàng Techcombank</p>
                      <p className="font-bold">1111397777</p>
                      <p className="font-medium uppercase">Vo Tan Dat</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </footer>
        </div>
      </main>

      <BackToTop />
    </div>
  );
}
