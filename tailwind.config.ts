import type { Config } from "tailwindcss";

const config: Config = {
  // content: 告訴 Tailwind "你要去哪裡掃描 class 名稱？"
  // 如果你在這裡沒寫到的資料夾裡寫了 "bg-red-500"，樣式是不會生效的！
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // extend: 這是最關鍵的關鍵字！
    // 如果寫在 extend 外面，會"覆蓋"掉 Tailwind 所有的預設顏色。
    // 寫在 extend 裡面，代表"保留預設，並新增我們的自訂義樣式"。
    extend: {
      colors: {
        // 自定義色票系統 (Morandi Color System)
        morandi: {
          bg: "#f8e4c5ff",      // 米白背景
          primary: "#4A5043", // 深苔綠 (文字/重點)
          secondary: "#8F9E8B", // 淡鼠尾草綠 (裝飾)
          accent: "#D6C6B0",  // 奶茶色 (亮點/Hover)
          white: "#FFFFFF",   // 純白 (卡片底色)
        },
      },
      // 自定義字體變數
      // 這裡對應 layout.tsx 裡的 Google Fonts 設定
      fontFamily: {
        sans: ["var(--font-inter)"],    // 無襯線體 (內文)
        serif: ["var(--font-playfair)"], // 襯線體 (標題)
      },
    },
  },
  plugins: [],
};
export default config;

/* Q: 面試官問：「為什麼要把顏色寫在 tailwind.config.ts 裡，而不是直接在元件裡寫色碼 #4A5043？」

✅ 你的回答： 「這是為了維護性 (Maintainability) 和一致性 (Consistency)。如果我直接寫色碼，未來如果要改版（例如深綠色要變淺一點），我得去幾十個檔案裡一個一個改。定義在 config 裡，我只要改一個地方，全站就會自動更新。這就是『設計系統 (Design System)』的概念。」 */