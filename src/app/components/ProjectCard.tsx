import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  id: string;
  title: string;
  imageSrc: string;
  isActive: boolean; //透過true/false 來確認是否為點擊區塊
  onClick: (id: string) => void; //用來通知父層
  imagePosition?:string; //由圖片自己決定重心，?沒有就預設值
}

export default function ProjectCard ({ id, title, imageSrc, isActive, onClick, imagePosition="center" }: ProjectCardProps) {
  return (
    <motion.div
    /* key1: layout 屬性:告訴Reamer Motion 當這張卡片的尺寸改變時，自動產生平滑動畫 */
      layout
      onClick={() => onClick(id)}
    /* key2: Flex比例控制 */  
    // relative: 定位基準
    // h-[400px]: 固定高度 > 後續由h-full 取代，由父層容器決定高度 h-full w-full
    // flex-[10]: 如果是isActive,佔據10份空間
    // flex-[2]: 如果沒有active,佔據2份空間
    // md:flex-row 電腦版橫向排列時才生效
    // 高度邏輯: Active: h-full(撐滿500px):則變成h-[200px]矮縮圖
    // 寬度邏輯: Active: flex-[10] (變寬) Inactive: flex-[2] (變窄)
    className={`relative w-full rounded-3xl cursor-pointer overflow-hidden
                transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isActive ? "flex-[10] h-full" : "flex-[2] h-[100px] md:h-[200px] hover:flex-[3]"} 
    `}/*  想讓沒選中時稍微大一點，可以把 flex-[2] 改成 flex-[1] 或其他數字 */
    >

      {/* 圖片層 */}
      <Image 
        src={imageSrc}
        alt={title}
        fill
        className="object-cover"
        //新增套用圖片重心
        //這會讓 CSS 變成 object-position: center 或 top 或 bottom
        style={{ objectPosition: imagePosition }}
      />

      {/* 黑色遮罩層 */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-500
                       ${isActive ? "opacity-0" : "opacity-50 hover:opacity-20"}`}
      />

      {/* 標題層 */}
      {/* Active時才顯示標題 */}
      <div className="absolute bottom-8 left-8 z-10">
        <motion.h3
          layout="position" //文字位置改變也有動畫效果
          className={`text-morandi-white font-bold font-serif whitespace-nowrap
                      ${isActive ? "text-3xl opacity-100" : "text-xl opacity-0 md:opacity-100 md:rotate-[-90deg] origin-left translate-y-20"}
          `}  
        >
          {isActive ? title : ""}
          {/* 未展開時文字顯示方式 */}           
        </motion.h3>
      </div>

      
    </motion.div>
  )
}