"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "Lebensmittel2010@gmail.com";

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
        {/* 標題區域 */}
        <motion.h2
          initial={{ opacity: 0, y:20 }}
          whileInView={{ opacity: 1, y:0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif font-bold mb-6"
        >
          Let&apos;s Work Together.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-morandi-accent text-lg mb-12 max-w-2xl mx-auto"
        >
          我正在尋找前端工程師的職位。<br/>如果你喜歡我的作品，
          或是有任何合作機會，歡迎隨時與我聯繫。
        </motion.p>

        {/* 互動區域，複製mail */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">

          {/* 1.mail複製按鈕 */}
          <button
            onClick={handleCopy}
            className="
              group relative px-8 py-4 bg-morandi-bg text-morandi-primary rounded-full font-bold text-lg hover:bg-morandi-white transition-all duration-300 w-full md:w-auto"
          >
              <span className="flex items-center justify-center gap-2">
                  {copied ? "Email Copied!" : email}
              </span>

          {/* Tooltip電腦版hover顯示 */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                Click to copy
              </span>
          </button>
          
          {/* 2. LinkedIn / Github 連結 */}
          <a href="https://github.com/AlvinChen072380/hi-refrigerator"
             target="_blank"
             rel="noopener noreferrer"
             className="px-8 py-4 border border-morandi-accent text-morandi-accent rounded-full font-bold text-lg hover:bg-morandi-accent hover:text-morandi-primary transition-all duration-300 w-full md:w-auto"
          >
            Github
          </a>

        </div>

      </div>
    </section>
  )
}