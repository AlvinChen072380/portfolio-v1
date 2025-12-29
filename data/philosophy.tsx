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
   subtitle: "click to read about my asethetics.",
   content: (
    <>
        <p>我相信優秀的前端開發不僅僅是寫出會動的程式碼，更是關於如何轉譯設計語言。</p>
        <p>在每一次的點擊、滑動與轉場中，我都試圖創造出讓使用者感到舒適、直覺且愉悅的數位體驗。</p>
      </>
   ),
  },
 {
    id: "tech",
    title: "Tech Stack",
    subtitle: "My tools of choice.",
    content: (
      <>
        <p>我專注於 React 生態系，善用 Next.js 的伺服器端渲染來優化效能。
        同時結合 Tailwind CSS 快速建構具有一致性的設計系統，確保程式碼的可維護性。
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aperiam voluptatem distinctio laudantium aspernatur in possimus quo iusto quos iste culpa qui porro autem neque, expedita sint dicta maiores quasi?
      Dolore quidem aut praesentium at veniam qui delectus vel aliquid, laudantium aliquam fugit dolorem. Velit architecto, ut nulla commodi modi alias voluptatum. Incidunt tempore quibusdam illum commodi non, a consequatur!
      Facere tempore deleniti reprehenderit est quas vitae qui mollitia asperiores ipsum, delectus quibusdam totam nobis porro, cumque rerum, necessitatibus ipsam cum nam quos molestiae! Illum blanditiis eveniet nisi ex aspernatur.
      Fugiat itaque, unde, illum fuga et perferendis illo nemo sint rerum nihil voluptatum nobis perspiciatis? Ipsum repellat quod repudiandae porro perferendis maxime! Aperiam quod quis maxime. Placeat maiores consequuntur fuga!
      Tempora, laboriosam soluta. Blanditiis saepe assumenda laborum nam accusamus ratione voluptatibus? Architecto magnam, corporis maiores, quam ab fuga ut excepturi possimus atque hic tenetur quo iure temporibus iusto. Quod, error.
      Molestiae error architecto est vitae obcaecati culpa ipsa dolorum distinctio quae iusto ipsum suscipit itaque veritatis autem aliquid corporis nisi nostrum molestias, repudiandae quod eveniet. Dolore doloremque expedita rem minima.
      Non aspernatur dolores qui deserunt doloribus esse neque debitis ut! Nesciunt molestias amet quo, corporis, eligendi, numquam soluta esse adipisci est eos accusantium rem quasi consequatur deserunt asperiores tenetur qui!
      Maxime itaque blanditiis labore. Porro est maxime obcaecati amet unde, vero ipsam, nihil mollitia possimus illo laudantium dolorem soluta culpa omnis pariatur dicta optio quidem facere quos? Eveniet, voluptates unde!
      Ducimus dignissimos doloremque rem, officia tempore consequatur exercitationem eligendi? Quaerat dolore repellendus accusantium natus assumenda eius deleniti dolorem nemo sapiente fugit alias debitis atque quae quibusdam voluptatum, nam dolor nulla.
      Debitis dolores mollitia vitae nihil asperiores, et nemo pariatur veniam assumenda facilis sapiente voluptas quisquam accusamus officia porro corrupti? Explicabo asperiores consequatur tempora officiis maiores consequuntur nostrum sunt porro velit!
        </p>
      </>
    ),
  },
  {
    id: "problem",
    title: "Problem Solving",
    subtitle: "How I tackle challenges.",
    content: (
      <>
        <p>遇到 Bug 時，我習慣先拆解問題，使用破壞式學習法來定位根源。</p>
        <p>我不只是尋找 StackOverflow 的解答，而是試圖理解錯誤背後的原理，避免下次重蹈覆轍。</p>
      </>
    ),
  },
  {
    id: "learning",
    title: "Continuous Learning",
    subtitle: "Always growing.",
    content: (
      <>
        <p>前端領域日新月異，我保持著飢渴的學習心態。</p>
        <p>目前正在深入研究 TypeScript 的進階型別與 WebGL 互動特效。</p>
      </>
    ),
  },
]