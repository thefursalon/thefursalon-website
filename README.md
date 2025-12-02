# The Fur Salon - Next.js Website

A modern, responsive website for The Fur Salon, a premium dog grooming studio in Amsterdam Oost.

## Features

- 🎨 Modern, beautiful UI with Tailwind CSS
- 📱 Fully responsive design
- 🧩 Modular component structure
- ⚡ Built with Next.js 14 (App Router)
- 🎯 SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
fur-salon/
├── app/
│   ├── layout.tsx          # Root layout with Header and Footer
│   ├── page.tsx            # Main homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Header component (reusable)
│   ├── Footer.tsx          # Footer component (reusable)
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ServicesSection.tsx
│       ├── PricesSection.tsx
│       ├── GallerySection.tsx
│       ├── ReviewsSection.tsx
│       └── ContactSection.tsx
└── package.json
```

## Customization

### Update Contact Information

Edit `components/sections/ContactSection.tsx` to update:
- Phone number
- WhatsApp number
- Email address
- Location details

### Add Gallery Images

Replace the placeholder divs in `components/sections/GallerySection.tsx` with actual image components.

### Add Price Table

Replace the placeholder in `components/sections/PricesSection.tsx` with your price table image or create a proper table component.

### Add Google Maps

Replace the map placeholder in `components/sections/ContactSection.tsx` with an embedded Google Maps iframe.

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

