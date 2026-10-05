/**
 * ============================================================================
 * COASTAL TAILS GO – MOBILE DOORSTEP PET GROOMING ARCHIVE
 * ============================================================================
 * This file archives and preserves ALL mobile pet grooming infrastructure,
 * van specifications, service descriptions, coverage zones, booking policies,
 * pricing surcharges, FAQs, routing details, and UI component specifications
 * for Coastal Tails.
 *
 * Status: ARCHIVED / SAVED FOR FUTURE ROLLOUT
 * (Currently, Coastal Tails is launched as a dedicated 100% shop-based Grooming
 * Studio & Pet Spa in Derebail, Mangaluru. All mobile grooming assets are preserved
 * here in pristine detail to allow instant re-introduction whenever mobile
 * grooming van operations commence).
 * ============================================================================
 */

export interface ArchivedMobileGroomingData {
  title: string;
  tagline: string;
  brandName: string;
  vanSpecifications: {
    powerSystem: string;
    waterCapacity: string;
    temperatureControl: string;
    sterilization: string;
    groomingTable: string;
    dryerSystem: string;
    acSystem: string;
  };
  serviceDescription: string;
  operatingZones: {
    core: string[];
    extended: string[];
    widerCoastal: string[];
  };
  features: string[];
  pricingRules: {
    mode: 'ask';
    depositRequired: boolean;
    depositAmountInr: number;
    travelSurcharge: string;
  };
  cancellationPolicy: {
    noticePeriodMinutes: number;
    nonRefundableAdvanceNotice: string;
    reschedulingPolicy: string;
  };
  faqs: { question: string; answer: string }[];
  seoKeywords: string[];
  comparisonPoints: {
    feature: string;
    mobileVan: string;
    shopStudio: string;
  }[];
  uiComponents: {
    sectionId: string;
    sectionTitle: string;
    heroHeadline: string;
    threeStepProcess: { step: string; title: string; desc: string }[];
  };
}

