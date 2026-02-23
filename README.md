# Interactive Frontend Portfolio (Next.js + Framer Motion)

> An immersive, high-performance portfolio website built with **Next.js 14 App Router**. Featuring a custom **Hybrid Carousel engine**, optimized **SEO architecture**, and **PWA** capabilities.

🔗 **Live Demo:** [(https://portfolio-v1-dun-two.vercel.app/)]

![Project Preview](./public/og-image.png) 
*(Note: Please ensure an `og-image.png` or screenshot is available in your public folder)*

## 🛠 Tech Stack & Rationale

| Tech | Usage & Rationale |
| :--- | :--- |
| **Next.js 14** | **App Router** architecture for superior SEO, Server Components performance, and simplified routing. |
| **TypeScript** | Strict type safety to ensure code reliability and maintainability. |
| **Tailwind CSS** | Utility-first CSS for rapid UI development and **Scroll Snap** handling. |
| **Framer Motion** | Orchestrating complex animations (Stagger children, Layout transitions) and gesture interactions. |
| **PWA** | Static manifest strategy to enable "Add to Home Screen" native-like experience. |

## 🚀 Key Features & Technical Highlights

This project focuses on resolving real-world frontend challenges, specifically **Cross-Device Interaction** and **Web Performance**.

### 1. Hybrid Carousel Engine (Dual Track Strategy)
A custom-built carousel that adapts its physics engine based on the device, resolving the "Layout Shift" and "Scroll Jitter" issues common in responsive sliders.

* **📱 Mobile (Touch-First):** * Utilizes **Native CSS Scroll Snap** (`snap-x mandatory`) for 60fps smooth scrolling.
    * **Visual Scaling:** Uses `transform: scale()` instead of width changes to prevent layout thrashing during swipes.
    * **Logic:** Javascript `scrollTo` is disabled to avoid conflict with the native browser inertia.
* **💻 Desktop (Mouse-First):** * Utilizes **JavaScript Control** (`scrollTo`) for precise navigation.
    * **Physical Expansion:** Active items physically expand (`width` transition) for a dynamic visual effect.
    * **Data Sync:** Standardized JS calculation logic to match CSS layout, ensuring perfect centering alignment.

### 2. Performance Optimization (Core Web Vitals)
* **LCP (Largest Contentful Paint):** Achieved green score (Sub 2.5s) by implementing **Priority Loading** strategies on Hero images.
* **Zero Layout Shift:** Implemented `scrollbar-gutter` and global scrollbar hiding techniques to prevent content jumping when modals open/close.
* **Event Locking:** Implemented `useRef` locking mechanisms to prevent event loop spamming during rapid navigation.

### 3. SEO & Social Sharing
* **Metadata API:** Fully integrated Next.js 14 Metadata API for dynamic `<title>` and `<meta>` tags.
* **Open Graph (OG):** configured for optimized social media previews (Facebook/Twitter/LinkedIn cards).

### 4. Micro-Interactions & UX
* **Scroll Lock:** Custom logic to lock body scroll when the "Philosophy" modal is active, ensuring focus.
* **Staggered Animations:** Applied to the Contact section for a polished, orchestrated entry effect.
* **PWA Support:** Static `manifest.json` implementation to bypass Next.js dynamic routing issues, making the site installable.

## 💻 Getting Started (Local Development)

To run this project on your local machine:

1. Clone the repository:
   ```bash
   git clone [https://github.com/AlvinChen072380/portfolio-v1](https://github.com/AlvinChen072380/portfolio-v1)