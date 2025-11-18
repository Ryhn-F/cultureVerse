import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#D97706] to-[#2563EB] bg-clip-text text-transparent">
              About CultureVerse
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bridging tradition and technology to preserve and celebrate Indonesia&apos;s rich cultural heritage
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              CultureVerse was created to connect people with Indonesia&apos;s extraordinary cultural heritage 
              through immersive technology and innovative design. We believe that by combining virtual reality 
              experiences with AI-powered cultural design, we can make Indonesian culture more accessible, 
              engaging, and relevant for generations to come.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform serves as a bridge between the ancient and the modern, between tradition and 
              innovation, ensuring that the stories, art, and wisdom of Indonesia continue to inspire and 
              enrich lives around the world.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#FFF8E7] to-white rounded-2xl shadow-md p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D97706] to-[#F59E0B] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Cultural Preservation</h3>
              <p className="text-gray-600">
                We honor and preserve Indonesia&apos;s cultural traditions while making them accessible through modern technology.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8E7] to-white rounded-2xl shadow-md p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We leverage cutting-edge technology like VR and AI to create engaging, immersive experiences.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8E7] to-white rounded-2xl shadow-md p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D97706] to-[#2563EB] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Community Connection</h3>
              <p className="text-gray-600">
                We connect travelers, designers, and local artisans to support sustainable cultural tourism.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFF8E7] to-white rounded-2xl shadow-md p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Accessibility</h3>
              <p className="text-gray-600">
                We make Indonesia&apos;s cultural wonders accessible to everyone, anywhere in the world.
              </p>
            </div>
          </div>
        </section>

        {/* Competition Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[#D97706] to-[#2563EB] rounded-2xl shadow-lg p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Built for National Competition</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              CultureVerse is proudly created for the national competition organized by{" "}
              <a
                href="https://www.budayago.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors font-semibold"
              >
                BudayaGO
              </a>
              . Our mission aligns with promoting Indonesian cultural heritage through innovative 
              digital platforms that combine tourism, technology, and traditional craftsmanship.
            </p>
            <a
              href="https://www.budayago.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-[#D97706] font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Learn More About BudayaGO
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Technology & Innovation</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              CultureVerse is built with modern web technologies to deliver smooth, immersive experiences:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-[#FFF8E7] to-white rounded-lg">
                <p className="font-semibold text-gray-800">Next.js 14</p>
                <p className="text-sm text-gray-600">App Router</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-[#FFF8E7] to-white rounded-lg">
                <p className="font-semibold text-gray-800">Three.js</p>
                <p className="text-sm text-gray-600">3D & VR</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-[#FFF8E7] to-white rounded-lg">
                <p className="font-semibold text-gray-800">React Three Fiber</p>
                <p className="text-sm text-gray-600">3D Rendering</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-[#FFF8E7] to-white rounded-lg">
                <p className="font-semibold text-gray-800">Tailwind CSS</p>
                <p className="text-sm text-gray-600">Styling</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Explore?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Start your journey through Indonesia&apos;s cultural heritage today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tour"
                className="px-8 py-4 bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Explore Destinations
              </Link>
              <Link
                href="/studio"
                className="px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Try AI Studio
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


