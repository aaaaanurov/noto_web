import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 
          className="text-8xl md:text-9xl font-bold mb-4"
          style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
        >
          404
        </h1>
        <p className="text-2xl md:text-3xl text-gray-400 mb-8">
          Page not found
        </p>
        <Link 
          href="/"
          className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors text-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}


