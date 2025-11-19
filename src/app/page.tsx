import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />

      {/* Features Section */}
      <section className="py-20 elegant-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="elegant-text">
                Experience Indonesia Like Never Before
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Combining cutting-edge technology with rich cultural heritage
            </p>
            <div className="mt-8 elegant-divider w-32 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                360° VR Tours
              </h3>
              <p className="text-gray-300">
                Immerse yourself in ancient temples, pristine lakes, and
                cultural landmarks with interactive hotspots
              </p>
              <div className="mt-6 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 group-hover:w-full transition-all duration-500 mx-auto"></div>
            </div>

            <div className="glass-card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                AI Batik Studio
              </h3>
              <p className="text-gray-300">
                Generate unique batik patterns using AI and preview them on 3D
                clothing models before ordering
              </p>
              <div className="mt-6 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 group-hover:w-full transition-all duration-500 mx-auto"></div>
            </div>

            <div className="glass-card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.196-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Cultural Connection
              </h3>
              <p className="text-gray-300">
                Connect with local artisans and preserve traditional
                craftsmanship through modern technology
              </p>
              <div className="mt-6 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 group-hover:w-full transition-all duration-500 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 scan-lines">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="elegant-text">Ready to Explore?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your journey through Indonesia&apos;s cultural heritage today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/tour"
              className="elegant-button px-8 py-4 font-semibold rounded-full text-lg"
            >
              Explore Destinations
            </Link>
            <Link
              href="/studio"
              className="elegant-button-outline px-8 py-4 rounded-full font-medium text-lg"
            >
              Try AI Studio
            </Link>
          </div>
          <div className="mt-12 elegant-divider w-64 mx-auto"></div>
        </div>
      </section>
    </main>
  );
}
