import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-[#F5F5DC] border-t-2 border-[#EAB308]/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-display font-bold bg-gradient-to-r from-[#047857] to-[#EAB308] bg-clip-text text-transparent mb-4">
              CultureVerse
            </h3>
            <p className="text-[#065F46]/70 max-w-md">
              Discover the soul of Indonesia through immersive virtual
              experiences and AI-powered cultural design.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#065F46] mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tour"
                  className="text-[#065F46]/70 hover:text-[#047857] gold-underline transition-colors"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/studio"
                  className="text-[#065F46]/70 hover:text-[#047857] gold-underline transition-colors"
                >
                  AI Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#065F46]/70 hover:text-[#047857] gold-underline transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#065F46] mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.budayago.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#065F46]/70 hover:text-[#047857] gold-underline transition-colors"
                >
                  BudayaGO
                </a>
              </li>
              <li>
                <span className="text-[#065F46]/70">
                  Contact: info@cultureverse.id
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 gold-divider flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#065F46]/60 text-sm">
            © 2024 CultureVerse. Built for national competition.
          </p>
          <p className="text-[#065F46]/60 text-sm mt-2 md:mt-0">
            Celebrating Indonesia&apos;s Cultural Heritage
          </p>
        </div>
      </div>
    </footer>
  );
}
