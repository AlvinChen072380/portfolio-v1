
//先定義資料形狀(Type Definition)
export interface Project {
  id: number;
  title: string;
  image: string;
  desc: string;
  text: string;
}

//模擬30比資料
//真實專案中，這裡通常會釋手寫的靜態資料，或是從API抓回資料。
const baseProjects = [
  { title: "Chiffon Cake", image: "/cake.jpg", desc: "甜點與程式碼的交織。", text: "專注於味蕾的細節體驗。" },
  { title: "Taiwan Coffee", image: "/coffee.jpg", desc: "品味生活中的美好時刻。", text: "來世產區的純粹風味。" },
  { title: "Mountain view", image: "/mountain.jpg", desc: "登高望遠，開闊視野。", text: "山林間的嬉戲。" },
  { title: "Coding Life", image: "/mountain2.jpg", desc: "專注於每個像素的細節。", text: "數位世界的建築師。" },
];

export const projectsData: Project[] = Array.from({ length: 30 }).map((_, i) => {

  const base = baseProjects[i % baseProjects.length]; //循環取用基礎資料
  // %取餘數 i % b = i - ( b * 商數 ) 商數 = i / b

  return {
    ...base,
    id: i, //每個item 都有唯一的ID
    title: `${base.title} ${i + 1}`, //標題加上編號做區別
  };
});