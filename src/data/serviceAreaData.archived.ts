export interface ServiceZone {
  id: 'core' | 'extended' | 'wider';
  name: string;
  distanceRange: string;
  description: string;
  turnaroundNote: string;
  pincodes: {
    code: string;
    localities: string[];
  }[];
}

export interface LocationDetail {
  slug: string;
  name: string;
  kannadaName?: string;
  pincode: string;
  zone: 'core' | 'extended' | 'wider';
  distanceFromHubKm: number;
  landmarks: string[];
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubtitle: string;
  aboutCoverage: string;
  howToReach?: string;
  whyChooseUs?: string[];
  localContext?: string;
  dogGroomingServices: string[];
  catGroomingServices: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const REFERENCE_HUB = {
  name: 'Coastal Tails - Pet Aura',
  address: 'Shop No:B2 , Dwaraka Enclave, Derebail, Mangaluru, Karnataka 575006',
  coordinates: { lat: 12.9081, lng: 74.8488 },
  mapsLink: 'https://share.google/Eh5iR7YSfNaqCIG1x',
  maxServiceRadiusKm: 25,
  operatingHours: '09:30 AM – 09:30 PM (Tuesday – Sunday, Mondays on request)',
  phone: '+91 79969 89956',
  whatsapp: '+91 79969 89956',
  email: 'care@coastaltails.in',
};

export const SERVICE_ZONES: ServiceZone[] = [
  {
    id: 'core',
    name: 'Core Zone',
    distanceRange: '0 – 6 km',
    description: 'Daily studio visits and priority same-day/next-day Coastal Tails GO mobile van routes across central Mangaluru.',
    turnaroundNote: 'Highest scheduling flexibility with standard studio & doorstep appointments.',
    pincodes: [
      {
        code: '575006',
        localities: ['Derebail', 'Urwa', 'Ladyhill', 'Ashoknagar', 'Kottara', 'Kodical', 'Kuntikana'],
      },
      {
        code: '575001',
        localities: ['Hampankatta', 'Attavar', 'Pandeshwar', 'Bolar', 'Bunder', 'Falnir', 'Car Street', 'Mangaladevi'],
      },
      {
        code: '575002',
        localities: ['Kankanady', 'Kadri', 'Balmatta', 'Bendoor', 'Jeppu', 'Valencia', 'Pumpwell'],
      },
      {
        code: '575003',
        localities: ['Kodialbail', 'Kudroli', 'Mannagudda', 'Ballalbagh', 'Lalbagh', 'Boloor'],
      },
      {
        code: '575004',
        localities: ['Bejai', 'Kadri Hills', 'Barebail', 'Kambla Road'],
      },
      {
        code: '575005',
        localities: ['Kulshekar', 'Bikkarnakatte', 'Nantoor', 'Churchgate', 'Maroli'],
      },
      {
        code: '575007',
        localities: ['Padil', 'Jappinamogaru', 'Adyar', 'Kannur', 'Nagori'],
      },
      {
        code: '575008',
        localities: ['Bondel', 'Yeyyadi', 'Padavu', 'Konchady', 'Mary Hill'],
      },
      {
        code: '575009',
        localities: ['Adyar', 'Jappinamogaru'],
      },
    ],
  },
  {
    id: 'extended',
    name: 'Extended Zone',
    distanceRange: '6 – 15 km',
    description: 'Scheduled mobile grooming van routes and accessible studio transit across northern, southern, and eastern Mangaluru suburbs.',
    turnaroundNote: 'Regular morning & afternoon mobile grooming slots scheduled in neighborhood clusters.',
    pincodes: [
      {
        code: '575010',
        localities: ['Panambur', 'New Mangalore Port', 'Meenakaliya'],
      },
      {
        code: '575011',
        localities: ['Baikampady', 'Jokatte'],
      },
      {
        code: '575012',
        localities: ['Neermarga'],
      },
      {
        code: '575013',
        localities: ['Kulur', 'Panjimogaru', 'Sandspit'],
      },
      {
        code: '575015',
        localities: ['Kavoor', 'Kunjathbail', 'Devinagar'],
      },
      {
        code: '575016',
        localities: ['Shakthinagar', 'Kulshekar Churchgate'],
      },
      {
        code: '575017',
        localities: ['Thokkottu', 'Permannur', 'Ullal (Munnur)'],
      },
      {
        code: '575018',
        localities: ['Deralakatte', 'Manjanady'],
      },
      {
        code: '575019',
        localities: ['Kulai', 'Hosabettu'],
      },
      {
        code: '575020',
        localities: ['Ullal', 'Mukkacheri', 'Kapikad'],
      },
      {
        code: '575021',
        localities: ['Mukka'],
      },
      {
        code: '575022',
        localities: ['Kotekar', 'Kumpala'],
      },
      {
        code: '574142',
        localities: ['Bajpe', 'Bajpe Airport', 'Kenjar', 'Kalavara', 'Kolambe'],
      },
      {
        code: '574146',
        localities: ['Mukka B.O', 'Thokur', 'Sasihithlu', 'Padupanambur'],
      },
      {
        code: '574199',
        localities: ['Konaje', 'Mangalagangothri', 'Mangalore University'],
      },
      {
        code: '574144',
        localities: ['Ganjimath', 'Neerude', 'Kompadavu', 'Mogaru'],
      },
      {
        code: '574145',
        localities: ['Gurpur', 'Addoor', 'Ulaibettu'],
      },
      {
        code: '574141',
        localities: ['Aikala', 'Elinje', 'Kollur'],
      },
    ],
  },
  {
    id: 'wider',
    name: 'Wider Mobile Zone',
    distanceRange: '15 – 25 km',
    description: 'Weekly scheduled Coastal Tails GO mobile van visits for pet communities, estates, and pet parents desiring doorstep luxury.',
    turnaroundNote: 'Advance booking recommended (24–48 hours) to coordinate van routing.',
    pincodes: [
      {
        code: '575014',
        localities: ['Surathkal', 'Krishnapura'],
      },
      {
        code: '575025',
        localities: ['NITK', 'Srinivasnagar', 'Surathkal'],
      },
      {
        code: '575023',
        localities: ['Talapady', 'Kinya', 'Someshwar'],
      },
      {
        code: '575024',
        localities: ['Talapady', 'Devinagar', 'Asaigoli'],
      },
      {
        code: '574150',
        localities: ['Kinnigoli', 'Elathur'],
      },
      {
        code: '574151',
        localities: ['Kinnikambla', 'Kandavara'],
      },
    ],
  },
];

export const PRIORITY_LOCATIONS: LocationDetail[] = [
  {
    slug: 'derebail',
    name: 'Derebail',
    pincode: '575006',
    zone: 'core',
    distanceFromHubKm: 0.5,
    landmarks: ['Dwaraka Enclave', 'Derebail Church', 'Konchady Junction', 'AJ Hospital Corridor'],
    metaTitle: 'Pet Grooming in Derebail, Mangalore | Dog & Cat Spa | Coastal Tails',
    metaDescription: 'Professional dog & cat grooming studio and Coastal Tails GO doorstep mobile grooming in Derebail, Mangaluru. Warm hydro-baths, styling haircuts & de-shedding.',
    heroHeadline: 'Professional Dog & Cat Grooming in Derebail',
    heroSubtitle: 'Right at your neighborhood in Derebail! Experience gentle, certified pet grooming and Coastal Tails GO doorstep mobile grooming sessions.',
    aboutCoverage: 'Located right next to our Dwaraka Enclave hub, Derebail pet parents enjoy instant appointment access, same-day grooming slots, and seamless Coastal Tails GO mobile van services.',
    dogGroomingServices: [
      'Essential Grooming & Warm Hydro-Bath',
      'Signature Breed Styling & Scissor Haircuts',
      'Coastal Spa & Mineral Mud Pack',
      'Heavy De-shedding & Undercoat Fur Blast',
      'Medicated Skin & Allergy Soothing Care',
    ],
    catGroomingServices: [
      'Stress-Free Feline Bath & Low-Noise Drying',
      'Lion Cut & Persian Coat Detangling',
      'Safe Nail Clipping & Sanitary Area Trimming',
    ],
    faqs: [
      {
        question: 'How quickly can I book a grooming slot in Derebail?',
        answer: 'Since Derebail is in our immediate Core Zone, same-day and next-day slots are frequently available for both studio and Coastal Tails GO mobile grooming.',
      },
      {
        question: 'Can the Coastal Tails GO mobile van park at apartments in Derebail?',
        answer: 'Yes! Our custom van is self-powered with its own silent generator and warm water reservoir. We just need standard building parking space.',
      },
    ],
  },
  {
    slug: 'urwa',
    name: 'Urwa',
    pincode: '575006',
    zone: 'core',
    distanceFromHubKm: 2.2,
    landmarks: ['Urwa Market', 'Chilimbi Hill', 'Urwa Marigudi Temple', 'Ladyhill Circle'],
    metaTitle: 'Pet Grooming in Urwa & Chilimbi, Mangalore | Coastal Tails Pet Spa',
    metaDescription: 'Expert pet grooming, puppy styling, cat baths, and doorstep mobile van grooming in Urwa and Chilimbi, Mangaluru. Ask for pricing on WhatsApp.',
    heroHeadline: 'Gentle Pet Grooming in Urwa & Chilimbi',
    heroSubtitle: 'Keep your pets fresh, tangle-free, and healthy with compassionate grooming at our studio or in the comfort of your driveway in Urwa.',
    aboutCoverage: 'Urwa pet parents are just 5–8 minutes away from our studio, and our Coastal Tails GO mobile van visits Urwa and Chilimbi residential complexes on daily scheduled rounds.',
    dogGroomingServices: [
      'Full Bath & Blow Dry with Tearless Shampoos',
      'Precision Breed Haircuts (Shih Tzu, Poodle, Golden Retriever)',
      'Hygiene Trims & Paw Pad Moisturizing',
      'Anti-Tick & Parasite Herbal Defense',
    ],
    catGroomingServices: [
      'Quiet Low-Stress Feline Bath',
      'Gentle Persian Coat Knot Removal',
      'Ear Cleaning & Mite Check',
    ],
    faqs: [
      {
        question: 'Do you groom anxious or energetic dogs in Urwa?',
        answer: 'Yes. Our groomers are trained in positive-reinforcement handling and never use force or sedatives. We take gentle breaks to keep pets happy.',
      },
      {
        question: 'What is the price for dog grooming in Urwa?',
        answer: 'Grooming charges depend on your pet’s breed, weight, coat condition, and required styling. Click "Ask for Price" to receive an immediate custom quote via WhatsApp.',
      },
    ],
  },
  {
    slug: 'kottara',
    name: 'Kottara',
    pincode: '575006',
    zone: 'core',
    distanceFromHubKm: 1.8,
    landmarks: ['Kottara Chowki', 'Infosys Road', 'Kuntikana Flyover', 'Alvares Road'],
    metaTitle: 'Pet Grooming in Kottara Chowki, Mangalore | Dog & Cat Care | Coastal Tails',
    metaDescription: 'Complete dog and cat grooming in Kottara & Kottara Chowki. Choose between studio spa visits or Coastal Tails GO mobile grooming at your home.',
    heroHeadline: 'Premium Pet Grooming in Kottara & Kuntikana',
    heroSubtitle: 'Say goodbye to muddy paws and heavy shedding. Professional grooming with organic shampoos, warm water baths, and custom breed styling in Kottara.',
    aboutCoverage: 'Conveniently located near Kottara Chowki, we serve pets across Kottara, Kuntikana, and Kodical with punctual doorstep visits and clean studio facilities.',
    dogGroomingServices: [
      'Essential Hygiene Groom',
      'Signature Makeover & Styling',
      'Deep Undercoat De-shedding',
      'Teeth Brushing & Breath Freshener',
    ],
    catGroomingServices: [
      'Gentle Cat Bath & Fluff Dry',
      'Breed Fur Shaping & Matt Removal',
    ],
    faqs: [
      {
        question: 'Can you groom large dog breeds like Labradors or German Shepherds in Kottara?',
        answer: 'Absolutely! Our facilities and mobile van are equipped with heavy-duty electric lift tables and high-velocity dryers suited for large and giant breeds.',
      },
    ],
  },
  {
    slug: 'bejai',
    name: 'Bejai',
    pincode: '575004',
    zone: 'core',
    distanceFromHubKm: 3.5,
    landmarks: ['Bejai Church', 'KSRTC Bus Stand', 'Bharath Mall', 'Kadri Hills'],
    metaTitle: 'Pet Grooming in Bejai, Mangalore | Dog Haircut & Spa | Coastal Tails',
    metaDescription: 'Trusted pet grooming studio & doorstep mobile van grooming in Bejai, Mangaluru. Specialized in Shih Tzu cuts, Golden Retriever de-shedding, and cat care.',
    heroHeadline: 'Premium Dog & Cat Grooming in Bejai',
    heroSubtitle: 'Professional grooming tailored to your pet’s comfort. Book studio appointments or relax at home while Coastal Tails GO grooms in your driveway.',
    aboutCoverage: 'Bejai is one of our most active community hubs. Whether you live near Bejai Church, Kadri Hills, or Bharath Mall, our team is always nearby.',
    dogGroomingServices: [
      'Teddy Face & Scissor Styling',
      'Dead Sea Mineral Mud Spa',
      'Puppy First Grooming Experience',
      'Senior Dog Gentle Care',
    ],
    catGroomingServices: [
      'Persian Cat Dematting & Bath',
      'Safe Feline Claw Trimming',
    ],
    faqs: [
      {
        question: 'Is mobile grooming available for apartments in Bejai?',
        answer: 'Yes! Coastal Tails GO is 100% self-contained. We park safely in your apartment driveway or visitor bay with zero noise disturbance.',
      },
    ],
  },
  {
    slug: 'kadri',
    name: 'Kadri',
    pincode: '575002',
    zone: 'core',
    distanceFromHubKm: 4.2,
    landmarks: ['Kadri Park', 'Kadri Manjunatha Temple', 'Mallikatte', 'Circuit House'],
    metaTitle: 'Home & Studio Dog Grooming in Kadri, Mangalore | Coastal Tails Pet Spa',
    metaDescription: 'Premier pet grooming services in Kadri, Mallikatte & Kadri Hills. Studio spa packages and Coastal Tails GO doorstep mobile grooming van.',
    heroHeadline: 'Gentle Pet Grooming in Kadri & Mallikatte',
    heroSubtitle: 'Give your pet the relaxing care they deserve with gentle handling, clean equipment, and coat-nourishing treatments in Kadri.',
    aboutCoverage: 'From Kadri Park to Mallikatte, pet parents choose Coastal Tails for our gentle touch, clean salon standards, and punctual mobile doorstep services.',
    dogGroomingServices: [
      'Full Bath & Organic Conditioning',
      'Precision Breed Styling & Coat Scissoring',
      'Anti-Tick Medicated Care',
      'Paw Pad Balm & Nail Filing',
    ],
    catGroomingServices: [
      'Feline Deshedding & Low-Stress Bath',
      'Sanitary Area Trimming',
    ],
    faqs: [
      {
        question: 'How long does a grooming session take in Kadri?',
        answer: 'An Essential Groom typically takes 45–60 minutes, while a Full Signature Groom with styling takes 75–90 minutes.',
      },
    ],
  },
  {
    slug: 'kankanady',
    name: 'Kankanady',
    pincode: '575002',
    zone: 'core',
    distanceFromHubKm: 4.8,
    landmarks: ['Kankanady Flower Market', 'Father Muller Hospital', 'Pumpwell Circle', 'Valencia Road'],
    metaTitle: 'Pet Grooming & Dog Spa in Kankanady, Mangalore | Coastal Tails',
    metaDescription: 'Top-rated dog and cat grooming studio & doorstep mobile van in Kankanady, Mangaluru. Full haircuts, puppy grooming, de-shedding and cat baths.',
    heroHeadline: 'Professional Dog & Cat Grooming in Kankanady',
    heroSubtitle: 'Expert groomers dedicated to low-stress handling, coat hygiene, and clean pampering for your beloved four-legged companions.',
    aboutCoverage: 'Centrally accessible for pet families across Kankanady, Pumpwell, and Valencia. Book in-studio or request the Coastal Tails GO mobile van at your gate.',
    dogGroomingServices: [
      'Essential Groom & Warm Hydrobath',
      'Breed Haircuts & Face Styling',
      'Shedding Reduction Treatment',
      'Ear Cleaning & Odor Removal',
    ],
    catGroomingServices: [
      'Gentle Low-Noise Cat Bath',
      'Knot Removal & Lion Cut',
    ],
    faqs: [
      {
        question: 'Do you sell pet food and accessories in Kankanady?',
        answer: 'Yes! Our e-commerce store offers same-day delivery of premium dog and cat food, treats, harnesses, and grooming gear across Kankanady.',
      },
    ],
  },
  {
    slug: 'balmatta',
    name: 'Balmatta',
    pincode: '575002',
    zone: 'core',
    distanceFromHubKm: 4.0,
    landmarks: ['Balmatta Circle', 'Collectors Gate', 'Jyothi Circle', 'Bendoorwell'],
    metaTitle: 'Pet Grooming in Balmatta, Mangalore | Dog Haircuts & Spa | Coastal Tails',
    metaDescription: 'High-quality pet grooming in Balmatta, Mangaluru. Gentle certified groomers for dogs and cats with doorstep mobile van options.',
    heroHeadline: 'Caring Pet Grooming in Balmatta & Bendoorwell',
    heroSubtitle: 'Pamper your pet with high-grade shampoos, gentle de-tangling, and stylish haircuts in Balmatta.',
    aboutCoverage: 'Serving residential communities in Balmatta, Jyothi, and Collectors Gate with punctual scheduling and spotless hygiene standards.',
    dogGroomingServices: ['Signature Grooming', 'Warm Blow Dry', 'Paw Waxing', 'Teeth Gel Cleaning'],
    catGroomingServices: ['Cat Hygiene Wash', 'Nail Trimming', 'Ear Care'],
    faqs: [
      {
        question: 'How do I book a mobile grooming van in Balmatta?',
        answer: 'Click "Ask for Grooming Price" or WhatsApp us with your location in Balmatta, pet breed, and preferred date to book instantly.',
      },
    ],
  },
  {
    slug: 'bendoor',
    name: 'Bendoor',
    pincode: '575002',
    zone: 'core',
    distanceFromHubKm: 4.5,
    landmarks: ['St. Sebastian Church Bendoor', 'Bendoorwell', 'Kankanady Bypass', 'Colaco Hospital'],
    metaTitle: 'Pet Grooming in Bendoor & Bendoorwell, Mangalore | Coastal Tails',
    metaDescription: 'Professional dog styling, cat dematting, and mobile grooming in Bendoor, Mangaluru. Safe, cage-free handling and verified care.',
    heroHeadline: 'Premium Pet Care & Grooming in Bendoor',
    heroSubtitle: 'Keep your pets joyful, clean, and looking their best with personalized grooming services in Bendoor.',
    aboutCoverage: 'Bendoor residents enjoy effortless access to both our studio appointments and our custom Coastal Tails GO mobile van.',
    dogGroomingServices: ['Essential Bath', 'Breed Haircut', 'Mineral Mud Pack', 'De-shedding Blast'],
    catGroomingServices: ['Hypoallergenic Cat Bath', 'Persian Comb-Out'],
    faqs: [
      {
        question: 'Are grooming products safe for sensitive skin?',
        answer: 'Yes, we use mild, pH-balanced, sulfate-free shampoos formulated specifically for dogs and cats.',
      },
    ],
  },
  {
    slug: 'bondel',
    name: 'Bondel',
    pincode: '575008',
    zone: 'core',
    distanceFromHubKm: 2.8,
    landmarks: ['Bondel Church', 'MGC School', 'Pachanady Road', 'Kavoor Junction'],
    metaTitle: 'Pet Grooming in Bondel & Mary Hill, Mangalore | Coastal Tails',
    metaDescription: 'Trusted pet grooming studio and doorstep mobile grooming in Bondel, Mangaluru. Specialized in low-stress baths, styling haircuts, and de-shedding.',
    heroHeadline: 'Gentle Dog & Cat Grooming in Bondel',
    heroSubtitle: 'Clean, stress-free grooming right near your home in Bondel with experienced groomers and high-grade pet care products.',
    aboutCoverage: 'Located just minutes from Derebail, Bondel is an integral part of our Core Zone with swift mobile van routing and flexible time slots.',
    dogGroomingServices: ['Signature Cut', 'Hydro-Bath', 'Sanitary Trim', 'Tick Dip'],
    catGroomingServices: ['Feline Wash', 'Claw Filing', 'Face Polish'],
    faqs: [
      {
        question: 'Can you groom puppies for the first time in Bondel?',
        answer: 'Yes! We specialize in gentle first-time puppy grooms to help young pets build positive associations with grooming.',
      },
    ],
  },
  {
    slug: 'yeyyadi',
    name: 'Yeyyadi',
    pincode: '575008',
    zone: 'core',
    distanceFromHubKm: 2.4,
    landmarks: ['Yeyyadi Industrial Area', 'Airport Road', 'Shakthinagar Cross', 'Mary Hill'],
    metaTitle: 'Pet Grooming in Yeyyadi, Mangalore | Dog Spa & Mobile Van | Coastal Tails',
    metaDescription: 'Expert dog haircuts, feline de-matting, and doorstep mobile van grooming in Yeyyadi, Mangaluru.',
    heroHeadline: 'Professional Pet Grooming in Yeyyadi',
    heroSubtitle: 'Complete pet grooming at your doorstep or studio. Gentle care, organic grooming products, and customized styling.',
    aboutCoverage: 'Our mobile van frequents the Yeyyadi and Airport Road corridor daily, providing stress-free doorstep sessions for local pet parents.',
    dogGroomingServices: ['Essential Hygiene Bath', 'Breed Scissor Work', 'Undercoat Shed Removal'],
    catGroomingServices: ['Quiet Drying', 'Persian Knot Removal'],
    faqs: [
      {
        question: 'Do you charge extra for mobile grooming in Yeyyadi?',
        answer: 'Yeyyadi is in our Core Zone (0–6 km), so you enjoy standard doorstep rates without long-distance surcharges.',
      },
    ],
  },
  {
    slug: 'konchady',
    name: 'Konchady',
    pincode: '575008',
    zone: 'core',
    distanceFromHubKm: 1.2,
    landmarks: ['Konchady Temple', 'Derebail-Konchady Link Road', 'Alvares Lane', 'AJ Hospital'],
    metaTitle: 'Pet Grooming in Konchady, Mangalore | Coastal Tails Pet Spa',
    metaDescription: 'Fast & convenient pet grooming in Konchady, Mangaluru. Studio visits & Coastal Tails GO doorstep van.',
    heroHeadline: 'Neighborhood Pet Grooming in Konchady',
    heroSubtitle: 'Right around the corner from our central studio, Konchady pets receive premier grooming care and instant appointments.',
    aboutCoverage: 'Direct proximity to our Derebail studio means Konchady pet parents can book with maximum convenience and minimal wait times.',
    dogGroomingServices: ['Complete Coastal Spa', 'Routine Bath', 'Nail Trimming', 'Ear Wash'],
    catGroomingServices: ['Feline Spa', 'Sanitary Care'],
    faqs: [
      {
        question: 'Can I drop off my dog at your studio from Konchady?',
        answer: 'Yes! We are located right next door in Derebail with easy drop-off and pickup.',
      },
    ],
  },
  {
    slug: 'kavoor',
    name: 'Kavoor',
    pincode: '575015',
    zone: 'extended',
    distanceFromHubKm: 4.5,
    landmarks: ['Kavoor Junction', 'Kavoor Lake', 'Kunjathbail Road', 'Marakada'],
    metaTitle: 'Pet Grooming in Kavoor & Kunjathbail, Mangalore | Coastal Tails Mobile Spa',
    metaDescription: 'Doorstep mobile pet grooming and studio appointments in Kavoor, Mangaluru. Warm hydro-baths, full haircuts, and gentle cat care.',
    heroHeadline: 'Doorstep Pet Grooming in Kavoor',
    heroSubtitle: 'Skip the traffic! Coastal Tails GO brings a state-of-the-art mobile grooming studio directly to your residence in Kavoor.',
    aboutCoverage: 'Our mobile van visits Kavoor, Kunjathbail, and Marakada multiple days every week. Appointments are booked in convenient route clusters.',
    dogGroomingServices: ['Mobile Van Full Groom', 'De-shedding Treatment', 'Hygienic Trim', 'Medicated Wash'],
    catGroomingServices: ['Doorstep Cat Groom', 'Nail Clipping'],
    faqs: [
      {
        question: 'Does the mobile van need water or power connection from my house in Kavoor?',
        answer: 'No. Our Coastal Tails GO van is 100% self-powered with its own onboard generator and fresh warm water tank.',
      },
    ],
  },
  {
    slug: 'kunjathbail',
    name: 'Kunjathbail',
    pincode: '575015',
    zone: 'extended',
    distanceFromHubKm: 5.5,
    landmarks: ['Kunjathbail Church', 'Marakada Bridge', 'Airport Road Bypass', 'Devinagar'],
    metaTitle: 'Home Dog & Cat Grooming in Kunjathbail, Mangalore | Coastal Tails GO',
    metaDescription: 'Mobile doorstep pet grooming van in Kunjathbail, Mangaluru. Full styling haircuts, shedding removal, and cat grooming.',
    heroHeadline: 'Coastal Tails GO Mobile Grooming in Kunjathbail',
    heroSubtitle: 'Professional grooming at your gate. Climate-controlled van, warm hydro-massage bath, and stress-free care in Kunjathbail.',
    aboutCoverage: 'Serving villas, homes, and gated layouts across Kunjathbail with punctual mobile grooming appointments.',
    dogGroomingServices: ['Doorstep Signature Groom', 'Anti-Tick Bath', 'Paw Scrub', 'Blow Dry'],
    catGroomingServices: ['Low-Stress Cat Bath', 'Lion Cut Trimming'],
    faqs: [
      {
        question: 'How do I book mobile grooming in Kunjathbail?',
        answer: 'Message us on WhatsApp with your locality in Kunjathbail and pet details. We will confirm route availability and slot times.',
      },
    ],
  },
  {
    slug: 'shakthinagar',
    name: 'Shakthinagar',
    pincode: '575016',
    zone: 'extended',
    distanceFromHubKm: 6.2,
    landmarks: ['Shakthinagar Temple', 'Gopalakrishna Temple', 'Vaidyanatha Temple', 'Kulshekar Cross'],
    metaTitle: 'Pet Grooming in Shakthinagar, Mangalore | Dog Spa & Mobile Van | Coastal Tails',
    metaDescription: 'Complete pet grooming services in Shakthinagar, Mangaluru. Studio spa packages and doorstep mobile van visits.',
    heroHeadline: 'Gentle Pet Grooming in Shakthinagar',
    heroSubtitle: 'Professional coat styling, warm hydrobaths, and de-shedding treatments delivered with patience and care.',
    aboutCoverage: 'Our mobile van schedules regular morning and afternoon routes through Shakthinagar and adjacent Kulshekar hills.',
    dogGroomingServices: ['Essential Groom', 'Full Styling', 'Ear & Eye Clean', 'Paw Care'],
    catGroomingServices: ['Persian Cat Dematting', 'Gentle Wash'],
    faqs: [
      {
        question: 'Do you offer pickup and drop from Shakthinagar?',
        answer: 'We recommend our Coastal Tails GO mobile van, which grooms your pet right in your driveway with zero travel needed!',
      },
    ],
  },
  {
    slug: 'kulur',
    name: 'Kulur',
    pincode: '575013',
    zone: 'extended',
    distanceFromHubKm: 4.8,
    landmarks: ['Kulur Bridge', 'Gurupura River Banks', 'Panambur Highway', 'Panjimogaru'],
    metaTitle: 'Pet Grooming in Kulur & Panjimogaru, Mangalore | Coastal Tails',
    metaDescription: 'Trusted dog and cat grooming in Kulur, Mangaluru. Studio appointments & Coastal Tails GO doorstep mobile grooming.',
    heroHeadline: 'Doorstep & Studio Pet Grooming in Kulur',
    heroSubtitle: 'Keep your pets clean and fresh despite coastal humidity with specialized coat care and gentle styling in Kulur.',
    aboutCoverage: 'Serving residential areas near Kulur Bridge, Panjimogaru, and NH 66 with clean mobile van and studio appointments.',
    dogGroomingServices: ['De-shedding Fur Blast', 'Warm Hydro-Bath', 'Sanitary Trim', 'Tick Prevention Dip'],
    catGroomingServices: ['Cat Bath & Fur Care', 'Nail Trimming'],
    faqs: [
      {
        question: 'How do you handle heavy shedding in coastal weather?',
        answer: 'Our Deep De-shedding treatment uses high-velocity dryers and specialized botanical conditioners to safely eliminate up to 90% of loose dead undercoat fur.',
      },
    ],
  },
  {
    slug: 'surathkal',
    name: 'Surathkal',
    pincode: '575014',
    zone: 'wider',
    distanceFromHubKm: 16.5,
    landmarks: ['Surathkal Lighthouse', 'NITK Campus', 'Surathkal Junction', 'Krishnapura'],
    metaTitle: 'Mobile Dog Grooming in Surathkal & NITK, Mangalore | Coastal Tails GO',
    metaDescription: 'Coastal Tails GO brings luxury mobile doorstep pet grooming to Surathkal, NITK, and Srinivasnagar. Book your van appointment today.',
    heroHeadline: 'Coastal Tails GO Mobile Pet Grooming in Surathkal',
    heroSubtitle: 'No need to drive all the way into central Mangalore! Our fully equipped mobile grooming van visits Surathkal and NITK on scheduled days.',
    aboutCoverage: 'Surathkal is part of our Wider Mobile Zone (15–25 km). We operate dedicated weekly van routes for pet parents, faculty, and gated communities.',
    dogGroomingServices: [
      'Doorstep Full Breed Haircut & Styling',
      'Warm Hydro-Massage Bath & Fluff Dry',
      'Heavy De-shedding & Undercoat Blast',
      'Paw Balm & Enzymatic Teeth Gel',
    ],
    catGroomingServices: [
      'Doorstep Feline Bath & Dematting',
      'Safe Scissor Styling & Nail Care',
    ],
    faqs: [
      {
        question: 'Which days does the mobile van visit Surathkal?',
        answer: 'We run dedicated Surathkal & NITK routes several times a week. We recommend booking 24–48 hours in advance via WhatsApp.',
      },
      {
        question: 'Is there a minimum booking for mobile grooming in Surathkal?',
        answer: 'No minimum booking required! We group appointments efficiently by neighborhood to provide fair pricing.',
      },
    ],
  },
  {
    slug: 'bajpe',
    name: 'Bajpe',
    pincode: '574142',
    zone: 'extended',
    distanceFromHubKm: 12.0,
    landmarks: ['Mangalore International Airport', 'Bajpe Bus Stand', 'Kenjar', 'Kalavara'],
    metaTitle: 'Mobile Pet Grooming in Bajpe & Kenjar, Mangalore | Coastal Tails GO',
    metaDescription: 'Doorstep mobile pet grooming in Bajpe, Kenjar & Airport Road. Professional dog haircut, spa baths, and cat grooming.',
    heroHeadline: 'Doorstep Pet Grooming in Bajpe & Kenjar',
    heroSubtitle: 'Convenient, air-conditioned mobile grooming right at your home in Bajpe. Professional care without the long salon commute.',
    aboutCoverage: 'Bajpe pet parents can easily schedule our Coastal Tails GO mobile van for convenient doorstep appointments.',
    dogGroomingServices: ['Mobile Van Full Groom', 'De-shedding Treatment', 'Tick Dip', 'Warm Hydro-Bath'],
    catGroomingServices: ['Quiet Cat Bath', 'Nail Trimming'],
    faqs: [
      {
        question: 'Can you groom multiple pets in one visit in Bajpe?',
        answer: 'Yes! Our van can comfortably groom multiple family pets back-to-back in one convenient session.',
      },
    ],
  },
  {
    slug: 'deralakatte',
    name: 'Deralakatte',
    pincode: '575018',
    zone: 'extended',
    distanceFromHubKm: 13.5,
    landmarks: ['Yenepoya University', 'KS Hegde Medical Academy', 'Nitte University', 'Kotekar Cross'],
    metaTitle: 'Pet Grooming in Deralakatte, Mangalore | Mobile Dog Spa | Coastal Tails GO',
    metaDescription: 'Doorstep mobile pet grooming van in Deralakatte & university campuses, Mangaluru. Full styling haircuts, baths, and feline care.',
    heroHeadline: 'Coastal Tails GO Mobile Grooming in Deralakatte',
    heroSubtitle: 'Expert pet grooming delivered right to your apartment or villa in Deralakatte. Certified groomers and hospital-grade hygiene.',
    aboutCoverage: 'Popular among university faculty, medical staff, and residents in Deralakatte and Kotekar looking for stress-free home grooming.',
    dogGroomingServices: ['Complete Breed Haircut', 'Organic Shampoo Bath', 'De-shedding Blast', 'Paw Moisturizing'],
    catGroomingServices: ['Gentle Cat Groom', 'Claw Trimming'],
    faqs: [
      {
        question: 'How do you sterilize equipment between pets?',
        answer: 'We follow strict hospital-grade hygiene with hospital disinfectant washes, blade sanitizers, and UV sterilization between every single appointment.',
      },
    ],
  },
  {
    slug: 'ullal',
    name: 'Ullal',
    pincode: '575020',
    zone: 'extended',
    distanceFromHubKm: 11.5,
    landmarks: ['Ullal Beach', 'Sayyid Madani Dargah', 'Mukkacheri', 'Kapikad'],
    metaTitle: 'Pet Grooming in Ullal & Someshwar, Mangalore | Coastal Tails Mobile Spa',
    metaDescription: 'Professional dog styling, warm baths, and cat grooming at your doorstep in Ullal, Mangaluru with Coastal Tails GO mobile van.',
    heroHeadline: 'Doorstep Pet Grooming in Ullal',
    heroSubtitle: 'Clean, sand-free, and beautifully groomed pets! Coastal Tails GO brings luxury grooming to your doorstep in Ullal.',
    aboutCoverage: 'Regular weekly scheduled routes across Ullal, Mukkacheri, and Someshwar beachside communities.',
    dogGroomingServices: ['Sand & Salt Coat Rinse & Spa Bath', 'Breed Styling', 'Tick Protection', 'Nail Trimming'],
    catGroomingServices: ['Low-Stress Cat Bath', 'Persian Coat Care'],
    faqs: [
      {
        question: 'My dog plays on the beach and has salty, matted fur. Can you fix it?',
        answer: 'Yes! Our Deep Conditioning Marine Spa bath gently dissolves sea salt residue and restores silky moisture to the coat.',
      },
    ],
  },
  {
    slug: 'thokkottu',
    name: 'Thokkottu',
    pincode: '575017',
    zone: 'extended',
    distanceFromHubKm: 9.8,
    landmarks: ['Thokkottu Overbridge', 'Permannur Church', 'Kumpala Cross', 'NH 66 Junction'],
    metaTitle: 'Pet Grooming in Thokkottu & Permannur, Mangalore | Coastal Tails GO',
    metaDescription: 'Complete dog and cat grooming services in Thokkottu, Mangaluru. Doorstep mobile grooming van and studio appointments.',
    heroHeadline: 'Professional Pet Grooming in Thokkottu',
    heroSubtitle: 'Hassle-free pet pampering with compassionate handling, spotless equipment, and tailored breed styling in Thokkottu.',
    aboutCoverage: 'Serving pet owners across Thokkottu, Permannur, and surrounding southern suburbs with weekly doorstep mobile routes.',
    dogGroomingServices: ['Essential Bath', 'Signature Makeover', 'De-shedding', 'Ear Hygiene'],
    catGroomingServices: ['Feline Bath', 'Nail Clip'],
    faqs: [
      {
        question: 'How do I check if my address in Thokkottu is eligible?',
        answer: 'Thokkottu (575017) is in our Extended Zone! Just WhatsApp us your exact location to book your preferred time.',
      },
    ],
  },
  {
    slug: 'kuntikana',
    name: 'Kuntikana',
    pincode: '575006',
    zone: 'core',
    distanceFromHubKm: 1.5,
    landmarks: ['Kuntikana Flyover', 'AJ Hospital & Research Centre', 'Lexus Showroom', 'NH 66 Junction'],
    metaTitle: 'Pet Grooming in Kuntikana, Mangalore | Dog & Cat Care | Coastal Tails',
    metaDescription: 'Trusted pet grooming studio & doorstep mobile van in Kuntikana, Mangaluru. Warm hydro-baths, breed haircuts, and allergy-soothing spa.',
    heroHeadline: 'Professional Dog & Cat Grooming in Kuntikana',
    heroSubtitle: 'Just 3 minutes from our Derebail studio! Complete certified pet grooming and Coastal Tails GO doorstep mobile grooming for Kuntikana pet parents.',
    aboutCoverage: 'Located immediately adjacent to Derebail via the AJ Hospital corridor, Kuntikana pet owners enjoy the quickest travel access to our studio and immediate mobile van availability.',
    howToReach: 'From Kuntikana Junction / AJ Hospital, drive 600m up the Derebail link road towards Dwaraka Enclave. We are located at Shop No: B2.',
    whyChooseUs: [
      'Immediate 3-minute proximity to our central Derebail grooming studio',
      'Daily mobile van availability for all apartment complexes around Kuntikana',
      'Certified gentle handling, soap-free pH-balanced shampoos, and 1-on-1 care',
    ],
    localContext: 'Kuntikana is a bustling residential and healthcare hub with numerous pet-friendly apartment complexes and quick access to veterinary hospitals.',
    dogGroomingServices: ['Signature Breed Haircut', 'Warm Hydro-Bath', 'De-Shedding Blast', 'Paw Butter Massage'],
    catGroomingServices: ['Quiet Feline Wash', 'Persian Knot Detangling', 'Sanitary Care'],
    faqs: [
      {
        question: 'Can I walk in for nail trimming from Kuntikana?',
        answer: 'Yes! Our Derebail studio is just 1.5 km away and offers quick walk-in nail trims, ear cleaning, and paw pad treatments.',
      },
    ],
  },
  {
    slug: 'padavinangady',
    name: 'Padavinangady',
    pincode: '575008',
    zone: 'core',
    distanceFromHubKm: 2.2,
    landmarks: ['Padavinangady Junction', 'Airport Road', 'Bondel Cross', 'Mary Hill'],
    metaTitle: 'Pet Grooming in Padavinangady, Mangalore | Coastal Tails Pet Spa',
    metaDescription: 'Complete dog and cat grooming in Padavinangady, Mangaluru. Studio spa packages and Coastal Tails GO doorstep mobile grooming van.',
    heroHeadline: 'Gentle Pet Grooming in Padavinangady',
    heroSubtitle: 'Keep your pets fresh, tangle-free, and healthy with compassionate grooming at our studio or in your driveway in Padavinangady.',
    aboutCoverage: 'Padavinangady pet parents are just 4–6 minutes away from our studio, and our Coastal Tails GO mobile van visits Padavinangady residential layouts daily.',
    howToReach: 'Take Airport Road towards Derebail/Konchady, turning onto the Dwaraka Enclave road. Travel time is under 5 minutes.',
    whyChooseUs: [
      'Ultra-convenient access on the Airport Road corridor',
      'Doorstep mobile van visits with zero travel stress for pets',
      'Expertise in Shih Tzu teddy cuts and Golden Retriever de-shedding',
    ],
    localContext: 'A lush residential area with gated villa communities and pet owners who enjoy morning walks along scenic Airport Road.',
    dogGroomingServices: ['Essential Bath & Brush', 'Teddy Bear Scissor Cut', 'Undercoat De-shedding', 'Medicated Wash'],
    catGroomingServices: ['Low-Stress Cat Bath', 'Gentle Persian Dematting'],
    faqs: [
      {
        question: 'How do I book Coastal Tails GO mobile van in Padavinangady?',
        answer: 'Simply send a WhatsApp message to +91 79969 89956 with your address in Padavinangady and preferred date!',
      },
    ],
  },
  {
    slug: 'kodikal',
    name: 'Kodikal',
    pincode: '575006',
    zone: 'core',
    distanceFromHubKm: 2.0,
    landmarks: ['Kodikal Cross', 'Urwa Store Link', 'Sultan Battery Road', 'Kottara Chowki'],
    metaTitle: 'Pet Grooming in Kodikal, Mangalore | Dog & Cat Salon | Coastal Tails',
    metaDescription: 'Professional dog and cat grooming studio and mobile van visits in Kodikal, Mangaluru. Warm hydro-baths, tick dips, and breed styling.',
    heroHeadline: 'Caring Pet Grooming in Kodikal',
    heroSubtitle: 'Professional grooming tailored to your pet’s comfort. Book studio appointments or relax at home while Coastal Tails GO grooms in your driveway.',
    aboutCoverage: 'Conveniently situated right next to Kottara Chowki and Derebail, Kodikal pet parents enjoy flexible scheduling and same-day grooming appointments.',
    howToReach: 'Head towards Kottara Chowki, take the Derebail flyover link road up to Dwaraka Enclave (5 minutes drive).',
    whyChooseUs: [
      'Close neighborhood connection to our Derebail facility',
      'Fast doorstep van response times',
      'Strict force-free, patient approach with fearful or rescue pets',
    ],
    localContext: 'Close to the scenic Gurupura river breeze, Kodikal pets often benefit from regular anti-fungal hygiene baths during the monsoon.',
    dogGroomingServices: ['Full Groom & Blowout', 'Sanitary Tidy', 'Nail Buffing', 'Anti-Tick Dip'],
    catGroomingServices: ['Feline Hygiene Groom', 'Ear Mite Flush'],
    faqs: [
      {
        question: 'Do you offer pickup and drop in Kodikal?',
        answer: 'We offer Coastal Tails GO doorstep mobile grooming van service right in your driveway, which is even more convenient than pickup!',
      },
    ],
  },
  {
    slug: 'mary-hill',
    name: 'Mary Hill',
    pincode: '575008',
    zone: 'core',
    distanceFromHubKm: 2.5,
    landmarks: ['Maryhill Helipad', 'Mount Carmel School', 'Airport Road', 'Bondel Road'],
    metaTitle: 'Pet Grooming in Mary Hill, Mangalore | Coastal Tails Pet Spa',
    metaDescription: 'Top-rated dog and cat grooming studio & doorstep mobile van in Mary Hill, Mangaluru. Full haircuts, puppy grooming, and de-shedding.',
    heroHeadline: 'Professional Dog & Cat Grooming in Mary Hill',
    heroSubtitle: 'Pamper your pets with certified gentle grooming, soothing spa rituals, and breed-standard haircuts in Mary Hill.',
    aboutCoverage: 'Serving pet families around the Maryhill Helipad, Mount Carmel corridor, and Airport Road with studio appointments and scheduled mobile van visits.',
    howToReach: 'Drive 2.5 km down Airport Road towards Derebail / Konchady junction to reach Dwaraka Enclave.',
    whyChooseUs: [
      '5-minute drive from Maryhill residential societies',
      'Quiet, air-conditioned mobile grooming salon on wheels',
      'Specialized senior pet and puppy handling protocols',
    ],
    localContext: 'Mary Hill is home to many active pet owners who walk around the open helipad grounds and green residential lanes.',
    dogGroomingServices: ['Breed Scissor Styling', 'Dead Sea Mud Pack', 'High-Velocity Blowout', 'Ear Cleaning'],
    catGroomingServices: ['Cat Spa & De-shedding', 'Claw Filing'],
    faqs: [
      {
        question: 'What is the best grooming package for Shih Tzus in Mary Hill?',
        answer: 'Our Signature Full Groom with an Asian Fusion Teddy Bear Cut is the top choice for Shih Tzus in Mary Hill.',
      },
    ],
  },
  {
    slug: 'kulai',
    name: 'Kulai',
    pincode: '575019',
    zone: 'wider',
    distanceFromHubKm: 12.5,
    landmarks: ['Kulai Bridge', 'Honnakatte', 'NH 66 Corridor', 'Hosabettu Border'],
    metaTitle: 'Mobile Pet Grooming in Kulai & Honnakatte, Mangalore | Coastal Tails GO',
    metaDescription: 'Coastal Tails GO doorstep mobile pet grooming van in Kulai & Honnakatte. Professional dog haircuts, warm baths, and cat grooming at your house.',
    heroHeadline: 'Coastal Tails GO Mobile Pet Grooming in Kulai',
    heroSubtitle: 'No need to drive all the way into the city center! Our fully equipped mobile grooming van visits Kulai on scheduled weekly routes.',
    aboutCoverage: 'Kulai is a vital part of our Northern Coastal mobile route. We park right outside your gate or apartment with complete power and warm water.',
    howToReach: 'Follow NH 66 South towards Kottara Chowki / Kuntikana, then exit onto the Derebail Church road to reach our studio, or book our mobile van.',
    whyChooseUs: [
      'Brings luxury grooming to Northern Mangalore without the traffic hassle',
      'Completely self-contained van with AC and warm water',
      'Zero exposure to other pets in waiting rooms',
    ],
    localContext: 'A coastal neighborhood along NH 66 where pet owners love the convenience of doorstep van grooming.',
    dogGroomingServices: ['Doorstep Full Groom', 'De-Shedding Undercoat Blast', 'Anti-Tick Bath', 'Nail Trimming'],
    catGroomingServices: ['Doorstep Cat Grooming', 'Knot Detangling'],
    faqs: [
      {
        question: 'How much in advance should I book mobile grooming in Kulai?',
        answer: 'We recommend booking 24–48 hours ahead to reserve your preferred morning or afternoon time slot in Kulai.',
      },
    ],
  },
  {
    slug: 'hosabettu',
    name: 'Hosabettu',
    pincode: '575019',
    zone: 'wider',
    distanceFromHubKm: 14.0,
    landmarks: ['Hosabettu Beach', 'Kulur-Surathkal NH 66', 'Idya Cross', 'Surathkal Border'],
    metaTitle: 'Mobile Pet Grooming in Hosabettu, Mangalore | Coastal Tails GO',
    metaDescription: 'Professional dog and cat grooming at your doorstep in Hosabettu, Mangaluru with Coastal Tails GO mobile van. Certified groomers & warm baths.',
    heroHeadline: 'Doorstep Pet Grooming in Hosabettu',
    heroSubtitle: 'Hassle-free, premium pet pampering right at your doorstep in Hosabettu with our climate-controlled mobile grooming van.',
    aboutCoverage: 'Serving pet parents across Hosabettu, beachside estates, and residential layouts along the Surathkal corridor.',
    howToReach: 'Take NH 66 South to Kottara Chowki / Derebail (15–20 mins) or book our Coastal Tails GO mobile van directly to your home.',
    whyChooseUs: [
      'Saves you a 30-minute city drive each way',
      'Deep marine mud and salt-cleansing baths for beach-loving dogs',
      'Transparent pricing and prompt WhatsApp updates',
    ],
    localContext: 'Many dogs in Hosabettu enjoy playing on nearby sands, requiring thorough de-sand and salt-removal bathing.',
    dogGroomingServices: ['Marine Coat Rinse & Spa Bath', 'Breed Haircut', 'De-shedding', 'Paw Balm'],
    catGroomingServices: ['Gentle Feline Bath', 'Claw Trimming'],
    faqs: [
      {
        question: 'Can you groom multiple dogs in Hosabettu on the same day?',
        answer: 'Yes! We frequently schedule back-to-back sessions for households with two or more dogs or cats.',
      },
    ],
  },
  {
    slug: 'mukka',
    name: 'Mukka',
    pincode: '575021',
    zone: 'wider',
    distanceFromHubKm: 18.0,
    landmarks: ['Srinivas Medical College Mukka', 'Sasihithlu Road', 'Mukka Beach', 'NH 66 North'],
    metaTitle: 'Mobile Pet Grooming in Mukka & Sasihithlu, Mangalore | Coastal Tails GO',
    metaDescription: 'Coastal Tails GO mobile doorstep pet grooming in Mukka & Sasihithlu. Air-conditioned van, warm baths, de-shedding, and full styling haircuts.',
    heroHeadline: 'Coastal Tails GO Mobile Grooming in Mukka',
    heroSubtitle: 'Luxury grooming arrives at your driveway in Mukka! Professional dog and cat care with zero travel stress.',
    aboutCoverage: 'Our mobile van visits Mukka, Srinivas University residential quarters, and Sasihithlu on dedicated scheduled route days.',
    howToReach: 'Mukka residents can take NH 66 directly to Derebail, or let our mobile van come directly to your gate in Mukka.',
    whyChooseUs: [
      'Eliminates long travel to central Mangalore',
      'Air-conditioned mobile salon with 1-on-1 groomer attention',
      'Hospital-grade sterilization of all tools between pets',
    ],
    localContext: 'A northern coastal academic and beach locality with large homes, estates, and pet parents seeking convenient mobile grooming.',
    dogGroomingServices: ['Full Styling Haircut', 'Warm Hydro-Bath', 'Undercoat Blast', 'Ear Cleaning'],
    catGroomingServices: ['Low-Stress Cat Bath', 'Sanitary Care'],
    faqs: [
      {
        question: 'Does the mobile van travel as far as Mukka and Sasihithlu?',
        answer: 'Yes! Mukka is part of our scheduled Wider Mobile Zone. We visit weekly—WhatsApp us at +91 79969 89956 to reserve your slot.',
      },
    ],
  },
];
