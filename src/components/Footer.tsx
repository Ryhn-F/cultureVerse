import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-display font-bold elegant-text mb-6">
              CultureVerse
            </h3>
            <p className="text-gray-300 max-w-md leading-relaxed">
              Discover the soul of Indonesia through immersive virtual
              experiences and AI-powered cultural design. Where tradition meets
              innovation.
            </p>
            <div className="mt-6 elegant-divider w-20"></div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tour"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/studio"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  AI Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.budayago.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  BudayaGO
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@cultureverse.id"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  info@cultureverse.id
                </a>
              </li>
              <li>
                <span className="text-gray-400">
                  Celebrating Indonesia's Heritage
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 CultureVerse. Built for national competition.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Celebrating Indonesia&apos;s Cultural Heritage
          </p>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="elegant-grid opacity-20 h-full"></div>
    </footer>
  );
}
