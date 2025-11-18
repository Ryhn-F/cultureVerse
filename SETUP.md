# CultureVerse Setup Guide

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env.local` file for production APIs:

```env
# Replicate API for AI batik generation
REPLICATE_API_TOKEN=your_token_here

# Optional: Firebase for user orders
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
# ... other Firebase config
```

## 🎨 Customization

### Adding New Destinations

Edit `/src/app/tour/[slug]/page.tsx`:

1. Add destination data to the `destinationData` object
2. Provide a 360° panorama image URL (equirectangular format)
3. Define hotspots with 3D positions `[x, y, z]`

Example:
```typescript
newDestination: {
  id: "destination-id",
  name: "Destination Name",
  location: "City, Province",
  description: "Brief description",
  panoramaUrl: "https://your-360-image.jpg",
  hotspots: [
    {
      id: "hotspot-1",
      position: [2, 1, -3], // x, y, z coordinates
      title: "Hotspot Title",
      description: "Information about this point of interest",
    },
  ],
  history: "Historical background...",
}
```

### Hotspot Positioning

Hotspots use 3D coordinates relative to the camera center (0, 0, 0):
- **x**: Left (-) / Right (+)
- **y**: Down (-) / Up (+)
- **z**: Forward (+) / Backward (-)

Adjust values to position markers on the panorama.

### Connecting Real AI for Batik Generation

Replace the demo generation in `/src/components/AIStudio.tsx`:

```typescript
const handleGenerate = async () => {
  setIsGenerating(true);
  
  try {
    // Replicate API example
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'your-model-version-id',
        input: {
          prompt: `batik pattern, ${prompt}, Indonesian traditional motif, detailed`,
          width: 512,
          height: 512,
        },
      }),
    });
    
    const prediction = await response.json();
    // Poll for completion
    // Apply generated image to 3D model
  } catch (error) {
    console.error('Generation failed:', error);
  } finally {
    setIsGenerating(false);
  }
};
```

### Replacing 3D Clothing Model

The current demo uses a procedural torus knot. To use a real clothing model:

1. **Add GLTF/GLB model** to `/public/models/`
2. **Update `ClothingModel` component**:

```typescript
import { useGLTF } from '@react-three/drei';

function ClothingModel({ textureUrl }: { textureUrl: string | null }) {
  const { scene } = useGLTF('/models/clothing.glb');
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  
  // Apply texture to model
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.map = texture;
    }
  });
  
  return <primitive object={scene} />;
}
```

## 📸 Image Requirements

### Panorama Images
- **Format**: Equirectangular (360°)
- **Aspect Ratio**: 2:1 (e.g., 4096×2048px)
- **Format**: JPG or PNG
- **Size**: Optimize for web (2-5MB recommended)

### Destination Thumbnails
- **Aspect Ratio**: 16:9 or 4:3
- **Size**: 800×600px minimum
- **Format**: JPG (optimized)

## 🎯 Production Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Any Node.js hosting**

## 🐛 Troubleshooting

### VR Viewer Not Loading
- Check panorama image URL is accessible
- Ensure image is equirectangular format
- Verify CORS settings if using external images

### AI Studio Texture Not Applying
- Check browser console for errors
- Verify texture generation completes
- Ensure canvas API is available

### Build Errors
- Run `pnpm install` to ensure all dependencies are installed
- Clear `.next` folder and rebuild
- Check Node.js version (18+ required)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Replicate API](https://replicate.com/docs)

---

For questions or issues, refer to the main README.md file.


