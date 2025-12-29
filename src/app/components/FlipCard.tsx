"use client"; //useState onClick 是Client component
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

 //先定義Props: 這張卡片需要接受什麼資料?
 interface FlipCardProps {
  imageSrc: string;
  title: string;
  description: string;
 }

 export default function FlipCard({ imageSrc, title, description }: FlipCardProps) {
  //State: 紀錄卡片現在是"正面"還是"翻面"的狀態
  const [isFlipped, setIsFlipped] = useState(false);

  //點擊事件處理
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    //1.最外層容器:設定卡片大小與透視感
    //group:讓子元素可以根據父層狀態變化
    //h-80:設定高度:確保有空間翻轉
    <div 
      className="h-80 w-full cursor-pointer [perspective-1000px]"
      onClick={handleFlip}
    >
      {/* 2.動畫容器(motion.div):真正負責旋轉的部分 */}
      {/* animate: 根據 isFlipped 狀態決定旋轉角度 */}
      <motion.div
        className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease:"easeInOut" }}
      >
        {/* 正面圖片 */}
        {/* absolute:讓正反面重疊在一起 */}
        {/* [backface-visibility:hidden]: 翻面時隱藏 */}
        <div className="absolute w-full h-full rounded-2xl overflow-hidden shadow-lg [backface-visibility:hidden]">
            <Image 
              src={imageSrc}
              alt={title}
              fill //填滿容器
              className="object-cover"            
            />
            {/* 加上淺遮罩，增加圖片質感 */}
            <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />            
        </div>

        {/* 背面文字 */}
        {/* rotate-y-180: 背面一開始就要先轉 180 度 */}
        <div
          className="absolute w-full h-full rounded-2xl bg-morandi-white p-6
                     flex flex-col justify-center items-center text-center
                     border-2 border-morandi-accent shadow-xl
                     [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <h3 className="text-2xl font-serif font-bold text-morandi-primary mb-2">
            {title}
          </h3>
          <p className="text-morandi-secondary">
            {description}
          </p>
          <span className="mt-4 text-sm text-morandi-accent uppercase tracking-widest">
            Click to flip back
          </span>
        </div>

      </motion.div>
    </div>
  )
 }
