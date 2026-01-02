import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  //1.基本設定
  title:{
    template: "%s | [Alvin] Portfolio", //子頁面標題套用此模板
    default: "[Alvin] Front-End Developer",
  },
  description: "Front-end developer portfolio. React, Next.js, Framer Motion.",
  //2.關鍵字
  keywords: ["Frontend", "React", "Next.js", "Portfolio", "Web Developer"],
  //3.作者資訊
  authors: [{ name: "[Alvin]", url: "https://portfolio-v1-dun-two.vercel.app/" }],
  //4.OG 社群分享用內容
  openGraph: {
    title: "[你的名字] - Front-End Developer",
    description: "查看我的互動式作品集，包含 Hybrid Carousel 與流暢的轉場動畫。",
    url: "https://portfolio-v1-dun-two.vercel.app/",
    siteName: "[Alvin] Portfolio",
    images: [
      {
        url: "og-image.jpg",
        width: 1200,
        height: 630,
        alt: "[Alvin] Portfolio cover",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  //5. Icons 瀏覽器分頁小圖示
  icons: {
    icon:"/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-morandi-bg`}
      >
        <Header />
        <main className="pt-20">
          {children}
        </main>
        
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};