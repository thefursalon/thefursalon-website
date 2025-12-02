import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import PricesSection from '@/components/sections/PricesSection'
import GallerySection from '@/components/sections/GallerySection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PricesSection />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
    </div>
  )
}

