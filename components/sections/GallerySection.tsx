'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function GallerySection() {
  const totalImages = 15
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesPerView, setImagesPerView] = useState(4)

  // Determine images per view based on screen size
  useEffect(() => {
    const updateImagesPerView = () => {
      if (window.innerWidth >= 1024) {
        setImagesPerView(4) // lg: 4 images
      } else if (window.innerWidth >= 768) {
        setImagesPerView(3) // md: 3 images
      } else {
        setImagesPerView(2) // sm: 2 images
      }
    }

    updateImagesPerView()
    window.addEventListener('resize', updateImagesPerView)
    return () => window.removeEventListener('resize', updateImagesPerView)
  }, [])

  const maxIndex = Math.max(0, totalImages - imagesPerView)

  // Adjust currentIndex when imagesPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [imagesPerView, maxIndex, currentIndex])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Generate image array
  const images = Array.from({ length: totalImages }, (_, i) => i + 1)

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Gallery
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12">
            A selection of our grooming results and happy clients.
          </p>
          
          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gold-500 hover:text-white transition-colors"
              aria-label="Previous images"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gold-500 hover:text-white transition-colors"
              aria-label="Next images"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Images Container */}
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / imagesPerView)}%)`,
                }}
              >
                {images.map((num) => (
                  <div
                    key={num}
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / imagesPerView}%` }}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                      <Image
                        src={`/dog-${num}.jpeg`}
                        alt={`Dog grooming ${num}`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? 'bg-gold-500 w-8'
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

