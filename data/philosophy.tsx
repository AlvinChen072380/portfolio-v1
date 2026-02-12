//shared Layout : layoutId

/*
 邏輯是這樣的：

  1.Grid 狀態：在網格裡，我們只渲染小卡片。

  2.Expanded 狀態：我们在網格的外面（最上層），準備一個全螢幕的空白圖層。

  3.靈魂連結：當你點擊小卡片時，Framer Motion 會自動把小卡片的「靈魂 (layoutId)」瞬間轉移到全螢幕圖層上。
 */

export interface PhilosophyItem {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

export const PHILOSOPHY_ITEMS: PhilosophyItem[] = [
  {
    id: "about",
    title: "About Chen",
    subtitle: "click to read more about me.",
    content: (
      <article className="max-w-none">
        
        <div className="mb-8">
          <h4 className="text-lg md:text-lg font-medium mb-2 text-morandi-primary">
            Turning Logic into Emotion. <br className="md:hidden" />
            <span className="text-lg md:text-lg font-medium">| Designer turned Developer.</span>
          </h4>
          <p className="leading-relaxed text-gray-500 text-start md:text-sm">
            我是設計師、曾是咖啡師，現在則是一名專注於使用者體驗的前端開發者。
            具備跨領域的背景，讓我能同時用「設計師的眼睛」審視介面美感，並用「工程師的邏輯」構建穩健的架構。
          </p>
        </div>

       
        <section className="space-y-4 mb-8">
          <h4 className="text-lg md:text-lg font-medium mb-2 text-morandi-primary">
            從「調配風味」到「堆疊程式碼」
          </h4>
          <p className= "text-gray-500 leading-relaxed md:text-sm text-start">
            在轉職前，我透過甜點製作與咖啡服務累積了深厚的溝通力與細節堅持。我發現程式開發與製作甜點有許多相似的部分——
            都需要嚴謹的配方（框架）、層層疊加的風味（元件），以及對品嚐者（使用者）體驗的極致追求。
          </p>
          <p className="text-gray-500 leading-relaxed md:text-sm text-start">
            在自學過程中，我將這些內化的職人精神帶入程式碼中：不只追求功能運作，更思考如何優化效能（效率）與解決 Bug（食材處理）。
            這段旅程證明了我不僅能理解程式代碼，更具備解決複雜問題的邏輯思維。
          </p>
        </section>

    
        <section className="space-y-4 mb-8">
          <h4 className="text-lg md:text-lg font-medium mb-2 text-morandi-primary">
            擁抱科技，但不忘本質
          </h4>
          <p className="text-gray-500 leading-relaxed md:text-sm text-start">
            身處 AI 快速發展的時代，我善用現代化工具提升開發效率，但我深知核心技術與底層原理才是最關鍵的部分。
            目前我正持續鑽研 TypeScript 與 Next.js 的進階應用，致力於結合我的設計美感與技術實力，開發出兼具實用性與互動美學的數位產品。
          </p>
        </section>
      </article>
    ),
  },
  {
    id: "tech",
    title: "Tech Stack",
    subtitle: "My tools of choice.",
    content: (
      <article className="w-full">
        <p className="mb-8 text-gray-600 text-sm md:text-base leading-relaxed text-start">
          目前專注於 React 生態系，善用 Next.js 的架構及伺服器端渲染來優化效能。
          同時結合 Tailwind CSS & Framer Motion 快速建構具有一致性的設計系統，兼顧質感與互動的優良介面，並確保程式碼的可維護性。<br/>
          下列是此專案所學習以及使用到的關鍵技術，透過Top-down的學習方式來鞏固前端基礎架構，在實踐中反向尋找需要的知識與技術。
        </p>
        
        {/* Grid Layout for Tech Categories: Mobile 1 column, Desktop 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
          
          {/* Group 1: Core */}
          <section className="text-left">
            <h4 className="text-lg font-bold text-gray-600 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Core Frameworks
            </h4>
            <ul className="space-y-3 text-sm md:text-base text-gray-700 ml-4 md:text-left">
              <li>
                <strong className="block text-morandi-primary">React 18+</strong>
                <span className="text-gray-500 text-sm">
                  使用 React 建構UI基礎，並考量後續維護採用 component-Based(元件化)的設計思維。</span>
              </li>
              <li>
                <strong className="block text-morandi-primary">Next.js 14(App Router)</strong>
                <span className="text-gray-500 text-sm">
                  採用最新的 App Router 架構。利用 Server Components 減少 Client-side Bundle，並透過 SSR 機制優化 SEO 與首頁載入速度。</span>
              </li>
              <li>
                <strong className="block text-morandi-primary">TypeScript</strong>
                <span className="text-gray-500 text-sm">
                  導入強型別語言開發，藉由定義嚴格的資料介面(interfaces)與泛型(Generics)，在編譯階段攔截錯誤，大幅提升程式碼的可維護性與協作安全性。</span>
              </li>
            </ul>
          </section>          

          {/* Group 2: Style & Motion */}
          <section className="text-left">
            <h4 className="text-lg font-bold text-gray-600 mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-purple-500"></span> Styling & Motion
            </h4>
            <ul className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300 ml-4">
              <li>
                <strong className="block text-morandi-primary">Tailwind CSS</strong>
                <span className="text-gray-500 text-sm">
                <strong>RWD響應式設計</strong>:<br />依循 Mobile first原則採用(md:grid-cols-2, px-[50vw])等設置實作不同裝置端的排版邏輯。<br />
                <strong>Design System</strong>:<br />導入模組化配色(Configuring tailwind.config.ts) morandi-primary配色系統，維持視覺一致性。<br />                
                </span>
              </li>
               <li>
                <strong className="block text-morandi-primary">Framer Motion</strong>
                <span className="text-gray-500 text-sm">
                <strong>Shared Layout Animation</strong>:<br/>
                透過 layoutId 實作從 Grid 到 Fullscreen 的無縫變形，提升視覺連續性。<br />
                <strong>AnimatePresence</strong>:<br />精確管理元件的 Mount/Unmount 生命週期，確保 Modal 關閉時的離場動畫流暢執行。
                </span>
              </li>
              <li>
                <strong className="block text-morandi-primary">Micro-Interaction</strong>
                <span className="text-gray-500 text-sm">
                導入 Lucide React 統一圖示風格，並在互動細節上加入 Hover 與 Active 的物理回饋。</span>
              </li>
             
            </ul>
          </section>

          {/* Group 3: State & Data */}
          <section className="text-left">
            <h4 className="text-lg font-bold text-gray-600 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Core Logic & Algorithms
            </h4>
            <ul className="space-y-3 text-sm  md:text-base text-gray-700 dark:text-gray-300 ml-4">
              <li>
                <strong className="block text-morandi-primary">Hybrid Carousel</strong>
                <span className="text-gray-500 text-sm">為了解決圖片展示區域在跨裝置操作不一致的情況，設計了一套Dual-Track架構:<br /> 
                <strong>Mobile(Touch-First)</strong>:<br />回歸瀏覽器原生行為，利用 CSS Scroll Snap 處理慣性滑動，並使用 Scale 屬性取代寬度變化，避免改變物理尺寸造成的版面抖動。<br />
                <strong>Desktop(Mouse-First)</strong>:<br />接管捲動控制，利用 React useRef 操作DOM，配合 ScrollTo 進行精確的導航，實作目標被選中時的物理變化動態效果。                
                </span>
              </li>
               <li>
                <strong className="block text-morandi-primary">Algorithm 演算法優化</strong>
                <span className="text-gray-500 text-sm">
                <strong>Predictive Scrolling(預判捲動)</strong>:<br/>解決 DOM 元素變形時導致的定位偏移。透過計算「目標寬度」(Target Width)而非「當下寬度」，實現一次到位的準確捲動。<br />
                <strong>Direction Compensation(方向補償)</strong>:<br />修正圖片左右兩側元素縮小時，自動補償左右兩側的目標位移量，確保圖片能保持置中。<br />                
                </span>
              </li>
              <li>
                <strong className="block text-morandi-primary">React Hooks 深度應用</strong>
                <span className="text-gray-500 text-sm">
                <strong>Event & DOM Control</strong>:<br />利用 useRef 進行命令式 DOM 操作，以及鎖定事件(isLocked)防止使用者連續點擊導致迴圈衝突。<br />
                <strong>Performance Hook</strong>:<br />善用 useCallback 快取捲動函式，搭配 Dependency Array 管理，避免 useEffect 不必要的觸發與 Re-render<br />
                </span>
              </li>
             
            </ul>
          </section>

          {/* Group 4: Performance & Integration */}
          <section className="text-left">
            <h4 className="text-lg font-bold text-gray-600 mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-orange-500"></span> Performance & Deployment
            </h4>
            <ul className="space-y-3 text-sm md:text-base text-g ml-4">
              <li>
                <strong className="block text-morandi-primary">Core Web Vitals Strategy</strong>
                <span className="text-gray-500 text-sm">
                <strong>LCP(Largest Contentful Paint)</strong>:<br/>透過 priority 屬性實作 Priority Loading，優先載入首屏 Hero Image 與相鄰圖片，其餘則維持 Lazy Load。<br />
                <strong>CLS (Cumulative Layout Shift)</strong>:<br/>透過實作 Scrollbar-gutter 與全域卷軸鎖定，解決 Modal 開啟時頁面寬度變化造成的視覺跳動。<br />
                <strong>Accessibility</strong>:<br/>實作鍵盤導航(Keyboard Navigation)支援，監聽左右方向鍵控制輪播，提升無障礙體驗。
                </span>
              </li>
              <li>
                <strong className="block text-morandi-primary">SEO & Metadata</strong>
                <span className="text-gray-500 text-sm">
                <strong>Metadata API & Open Graph</strong>:<br/>利用 Next.js Metadata API 動態生成 Meta Tags，確保在 Social Media 分享時能呈現正確的預覽圖卡 (OG Image)。</span>
              </li>
               <li>
                <strong className="block text-morandi-primary">Vercel</strong>
                <span className="text-gray-500 text-sm">
                <strong>Vercel & CI/CD</strong>:<br/>建立自動化部署流程，與 GitHib 深度整合，實現Push-to-Deploy，確保開發環境與生產環境的一致性。</span>
              </li>
              <li>
                <strong className="block text-morandi-primary">PWA Support</strong>
                <span className="text-gray-500 text-sm">
                <strong>PWA</strong><br />採用靜態策略配置 manifest.json，讓網站支援「加入主畫面」，提供類 Native App 的操作體驗。</span>
              </li>
              <li>
                <span 
                  className="block text-gray-300 text-base text-left hover:text-gray-500 cursor-pointer"
                >
                 <a href="#Projects">(點擊看更多Side Projects。)</a> </span>
              </li>
            </ul>
          </section>
        </div>
      </article>
    ),
  },
];
