# CultureVerse 🌏

A modern cultural tech website that connects people with Indonesia's cultural heritage through immersive 360° VR experiences and AI-generated batik fashion previews.

Built for the national competition: [BudayaGO](https://www.budayago.id/)

## 🎯 Features

### 1. **360° VR Tourism Experiences**
- Explore multiple Indonesian destinations (Borobudur, Prambanan, Danau Toba, Tanah Lot, Komodo, Mount Bromo)
- Interactive hotspots with cultural stories, legends, and historical details
- Drag-to-explore panoramic views powered by Three.js

### 2. **AI Batik Design Studio**
- Generate unique batik patterns using text prompts
- Preview designs on 3D clothing models (shirt, kebaya, dress)
- Connect with local artisans for custom orders

### 3. **Modern UI/UX**
- Light, warm Indonesian cultural theme
- Smooth animations and transitions
- Responsive design for all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **3D/VR**: Three.js, React Three Fiber, @react-three/drei
- **Font**: Plus Jakarta Sans (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wisata-lomba
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── tour/
│   │   ├── page.tsx          # Destination list
│   │   └── [slug]/page.tsx   # Individual VR experience
│   ├── studio/
│   │   └── page.tsx          # AI Batik Studio
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
└── components/
    ├── Navbar.tsx            # Navigation bar
    ├── Hero.tsx              # Hero section
    ├── Footer.tsx            # Footer
    ├── DestinationCard.tsx   # Destination card component
    ├── VRViewer.tsx          # 360° VR viewer with hotspots
    └── AIStudio.tsx          # AI batik generation studio
```

## 🎨 Design System

### Colors
- **Terracotta Brown**: `#D97706` - Primary accent (batik)
- **Ocean Blue**: `#2563EB` - Secondary accent (archipelago)
- **Warm Ivory**: `#FFF8E7` - Background
- **Soft Shadow Grey**: `#E5E7EB` - Shadows

### Typography
- **Font**: Plus Jakarta Sans
- **Weights**: 400, 500, 600, 700

## 🚀 Features Explanation

### VR Viewer (`VRViewer.tsx`)

The VR viewer uses Three.js to create a 360° panoramic experience:

1. **Panorama Sphere**: A large sphere with inverted normals displaying the 360° image
2. **Orbit Controls**: Users can drag to look around
3. **Hotspots**: Interactive markers that display cultural information when clicked
4. **Sidebar**: Collapsible info panel showing hotspot details

**To add a new destination:**
1. Add destination data to `/src/app/tour/[slug]/page.tsx`
2. Provide a 360° panorama image URL
3. Define hotspots with positions (x, y, z coordinates)

### AI Studio (`AIStudio.tsx`)

The AI Studio generates batik patterns and applies them to 3D models:

1. **Text Input**: Users describe their desired batik style
2. **Generation**: Currently uses procedural generation (for demo)
3. **3D Preview**: Three.js model viewer with dynamic texture application
4. **Order Flow**: Mock order system for connecting with artisans

**To integrate real AI (Replicate/Stability.ai):**

```typescript
const response = await fetch('https://api.replicate.com/v1/predictions', {
  method: 'POST',
  headers: {
    'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    version: 'your-model-version',
    input: { prompt: prompt, /* other params */ },
  }),
});
```

## 🔌 Connecting External APIs

### Replicate API (Batik Generation)

1. **Get API Token**: Sign up at [Replicate](https://replicate.com)
2. **Add Environment Variable**:
   ```env
   REPLICATE_API_TOKEN=your_token_here
   ```
3. **Update `AIStudio.tsx`**: Replace the setTimeout demo with actual API call

### Firebase Integration (Optional)

For user orders and data persistence:

1. **Install Firebase**:
   ```bash
   pnpm add firebase
   ```
2. **Setup**:
   ```typescript
   // lib/firebase.ts
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   
   const firebaseConfig = { /* your config */ };
   export const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   ```

## 📱 Pages

### `/` (Landing)
- Hero section with animated Indonesian ornaments
- Feature highlights
- Call-to-action buttons

### `/tour`
- Grid of destination cards
- Click to enter VR experience

### `/tour/[slug]`
- Full VR viewer with 360° panorama
- Interactive hotspots
- Location info and map
- Cultural history

### `/studio`
- Text prompt input
- AI pattern generation
- 3D clothing model preview
- Order functionality

### `/about`
- Mission and values
- Tech stack information
- Connection to BudayaGO competition

## 🎭 Cultural Elements

The website incorporates subtle Indonesian cultural motifs:

- **Batik Patterns**: Background overlays with radial gradients
- **Floating Ornaments**: Animated wayang silhouettes and lotus designs
- **Color Palette**: Inspired by terracotta (batik) and ocean blue (archipelago)
- **Warm Ivory Background**: Evokes traditional Indonesian textiles

## 🧪 Development Tips

1. **Hotspot Positions**: Hotspots use 3D coordinates relative to the camera (0, 0, 0). Adjust x, y, z to position markers.

2. **Panorama Images**: Use equirectangular 360° images. Recommended: 2:1 aspect ratio (e.g., 4096x2048px).

3. **3D Models**: The AI Studio uses a procedural torus knot. Replace with GLTF/GLB models for realistic clothing.

4. **Performance**: Three.js scenes are optimized with React Three Fiber's automatic rendering management.

## 📝 Notes

- Current AI generation uses procedural patterns for demo purposes
- Panorama images use Unsplash placeholders - replace with actual 360° photos
- VR hotspots are positioned relative to the sphere - may need adjustment based on panorama
- Order functionality is mocked - integrate with payment/ordering system as needed

## 🤝 Contributing

This project was built for the BudayaGO national competition. Contributions and improvements are welcome!

## 📄 License

Built for educational and competition purposes.

---

**Built with ❤️ for Indonesia's Cultural Heritage**
