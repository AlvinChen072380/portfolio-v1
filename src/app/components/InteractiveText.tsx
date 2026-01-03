"use client";
import { motion } from "framer-motion";


//定義內容
interface CardProps {
  id: string;
  title: string;
  subtitle: string; //沒點開之前顯示的短內容
  onClick: () => void; //告知父層，誰被點擊
}


export default function InteractiveText({ id, title, subtitle, onClick }: CardProps) {
  
  return (
    //站位子用的小卡，顯示簡單資訊
    <motion.div
      layoutId={id}
      onClick={onClick}
      className="relative w-full h-[450px] bg-morandi-white rounded-3xl shadow-xl overflow-hidden cursor-pointer hover:bg-white group"
    >
      <motion.div
        layoutId={`content-${id}`}
        className="text-center h-full flex flex-col justify-center p-6"
      >
        <motion.h3
          layoutId={`title-${id}`}
          className="font-serif font-bold text-morandi-primary text-xl m-0 group-hover:text-morandi-accent transition-colors"
        >
          {title}
        </motion.h3>

        <motion.p
          layoutId={`subtitle-${id}`}
          className="text-sm text-morandi-secondary mt-2"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}