"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { projectsData } from "@/data/projects";

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const itemsRef = useRef<Map<number, HTMLDivElement>>(new Map()); //動態數量Ref的處理
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 🔒 鎖定機制
  const isLocked = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const projects = projectsData;

  // 🖱️ 獨立捲動函式
  // 新增參數 behavior: 允許強制指定是 "smooth" 還是 "auto" (瞬移)
  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const container = containerRef.current;
    const node = itemsRef.current?.get(index);

    if (container && node) {
      const isDesktop = window.innerWidth >= 768;
      const targetWidth = isDesktop ? 400 : window.innerWidth * 0.7; 
      const baseWidth = isDesktop ? 300 : window.innerWidth * 0.7; 
      const widthDiff = targetWidth - baseWidth;

      let scrollLeft =
        node.offsetLeft - container.clientWidth / 2 + targetWidth / 2;

      // 方向補償 (往右時扣除左邊縮水的距離)
      // 注意：如果是瞬移 (auto)，通常發生在 Loop 情況，不需要補償，或者補償邏輯不同
      // 但為了簡單起見，我們只在 smooth 模式下且非 Loop 的往右時補償
      // 這裡簡化邏輯：只要 activeIndex < index 就補償，除非跨度太大(代表是 Loop)
      
      // 判斷是否為 Loop (例如 0 -> 29 或 29 -> 0)
      // 如果 index 差值超過總長度的一半，視為 Loop
      /* const isLooping = Math.abs(index - activeIndex) > projects.length / 2;
 */
      if (index > activeIndex /* && !isLooping */) {
        scrollLeft -= widthDiff;
      }

      container.scrollTo({
        left: scrollLeft,
        behavior: behavior, // 使用傳入的參數
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]); // 需依賴 activeIndex 做方向判斷


  // 🔥 FIX 1: 初始載入置中
  useEffect(() => {
    const timer = setTimeout(() => {
      // 初始載入用瞬移 (auto)，避免使用者看到畫面滑動
      scrollToIndex(0, "auto");
    }, 100);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 只執行一次


  // 🎮 導航處理
  const handleNavigate = useCallback((index: number, useInstantScroll = false) => {
    isLocked.current = true;
    setActiveIndex(index);
    setIsDetailOpen(false);
    
    // 決定捲動模式：如果是 Loop 或是指定瞬移，就用 auto
    const behavior = useInstantScroll ? "auto" : "smooth";
    scrollToIndex(index, behavior);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // 如果是瞬移，鎖定時間可以短一點；如果是 smooth，要長一點
    // 這裡維持 500ms 是一個安全值
    timeoutRef.current = setTimeout(() => {
      isLocked.current = false;
    }, 500);
  }, [scrollToIndex]); 


  // 🔄 上一頁 / 下一頁 (包含 Loop 邏輯修正)
  const handleNextPrev = (direction: "prev" | "next") => {
    const length = projects.length;
    let newIndex = activeIndex;
    let useInstantScroll = false; // 是否使用瞬移

    if (direction === "next") {
      newIndex = (activeIndex + 1) % length;
      // 如果從 最後一張 跳到 第一張 -> 瞬移
      if (activeIndex === length - 1 && newIndex === 0) {
        useInstantScroll = true;
      }
    } else {
      newIndex = (activeIndex - 1 + length) % length;
      // 如果從 第一張 跳到 最後一張 -> 瞬移
      if (activeIndex === 0 && newIndex === length - 1) {
        useInstantScroll = true;
      }
    }
    handleNavigate(newIndex, useInstantScroll);
  };

  // 📱 捲動監聽
  const handleScroll = () => {
    if (isLocked.current) return;

    const container = containerRef.current;
    if (!container) return;

    const center = container.scrollLeft + container.clientWidth / 2;
    let minDistance = Infinity;
    let closestIndex = activeIndex;

    projects.forEach((_, index) => {
      const node = itemsRef.current?.get(index);
      if (node) {
        // 手機滑動時，寬度由 CSS 控制，直接算中心點即可
        const nodeCenter = node.offsetLeft + node.offsetWidth / 2;
        const distance = Math.abs(center - nodeCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
      
      // 🔥 FIX 2: 手機版移除 scrollToIndex
      // 手機版依賴 CSS snap-x 自動吸附。
      // 當 activeIndex 改變 -> 寬度變大 -> CSS Snap 會自動把變大後的元素維持在中心。
      // 這裡如果再呼叫 JS scroll，會跟 CSS 原生行為打架，造成彈跳。
      // 所以：這裡什麼都不用做！
    }
  };

  // ⌨️ 鍵盤監聽
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDetailOpen) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleNextPrev("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextPrev("next");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isDetailOpen]); 

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
          <div className="flex items-center gap-4 mt-2">
            <p className="text-morandi-secondary">Collection 2024 - Click More</p>
            <div className="h-[1px] w-12 bg-morandi-secondary/50"></div>
            <p className="font-mono text-morandi-primary font-bold">
              {String(activeIndex + 1).padStart(2, "0")} / {projects.length}
            </p>
          </div>
        </div>

        <div className="hidden md:flex gap-4">
          <button
            onClick={() => handleNextPrev("prev")}
            className="p-3 rounded-full border border-morandi-primary text-morandi-primary hover:bg-morandi-primary hover:text-white transition-colors"
            aria-label="Previous Project"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => handleNextPrev("next")}
            className="p-3 rounded-full border border-morandi-primary text-morandi-primary hover:bg-morandi-primary hover:text-white transition-colors"
            aria-label="Next Project"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll} 
        className="flex gap-6 overflow-x-auto px-[50vw] items-center no-scrollbar h-[60dvh] md:h-[600px] relative snap-x snap-mandatory md:snap-none scroll-smooth"
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
                  handleNavigate(index);
                }
              }}
              //layout
              //transition={{ duration: 0.6, ease: "circOut" }}
              className={`
                relative flex-shrink-0 cursor-pointer rounded-3xl overflow-hidden group
                transition-all duration-300 snap-center

                w-[70dvw] h-[50dvh]
                md:h-[500px]
                ${
                  isActive
                    ? "md:w-[400px] z-10 shadow-2xl scale-100 opacity-100 grayscale-0"
                    : "md:w-[300px] scale-90 opacity-50 grayscale"
                }  
              `}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                priority={index >= activeIndex - 1 && index <= activeIndex + 1}
                sizes="(max-width: 768px) 70vw, 500px"
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
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-end p-6 md:pr-14"
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
                      className="text-gray-200 mt-0"
                    >
                      {item.desc}
                    </motion.p>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-gray-200 mt-2"
                    >
                      {item.text}
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