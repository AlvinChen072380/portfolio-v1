"use client"

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import InteractiveText from "./InteractiveText";
import { PHILOSOPHY_ITEMS } from "@/data/philosophy";

const openSpring = { type: "spring" as const, stiffness: 200, damping: 30 };

export default function PhilosophySection() {

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedItem = PHILOSOPHY_ITEMS.find((item) => item.id === selectedId);

  //選單打開時，靜止背景捲動 ??useScrollLock Custom Hook是否使用??
    useEffect(() => {
      if (selectedId) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "unset"
      }
      return () => {
        document.body.style.overflow = "unset"
      }
    }, [selectedId])

  return (
    <section className="py-10 px-6 bg-morandi-bg">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-morandi-primary text-center mb-16">
          My Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PHILOSOPHY_ITEMS.map((item) => (
            <InteractiveText 
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              onClick={() => setSelectedId(item.id)} //點擊時告訴父層 選中此ID
            />
          ))}          
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedItem && (
          <>
            {/* 黑色遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            {/* 展開的大卡 */}
            <div
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 md:p-0"                         
            > {/* pointer-events-none 是為了讓點擊背景遮罩能生效，但卡片本身要 pointer-events-auto */}  
              <motion.div
                layoutId={selectedId} //layoutId與未展開的小卡進行連結
                className="w-full md:w-[90vw] max-w-2xl max-h-[85vh] overflow-y-auto bg-morandi-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative custom-scrollbar"
                transition={openSpring}
              >
                {/* 關閉按鈕 */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setSelectedId(null)}
                  className="sticky top-4 float-right right-4 mr-4 bt-4 text-morandi-secondary hover:text-morandi-primary p-2 z-10 bg-morandi-white/50 backdrop-blur-sm rounded-full"
                >
                  <X size={24} />
                </motion.button>

                {/* 內容區域 */}
                <motion.div
                  layoutId={`content-${selectedId}`}
                  className="p-6 md:p-10 text-center md:text-left pt-12 md:pt-10"
                >
                  <motion.h3
                    layoutId={`title-${selectedId}`}
                    className="font-serif font-bold text-morandi-primary text-3xl mb-6 text-center"
                  >
                    {selectedItem.title}
                  </motion.h3>

                  {/* 詳細文字 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }} 
                    exit={{ opacity: 0, y: 0, transition: { duration: 0.1, delay: 0 } }}                   
                    className="text-morandi-secondary leading-relaxed space-y-4"
                  >
                    {selectedItem.content}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}