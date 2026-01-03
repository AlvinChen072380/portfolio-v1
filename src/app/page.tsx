"use client";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";

// 引入所有元件 (請確保檔案都存在 src/components 資料夾中)
import Header from "./components/Header";
import IntroOverlay from "./components/IntroOverlay";
import Hero from "./components/Hero";
import Carousel from "./components/Carousel";

import Footer from "./components/Footer";
import PhilosophySection from "./components/PhilosophySection";
import Project from "./components/Contact";

export default function Home() {
  // [狀態] 控制開場動畫是否顯示
  const [showIntro, setShowIntro] = useState(true);
  
  // [Ref] 建立Hook，用來控制捲動
  // 因為我們在 page.tsx 無法直接控制 Hero 內部的 DOM，
  // 所以我們在 Hero 外面包一層 <div> 並把 ref 綁在那個 div 上
  const heroRef = useRef<HTMLDivElement>(null);

  // [事件] 當 Intro 動畫結束時被呼叫
  const handleIntroComplete = () => {
    setShowIntro(false); // 關閉動畫
    
    // 延遲 0.1秒，等畫面渲染好後，平滑捲動到 Hero
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    // 外層容器：設定背景色與最小高度
    <main className="min-h-screen bg-morandi-bg text-morandi-primary overflow-x-hidden">
      
      {/* 1. 開場動畫 (AnimatePresence 讓它在消失時也能播動畫) */}
      <AnimatePresence>
        {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* 2. 導覽列 (動畫結束後才顯示) */}
      {!showIntro && <Header />}

      {/* 3. 主要內容 (使用 opacity 做一個簡單的淡入效果) */}
      <div 
        className={`transition-opacity duration-1000 ${showIntro ? "opacity-0" : "opacity-100"}`}
      >
        
        {/* Hero 區塊：外面包一層 div 綁定 ref，讓 Intro 結束可以滑到這裡 */}
        <div ref={heroRef}>
           <Hero /> 
        </div>

        {/* 文字區塊 */}
        <PhilosophySection />

        {/* 輪播區塊 */}
        <Carousel />       
        
        {/* 聯絡區塊 */}
        <Project />
        
        {/* 頁尾 */}
        <Footer />
        
      </div>
    </main>
  );
}