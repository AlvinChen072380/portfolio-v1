"use client";
import { motion } from "framer-motion";

//先定義Props: 父元件傳給我的指令
interface IntroOverlayProps {
  onComplete: () => void; //當動畫結束時，呼叫這個函式通知父層(page.tsx)
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  return (
    //使用 fixed inset-0 蓋住全螢幕,z-50 確保在最上層
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-morandi-bg text-morandi-primary"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }} //離開時淡出
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-6xl md:text-8xl font-serif font-bold tracking-widest"
      >
        <p>console.log <br />
        (Hello, Portfolio)</p>
      </motion.h1>
      {/* 模擬讀取條或簡單提示 */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        onAnimationComplete={onComplete} //當這條線跑完，就執行 onComplete
        className="h-1 border-r-morandi-primary mt-8 rounded-full"
      />
    </motion.div>
  )
}