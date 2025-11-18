# AGENTS.md - AI Agent Development Guide

## 🤖 Overview

This document provides guidance for AI agents (like Kiro, Cursor, GitHub Copilot, etc.) working on the **CultureVerse** project. It contains project context, architecture patterns, coding conventions, and common tasks to help agents understand and contribute effectively.

---

## 📋 Project Context

**CultureVerse** is a Next.js 14 application that connects people with Indonesian cultural heritage through:
- 360° VR tourism experiences of Indonesian destinations
- AI-powered batik pattern generation and fashion preview
- Interactive cultural storytelling with hotspots

**Competition**: Built for [BudayaGO](https://www.budayago.id/) national competition

---

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4
- **3D/VR**: Three.js, React Three Fiber, @react-three/drei
- **AI**: Google Gemini API (image generation)
- **Storage**: Supabase, Firebase, Cloudinary
- **Auth**: Google Auth Library

### Project Structure
```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout with Navbar/Footer
│   ├── globals.css                 # Global styles
│   ├── tour/
│   │   ├── page.tsx                # Destination list
│   │   └── [slug]/page.tsx         # Individual VR experience
│   ├── studio/
│   │   └── page.tsx                # AI Batik Studio
│   ├── about/
│   │   └── page.tsx                # About page
│   ├── test-image/
│   │   └── page.tsx                # Image generation testing
│   └── api/
│       ├── image-generation/       # Gemini image generation
│       ├── gemini/                 # Gemini text API
│       ├── destinations/           # Destination data
│       └── destination-card/       # Card generation
└── components/
    ├── Navbar.tsx                  # Navigation bar
    ├── Hero.tsx                    # Hero section with animations
    ├── Footer.tsx                  # Footer
    ├── DestinationCard.tsx         # Destination card component
    ├── VRViewer.tsx                # 360° VR viewer with hotspots
    └── AIStudio.tsx                # AI batik generation studio
```

---

## 🎨 Design System

### Color Palette
```typescript
// Primary colors (use these consistently)
const colors = {
  terracotta: '#D97706',      // Primary accent (batik)
  oceanBlue: '#2563EB',        // Secondary accent (archipelago)
  warmIvory: '#FFF8E7',        // Background
  softGrey: '#E5E7EB',         // Shadows
  darkBrown: '#78350F',        // Text/headings
}
```

### Typography
- **Font**: Plus Jakarta Sans (loaded via Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing & Layout
- Use Tailwind's spacing scale consistently
- Container max-width: `max-w-7xl`
- Section padding: `py-16` or `py-20`

---

## 🔑 Environment Variables

Required environment variables (see `.env.example`):

```env
# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Firebase (optional)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🧩 Key Components

### 1. VRViewer Component (`src/components/VRViewer.tsx`)

**Purpose**: Renders 360° panoramic VR experiences with interactive hotspots

**Key Features**:
- Three.js sphere with inverted normals for panorama
- Orbit controls for drag-to-explore
- Interactive hotspots with 3D positioning
- Collapsible sidebar for hotspot information

**Usage**:
```tsx
<VRViewer
  panoramaUrl="/path/to/360-image.jpg"
  hotspots={[
    {
      id: '1',
      position: [x, y, z],  // 3D coordinates
      title: 'Hotspot Title',
      description: 'Cultural information...',
      story: 'Detailed story...'
    }
  ]}
  locationName="Borobudur Temple"
/>
```

**When modifying**:
- Hotspot positions are relative to camera at (0, 0, 0)
- Use equirectangular 360° images (2:1 aspect ratio)
- Test hotspot visibility from different angles

### 2. AIStudio Component (`src/components/AIStudio.tsx`)

**Purpose**: AI-powered batik pattern generation with 3D preview

**Key Features**:
- Text prompt input for batik design
- Integration with Gemini image generation API
- 3D model preview with dynamic texture application
- Multiple clothing models (shirt, kebaya, dress)

**API Integration**:
```typescript
// Calls /api/image-generation
const response = await fetch('/api/image-generation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: enhancedPrompt })
});
```

**When modifying**:
- Enhance prompts with batik-specific keywords
- Handle loading states and errors gracefully
- Optimize 3D model performance

### 3. DestinationCard Component

**Purpose**: Display destination cards with hover effects

**Props**:
```typescript
interface DestinationCardProps {
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
}
```

---

## 🛣️ API Routes

### POST `/api/image-generation`

**Purpose**: Generate batik patterns using Google Gemini API

**Request**:
```json
{
  "prompt": "Traditional Javanese batik with parang motif"
}
```

**Response**:
```json
{
  "success": true,
  "imageBase64": "base64_encoded_image_data",
  "textResponse": "Optional text description",
  "mimeType": "image/png"
}
```

**Error Handling**:
- Returns 400 if prompt is missing
- Returns 500 if GEMINI_API_KEY not configured
- Logs detailed errors for debugging

**When modifying**:
- Keep prompt enhancement logic consistent
- Handle rate limits gracefully
- Cache responses when appropriate

---

## 📝 Coding Conventions

### TypeScript
- Use TypeScript for all new files
- Define interfaces for props and data structures
- Avoid `any` type - use `unknown` or proper types
- Use optional chaining (`?.`) for nested properties

### React Components
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use `'use client'` directive for client components

### Styling
- Use Tailwind CSS utility classes
- Avoid inline styles unless dynamic
- Group related classes logically
- Use responsive modifiers (`sm:`, `md:`, `lg:`)

### File Naming
- Components: PascalCase (e.g., `VRViewer.tsx`)
- Pages: lowercase (e.g., `page.tsx`)
- API routes: lowercase (e.g., `route.ts`)
- Utilities: camelCase (e.g., `formatDate.ts`)

### Imports
```typescript
// Order: React, Next.js, external, internal, types
import { useState } from 'react';
import { NextResponse } from 'next/server';
import { Canvas } from '@react-three/fiber';
import { VRViewer } from '@/components/VRViewer';
import type { Destination } from '@/types';
```

---

## 🎯 Common Tasks

### Adding a New Destination

1. **Add destination data** in `/src/app/tour/page.tsx`:
```typescript
{
  id: 'new-destination',
  name: 'Destination Name',
  slug: 'destination-slug',
  description: 'Brief description',
  imageUrl: '/path/to/image.jpg',
  panoramaUrl: '/path/to/360-image.jpg',
  location: 'Province, Indonesia',
  hotspots: [
    {
      id: '1',
      position: [x, y, z],
      title: 'Hotspot Title',
      description: 'Info...',
      story: 'Story...'
    }
  ]
}
```

2. **Test the VR experience** at `/tour/destination-slug`

3. **Adjust hotspot positions** by testing different x, y, z coordinates

### Adding a New API Endpoint

1. **Create route file**: `src/app/api/[endpoint]/route.ts`

2. **Implement handlers**:
```typescript
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Handle GET request
  return NextResponse.json({ data: 'response' });
}

