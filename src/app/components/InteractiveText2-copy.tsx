"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

//定義內容
interface InteractiveProps {
  title: string;
  subtitle: string; //沒點開之前顯示的短內容
  content: React.ReactNode; //點開後的詳細內文
}



// [修正 1] 定義動畫參數 (Magic Numbers)
// 這種曲線 (Bezier Curve) 會讓動畫有「快 -> 慢」的煞車感，非常高級
const openSpring = { type: "spring" as const, stiffness: 200, damping: 30 };
const closeSpring = { type: "spring" as const, stiffness: 300, damping: 35 };
/* Spring (彈性) vs Ease (線性)： 原本的動畫可能是線性的，感覺像機器人。改成 type: "spring" 後，它會模擬真實世界的物理慣性（打開時會有一點點衝力，關閉時會吸回去） */

export default function InteractiveText({ title, subtitle, content }: InteractiveProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 佔位容器 (保持不變) */}
      <div className="relative w-full h-[200px] z-10">
        
        {/* 背景遮罩 (加上 duration 讓它淡入淡出更柔和) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsOpen(false)}

              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
          )}
        </AnimatePresence>

        {/* 卡片本體 */}
        <motion.div
          layout // 啟動自動佈局動畫
          // [修正 2] 套用我們定義的高級動畫曲線
          transition={isOpen ? openSpring : closeSpring}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            absolute top-0 left-0 right-0 mx-auto
            bg-morandi-white rounded-3xl shadow-xl overflow-hidden cursor-pointer
            ${
              isOpen 
              ? "fixed top-[10%] left-0 right-0 w-[90vw] max-w-2xl h-auto z-50 m-auto"
              : "z-0 inset-0 hover:bg-white"}
          `}
        >
          
          {/* 關閉按鈕 */}
          {isOpen && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }} // 等卡片變大後再出現
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="absolute top-4 right-4 text-morandi-secondary hover:text-morandi-primary p-2"
            >
              <X size={24} />
            </motion.button>
          )}

          {/* 標題區域 */}
          {/* h-full: 確保收合時垂直置中 */}
          <motion.div 
            layout="position" // [關鍵] 讓標題文字位置改變時也套用平滑動畫/* 明確告訴 Framer Motion，標題 (motion.h3) 的位置改變也要納入計算，這樣它從中間跑到上面的過程就不會是「瞬移」，而是「滑動」。 */
            className="text-center h-full flex flex-col  justify-center"
          >
            <motion.h3 
              layout="position"
              className={`font-serif font-bold text-morandi-primary ${isOpen ? "text-3xl my-6" : "text-xl m-0"}`}
            >
              {isOpen ? "My Philosophy" : "My Philosophy (Click to Read)"}
            </motion.h3>

            {!isOpen && (
            <motion.p 
                layout="position" className="text-sm text-morandi-secondary mt-2">
                  {subtitle}
            </motion.p>
            )}
          </motion.div>

          {/* 詳細內容 */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                // [修正 3] 進場動畫微調
                // y: 20 -> 0 (由下往上浮現)
                /* 把 transition 的設定拆開寫在 animate (進場) 與 exit (離場) 裡面。 */
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.6 } }}
                exit={{ opacity: 0, y: 0, transition: { duration: 0.1, delay: 0 } }} // 離開時往上飄一點
                              
                className="px-10 pb-10 text-morandi-secondary leading-relaxed space-y-4 text-center mx-10 md:text-left"
              >
                {content}
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </>
  );
}