export interface ComprehensiveFAQ {
  id: string;
  category: 'Location & Booking' | 'Services & Pricing' | 'Pet Care & Safety' | 'Studio Facilities';
  question: string;
  shortAnswer: string;
  detailedAnswer: string[];
}

export const COMPREHENSIVE_MANGALORE_FAQS: ComprehensiveFAQ[] = [
  {
    id: 'faq-location',
    category: 'Location & Booking',
    question: 'Where is Coastal Tails located in Mangalore?',
    shortAnswer: 'Our studio is at Shop No: B2, Dwaraka Enclave, Derebail, Mangalore, Karnataka 575006.',
    detailedAnswer: [
      'Coastal Tails (Pet Aura Studio) is centrally situated in Derebail at Shop No: B2, Dwaraka Enclave, Mangalore 575006.',
      'We are located along the Bejai-Kavoor road corridor, easily accessible within 5 to 10 minutes from Konchady, Kuntikana, Kavoor, Bondel, Bejai, Kadri, and Kottara.',
      'We offer dedicated, reserved customer storefront parking right in front of the salon for hassle-free pet drop-off and pickup.',
    ],
  },
  {
    id: 'faq-dog-services',
    category: 'Services & Pricing',
    question: 'What grooming services do you offer for dogs?',
    shortAnswer: 'We offer full-service dog grooming: warm hydro-baths, breed haircuts, de-shedding, tick baths, nail trimming, and luxury spa treatments.',
    detailedAnswer: [
      'Our canine services include:',
      '• Bath & Hygiene: Warm water hydro-massage, pH-balanced botanical shampoo, full blow dry, sanitary trim, paw pad fur clear, ear cleaning, and nail clipping.',
      '• Signature Haircut & Styling: Breed-specific scissor cuts, Teddy Bear cuts for Shih Tzus, puppy clips, and neat summer hygiene trims.',
      '• Anti-Shedding Treatments: 3-stage dead undercoat extraction with high-velocity air blowers for Labradors, Golden Retrievers, and German Shepherds.',
      '• Therapeutic Care: Medicated anti-fungal baths, tick & flea treatments, Dead Sea mineral mud masks, blueberry facials, and organic paw butter massages.',
    ],
  },
  {
    id: 'faq-cat-services',
    category: 'Services & Pricing',
    question: 'What grooming services do you offer for cats?',
    shortAnswer: 'We provide low-stress cat baths, Persian dematting, sanitary hygiene trims, nail clipping, ear cleansing, and lion cuts.',
    detailedAnswer: [
      'Cats receive quiet, feline-only appointment slots with low-decibel dryers and gentle handling.',
      '• Calming Feline Hydrobath using feline-safe hypoallergenic shampoos.',
      '• Painless Mat & Knot Detangling for Persian, British Shorthair, and long-coated breeds.',
      '• Gentle Claw Clipping, ear cleaning, tear-stain facial care, and sanitary trims.',
      '• Complete or partial Lion Cuts and Teddy trims for cats suffering from felted coastal mats.',
    ],
  },
  {
    id: 'faq-studio-facilities',
    category: 'Studio Facilities',
    question: 'What facilities are available at your Derebail grooming studio?',
    shortAnswer: 'Our studio features sound-insulated private suites, warm RO hydrotherapy baths, zero-cage handling, and a viewing lounge.',
    detailedAnswer: [
      'Coastal Tails is designed for low-stress pet care with modern amenities:',
      '• Private 1-on-1 Grooming Bays: No barking from other pets, minimizing anxiety.',
      '• Warm RO Hydro-Baths: Pure filtered warm water massage for thorough coat cleansing.',
      '• Zero-Cage Policy: 100% force-free hands-on care; pets are never placed in cages or holding crates.',
      '• Viewing Lounge: Glass observation partition where pet parents can watch with complimentary coffee.',
      '• Dedicated Parking: Storefront reserved parking at Dwaraka Enclave for easy drop-off and pickup.',
    ],
  },
  {
    id: 'faq-cost',
    category: 'Services & Pricing',
    question: 'How much does pet grooming cost in Mangalore?',
    shortAnswer: 'Dog hygiene baths start from ₹600–₹1,200; full haircut styling packages range from ₹1,400–₹2,600+ based on size, breed, and coat condition.',
    detailedAnswer: [
      'Pricing depends primarily on:',
      '1. Pet size (Small e.g. Shih Tzu, Medium e.g. Beagle, Large e.g. Labrador/Golden, Giant e.g. Saint Bernard).',
      '2. Coat condition (degree of matting, thickness of dead undercoat, presence of ticks).',
      '3. Chosen service package (Essential freshening, breed styling, or luxury spa rituals).',
      'We provide instant, transparent, and exact price quotes via WhatsApp (+91 79969 89956) before you confirm your appointment.',
    ],
  },
  {
    id: 'faq-duration',
    category: 'Services & Pricing',
    question: 'How long does a pet grooming session take?',
    shortAnswer: 'A standard bath and brush takes 45–60 minutes; a full haircut and styling session takes approximately 75–90 minutes.',
    detailedAnswer: [
      'Quick hygiene services (such as nail clipping or ear cleaning) take only 10 to 15 minutes.',
      'Heavy de-shedding for large double-coated dogs or intricate dematting for long-haired Persians may take up to 2 hours because we prioritize gentle handling with rest pauses.',
    ],
  },
  {
    id: 'faq-booking',
    category: 'Location & Booking',
    question: 'How do I book a grooming appointment?',
    shortAnswer: 'You can book directly through our online website form, call us at +91 79969 89956, or message us on WhatsApp.',
    detailedAnswer: [
      '1. Online: Click any "Book Appointment" button on our website to fill in your pet details.',
      '2. WhatsApp: Send a message to +91 79969 89956 with your pet breed and preferred date/time slot.',
      '3. Phone: Call our team directly at +91 79969 89956 between 9:00 AM and 8:00 PM.',
    ],
  },
  {
    id: 'faq-coverage-areas',
    category: 'Studio Facilities',
    question: 'Which Mangalore localities easily access your Derebail studio?',
    shortAnswer: 'We are centrally located in Derebail, easily reachable within 5–15 minutes from across Mangalore.',
    detailedAnswer: [
      'Our studio at Dwaraka Enclave has direct access from major corridors:',
      '• 3–5 Mins: Derebail, Konchady, Kuntikana, Kottara Chowki, Bejai.',
      '• 5–10 Mins: Kadri, Urwa, Chilimbi, Kavoor, Bondel, Mary Hill, Lalbagh.',
      '• 10–15 Mins: Kankanady, Falnir, Valencia, Surathkal, Kulai, Shakthinagar.',
      'Storefront reserved parking makes pet drop-off completely seamless!',
    ],
  },
  {
    id: 'faq-sedation',
    category: 'Pet Care & Safety',
    question: 'Do you sedate pets during grooming?',
    shortAnswer: 'Never. Coastal Tails operates strictly on a 100% force-free, sedation-free philosophy.',
    detailedAnswer: [
      'We never use sedatives, tranquilizers, or physical force. Our certified groomers are trained in animal behavioral handling, positive reinforcement, and fear-free techniques.',
      'If a pet shows signs of extreme distress or anxiety, we pause, allow them to decompress with cuddles or treats, and resume only when comfortable.',
    ],
  },
  {
    id: 'faq-stay-with-pet',
    category: 'Pet Care & Safety',
    question: 'Can I stay with my pet during the grooming session?',
    shortAnswer: 'Yes! You are welcome to observe through our studio viewing lounge window.',
    detailedAnswer: [
      'Our Derebail studio features clean, transparent glass viewing areas so parents can watch their pets being pampered.',
      'Note: For some overly attached pets who try to jump off the table when they see their owners, we may recommend waiting in our reception lounge to keep your pet calm and focused on the groomer.',
    ],
  },
  {
    id: 'faq-climate-frequency',
    category: 'Pet Care & Safety',
    question: 'How often should I get my pet groomed in Mangalore’s humid climate?',
    shortAnswer: 'Every 2 to 4 weeks depending on breed and lifestyle to prevent fungal infections and coastal coat issues.',
    detailedAnswer: [
      'Due to coastal humidity reaching 80–90%, moisture and sebum accumulate quickly in canine and feline coats.',
      '• Long-coated dogs (Shih Tzus, Poodles): Bath every 2–3 weeks; haircut every 4–6 weeks.',
      '• Double-coated dogs (Labradors, Goldens): De-shedding bath every 3–4 weeks.',
      '• Persian cats: Feline bath & dematting every 4–6 weeks.',
      '• Routine nails and ears: Every 3–4 weeks.',
    ],
  },
  {
    id: 'faq-prep',
    category: 'Location & Booking',
    question: 'What should I do before bringing my pet for grooming?',
    shortAnswer: 'Allow your pet a short relief walk, avoid heavy meals within 90 minutes of the session, and bring your pet leashed or in a carrier.',
    detailedAnswer: [
      '1. Exercise & Potty: Give your dog a quick potty walk so their bladder is empty.',
      '2. Feeding: Avoid feeding large meals immediately before grooming.',
      '3. Information: Notify our groomers of any skin sensitivities, ear history, arthritis, or behavioral sensitivities.',
      '4. Safety: Dogs should be on a secure leash and cats inside a well-ventilated carrier.',
    ],
  },
  {
    id: 'faq-nervous-pets',
    category: 'Pet Care & Safety',
    question: 'Do you handle aggressive, nervous, or rescue pets?',
    shortAnswer: 'Yes. Our experienced team specializes in patient, low-stress desensitization for sensitive, nervous, or rescue pets.',
    detailedAnswer: [
      'We take things slow. For nervous pets, we introduce tools gradually, turn dryers on low speed, and offer positive praise.',
      'We also offer private, one-on-one appointment slots during quieter morning hours to minimize sensory overload for highly reactive pets.',
    ],
  },
  {
    id: 'faq-products',
    category: 'Pet Care & Safety',
    question: 'What products do you use for grooming?',
    shortAnswer: 'We use premium, soap-free, pH-balanced botanical shampoos, natural conditioners, Dead Sea minerals, and veterinary-grade medicated washes.',
    detailedAnswer: [
      'All our grooming products are cruelty-free, paraben-free, and formulated specifically for canine and feline skin pH (7.0 to 7.5).',
      'We carry specialized formulas including hypoallergenic oatmeal, anti-shed silk protein, tearless blueberry facial cleansers, organic paw butter, and veterinary anti-fungal medicated treatments.',
    ],
  },
];
