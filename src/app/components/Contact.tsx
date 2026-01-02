"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { easeInOut } from "framer-motion";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "Lebensmittel2010@gmail.com";

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

  const handleCopy = () => {
    //瀏覽器原生的剪貼簿API
    navigator.clipboard.writeText(email);
    setCopied(true);
    //2秒後復原"Copied!"字樣
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <section id="Contact" className="py-24 bg-morandi-primary text-morandi-white">
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
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >    
          {/* 1.mail複製按鈕 */}
          <button
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

          {/* Tooltip電腦版hover顯示 */}
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
             href="https://github.com/AlvinChen072380/hi-refrigerator"
             target="_blank"
             rel="noopener noreferrer"
             className="
              px-8 py-4 w-full md:w-auto
              border border-morandi-accent text-morandi-accent 
              rounded-full font-bold text-lg 
              hover:bg-morandi-accent hover:text-morandi-primary hover:scale-105 active:scale-95 transition-all duration-300
              flex items-center justify-center gap-2 
            "
          >
            Github
          </a>        
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}