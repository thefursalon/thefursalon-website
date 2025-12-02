import Image from 'next/image'

export default function PricesSection() {
  return (
    <section id="prices" className="py-20 bg-primary-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Price List
          </h2>
          <p className="text-lg text-gray-100 text-center mb-8">
            Prices depend on breed, size, coat condition, behavior and desired style. Below are starting prices.
          </p>
          
          {/* Price List Image */}
          <div className="rounded-lg overflow-hidden shadow-lg mb-6">
            <Image
              src="/price-list.jpeg"
              alt="Price List"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <p className="text-center text-gray-200 italic">
            For more information, please contact us with your dog's breed and coat condition.
          </p>
        </div>
      </div>
    </section>
  )
}

