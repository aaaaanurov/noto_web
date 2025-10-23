export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold">✨ Noto</h1>
        <p className="text-xl text-center max-w-md">
          Share your wishlists and discover what others love
        </p>
        
        <div className="flex gap-4 flex-col sm:flex-row">
          <a
            href="https://apps.apple.com/app/noto"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Download Noto
          </a>
          
          <a
            href="https://github.com/antonyanurov/noto"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            View on GitHub
          </a>
        </div>
      </main>
      
      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>© 2025 Noto. All rights reserved.</p>
      </footer>
    </div>
  );
}

