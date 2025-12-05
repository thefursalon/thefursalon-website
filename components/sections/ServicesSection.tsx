'use client'

import { useTranslation } from '@/contexts/TranslationContext'

export default function ServicesSection() {
  const { t } = useTranslation()

  const services = [
    {
      title: t.services.fullGrooming.title,
      description: t.services.fullGrooming.description,
    },
    {
      title: t.services.bathingService.title,
      description: t.services.bathingService.description,
    },
    {
      title: t.services.puppyFirstTime.title,
      description: t.services.puppyFirstTime.description,
    },
    {
      title: t.services.strippingCarding.title,
      description: t.services.strippingCarding.description,
    },
    {
      title: t.services.deepTeethCleaning.title,
      description: t.services.deepTeethCleaning.description,
    },
    {
      title: t.services.basicTeethCleaning.title,
      description: t.services.basicTeethCleaning.description,
    },
    {
      title: t.services.nailTrimming.title,
      description: t.services.nailTrimming.description,
    },
    {
      title: t.services.earCleaning.title,
      description: t.services.earCleaning.description,
    },
    {
      title: t.services.coloring.title,
      description: t.services.coloring.description,
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            {t.services.title}
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            {t.services.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-primary-600 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-700">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

