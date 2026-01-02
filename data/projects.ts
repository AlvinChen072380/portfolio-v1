
//先定義資料形狀(Type Definition)
export interface Project {
  id: number;
  title: string;
  image: string;
  desc: string;
  text: string;
}

//模擬30筆資料
//真實專案中，這裡通常會釋手寫的靜態資料，或是從API抓回資料。
const baseProjects = [
  { title: "Chiffon Cake", image: "/sweet1.webp", desc: "包種茶芒果戚風", text: "輕柔的口感，尾韻帶有綠色茶香，第一次在店內販售亮相的商品。" },
  { title: "Chiffon Mini", image: "/sweet2.webp", desc: "4吋迷你戚風", text: "愛吃甜但吃不多，這就是剛剛好的選擇。" },
  { title: "Custom Series", image: "/sweet3.webp", desc: "8吋客製化四季鮮果戚風", text: "橘黃色系的鮮果點綴，搭配夏季夜晚的微風。" },
  { title: "Custom Series", image: "/sweet4.webp", desc: "8吋客製伯爵茶芒果戚風", text: "濃郁伯爵茶香，搭配時令鮮甜芒果。" },
  { title: "Custom Series", image: "/sweet8.webp", desc: "8吋客製草莓千層", text: "沁香的草莓，搭配甜感濃郁的進口綠葡萄。" },
   { title: "Custom Series", image: "/cake.jpg", desc: "8吋客製化四季鮮果戚風", text: "實品紀錄2" },
  { title: "Custom Series", image: "/sweet7.webp", desc: "8吋客製化四季鮮果戚風", text: "實品紀錄3。" },
  { title: "About Coffee", image: "/coffee4.webp", desc: "92~95度C", text: "淺焙單品的完美溫度。" },
  { title: "Special Coffee", image: "/coffee.webp", desc: "咖啡搭檸檬酸爽", text: "水果尬咖啡，蹦出酸甜新滋味。" },
  { title: "SOE Coffee", image: "/coffee3.webp", desc: "單一產區濃縮咖啡", text: "使用單一產區，手工三次挑選咖啡豆萃取。" },
  { title: "Wild view", image: "/mountain1.webp", desc: "捕捉風走過的瞬間", text: "那翠玉的，即將飽滿的，隨風搖曳著。" },
  { title: "Sunset View", image: "/mountain2.jpg", desc: "Olympus EP-5", text: "黃澄澄的夕陽，一轉眼紅紫相映。" },
  { title: "Sunset View", image: "/mountain3.webp", desc: "Olympus EP-5", text: "" },
  { title: "In The Mountain", image: "/mountain5.webp", desc: "OM-5", text: "綠月，對比的發想，山林間的紀實。" },
  { title: "In The Mountain", image: "/mountain6.webp", desc: "OM-5", text: "慢速濾鏡紀實。" },
  { title: "Sunset View", image: "/mountain7.webp", desc: "OM-5", text: "火燒西海岸" },
  { title: "Sunset View", image: "/mountain8.webp", desc: "OM-5", text: "" },
  { title: "Street View", image: "/city.webp", desc: "OM-5", text: "人們常說，攝影是種捕捉光的行為。" },
  { title: "Street View", image: "/city2.webp", desc: "OM-5", text: "植鞣皮與午後的陽光。" },
  { title: "Street View", image: "/city3.webp", desc: "OM-5", text: "" },
  { title: "Street View", image: "/city4.webp", desc: "OM-5", text: "純粹的線條，與色彩。" },
  { title: "Coffee Shop", image: "/store2.webp", desc: "Victoria", text: "" },  
  { title: "Daily Life", image: "/tree.webp", desc: "OM-5", text: "紋理" },
  { title: "Daily Life", image: "/tree2.webp", desc: "OM-5", text: "界線模糊" },
  { title: "Tree Record", image: "/tree3.webp", desc: "OM-5", text: "呼吸般的、溫柔的、樹的紋理紀實。" },
  { title: "Tree Record", image: "/tree4.webp", desc: "OM-5", text: "呼吸般的、溫柔的、樹的紋理紀實。" }, 
  { title: "Tree Record", image: "/tree6.webp", desc: "OM-5", text: "" },
  { title: "Daily Record", image: "/tree7.webp", desc: "OM-5", text: "" },
  { title: "Tree Record", image: "/tree8.webp", desc: "OM-5", text: "" },
  { title: "Still...", image: "/sweet0.webp", desc: "OM-5", text: "蓄勢待發的" },
];

export const projectsData: Project[] = Array.from({ length: 30 }).map((_, i) => {

  const base = baseProjects[i % baseProjects.length]; //循環取用基礎資料
  // %取餘數 i % b = i - ( b * 商數 ) 商數 = i / b

  return {
    ...base,
    id: i, //每個item 都有唯一的ID
    title: `${base.title} `, //標題加上編號做區別
  };
});