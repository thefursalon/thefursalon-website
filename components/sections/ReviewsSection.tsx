const testimonials = [
  {
    quote: "Best groomer in Amsterdam Oost. My cockapoo always looks perfect and feels calm after every visit.",
    author: "Sophie",
    dog: "Cockapoo owner",
  },
  {
    quote: "Very gentle with my anxious dog. Beautiful results and professional service.",
    author: "Daniel",
    dog: "Shih Tzu owner",
  },
  {
    quote: "Amazing styling! My pomeranian has never looked better. Highly recommended.",
    author: "Laura",
    dog: "Pomeranian owner",
  },
]

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12">
            Read more reviews on{' '}
            <a
              href="https://g.page/r/CfGigsbIWEUeEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:text-gold-600 font-semibold underline"
            >
              Google Reviews
            </a>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <svg
                    className="w-8 h-8 text-gold-500 mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.481.967-4.996 2.848-4.996 6.153 0 3.56 2.9 6.553 6.517 7.39v4.306h-11.5zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.482.967-5.996 2.848-5.996 6.153 0 3.56 2.9 6.553 6.517 7.39v4.306h-11.517z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <p className="text-gray-900 font-semibold">
                  — {testimonial.author}, {testimonial.dog}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

