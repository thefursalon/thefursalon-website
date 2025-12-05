export type Language = 'nl' | 'en'

export interface Translations {
  header: {
    logo: string
    home: string
    about: string
    services: string
    prices: string
    gallery: string
    reviews: string
    contact: string
    bookAppointment: string
  }
  hero: {
    title: string
    subtitle: string
    description: string
    bookNow: string
  }
  about: {
    title: string
    paragraph1: string
    paragraph2: string
    paragraph3: string
    paragraph4: string
    paragraph5: string
  }
  services: {
    title: string
    description: string
    fullGrooming: {
      title: string
      description: string
    }
    bathingService: {
      title: string
      description: string
    }
    puppyFirstTime: {
      title: string
      description: string
    }
    strippingCarding: {
      title: string
      description: string
    }
    deepTeethCleaning: {
      title: string
      description: string
    }
    basicTeethCleaning: {
      title: string
      description: string
    }
    nailTrimming: {
      title: string
      description: string
    }
    earCleaning: {
      title: string
      description: string
    }
    coloring: {
      title: string
      description: string
    }
  }
  prices: {
    title: string
    description: string
    moreInfo: string
  }
  gallery: {
    title: string
    description: string
    previousImages: string
    nextImages: string
    goToSlide: string
    altText: string
  }
  reviews: {
    title: string
    description: string
    googleReviews: string
    testimonial1: {
      quote: string
      author: string
      dog: string
    }
    testimonial2: {
      quote: string
      author: string
      dog: string
    }
    testimonial3: {
      quote: string
      author: string
      dog: string
    }
  }
  contact: {
    title: string
    description: string
    contactInformation: string
    location: string
    address1: string
    address2: string
    phone: string
    whatsapp: string
    email: string
    openingHours: string
    openingHoursMonFri: string
    openingHoursSat: string
    openingHoursSun: string
    findUs: string
    bookNow: string
  }
  footer: {
    quickLinks: string
    home: string
    about: string
    services: string
    prices: string
    gallery: string
    reviews: string
    contact: string
    followUs: string
    legal: string
    privacyPolicy: string
    cookies: string
    copyright: string
    tagline: string
  }
}

