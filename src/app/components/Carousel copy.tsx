"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const projects = [
  { id: 0, title: "Chiffon Cake", image: "/cake.jpg", desc: "甜點與程式碼的交織。" },
  { id: 1, title: "Taiwan Coffee", image: "/coffee.jpg", desc: "品味生活中的美好時刻。" },
  { id: 2, title: "Mountain View", image: "/mountain.jpg", desc: "登高望遠，開闊視野。" },
  { id: 3, title: "Coding Life", image: "/mountain2.jpg", desc: "專注於每個像素的細節。" },
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Map 依然保留，這寫法很好
  const itemsRef = useRef<Map<number, HTMLDivElement>>(new Map());
  
  // 這裡不需要 ref container 了，因為我們直接操作 item
  // const containerRef = useRef<HTMLDivElement>(null); 

  const handleNavigate = (direction: "prev" | "next") => {
    const length = projects.length;
    if (direction === "next") {
      setActiveIndex((prev) => (prev + 1) % length);
    } else {
      setActiveIndex((prev) => (prev - 1 + length) % length);
    }
    // 切換圖片時，順便關閉詳情，體驗較好
    setIsDetailOpen(false);
  };

  // 需要先拿回 containerRef (記得在 JSX 的 div 補上 ref={containerRef})
  const containerRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const container = containerRef.current;
    const node = itemsRef.current?.get(activeIndex);

    if (container && node) {
      // 封裝一個計算並捲動的函式
      const scrollToCenter = () => {
        // 1. 算出卡片的中心點座標 (距離左邊界的距離 + 卡片寬度的一半)
        const nodeCenter = node.offsetLeft + node.offsetWidth / 2;
        
        // 2. 算出容器的中心點座標
        const containerCenter = container.clientWidth / 2;
        
        // 3. 算出要捲動的距離 (卡片中心 - 容器中心)
        const scrollLeft = nodeCenter - containerCenter;

        // 執行捲動
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth", // 平滑滾動
        });
      };

      // 第一次：立刻執行 (讓使用者覺得反應很快)
      scrollToCenter();

      // 第二次：等 500ms 動畫跑完後，再微調一次 (這是精準定位的關鍵！)
      // 因為 layout 動畫設定 duration: 0.5 (500ms)
      const timeoutId = setTimeout(() => {
        scrollToCenter();
      }, 505); // 多加 5ms 確保動畫完全結束

      return () => clearTimeout(timeoutId);
    }
  }, [activeIndex]);

  return (
    <section id="Projects" className="py-24 bg-morandi-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-serif font-bold text-morandi-primary">Visual Journal</h2>
          <p className="text-morandi-secondary mt-2">Manual Carousel Mode</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleNavigate("prev")}
            className="p-3 rounded-full border border-morandi-primary text-morandi-primary hover:bg-morandi-primary hover:text-white transition-colors"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => handleNavigate("next")}
            className="p-3 rounded-full border border-morandi-primary text-morandi-primary hover:bg-morandi-primary hover:text-white transition-colors"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* 🔥 [CSS 修正] 
         1. 移除了 snap-x, snap-mandatory (解決彈跳主因)
         2. 保留 overflow-x-auto, no-scrollbar
         3. 保留 px-[50vw] 的 hack (為了置中頭尾)
      */}
      <div 
      ref={containerRef}
      className="flex gap-6 overflow-x-auto px-[50vw] items-center no-scrollbar h-[400px] md:h-[600px] relative">
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
              transition={{ duration: 0.5, ease: "circOut" }}
              // 🔥 [CSS 修正] 移除了 snap-center
              className={`
                snap-center
                relative flex-shrink-0 cursor-pointer transition-all duration-500 rounded-3xl overflow-hidden group
                ${isActive
                    ? "w-[300px] h-[400px] md:w-[500px] md:h-[600px] z-10 shadow-2xl"
                    : "w-[200px] h-[300px] md:w-[300px] md:h-[400px] opacity-60 grayscale"
                }  
              `}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />

              {!isDetailOpen && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              )}

              <AnimatePresence>
                {isActive && isDetailOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-end p-8"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDetailOpen(false);
                      }}
                      className="absolute top-4 right-4 text-white bg-white/20 p-2 rounded-full"
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