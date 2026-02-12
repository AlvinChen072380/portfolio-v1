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
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease:"easeOut" }}
        className="font-serif font-bold tracking-widest will-change-transform"
      >
        <p className="text-4xl md:text-6xl leading-snug md:leading-snug">console.log <br />
        (你好,Hello,哩賀 )</p>
      </motion.h1>
      {/* 模擬讀取條或簡單提示 */}
      <div className="mt-0 h-1 w-[300px] md:w-[500px] flex justify-center">
        <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, delay: 0.3, ease:"easeInOut" }}
        onAnimationComplete={onComplete} //當這條線跑完，就執行 onComplete
        className="z-60 h-1 bg-morandi-text/50 mt-4 rounded-full"
      /> 
      </div>
      
    </motion.div>
  )
}