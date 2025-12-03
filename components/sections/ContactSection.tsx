import Link from 'next/link'

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Book an Appointment
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            We would love to welcome you and your dog to The Fur Salon.
            <br />
            For bookings or questions, feel free to contact us.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📍</span>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p>Derde Oosterparkstraat 46</p>
                    <p>1091 JZ Amsterdam, Netherlands</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📞</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href="tel:+31614255832" className="hover:text-primary-600 transition-colors">
                      +31 6 14255832
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">💬</span>
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <a href="https://wa.me/31614255832" className="hover:text-primary-600 transition-colors" target="_blank" rel="noopener noreferrer">
                      +31 6 14255832
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📧</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:info@thefursalon.nl" className="hover:text-primary-600 transition-colors">
                      info@thefursalon.nl
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Opening Hours</h4>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Mon – Fri:</span> 10:00 – 18:00</p>
                  <p><span className="font-semibold">Sat:</span> By appointment</p>
                  <p><span className="font-semibold">Sun:</span> Closed</p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="#contact"
                  className="inline-block bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Google Maps */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h3>
              <div className="rounded-lg overflow-hidden shadow-md aspect-square">
                <iframe
                  src="https://www.google.com/maps?q=Derde+Oosterparkstraat+46,+1091+JZ+Amsterdam,+Netherlands&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="The Fur Salon Location"
                ></iframe>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                Derde Oosterparkstraat 46, 1091 JZ Amsterdam, Netherlands
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

