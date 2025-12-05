'use client'

import { useTranslation } from '@/contexts/TranslationContext'

export default function AboutSection() {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-20 bg-primary-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            {t.about.title}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-100 space-y-6">
            <p>
              {t.about.paragraph1}
            </p>
            <p>
              {t.about.paragraph2}
            </p>
            <p>
              {t.about.paragraph3}
            </p>
            <p>
              {t.about.paragraph4}
            </p>
            <p className="text-primary-400 font-semibold text-xl">
              {t.about.paragraph5}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

