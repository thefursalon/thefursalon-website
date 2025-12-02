const services = [
  {
    title: 'Full Grooming',
    description: 'Complete cut & style tailored to your dog\'s breed or your preferred look. Includes bath, blow-dry, hygiene area, nails clipping and cleaning ears.',
  },
  {
    title: 'Bathing service',
    description: 'Perfect for regular maintenance. Gentle shampoo, blow-dry and thorough brushing to keep the coat healthy and shiny.',
  },
  {
    title: 'Puppy First Time',
    description: 'A gentle introduction for puppies. Soft handling, nice bath, small trimming and a calm experience to build confidence from the start.',
  },
  {
    title: 'Stripping / Carding',
    description: 'Specific hand techniques used on wire haired and other breeds to properly work their fur. This helps getting the perfect quality, texture and color of the coat.',
  },
  {
    title: 'Deep teeth cleaning',
    description: 'Cleaning and removal of the tartar that may build.',
  },
  {
    title: 'Basic teeth cleaning',
    description: 'Brushing with specific products to maintain a clean and healthy teeth',
  },
  {
    title: 'Nail Trimming',
    description: 'Quick and safe nail care to keep your dog comfortable and healthy.',
  },
  {
    title: 'Ear Cleaning',
    description: 'Delicate cleaning to maintain hygiene and prevent infections.',
  },
  {
    title: 'Coloring',
    description: 'Non-toxic and vegan products made for animals that can add some sparkle of colour to your dog.',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Our Services
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            We offer personalised grooming for all dog breeds, with modern techniques and high-quality care.
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

