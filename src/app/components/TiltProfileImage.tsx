'use client'
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export default function TiltProfileImage() {
  const ref = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // 1. MotionValues 設定
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. 物理彈簧設定 (調整了 stiffness 讓頭像晃動更沉穩一點)
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  // 3. 映射運算
  // 這裡調整了角度範圍，讓頭像不要轉得太誇張，保持優雅
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsZoomed(false);
  };

  return (
    // 外層容器：負責定義 3D 視角 (Perspective)
    // w-full h-full 讓它自動填滿 Hero Grid 分配的空間
    <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsZoomed(!isZoomed)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isZoomed ? 1.1 : 1, // 點擊時輕微放大 1.1 倍即可
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        // 樣式調整：保留你的 Morandi 邊框風格，可以是圓形 rounded-full 或 圓角矩形 rounded-3xl
        // 建議：3D 效果在圓角矩形(rounded-3xl)上看起來比較立體，你可以試試看
        className="relative w-64 h-64 md:w-[25rem] md:h-[25rem] rounded-full cursor-pointer border-4 border-morandi-accent shadow-2xl bg-morandi-secondary/60"
      >
        {/* 圖片層 */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            transform: "translateZ(20px)", // 讓圖片稍微浮起，增加立體感
          }}
        >
          <Image
            src="/chen.jpg" // 記得換成你的圖片路徑
            alt="Frontend Developer Avatar"
            fill
            priority
            className="object-cover pointer-events-none" // pointer-events-none 防止圖片搶走滑鼠事件
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* 裝飾：反光效果 (選用) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </div>
  );
};