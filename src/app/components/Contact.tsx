"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { easeInOut } from "framer-motion";

export default function Project() { 
  

  //定義動畫內容 (Variants)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeInOut },
    },
  };

  

  return (
    <section id="Projects" className="py-32 h-[79dvh] md:py-36 md:h-[82dvh] bg-morandi-primary text-morandi-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
       
        {/* 外層動畫容器 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
        {/* 標題區域 */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-serif font-bold mb-6"
        >
          Let&apos;s Work Together.
        </motion.h2>
        {/* 內文 */}
        <motion.p
          variants={itemVariants}
          className="text-morandi-accent text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          我正在尋找前端工程師的職位。
          <br className="hidden md:block" />
          如果你喜歡我的作品，或是有任何合作機會，歡迎隨時與我聯繫。
        </motion.p>

        {/* 互動區域，複製mail */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row flex-wrap gap-6 justify-center items-center"
        >    
          {/* 1.mail複製按鈕 */}
          {/* <button
            onClick={handleCopy}
            className="
              group relative px-8 py-4 md:w-auto
              bg-morandi-bg text-morandi-primary 
              rounded-full font-bold text-lg 
              hover:bg-morandi-white hover:scale-105 active:scale-95
              transition-all duration-300 shadow-lg
            "
          >
              <span className="flex items-center justify-center gap-2">
                  {copied ? "Email Copied!" : email}
              </span>

              <span className="
                absolute -top-10 left-1/2 -translate-x-1/2 
                bg-zinc-800 text-white text-xs px-3 py-1.5 rounded-md 
                opacity-0 group-hover:opacity-100 transition-opacity 
                whitespace-nowrap pointer-events-none hidden                 
              "
              >
                Click to copy
              </span>
          </button>
           
          {/* Github 連結 */}
          <a 
             href="https://github.com/AlvinChen072380"
             target="_blank"
             rel="noopener noreferrer"
             className="              
              relative overflow-hidden 
              group 
              px-8 py-4 w-full md:w-auto
              border border-morandi-accent 
              rounded-full font-bold text-lg              
              
              text-morandi-accent 
              hover:text-morandi-white              
              
              flex items-center justify-center gap-2               
              
              hover:scale-105 active:scale-95 transition-all duration-300
            "
          >          
            <span className="
              absolute inset-0 
              bg-[url('/image/GitHub-button-bg.png')] 
              bg-center bg-no-repeat
              bg-[length:120%]               
              
              bg-black/40 bg-blend-overlay              
              
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-500 ease-out              
             
              -z-10
            "></span>
           
            <span className="relative z-10 flex items-center gap-2">
              My GitHub
            </span>
          </a>    
          <a 
             href="https://hi-refrigerator.vercel.app/"
             target="_blank"
             rel="noopener noreferrer"
             className="
              /* --- 1. 基礎按鈕結構 --- */
              relative overflow-hidden /* 讓偽元素不會跑出圓角外 */
              group /* 為了讓偽元素能吃到父層的 hover */
              px-8 py-4 w-full md:w-auto
              border border-morandi-accent 
              rounded-full font-bold text-lg 
              
              /* --- 2. 文字與邊框顏色過渡 --- */
              text-morandi-accent 
              hover:text-morandi-white 
              
              
              /* --- 3. Flex 排版 --- */
              flex items-center justify-center gap-2 
              
              /* --- 4. 按鈕本體互動 (縮放) --- */
              hover:scale-105 active:scale-95 transition-all duration-300
            "
          >
            {/* --- 5. 背景圖片層 (透過 before 偽元素實作) --- */}
            <span className="
              absolute inset-0 
              bg-[url('/image/portfolio-frige-bg.png')] 
              bg-center bg-no-repeat
              bg-[length:120%] 
              
              /* 疊加一層黑色遮罩效果 */
              bg-black/40 bg-blend-overlay
              
              /* 動畫核心：預設透明，Hover 變不透明 */
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-500 ease-out
              
              /* 確保背景在文字後面 */
              -z-10
            "></span>

            {/* --- 6. 按鈕文字 (確保層級在背景之上) --- */}
            <span className="relative z-10 flex items-center gap-2">
              Hi ! refrigerator
            </span>
          </a>        
          <a 
             href="https://github.com/AlvinChen072380/hi-refrigerator"
             target="_blank"
             rel="noopener noreferrer"
             className="              
              relative overflow-hidden 
              group 
              px-8 py-4 w-full md:w-auto
              border border-morandi-accent 
              rounded-full font-bold text-lg              
              
              text-morandi-accent 
              hover:text-morandi-white              
              
              flex items-center justify-center gap-2               
              
              hover:scale-105 active:scale-95 transition-all duration-300
            "
          >          
            <span className="
              absolute inset-0 
              bg-[url('/image/FanArt-button-bg.png')] 
              bg-center bg-no-repeat
              bg-[length:120%]               
              
              bg-black/40 bg-blend-overlay              
              
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-500 ease-out              
             
              -z-10
            "></span>
           
            <span className="relative z-10 flex items-center gap-2">
              FanArt Shop
            </span>
          </a> 
         {/*  <a 
             href="https://github.com/AlvinChen072380/hi-refrigerator"
             target="_blank"
             rel="noopener noreferrer"
             className="              
              relative overflow-hidden 
              group 
              px-8 py-4 w-full md:w-auto
              border border-morandi-accent 
              rounded-full font-bold text-lg              
              
              text-morandi-accent 
              hover:text-morandi-white              
              
              flex items-center justify-center gap-2               
              
              hover:scale-105 active:scale-95 transition-all duration-300
            "
          >          
            <span className="
              absolute inset-0               
              bg-center bg-no-repeat
              bg-[length:120%]               
              
              bg-black/40 bg-blend-overlay              
              
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-500 ease-out              
             
              -z-10
            "></span>
           
            <span className="relative z-10 flex items-center gap-2">
              Read Me
            </span>
          </a>                  */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}