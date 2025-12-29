"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";

// 模擬測試資料

const projects = [
  {
    id: "p1",
    title: "Chiffon Cake",   
    image: "/cake.jpg", //public 資料夾存放圖片
  },
  {
    id: "p2",
    title: "Taiwan Coffee",    
    image: "/coffee.jpg",
  },
  {
    id: "p3",
    title: "Mountain View",   
    image: "/mountain.jpg"
  },
  {
    id: "p4",
    title: "Sunset Sky",   
    image: "/mountain2.jpg"
  }
];
export default function Gallery() {
  //State: 紀錄 "目前是誰被展開的"?
  //預設第一個(projects[0].id)是展開的  
  /* const [activeId, setActiveId] = useState(projects[0].id) */

  // [修改 1] 狀態初始值改成 null (代表一開始沒有人被選中，大家都一樣大)
  // <string | null> 是 TypeScript 寫法，意思是這個變數可以是字串，也可以是空值
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleCardClick = (id: string) => {
    if (activeId === id) {
        setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  return (    
    <section id="Projects" className="py-24 bg-morandi-bg">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-container mb-12">
            <h2 className="text-4xl font-serif font-bold text-morandi-primary mb-4">
                Visual Journal
            </h2>
            <p className="text-morandi-secondary">
                Click to expand the details.
            </p>
          </div>

          {/* 關鍵佈局(手風琴效果 
            flex: 啟用彈性box
            flex-col:手機垂直排列
            md:flex-row: 電腦水平排列 (核心效果)
            gap-4: 卡片間距
            h-[70vh]: 手機版高度設為視窗的70% (有一定空間可以伸縮)
            md:h-[500px]: 電腦版高度固定 500px
          */}
          <div className="flex flex-col md:flex-row gap-8 items-start h-[70dvh] md:h-[500px] w-full mb-60">
            {projects.map((item) => (
              <ProjectCard 
                key={item.id}
                id={item.id}
                title={item.title}
                imageSrc={item.image}
                isActive={activeId === item.id}
                onClick={handleCardClick}

                imagePosition={item.id === "p3" ? "bottom" : "center"} //個別設定圖片顯示重心
              />
            ))}
          </div>
            
        </div>
    </section>
  )
}