export const translations: Record<Language, Translations> = {
  nl: {
    header: {
      logo: 'The Fur Salon',
      home: 'Home',
      about: 'Over Ons',
      services: 'Diensten',
      prices: 'Prijzen',
      gallery: 'Galerij',
      reviews: 'Beoordelingen',
      contact: 'Contact',
      bookAppointment: 'Afspraak Maken',
    },
    hero: {
      title: 'Premium Hondenverzorging in Amsterdam Oost',
      subtitle: 'Op maat gemaakte verzorging. Canine Couture.',
      description: 'Bij The Fur Salon krijgt elke hond persoonlijke zorg, moderne styling en een rustige boutique-ervaring — midden in het hart van Amsterdam Oost.',
      bookNow: 'Boek Nu',
    },
    about: {
      title: 'Over The Fur Salon',
      paragraph1: 'Welkom bij The Fur Salon, een boutique hondenverzorgingsstudio gevestigd in Amsterdam Oost.',
      paragraph2: 'Wij specialiseren ons in op maat gemaakte verzorging, moderne stijlen en een zachte, stressvrije aanpak zodat uw hond zich altijd veilig, comfortabel en geliefd voelt.',
      paragraph3: 'Met jarenlange professionele ervaring in verzorgingssalons en veterinaire omgevingen, begrijpen we zowel de schoonheids- als de gezondheidsbehoeften van elke hond. Elke behandeling is gepersonaliseerd — van vachttype en stijlvoorkeuren tot temperament en comfortniveau.',
      paragraph4: 'Bij The Fur Salon geloven we dat verzorging een plezierige ervaring zou moeten zijn. Geen haast, geen stress. Alleen kwaliteitszorg, premium producten en vakmanschap gewijd aan het naar boven halen van het beste in elke hond.',
      paragraph5: 'Uw hond verdient het om er geweldig uit te zien en zich geweldig te voelen.',
    },
    services: {
      title: 'Onze Diensten',
      description: 'Wij bieden gepersonaliseerde verzorging voor alle hondenrassen, met moderne technieken en hoogwaardige zorg.',
      fullGrooming: {
        title: 'Volledige Verzorging',
        description: 'Complete knipbeurt en styling op maat gemaakt voor het ras van uw hond of uw voorkeurslook. Inclusief bad, föhnen, hygiënegebied, nagels knippen en oren schoonmaken.',
      },
      bathingService: {
        title: 'Baddienst',
        description: 'Perfect voor regelmatig onderhoud. Zachte shampoo, föhnen en grondig borstelen om de vacht gezond en glanzend te houden.',
      },
      puppyFirstTime: {
        title: 'Puppy Eerste Keer',
        description: 'Een zachte introductie voor puppy\'s. Zachte behandeling, lekker bad, kleine trimbeurt en een rustige ervaring om vanaf het begin vertrouwen op te bouwen.',
      },
      strippingCarding: {
        title: 'Strippen / Kaarden',
        description: 'Specifieke handtechnieken gebruikt op draadharige en andere rassen om hun vacht goed te bewerken. Dit helpt om de perfecte kwaliteit, textuur en kleur van de vacht te krijgen.',
      },
      deepTeethCleaning: {
        title: 'Diepe Tandenreiniging',
        description: 'Reiniging en verwijdering van de tandsteen die zich kan ophopen.',
      },
      basicTeethCleaning: {
        title: 'Basis Tandenreiniging',
        description: 'Poetsen met specifieke producten om schone en gezonde tanden te behouden.',
      },
      nailTrimming: {
        title: 'Nagels Knippen',
        description: 'Snelle en veilige nagelverzorging om uw hond comfortabel en gezond te houden.',
      },
      earCleaning: {
        title: 'Oren Schoonmaken',
        description: 'Zachte reiniging om de hygiëne te behouden en infecties te voorkomen.',
      },
      coloring: {
        title: 'Kleuren',
        description: 'Niet-giftige en veganistische producten gemaakt voor dieren die wat kleur kunnen toevoegen aan uw hond.',
      },
    },
    prices: {
      title: 'Prijslijst',
      description: 'Prijzen zijn afhankelijk van ras, grootte, vachtconditie, gedrag en gewenste stijl. Hieronder staan de startprijzen.',
      moreInfo: 'Voor meer informatie, neem contact met ons op met het ras en de vachtconditie van uw hond.',
    },
    gallery: {
      title: 'Galerij',
      description: 'Een selectie van onze verzorgingsresultaten en tevreden klanten.',
      previousImages: 'Vorige afbeeldingen',
      nextImages: 'Volgende afbeeldingen',
      goToSlide: 'Ga naar dia',
      altText: 'Hondenverzorging',
    },
    reviews: {
      title: 'Wat Onze Klanten Zeggen',
      description: 'Lees meer beoordelingen op',
      googleReviews: 'Google Beoordelingen',
      testimonial1: {
        quote: 'Beste verzorger in Amsterdam Oost. Mijn cockapoo ziet er altijd perfect uit en voelt zich kalm na elk bezoek.',
        author: 'Sophie',
        dog: 'Cockapoo eigenaar',
      },
      testimonial2: {
        quote: 'Zeer zacht met mijn angstige hond. Mooie resultaten en professionele service.',
        author: 'Daniel',
        dog: 'Shih Tzu eigenaar',
      },
      testimonial3: {
        quote: 'Geweldige styling! Mijn pomeriaan heeft er nog nooit beter uitgezien. Zeer aanbevolen.',
        author: 'Laura',
        dog: 'Pomeriaan eigenaar',
      },
    },
    contact: {
      title: 'Maak een Afspraak',
      description: 'We zouden u en uw hond graag verwelkomen bij The Fur Salon. Voor boekingen of vragen, neem gerust contact met ons op.',
      contactInformation: 'Contactgegevens',
      location: 'Locatie',
      address1: 'Derde Oosterparkstraat 46',
      address2: '1091 JZ Amsterdam, Nederland',
      phone: 'Telefoon',
      whatsapp: 'WhatsApp',
      email: 'E-mail',
      openingHours: 'Openingstijden',
      openingHoursMonFri: 'Ma – Vr: 10:00 – 18:00',
      openingHoursSat: 'Za: Op afspraak',
      openingHoursSun: 'Zo: Gesloten',
      findUs: 'Vind Ons',
      bookNow: 'Boek Nu',
    },
    footer: {
      quickLinks: 'Snelle Links',
      home: 'Home',
      about: 'Over Ons',
      services: 'Diensten',
      prices: 'Prijzen',
      gallery: 'Galerij',
      reviews: 'Beoordelingen',
      contact: 'Contact',
      followUs: 'Volg Ons',
      legal: 'Juridisch',
      privacyPolicy: 'Privacybeleid',
      cookies: 'Cookies',
      copyright: '©️ The Fur Salon – Alle Rechten Voorbehouden.',
      tagline: 'Op maat gemaakte verzorging. Canine Couture.',
    },
  },
  en: {
    header: {
      logo: 'The Fur Salon',
      home: 'Home',
      about: 'About',
      services: 'Services',
      prices: 'Prices',
      gallery: 'Gallery',
      reviews: 'Reviews',
      contact: 'Contact',
      bookAppointment: 'Book Appointment',
    },
    hero: {
      title: 'Premium Dog Grooming in Amsterdam Oost',
      subtitle: 'Tailored grooming. Canine Couture.',
      description: 'At The Fur Salon, every dog receives personalised care, modern styling and a calm boutique experience — right in the heart of Amsterdam Oost.',
      bookNow: 'Book Now',
    },
    about: {
      title: 'About The Fur Salon',
      paragraph1: 'Welcome to The Fur Salon, a boutique dog grooming studio located in Amsterdam Oost.',
      paragraph2: 'We specialise in tailored grooming, modern styles and a gentle, stress-free approach so your dog always feels safe, comfortable and loved.',
      paragraph3: 'With years of professional experience in grooming salons and veterinary environments, we understand both the beauty and the health needs of each dog. Every treatment is personalised — from coat type and styling preferences to temperament and comfort level.',
      paragraph4: 'At The Fur Salon, we believe grooming should be a an enjoyable experience. No rush, no stress. Just quality care, premium products and craftsmanship dedicated to bringing out the best in every dog.',
      paragraph5: 'Your dog deserves to look and feel amazing.',
    },
    services: {
      title: 'Our Services',
      description: 'We offer personalised grooming for all dog breeds, with modern techniques and high-quality care.',
      fullGrooming: {
        title: 'Full Grooming',
        description: 'Complete cut & style tailored to your dog\'s breed or your preferred look. Includes bath, blow-dry, hygiene area, nails clipping and cleaning ears.',
      },
      bathingService: {
        title: 'Bathing service',
        description: 'Perfect for regular maintenance. Gentle shampoo, blow-dry and thorough brushing to keep the coat healthy and shiny.',
      },
      puppyFirstTime: {
        title: 'Puppy First Time',
        description: 'A gentle introduction for puppies. Soft handling, nice bath, small trimming and a calm experience to build confidence from the start.',
      },
      strippingCarding: {
        title: 'Stripping / Carding',
        description: 'Specific hand techniques used on wire haired and other breeds to properly work their fur. This helps getting the perfect quality, texture and color of the coat.',
      },
      deepTeethCleaning: {
        title: 'Deep teeth cleaning',
        description: 'Cleaning and removal of the tartar that may build.',
      },
      basicTeethCleaning: {
        title: 'Basic teeth cleaning',
        description: 'Brushing with specific products to maintain a clean and healthy teeth',
      },
      nailTrimming: {
        title: 'Nail Trimming',
        description: 'Quick and safe nail care to keep your dog comfortable and healthy.',
      },
      earCleaning: {
        title: 'Ear Cleaning',
        description: 'Delicate cleaning to maintain hygiene and prevent infections.',
      },
      coloring: {
        title: 'Coloring',
        description: 'Non-toxic and vegan products made for animals that can add some sparkle of colour to your dog.',
      },
    },
    prices: {
      title: 'Price List',
      description: 'Prices depend on breed, size, coat condition, behavior and desired style. Below are starting prices.',
      moreInfo: 'For more information, please contact us with your dog\'s breed and coat condition.',
    },
    gallery: {
      title: 'Gallery',
      description: 'A selection of our grooming results and happy clients.',
      previousImages: 'Previous images',
      nextImages: 'Next images',
      goToSlide: 'Go to slide',
      altText: 'Dog grooming',
    },
    reviews: {
      title: 'What Our Clients Say',
      description: 'Read more reviews on',
      googleReviews: 'Google Reviews',
      testimonial1: {
        quote: 'Best groomer in Amsterdam Oost. My cockapoo always looks perfect and feels calm after every visit.',
        author: 'Sophie',
        dog: 'Cockapoo owner',
      },
      testimonial2: {
        quote: 'Very gentle with my anxious dog. Beautiful results and professional service.',
        author: 'Daniel',
        dog: 'Shih Tzu owner',
      },
      testimonial3: {
        quote: 'Amazing styling! My pomeranian has never looked better. Highly recommended.',
        author: 'Laura',
        dog: 'Pomeranian owner',
      },
    },
    contact: {
      title: 'Book an Appointment',
      description: 'We would love to welcome you and your dog to The Fur Salon. For bookings or questions, feel free to contact us.',
      contactInformation: 'Contact Information',
      location: 'Location',
      address1: 'Derde Oosterparkstraat 46',
      address2: '1091 JZ Amsterdam, Netherlands',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      email: 'Email',
      openingHours: 'Opening Hours',
      openingHoursMonFri: 'Mon – Fri: 10:00 – 18:00',
      openingHoursSat: 'Sat: By appointment',
      openingHoursSun: 'Sun: Closed',
      findUs: 'Find Us',
      bookNow: 'Book Now',
    },
    footer: {
      quickLinks: 'Quick Links',
      home: 'Home',
      about: 'About',
      services: 'Services',
      prices: 'Prices',
      gallery: 'Gallery',
      reviews: 'Reviews',
      contact: 'Contact',
      followUs: 'Follow Us',
      legal: 'Legal',
      privacyPolicy: 'Privacy Policy',
      cookies: 'Cookies',
      copyright: '©️ The Fur Salon – All Rights Reserved.',
      tagline: 'Tailored grooming. Canine Couture.',
    },
  },
}

