export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-primary-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            About The Fur Salon
          </h2>
          <div className="prose prose-lg max-w-none text-gray-100 space-y-6">
            <p>
              Welcome to The Fur Salon, a boutique dog grooming studio located in Amsterdam Oost.
            </p>
            <p>
              We specialise in tailored grooming, modern styles and a gentle, stress-free approach so your dog always feels safe, comfortable and loved.
            </p>
            <p>
              With years of professional experience in grooming salons and veterinary environments, we understand both the beauty and the health needs of each dog. Every treatment is personalised — from coat type and styling preferences to temperament and comfort level.
            </p>
            <p>
              At The Fur Salon, we believe grooming should be a an enjoyable experience. No rush, no stress. Just quality care, premium products and craftsmanship dedicated to bringing out the best in every dog.
            </p>
            <p className="text-primary-400 font-semibold text-xl">
              Your dog deserves to look and feel amazing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

