import { ActivePage } from '../types';
import { PRIORITY_LOCATIONS } from '../data/serviceAreaData';

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
}

export const SEO_MAP: Record<string, PageSeoConfig> = {
  home: {
    title: 'Pet Grooming & Pet Spa in Mangalore | Coastal Tails',
    description: 'Coastal Tails offers professional dog and cat grooming, pet spa and mobile pet grooming at your doorstep across Mangaluru. Book your grooming session today.',
    keywords: 'pet grooming mangalore, dog grooming mangaluru, cat grooming mangalore, mobile pet grooming mangalore, pet spa mangalore, doorstep dog grooming mangaluru',
    canonicalPath: '/',
  },
  'pet-grooming-mangalore': {
    title: 'Pet Grooming in Mangalore | Studio & Doorstep Mobile Care | Coastal Tails',
    description: 'Professional dog and cat grooming in Mangalore. Studio spa sessions in Derebail and Coastal Tails GO mobile doorstep grooming van across Mangaluru.',
    keywords: 'pet grooming mangalore, pet groomer mangaluru, dog and cat grooming mangalore, doorstep pet grooming mangalore',
    canonicalPath: '/pet-grooming-mangalore',
  },
  'dog-grooming-mangalore': {
    title: 'Dog Grooming in Mangalore | Full Haircut, Bath & De-shedding | Coastal Tails',
    description: 'Expert dog grooming in Mangaluru. Essential baths, breed styling scissor haircuts, deep de-shedding, and medicated soothing baths tailored for all dog breeds.',
    keywords: 'dog grooming mangalore, dog haircut mangaluru, puppy grooming mangalore, dog bath mangalore, dog groomer near me',
    canonicalPath: '/dog-grooming-mangalore',
  },
  'cat-grooming-mangalore': {
    title: 'Cat Grooming in Mangalore | Gentle Feline Bath, Styling & Dematting | Coastal Tails',
    description: 'Stress-free cat grooming in Mangaluru. Specialized quiet bath, Persian knot dematting, claw clipping, lion cuts, and sanitary hygiene trims.',
    keywords: 'cat grooming mangalore, cat bath mangaluru, persian cat grooming mangalore, cat nail clipping mangalore',
    canonicalPath: '/cat-grooming-mangalore',
  },
  'pet-spa-mangalore': {
    title: 'Pet Spa in Mangalore | Mineral Mud Baths & Aromatherapy | Coastal Tails',
    description: 'Luxury pet spa treatments in Mangaluru: Dead Sea mineral mud wraps, blueberry facial scrub, paw butter massage, and restorative coat hydration.',
    keywords: 'pet spa mangalore, dog spa mangaluru, dead sea mud pack for dogs, pet massage mangalore',
    canonicalPath: '/pet-spa-mangalore',
  },
  'mobile-pet-grooming-mangalore': {
    title: 'Coastal Tails GO | Mobile Pet Grooming at Your Doorstep in Mangalore',
    description: 'Mangaluru’s premier mobile pet grooming van brought directly to your home. No salon waiting room, no travel stress. Clean warm water hydro-baths and styling.',
    keywords: 'mobile pet grooming mangalore, coastal tails go, doorstep dog grooming mangalore, mobile pet groomer mangaluru, pet grooming van',
    canonicalPath: '/mobile-pet-grooming-mangalore',
  },
  'home-pet-grooming-mangalore': {
    title: 'Home Pet Grooming in Mangalore | Doorstep Dog & Cat Care | Coastal Tails GO',
    description: 'Professional home pet grooming across Mangaluru. Air-conditioned mobile studio parked in your driveway with 1-on-1 certified stylist attention.',
    keywords: 'home pet grooming mangalore, pet grooming at home mangaluru, doorstep cat grooming mangalore',
    canonicalPath: '/home-pet-grooming-mangalore',
  },
  'dog-grooming-at-home-mangalore': {
    title: 'Dog Grooming at Home in Mangalore | Coastal Tails GO Doorstep Van',
    description: 'Convenient dog grooming at home across Mangaluru. Warm hydro-baths, de-shedding, nail clipping, and breed haircuts right outside your gate.',
    keywords: 'dog grooming at home mangalore, home dog bath mangaluru, mobile dog grooming mangalore',
    canonicalPath: '/dog-grooming-at-home-mangalore',
  },
  services: {
    title: 'Dog & Cat Grooming Packages & Spa Services | Coastal Tails Mangaluru',
    description: 'Explore full grooming packages, routine baths, de-shedding, feline styling, and Coastal Tails GO mobile doorstep grooming services in Mangaluru.',
    keywords: 'dog grooming packages, cat bath mangalore, pet spa services mangaluru, mobile pet grooming mangalore',
    canonicalPath: '/services',
  },
  locations: {
    title: 'Service Areas & Coverage Zones in Mangaluru | Coastal Tails GO',
    description: 'Explore Coastal Tails grooming coverage across Mangaluru. From Derebail, Kadri, and Bejai to Surathkal and Deralakatte with our doorstep mobile van.',
    keywords: 'pet grooming service areas mangalore, coastal tails coverage mangaluru, dog grooming derebail, mobile pet grooming surathkal',
    canonicalPath: '/locations',
  },
  education: {
    title: 'Pet Care & Grooming Guide for Mangalore | Coastal Tails Content Hub',
    description: 'Expert grooming education, coastal humidity coat care tips, cat hygiene guides, shedding facts, and funny pet stories from the Coastal Tails team.',
    keywords: 'pet care guide mangalore, dog grooming tips, monsoon pet care mangaluru, coastal tails blog',
    canonicalPath: '/education',
  },
  about: {
    title: 'About Coastal Tails | Premier Pet Grooming Studio & Spa Mangaluru',
    description: 'Learn about Coastal Tails – our pet-first handling philosophy, clean hygienic equipment, experienced grooming team, and dedication to pets in Mangaluru.',
    keywords: 'about coastal tails, professional pet groomers mangalore, hygienic pet spa mangaluru',
    canonicalPath: '/about',
  },
  shop: {
    title: 'Pet Food & Accessories in Mangalore | Coastal Tails Store',
    description: 'Shop premium dog & cat food, treats, supplements, harnesses, toys, leashes, and grooming essentials in Mangaluru with convenient WhatsApp order delivery.',
    keywords: 'pet store mangalore, buy dog food mangaluru, cat food mangalore, pet accessories mangalore',
    canonicalPath: '/shop',
  },
  food: {
    title: 'Dog & Cat Food in Mangalore | Trusted Nutrition | Coastal Tails',
    description: 'Browse premium dog food, cat food, treats, and everyday pet nutrition from trusted brands with transparent prices and WhatsApp ordering in Mangaluru.',
    keywords: 'buy dog food mangalore, cat food mangaluru, royal canin mangalore, pet food shop',
    canonicalPath: '/shop/food',
  },
  accessories: {
    title: 'Pet Accessories in Mangalore | Collars, Leashes & Beds | Coastal Tails',
    description: 'Explore ergonomic collars, harnesses, plush beds, interactive toys, feeding bowls, and grooming brushes for dogs and cats in Mangaluru.',
    keywords: 'dog harness mangalore, pet collars, cat toys mangaluru, grooming brushes mangalore',
    canonicalPath: '/shop/accessories',
  },
  membership: {
    title: 'Coastal Tails Pet Parent Club | Exclusive Member Rewards & Care',
    description: 'Join the Coastal Tails Pet Parent Club. Enjoy member-only grooming benefits, special offers, and selected pet-care rewards throughout the year in Mangaluru.',
    keywords: 'pet membership mangalore, pet parent club, coastal tails rewards',
    canonicalPath: '/membership',
  },
  contact: {
    title: 'Contact Us & Studio Location | Coastal Tails Mangaluru',
    description: 'Connect with Coastal Tails Grooming Studio & Pet Spa in Derebail, Mangaluru. Call or WhatsApp +91 79969 89956 for grooming quotes and appointments.',
    keywords: 'coastal tails location, pet groomer near me derebail, coastal tails phone number, mangalore pet salon address',
    canonicalPath: '/contact',
  },
  policies: {
    title: 'Studio & Mobile Grooming Policies | Coastal Tails Mangaluru',
    description: 'Transparent customer policies: grooming safety standards, mobile advance cancellation terms, hygiene return rules, and privacy practices.',
    keywords: 'coastal tails policies, grooming terms mangalore, pet safety policy',
    canonicalPath: '/policies',
  },
  '404': {
    title: '404: Page Not Found | Coastal Tails Pet Grooming & Spa Mangaluru',
    description: 'Oops! This paw-print trail led nowhere. The pet grooming page or service you are looking for has moved or does not exist.',
    keywords: 'page not found, 404 error, coastal tails mangalore',
    canonicalPath: '/404',
  },
};