export const ARCHIVED_COASTAL_TAILS_GO_DATA: ArchivedMobileGroomingData = {
  title: 'Coastal Tails GO Mobile Pet Grooming Van',
  brandName: 'Coastal Tails GO',
  tagline: 'Mangaluru’s Luxury Doorstep Pet Spa Experience',
  vanSpecifications: {
    powerSystem: 'Self-powered on-board low-decibel generator + auxiliary inverter battery array (zero need for customer power)',
    waterCapacity: 'Dedicated on-board 150L freshwater tank with instant warm water hydrotherapy system',
    temperatureControl: 'Full climate-controlled cabin with high-efficiency air-conditioning & de-humidification',
    sterilization: 'Hospital-grade ultraviolet (UV-C) sanitization and botanical disinfection between each pet',
    groomingTable: 'Electric/hydraulic lift table with anti-slip silicone matting for senior & giant pets',
    dryerSystem: 'Low-noise variable speed high-velocity blower preventing feline and puppy startle',
    acSystem: 'Heavy-duty 1.5-ton climate control unit designed for Mangaluru coastal tropical heat & humidity',
  },
  serviceDescription:
    'No traffic stress, no cage waiting, and zero car sickness. Coastal Tails GO is Mangaluru’s custom air-conditioned mobile pet salon that parks directly outside customer homes, gated villas, and apartment gates across Mangaluru.',
  operatingZones: {
    core: [
      'Derebail',
      'Kuntikana',
      'Kavoor',
      'Konchady',
      'Bejai',
      'Kadri',
      'Kottara Chowki',
      'Urwa & Chilimbi',
      'Yeyyadi',
      'Mary Hill',
      'Bondel',
    ],
    extended: [
      'Kankanady',
      'Falnir & Attavar',
      'Valencia & Mangaladevi',
      'Padavinangady',
      'Kunjathbail',
      'Shakthinagar',
      'Kulur & Panjimogaru',
    ],
    widerCoastal: [
      'Surathkal & NITK',
      'Kulai & Honnakatte',
      'Hosabettu',
      'Mukka & Sasihithlu',
      'Bajpe & Airport Road',
      'Deralakatte & University Campuses',
      'Thokkottu & Ullal',
    ],
  },
  features: [
    '100% 1-on-1 Dedicated Stylist Attention',
    'Zero Cage Drying – Low Stress for Anxious Dogs & Cats',
    'Self-Powered with Generator & Pure RO Warm Water',
    'Hospital-Grade UV Sterilization Between Every Pet Appointment',
    'Doorstep Convenience: We park in your driveway or apartment gate',
    'No Travel Sickness for Cats and Motion-Sensitive Puppies',
  ],
  pricingRules: {
    mode: 'ask',
    depositRequired: true,
    depositAmountInr: 300,
    travelSurcharge: 'Standard rates for Core zone (0–6 km); nominal travel adjustment for outer zones (>15 km)',
  },
  cancellationPolicy: {
    noticePeriodMinutes: 90,
    nonRefundableAdvanceNotice:
      'A ₹300 booking advance is required for mobile van appointments. If cancelled with less than 90 minutes notice or if unattended when the van arrives, the ₹300 advance is retained as a non-refundable van visit charge.',
    reschedulingPolicy:
      'Appointments may be rescheduled or cancelled freely with at least 90 minutes notice prior to the van departure slot.',
  },
  faqs: [
    {
      question: 'How does Mobile Doorstep Van Grooming work in Mangaluru?',
      answer:
        'Our temperature-controlled mobile salon arrives at your doorstep in Kadri, Bejai, Urwa, etc. We bring our own water heating and power generation—all we need is a safe parking spot within 30 meters of your building or house gate!',
    },
    {
      question: 'Do you need water or electricity from my house in Mangalore?',
      answer:
        'No, our Coastal Tails GO mobile van is fully self-contained with its own fresh filtered water tank and quiet generator power. A standard household 15A socket is only used as an optional auxiliary power source if preferred.',
    },
    {
      question: 'Is mobile grooming safe for cats?',
      answer:
        'Mobile grooming is exceptionally beneficial for cats because felines often experience intense motion sickness and fear inside cars and shared veterinary waiting rooms. With Coastal Tails GO, the cat is carried just a few steps from your living room into a quiet, sanitized van and returned immediately after grooming.',
    },
    {
      question: 'How much in advance should I book the mobile van?',
      answer:
        'Due to clustered routing across northern (Surathkal/Kulai), central (Bejai/Kadri), and southern (Deralakatte/Ullal) sectors, booking 24 to 48 hours in advance on WhatsApp is recommended to secure your preferred morning or afternoon time slot.',
    },
    {
      question: 'What happens if my apartment complex does not allow vans inside?',
      answer:
        'Our van can safely park at the main visitor parking area, clubhouse entrance, or exterior gate. You can bring your pet down on a leash or pet carrier for immediate boarding.',
    },
  ],
  seoKeywords: [
    'mobile pet grooming mangalore',
    'doorstep dog grooming mangalore',
    'dog grooming at home mangalore',
    'cat grooming van mangaluru',
    'pet spa doorstep service mangalore',
    'coastal tails go van',
    'home dog bath derebail mangalore',
    'pet grooming van surathkal',
    'doorstep dog bath kankanady',
    'mobile pet groomer kadri',
  ],
  comparisonPoints: [
    {
      feature: 'Location',
      mobileVan: 'At your gate / driveway',
      shopStudio: 'Coastal Tails - Pet Aura (Shop B2, Dwaraka Enclave, Derebail)',
    },
    {
      feature: 'Travel Distance',
      mobileVan: '0 km (Zero travel for pet)',
      shopStudio: 'Short drive with ample parking at Dwaraka Enclave',
    },
    {
      feature: 'Pet Atmosphere',
      mobileVan: 'Completely private 1-on-1 inside air-conditioned van',
      shopStudio: 'Spacious studio bays with open-view styling glass lounge for pet parents',
    },
    {
      feature: 'Waiting & Cages',
      mobileVan: 'Zero cages, immediate return to your living room',
      shopStudio: '100% force-free, hands-on attention, zero stressful holding crates',
    },
    {
      feature: 'Power & Water',
      mobileVan: 'Self-powered on-board generator & warm water tank',
      shopStudio: 'Full hydrotherapy hydrobath stations & climate-controlled luxury spa',
    },
  ],
  uiComponents: {
    sectionId: 'coastal-tails-go',
    sectionTitle: 'COASTAL TAILS GO • MOBILE GROOMING DIVISION',
    heroHeadline: 'Mobile Pet Grooming at Your Doorstep',
    threeStepProcess: [
      {
        step: '01',
        title: 'Book on WhatsApp',
        desc: 'Share your location in Mangaluru, your pet’s breed, size, and required services. We provide a customized price quote and confirm your convenient date slot.',
      },
      {
        step: '02',
        title: 'The Van Arrives',
        desc: 'Our self-powered, air-conditioned grooming van parks outside your residence. We only need a parking spot — warm water, power, and equipment are self-contained.',
      },
      {
        step: '03',
        title: '1-on-1 Gentle Grooming',
        desc: 'Your fur baby receives 100% focused attention with zero exposure to unfamiliar pets, cages, or transport stress. Returned clean, fragrant, and happy!',
      },
    ],
  },
};

/**
 * Quick helper check to verify if mobile grooming is currently enabled
 * Set to `false` for 100% shop-based studio launching.
 * Toggle to `true` when ready to introduce mobile grooming operations!
 */
export const IS_MOBILE_GROOMING_ENABLED = false;
