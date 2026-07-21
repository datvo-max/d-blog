import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import DocLayout from "@/components/layout/DocLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chuyện Nghề Chuyện Ngành",
  description: "Blog cá nhân chia sẻ kiến thức, kỹ năng và những câu chuyện thực tế về nghề nghiệp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-KV3PYXQ2M1";

  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <DocLayout>{children}</DocLayout>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}