export const updateDocumentSEO = (page: ActivePage, locationSlug?: string) => {
  let config: PageSeoConfig;

  if (page === 'location-detail' && locationSlug) {
    const loc = PRIORITY_LOCATIONS.find((l) => l.slug === locationSlug);
    if (loc) {
      config = {
        title: loc.metaTitle,
        description: loc.metaDescription,
        keywords: `pet grooming ${loc.name.toLowerCase()} mangalore, dog grooming ${loc.name.toLowerCase()}, mobile pet grooming ${loc.name.toLowerCase()} mangaluru, coastal tails ${loc.name.toLowerCase()}`,
        canonicalPath: `/locations/${loc.slug}`,
      };
    } else {
      config = SEO_MAP.locations;
    }
  } else {
    config = SEO_MAP[page] || SEO_MAP.home;
  }

  // Update Page Title
  document.title = config.title;

  // Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.description);

  // Update Meta Keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', config.keywords);

  // Update OpenGraph Title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', config.title);

  // Update OpenGraph Description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', config.description);

  // Update Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', `https://coastaltails.in${config.canonicalPath}`);

  // Inject or update Schema Structured Data
  injectStructuredData(page, locationSlug);
};

export const MANGALORE_GROOMING_FAQS = [
  {
    question: 'Where is Coastal Tails - Pet Aura located in Mangaluru?',
    answer:
      'Coastal Tails - Pet Aura is conveniently located at Shop No:B2 , Dwaraka Enclave, Derebail, Mangaluru, Karnataka 575006. We have dedicated parking and double-gated airlock pet safety entrances.',
  },
  {
    question: 'Does Coastal Tails provide doorstep mobile pet grooming in Mangaluru?',
    answer:
      'Yes! Coastal Tails GO is Mangaluru’s premier mobile pet grooming van service. Our air-conditioned, self-powered mobile studio brings 1-on-1 certified grooming directly to your home doorstep across Kadri, Bejai, Urwa, Kankanady, Surathkal, Deralakatte, and nearby neighborhoods within 25 km.',
  },
  {
    question: 'How do I book a dog or cat grooming appointment in Mangalore?',
    answer:
      'You can book instantly via WhatsApp or phone call at +91 79969 89956. Simply share your pet’s breed, location, and preferred date for immediate slot confirmation and upfront pricing.',
  },
  {
    question: 'What are the operating hours of Coastal Tails?',
    answer:
      'Coastal Tails studio and Coastal Tails GO mobile van operate 7 days a week from 09:30 AM to 09:30 PM.',
  },
  {
    question: 'What services are included in a standard dog grooming session?',
    answer:
      'Our grooming packages include warm hydro-massage baths with pH-balanced shampoos, gentle blow-drying, breed-standard haircuts or scissor styling, deep de-shedding, nail clipping, ear cleansing, teeth freshening, and soothing paw butter massage.',
  },
  {
    question: 'Do you offer specialized cat grooming in Mangaluru?',
    answer:
      'Yes, we have a quiet, feline-only grooming suite and certified low-stress cat handlers. We specialize in gentle cat baths, Persian knot dematting, sanitary trims, lion cuts, and claw maintenance without sedation.',
  },
];

