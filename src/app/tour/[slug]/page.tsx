import VRViewer from "@/components/VRViewer";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
  imageUrl?: string;
}

interface DestinationData {
  id: string;
  name: string;
  location: string;
  description: string;
  panoramaUrl: string;
  hotspots: Hotspot[];
  history: string;
  mapEmbed?: string;
  learnMoreUrl?: string;
}

// Destination data with VR content
const destinationData: Record<string, DestinationData> = {
  borobudur: {
    id: "borobudur",
    name: "Candi Borobudur",
    location: "Magelang, Central Java",
    description: "The world's largest Buddhist temple",
    panoramaUrl:
      "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=2048&h=1024&fit=crop",
    hotspots: [
      {
        id: "stupa-main",
        position: [2, 1, -3],
        title: "Main Stupa",
        description:
          "The main stupa at the top represents nirvana, the ultimate goal of Buddhist practice. It is surrounded by 72 smaller stupas, each containing a statue of Buddha.",
      },
      {
        id: "relief-panel",
        position: [-1.5, 0, -2],
        title: "Stone Relief Panels",
        description:
          "Over 2,600 relief panels tell the story of Buddha's life and teachings, creating one of the world's most extensive collections of Buddhist narrative art.",
      },
      {
        id: "architecture",
        position: [0, -1, -2.5],
        title: "Temple Architecture",
        description:
          "Built in the 9th century, Borobudur follows mandala principles with three levels: Kamadhatu (desire), Rupadhatu (form), and Arupadhatu (formlessness).",
      },
    ],
    history:
      "Candi Borobudur was constructed around 800 CE during the Sailendra dynasty. It was abandoned in the 14th century and rediscovered in the 19th century under British colonial rule. In 1991, it was designated a UNESCO World Heritage Site.",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126532.85472901243!2d110.18592056953124!3d-7.607869799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a8c1c9c9c9c9%3A0x1c3c9c9c9c9c9c9c!2sBorobudur!5e0!3m2!1sen!2sus!4v1234567890",
    learnMoreUrl: "https://borobudurpark.com",
  },
  prambanan: {
    id: "prambanan",
    name: "Candi Prambanan",
    location: "Yogyakarta",
    description: "9th-century Hindu temple complex",
    panoramaUrl:
      "https://images.unsplash.com/photo-1564925525588-0b58c9b1750d?w=2048&h=1024&fit=crop",
    hotspots: [
      {
        id: "shiva-temple",
        position: [0, 1, -3],
        title: "Shiva Temple",
        description:
          "The main temple dedicated to Shiva, the destroyer and transformer. This 47-meter tall structure houses a statue of Shiva Mahadeva.",
      },
      {
        id: "ramayana-relief",
        position: [-2, 0, -2],
        title: "Ramayana Reliefs",
        description:
          "The temple walls are adorned with reliefs depicting the epic Ramayana, telling the story of Prince Rama's quest to rescue his wife Sita.",
      },
    ],
    history:
      "Prambanan was built in the 9th century by the Mataram Kingdom. It is the largest Hindu temple site in Indonesia and one of the largest in Southeast Asia.",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.123456789!2d110.4934567!3d-7.7520234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDUnMDcuMyJTIDExMMKwMjknMzYuNCJF!5e0!3m2!1sen!2sus!4v1234567890",
  },
  "danau-toba": {
    id: "danau-toba",
    name: "Danau Toba",
    location: "North Sumatra",
    description: "Largest volcanic lake in Southeast Asia",
    panoramaUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=2048&h=1024&fit=crop",
    hotspots: [
      {
        id: "samosir-island",
        position: [1, 0.5, -2.5],
        title: "Samosir Island",
        description:
          "The largest island within an island, Samosir is home to traditional Batak villages and serves as the cultural heart of the Batak people.",
      },
    ],
    history:
      "Formed by a massive volcanic eruption around 74,000 years ago, Lake Toba is the largest volcanic lake in the world and one of the deepest.",
  },
  "tanah-lot": {
    id: "tanah-lot",
    name: "Tanah Lot",
    location: "Bali",
    description: "Sea temple on a rock formation",
    panoramaUrl:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=2048&h=1024&fit=crop",
    hotspots: [
      {
        id: "temple",
        position: [0, 0, -2],
        title: "Tanah Lot Temple",
        description:
          "A Hindu temple dedicated to the sea gods. The temple is said to be protected by sea snakes and is one of Bali's most important sea temples.",
      },
    ],
    history:
      "Built in the 16th century by Dang Hyang Nirartha, a priest from Java. The temple is believed to be protected by venomous sea snakes.",
  },
  komodo: {
    id: "komodo",
    name: "Komodo National Park",
    location: "East Nusa Tenggara",
    description: "Home of the Komodo dragon",
    panoramaUrl:
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=2048&h=1024&fit=crop",
    hotspots: [
      {
        id: "dragon",
        position: [1, 0, -2],
        title: "Komodo Dragons",
        description:
          "The world's largest lizards, growing up to 3 meters in length. These ancient creatures are found nowhere else on Earth.",
      },
    ],
    history:
      "Established in 1980, Komodo National Park is a UNESCO World Heritage Site and home to the famous Komodo dragon.",
  },
  bromo: {
    id: "bromo",
    name: "Mount Bromo",
    location: "East Java",
    description: "Active volcano in a stunning caldera",
    panoramaUrl:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=2048&h=1024&fit=crop",
    hotspots: [
      {
        id: "crater",
        position: [0, 0.5, -2],
        title: "Volcanic Crater",
        description:
          "Mount Bromo is an active volcano that last erupted in 2016. The sunrise view from the viewpoint is one of Indonesia's most iconic sights.",
      },
    ],
    history:
      "Part of the Tengger caldera, Mount Bromo is one of Java's most active volcanoes and holds spiritual significance for the Tenggerese people.",
  },
};

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = destinationData[slug];

  if (!destination) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 pt-12">
          <Link
            href="/tour"
            className="inline-flex items-center text-[#047857] hover:text-[#EAB308] gold-underline transition-colors mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Destinations
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            <span className="bg-gradient-to-r from-[#047857] to-[#EAB308] bg-clip-text text-transparent">
              {destination.name}
            </span>
          </h1>
          <p className="text-xl text-[#065F46]/70">{destination.location}</p>
        </div>

        {/* VR Viewer */}
        <div className="mb-12">
          <VRViewer
            panoramaUrl={destination.panoramaUrl}
            hotspots={destination.hotspots}
          />
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#F5F5DC] rounded-2xl shadow-lg p-6 border border-[#EAB308]/10">
              <h2 className="text-2xl font-display font-bold text-[#065F46] mb-4">
                About {destination.name}
              </h2>
              <p className="text-[#065F46]/70 leading-relaxed mb-4">
                {destination.description}
              </p>
              <p className="text-[#065F46]/70 leading-relaxed">
                {destination.history}
              </p>
            </div>

            {destination.learnMoreUrl && (
              <div className="bg-[#F5F5DC] rounded-2xl shadow-lg p-6 border border-[#EAB308]/10">
                <a
                  href={destination.learnMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#047857] hover:text-[#EAB308] gold-underline transition-colors font-semibold"
                >
                  Learn More
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {destination.mapEmbed && (
              <div className="bg-[#F5F5DC] rounded-2xl shadow-lg p-6 border border-[#EAB308]/10">
                <h3 className="text-xl font-display font-bold text-[#065F46] mb-4">
                  Location
                </h3>
                <div className="rounded-lg overflow-hidden">
                  <iframe
                    src={destination.mapEmbed}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${destination.name}`}
                  />
                </div>
              </div>
            )}

            <div className="bg-[#F5F5DC] rounded-2xl shadow-lg p-6 border border-[#EAB308]/10">
              <h3 className="text-xl font-display font-bold text-[#065F46] mb-4">
                Tips for Exploration
              </h3>
              <ul className="space-y-2 text-[#065F46]/70">
                <li className="flex items-start">
                  <span className="text-[#047857] mr-2">•</span>
                  Drag to look around the 360° view
                </li>
                <li className="flex items-start">
                  <span className="text-[#047857] mr-2">•</span>
                  Click on glowing hotspots for cultural stories
                </li>
                <li className="flex items-start">
                  <span className="text-[#047857] mr-2">•</span>
                  Use mouse wheel or pinch to zoom
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/tour"
            className="btn-primary inline-flex items-center px-8 py-4 rounded-full font-semibold"
          >
            Explore More Destinations
          </Link>
        </div>
      </div>
    </main>
  );
}
