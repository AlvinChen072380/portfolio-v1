"use client"

import  Link  from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Header () {
  //定義Menu選單開關狀態:預設關閉 false
  const [isOpen, setIsOpen] =  useState(false);

  //選單打開時，靜止背景捲動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  //定義選單動畫的參數設定檔 (Variants)
  //加上型別註解 ": Variants" or use as const => "easeInOut" as const 唯讀且固定的
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-10px", //往上收起
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: {
      opacity: 1,
      y: 0, //從收起狀態回到展開原位
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }
  return (

    
    // <header> 標籤：語意化標籤，告訴搜尋引擎這是頁首
    // fixed: 固定在視窗上方，不會隨卷軸捲動而不見
    // top-0 w-full: 緊貼頂部，寬度佔滿 100%
    // z-50: 確保它疊在所有內容的最上面 (圖層順序) 50是很大的數值
    // bg-morandi-bg/80: 使用我們的米色背景，'/80' 代表 80% 透明度 (有霧面玻璃感)
    // backdrop-blur-md: 背景毛玻璃模糊效果，增添質感

    //1.外層:處理固定位置、背景顏色
    <header className="fixed top-0 w-full z-50 bg-morandi-bg/30 backdrop-blur-md transition-all duration-300 border border-morandi-primary/10">

      {/* 2.內層容器: 處以最大寬度、flex排版 
          max-w-7xl:限制內容最大寬度，避免在大螢幕上太分散
          mx-auto: 水平置中
          flex justify-between: flex box 中間自動撐開，向左右靠去
      */}
        <div className="max-w-7xl mx-auto px-6 py-6 md:px-12 md:pt-10 flex justify-between items-center relative z-50">

            {/*LOGO區域  */}
            <Link href="/" className="text-2xl font-bold text-morandi-primary font-serif z-50">
              Alvin&apos;s Portfolio
            </Link>

            {/* 3.RWD Logic 嚮應式-mobile first
                hidden: 手機版(預設)>隱藏選單
                md:flex: 平板以上(md)>變成flex顯示，並橫向排列
            */}
            <nav className="hidden md:flex gap-8">
              <Link href="#About" className="text-morandi-primary hover:text-morandi-secondary transition-colors">
                About
              </Link>
              <Link href="#Ideas" className="text-morandi-primary hover:text-morandi-secondary transition-colors">
                Ideas
              </Link>
               <Link href="#Journal" className="text-morandi-primary hover:text-morandi-secondary transition-colors">
                Journal
              </Link>
              <Link href="#Projects" className="text-morandi-primary hover:text-morandi-secondary transition-colors">
                Projects
              </Link>
            </nav>

            {/* 4.手機版漢堡選單
                md:hidden: 平板以上> 隱藏按鈕
                onClick 狀態切換，加入 aria-label 提升無障礙體驗
            */}
            <button               
              className="md:hidden text-morandi-primary focus:outline-none z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              >
                {/* 設置SVG選單icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    //打開狀態顯示X圖樣
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    //關閉狀態顯示漢堡圖樣
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>              
            </button>
        </div>

        {/* Mobile Fullscreen Menu */}
        {/* set AnimatePresence */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants} 
              className="fixed inset-0 bg-morandi-bg/95 h-screen flex flex-col items-center justify-center z-40"
              //fixed + inset-0 + h-screen：標準的全螢幕遮罩寫法。
            >
              {/* 選單連結 */}
              <nav className="flex flex-col gap-6 text-center mb-2">
                {["About", "Ideas", "Journal", "Projects"].map((item) => (
                  <Link
                    key={item}
                    href={`#${item}`}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-serif text-morandi-primary
                      hover:text-morandi-secondary transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  )
}

/*
Q: 面試官問：「你是如何實作 RWD (響應式網頁) 的？」

✅ 你的回答： 「我採用 Tailwind CSS 的 Mobile First (手機優先) 策略。 我的寫法是先寫手機版的樣式（例如 hidden 隱藏選單），然後再透過 Breakpoints（如 md:flex）來定義平板或桌面版要如何變化。這樣可以確保程式碼最簡潔，並且優先照顧到移動端使用者的體驗。」

Q: 面試官問：「為什麼你的 Header 蓋住了 Hero 的內容？」

✅ 你的回答： 「因為我對 Header 使用了 position: fixed。這會讓它脫離文件流 (Document Flow)，不再佔據原本的空間高度。 解決方法是，我在 page.tsx 或 Hero 的容器上加上 pt-20 (padding-top)，手動把內容往下推，預留出 Header 的空間。」
 */