export async function POST(req: Request) {
  const body = await req.json();
  // Handle POST request
  return NextResponse.json({ success: true });
}
```

3. **Add error handling** and validation

4. **Test with `/api/[endpoint]`**

### Modifying the AI Generation

1. **Update prompt enhancement** in `AIStudio.tsx`:
```typescript
const enhancedPrompt = `${prompt}, Indonesian batik style, traditional motifs, high detail`;
```

2. **Adjust generation config** in `/api/image-generation/route.ts`:
```typescript
generationConfig: {
  responseModalities: ["TEXT", "IMAGE"],
  // Add more config options
}
```

3. **Handle new response formats** in the component

### Adding a New Page

1. **Create page file**: `src/app/[route]/page.tsx`

2. **Add to navigation** in `Navbar.tsx`:
```typescript
<Link href="/new-route">New Page</Link>
```

3. **Follow layout patterns** from existing pages

4. **Add metadata**:
```typescript
export const metadata = {
  title: 'Page Title | CultureVerse',
  description: 'Page description'
};
```

---

## 🐛 Debugging Tips

### Three.js Issues
- Check browser console for WebGL errors
- Verify image URLs are accessible
- Test hotspot positions with visible markers
- Use `<Stats />` from drei for performance monitoring

### API Issues
- Check environment variables are set
- Verify API keys are valid
- Log request/response data
- Test endpoints with GET first

### Styling Issues
- Verify Tailwind classes are valid
- Check for conflicting styles
- Use browser DevTools to inspect computed styles
- Test responsive breakpoints

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `pnpm install`
- Check TypeScript errors: `pnpm build`
- Verify all imports are correct

---

## 🚀 Performance Optimization

### Images
- Use Next.js `<Image>` component for optimization
- Provide width/height to prevent layout shift
- Use appropriate image formats (WebP for photos)
- Lazy load images below the fold

### 3D/VR
- Limit polygon count on 3D models
- Use texture compression
- Implement level-of-detail (LOD) for complex scenes
- Dispose of Three.js objects when unmounting

### API Calls
- Implement caching for repeated requests
- Use SWR or React Query for data fetching
- Debounce user input for search/generation
- Show loading states immediately

---

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] All pages load without errors
- [ ] VR viewer works on desktop and mobile
- [ ] AI generation produces valid images
- [ ] Navigation works correctly
- [ ] Responsive design on all breakpoints
- [ ] Images load properly
- [ ] API endpoints return expected data

### Browser Testing
- Chrome/Edge (primary)
- Firefox
- Safari (especially for Three.js)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Docs](https://threejs.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Google Gemini API](https://ai.google.dev/docs)

### Cultural References
- [Indonesian Batik Patterns](https://en.wikipedia.org/wiki/Batik)
- [Indonesian Tourism](https://www.indonesia.travel/)
- [BudayaGO Competition](https://www.budayago.id/)

---

## 🤝 Contributing Guidelines

### Before Making Changes
1. Read this document thoroughly
2. Understand the existing code patterns
3. Check for similar implementations
4. Test locally before committing

### Code Review Checklist
- [ ] Follows TypeScript conventions
- [ ] Uses Tailwind CSS consistently
- [ ] Includes error handling
- [ ] Works on mobile devices
- [ ] No console errors
- [ ] Maintains design system
- [ ] Documented complex logic

### Commit Messages
```
feat: Add new destination (Komodo Island)
fix: Correct hotspot positioning in VR viewer
style: Update button colors to match design system
refactor: Extract API logic into separate function
docs: Update AGENTS.md with new patterns
```

---

## 🎓 Learning the Codebase

### Start Here
1. Read `README.md` for project overview
2. Explore `src/app/page.tsx` (landing page)
3. Study `VRViewer.tsx` (core 3D functionality)
4. Review `AIStudio.tsx` (AI integration)
5. Check API routes in `src/app/api/`

### Key Concepts to Understand
- Next.js App Router and file-based routing
- React Three Fiber for declarative 3D
- Tailwind CSS utility-first approach
- Server vs Client Components
- API route handlers

---

## 💡 Tips for AI Agents

### When Adding Features
- Maintain consistency with existing patterns
- Use the established color palette
- Follow the component structure
- Keep cultural authenticity in mind
- Test on multiple devices

### When Fixing Bugs
- Check related components first
- Look for similar issues in other files
- Test the fix thoroughly
- Consider edge cases
- Update documentation if needed

### When Refactoring
- Don't break existing functionality
- Maintain backward compatibility
- Update all references
- Test all affected pages
- Keep commits focused

### When Unsure
- Check existing implementations
- Refer to official documentation
- Ask for clarification
- Start with small changes
- Test incrementally

---

## 📞 Support

For questions about:
- **Architecture**: Check this document and README.md
- **Design**: Refer to Design System section
- **APIs**: See API Routes section
- **Three.js**: Check VRViewer component and Three.js docs
- **Deployment**: See SETUP.md

---

**Last Updated**: November 2025
**Version**: 1.0.0
**Maintained for**: BudayaGO Competition

---

*This document is designed to help AI agents understand and contribute to CultureVerse effectively. Keep it updated as the project evolves.*
