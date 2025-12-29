"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { projectsData } from "@/data/projects";

/* const projects = [
  { id: 0, title: "Chiffon Cake", image: "/cake.jpg", desc: "甜點與程式碼的交織。", text: "test only" },
  { id: 1, title: "Taiwan Coffee", image: "/coffee.jpg", desc: "品味生活中的美好時刻。" },
  { id: 2, title: "Mountain View", image: "/mountain.jpg", desc: "登高望遠，開闊視野。" },
  { id: 3, title: "Coding Life", image: "/mountain2.jpg", desc: "專注於每個像素的細節。" },
]; */

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const itemsRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); 

  const projects = projectsData;

  const handleNavigate = useCallback((direction: "prev" | "next") => {
    const length = projects.length;
    if (direction === "next") {
      setActiveIndex((prev) => (prev + 1) % length);
    } else {
      setActiveIndex((prev) => (prev - 1 + length) % length);
    }
    setIsDetailOpen(false);
  },[projects.length]); //依賴 projects.length


  // 🔥 [修正後] 最穩定的置中公式
  // 這個公式是：讓「卡片的中心點」去對齊「容器的中心點」
  const scrollToActive = (index: number) => {
    const container = containerRef.current;
    const node = itemsRef.current?.get(index);

    if (container && node) {
      // offsetLeft: 元素距離容器最左邊的距離 (已經包含了 padding 50vw)
      // container.clientWidth: 容器可視範圍的寬度
      // node.offsetWidth: 卡片目前的寬度
      
      const scrollLeft =
        node.offsetLeft - container.clientWidth / 2 + node.offsetWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  // 1️⃣ 第一階段：一點擊立刻捲動 (視覺反應快)
  useEffect(() => {
    scrollToActive(activeIndex);   
    // Cleanup
    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex]);

   //新增鍵盤監聽
     useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        //只有當Detail Modal 沒打開時時才導航
        if (isDetailOpen) return;    

        if (e.key === "ArrowLeft") {
          e.preventDefault()
          handleNavigate("prev");
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNavigate("next");
        }
      };
      // 1.掛載監聽器
      window.addEventListener("keydown", handleKeyDown);

      //2.清除監聽器 (Cleanup Function)
      // 元件Unmount或 handleNavigate 改變時，要先把舊的監聽器移除
      // 未移除會造成記憶體洩漏(Memory Leak)，且連續觸發
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },[handleNavigate, isDetailOpen]) 
    

  return (
    <section 
      id="Projects" 
      className="py-24 bg-morandi-bg relative overflow-hidden outline-none"      
      tabIndex={0}      
    >
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-serif font-bold text-morandi-primary">
            Visual Journal
          </h2>
          {/* <p className="text-morandi-secondary mt-2">Manual Carousel Mode</p> */}
           {/* UX調整，顯示目前圖片進度，讓使用者清楚剩餘多少圖片量 */}
          <div className="flex items-center gap-4 mt-2">
            <p className="text-morandi-secondary">Collection 2024</p>
            <div className="h-[1px] w-12 bg-morandi-secondary/50"></div>
            <p className="font-mono text-morandi-primary font-bold">
                {String(activeIndex + 1).padStart(2, "0")} / {projects.length}
                {/* 字串格式化 (String Formatting),未達 2字元 的數字前面補"0" */}
            </p>
          </div>
        </div>
       

        <div className="flex gap-4">
          <button
            onClick={() => handleNavigate("prev")}           
            className="p-3 rounded-full border border-morandi-primary text-morandi-primary hover:bg-morandi-primary hover:text-white transition-colors"
            aria-label="Previous Project"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => handleNavigate("next")}            
            className="p-3 rounded-full border border-morandi-primary text-morandi-primary hover:bg-morandi-primary hover:text-white transition-colors"
             aria-label="Next Project"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto px-[50vw] items-center no-scrollbar h-[400px] md:h-[600px] relative"
      >
        {projects.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={item.id}
              ref={(node) => {
                if (node) itemsRef.current?.set(index, node);
                else itemsRef.current?.delete(index);
              }}
              onClick={() => {
                if (index === activeIndex) {
                  setIsDetailOpen(!isDetailOpen);
                } else {
                  setActiveIndex(index);
                  setIsDetailOpen(false);
                }
              }}
              layout
              // 這裡只負責物理位置變化的動畫，時間設為 0.4s
              transition={{ duration: 0.4, ease: "circOut" }}
              
              // 2️⃣ 第二階段：動畫完全結束後的校正 (修正微小誤差)
              onLayoutAnimationComplete={() => {
                if (isActive) {
                  // 等 50ms 讓瀏覽器喘口氣，確保寬度完全定型
                  timeoutRef.current = setTimeout(() => {
                      scrollToActive(index);
                  }, 50);
                }
              }}

              /* 
                面試官問你：「為什麼你的輪播不會歪掉？遇到動態寬度變化怎麼處理？」

                你可以這樣回答：

                「我發現 CSS Transition 和 JS Animation (Framer Motion) 如果同時控制 width，會造成數值衝突，導致位置計算錯誤。

                所以我採取了兩個策略：

                職責分離：把尺寸變化完全交給 Framer Motion (layout prop)，移除 CSS 的 transition-all，確保瀏覽器不會有兩套邏輯在打架。

                雙重校正：點擊時先做一次捲動維持視覺流暢度，等動畫事件結束 (onLayoutAnimationComplete) 確定 DOM 穩定後，再做一次精準的座標校正。」
              
              */
              
              // 🔥 [關鍵修正 CSS]
              // 1. 移除了 'transition-all' 和 'duration-500' (這是造成算不準的元兇！)
              // 2. 只保留 'transition-colors' 給 hover 效果用
              // 3. 移除了 snap 相關屬性
              className={`
                relative flex-shrink-0 cursor-pointer rounded-3xl overflow-hidden group
                transition-colors duration-300
                ${
                  isActive
                    ? "w-[300px] h-[400px] md:w-[500px] md:h-[600px] z-10 shadow-2xl"
                    : "w-[200px] h-[300px] md:w-[300px] md:h-[400px] opacity-60 grayscale"
                }  
              `}
            >
              {/* [效能優化] 
                  Next.js Image 預設就是 lazy loading。
                  但為了極致效能，我們可以手動確保只有"正在看"的那張被優先載入。
                  其他的就讓它們慢慢載。 */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                priority = {index >= activeIndex -1 && index <= activeIndex + 1}
                //預載入視窗 (Sliding Window Preloading) 目前張數的前後都會預先下載
                sizes= "(max-width: 768px) 300px, 500px" //告訴瀏覽器要下載多大的圖
              />

              {!isDetailOpen && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              )}

              <AnimatePresence>
                {isActive && isDetailOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-end p-8"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDetailOpen(false);
                      }}
                      className="absolute top-4 right-4 text-white bg-white/20 p-2 rounded-full"
                      aria-label="Close button"
                    >
                      <X size={20} />
                    </button>
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-3xl text-white font-serif font-bold"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-gray-200 mt-2"
                    >
                      {item.text}
                    </motion.p>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-gray-200 mt-2"
                    >
                      {item.desc}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}