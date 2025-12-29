import Image from "next/image";

export default function Hero () {
  return (
    //section 語疫化標籤，代表獨立一個區塊
    /* 
      重點1. 全螢幕設定
      min-h-screen: 最小高度 = 螢幕高度(100dvh)
      flex items-center: 讓內容在垂直方向"置中"
      pt-20: mobile type fixed header 預留空間
    */
    <section className="min-h-screen flex items-center pt-20 md:pt-0">

      {/* 內容統一放在container裡 */}
        <div className="max-w-7xl mx-auto px-6 w-full">
          {/*
            重點2.Grid 網格系統
            grid: 啟動網格系統
            md:grid-cols-12: 在電腦版切成12等分(一般網頁設計的標準欄位數)
            gap-12: 欄與欄之間的間距(Gutter)
          */}

          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            {/* 左側:文字內容(7欄) */}
            <div className="md:col-span-7">
              {/* H1 標題，*text-6xl md:text-8xl 手機 文字大小6xl 電腦版md 8xl*/}
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-morandi-primary leading-tight mt-4 mb-4">
                  Hi, I am Chen.
              </h1>
              <p className="text-morandi-secondary text-2xl mb-8 max-w-lg">
                  從 {/* 我的專業背景 */} 轉職的前端開發者，
                  擅長利用 **React/Next.js** 和 //Tailwind CSS** 打造
                  使用者體驗優良的互動式介面。
              </p>

              {/* 行動呼籲按鈕(CTA)*/}
              {/* flex-col: 手機垂直排列
                  sm:flex-row 平板以上改回水平排列(左右)
                  items-center: 讓按鈕置中對齊
              */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* main button */}
                 <a href="#Projects"
                    className="px-8 py-3 text-center bg-morandi-primary text-morandi-white rounded-full hover:bg-morandi-accent hover:text-morandi-primary transition-colors duration-300 shadow-lg"
                 >
                  Explore My Project
                 </a>
                 {/* second button */}
                 <a href="#Contact"
                    className="px-8 py-3 text-center border-morandi-primary text-morandi-primary rounded-full hover:bg-morandi-secondary/40 transition-colors duration-300"
                 >
                  Contact Me
                 </a>
              </div>
            </div>

            {/* 
              Q: 面試官問：「什麼時候該用 Flexbox？什麼時候該用 CSS Grid？」

              ✅ 你的回答： 「這取決於我要處理的是『一維』還是『二維』佈局。

              Flexbox 適合 一維 (1D) 排列，例如導覽列的一排按鈕，我只需要管它們是橫著排還直著排。

              Grid 適合 二維 (2D) 佈局，例如 Hero Section 或照片牆。我需要精準控制它佔幾個欄位 (Columns)，以及要在版面的哪個位置。以 Hero 為例，用 grid-cols-12 可以讓我輕鬆做出 7:5 或 6:6 的非對稱設計。」
            */}

            {/* 右側:圖片區(5欄) */}
            <div className="md:col-span-5 relative flex justify-center md:justify-end">
              {/* Image元件:Next.js專用，自動優化圖片 */}

              <div className="w-64 h-64 md:w-[25rem] md:h-[25rem] rounded-full overflow-hidden shadow-2xl border-4 border-morandi-accent relative z-10">
                {/* 重點3: Next/Image 元件 */}
                <Image 
                  src="/Mountain.jpg" //public資料夾下的檔案名稱
                  alt="Frontend Developer Avatar"
                  // [關鍵屬性 A] fill
                  // 傳統 img 需要設定 width/height，但在 RWD 裡很難用。
                  // fill 讓圖片自動「填滿」父容器 (外面的 div)。
                  // 前提是：父容器"必須有 position: relative" 以及"明確的大小" (w-64 h-64...)。
                  fill      
                  // [關鍵屬性 B] priority
                  // 告訴瀏覽器：「這張圖是首屏，最重要！請優先下載！」
                  // 這會大幅提升 LCP (Largest Contentful Paint) 分數，對 SEO 幫助很大。        
                  priority 
                  // [關鍵屬性 C] object-cover
                  // 這是 CSS 屬性。確保圖片填滿容器時，保持比例，多餘的部分「裁切掉」，不會變形。
                  className="object-cover w-full h-full"
                />     

                {/* 
                  2. 面試模擬題
                  Q: 面試官問：「Next.js 的 <Image /> 元件幫我們做了什麼優化？」

                  ✅ 你的回答： 「它主要解決了三個效能問題：

                  自動格式轉換：它會自動把 JPG/PNG 轉成 WebP 或 AVIF 格式，檔案更小但畫質不變。

                  響應式尺寸 (Responsive Sizing)：它會根據使用者的螢幕 (手機或電腦)，自動下載『剛好夠大』的圖片，不會在手機上下載 4K 大圖浪費流量。

                  防止佈局位移 (CLS Prevention)：因為它必須預先佔位，所以圖片載入時不會把下方的文字突然推開，使用者體驗更好。」
                */}
              </div>
              
              {/* 父容器有 relative，所以這個 absolute 是參考父容器的位置 */}
              <div className="absolute w-32 h-32 bg-morandi-secondary/30 rounded-full -top-6 -left-6 z-0 hidden md:block blur-xl" />
              <div className="absolute w-20 h-20 bg-morandi-accent/40 rounded-full bottom-0 right-0 z-20 blur-lg" />
            </div>

          </div>
        </div>
    </section>
  )
}