export const injectStructuredData = (page: ActivePage, locationSlug?: string) => {
  let schemaScript = document.getElementById('coastal-tails-jsonld') as HTMLScriptElement | null;
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'coastal-tails-jsonld';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'PetGroomingService',
    name: 'Coastal Tails - Pet Aura',
    alternateName: ['Coastal Tails', 'Coastal Tails - Pet Aura Grooming Studio', 'Coastal Tails GO Mobile Pet Grooming Mangaluru'],
    image: 'https://coastaltails.in/og-image.jpg',
    '@id': 'https://coastaltails.in/#business',
    url: 'https://coastaltails.in',
    telephone: '+917996989956',
    priceRange: '₹₹',
    hasMap: 'https://share.google/Eh5iR7YSfNaqCIG1x',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shop No:B2 , Dwaraka Enclave, Derebail',
      addressLocality: 'Mangaluru',
      addressRegion: 'Karnataka',
      postalCode: '575006',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9081,
      longitude: 74.8488,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:30',
        closes: '21:30',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '280',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Mangaluru',
      },
      {
        '@type': 'City',
        name: 'Mangalore',
      },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 12.9081,
        longitude: 74.8488,
      },
      geoRadius: '25000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Grooming Services & Pet Spa',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Essential Dog Groom',
            description: 'Routine coat freshening, hydro-massage bath, blow dry, ear cleaning, nail trim, and hygiene care.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Signature Coastal Groom',
            description: 'Full breed styling haircut, hydro-bath, conditioning, face shape, teeth brushing, and paw balm.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Coastal Tails GO Mobile Pet Grooming',
            description: 'Doorstep mobile pet grooming van service across Mangaluru with 1-on-1 dedicated stylist attention.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cat Grooming & Dematting',
            description: 'Gentle low-stress feline bath, quiet drying, knot removal, claw clipping, and sanitary trimming.',
          },
        },
      ],
    },
  };

  // FAQ Schema Structured Data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: MANGALORE_GROOMING_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // Combined Graph Schema for Google Search Rich Results
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema, faqSchema],
  };

  schemaScript.textContent = JSON.stringify(graphSchema);
};
