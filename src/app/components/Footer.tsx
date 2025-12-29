export default function Footer () {
  return (
    <footer className="bg-morandi-primary py-8 border-t border-morandi-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-morandi-accent/60 text-sm">

        <p>© 2024 Chen&apos;s Portfolio. All rights reserved.</p>

        <div className="flex gap-4 mt-4 md:mt-0">
          <span>Built with Next.js & Tailwind</span>
        </div>

      </div>
    </footer>
  )
}