'use client'

import { useTranslation } from '@/contexts/TranslationContext'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section 
      id="home" 
      className="relative py-20 md:py-32 min-h-[600px] md:min-h-[700px] flex items-center"
      style={{
        backgroundImage: 'url(/banner.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 65%',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="container mx-auto px-4 relative z-10 mt-16 md:mt-80">
        <div className="max-w-4xl mx-auto text-center">
          {/* Semi-transparent background container for better text visibility */}
          <div className="rounded-2xl p-8 md:p-12 shadow-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              {t.hero.title}
            </h1>
            <p className="text-2xl md:text-3xl text-primary-400 font-semibold mb-6 drop-shadow-xl">
              {t.hero.subtitle}
            </p>
            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-lg">
              {t.hero.description}
            </p>
            <a
              href="https://wa.me/31614255832"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              {t.hero.bookNow}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

