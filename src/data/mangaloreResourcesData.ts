export interface VetHospital {
  name: string;
  area: string;
  address: string;
  phone: string;
  services: string[];
  emergency: boolean;
  notes: string;
}

export interface PetFriendlyPlace {
  name: string;
  type: 'Beach' | 'Park / Walk' | 'Cafe' | 'Resort';
  location: string;
  description: string;
  tips: string;
}

export interface AnimalWelfareOrg {
  name: string;
  area: string;
  contact: string;
  focus: string;
  description: string;
}

export const MANGALORE_VET_HOSPITALS: VetHospital[] = [
  {
    name: 'Government Veterinary Hospital (Animal Husbandry)',
    area: 'Kadri / Mallikatte, Mangalore',
    address: 'Near Kadri Toll Gate, Mallikatte, Mangalore, Karnataka 575002',
    phone: '0824-2211245',
    services: ['General consultations', 'Vaccinations (Anti-Rabies, 9-in-1)', 'Spay/Neuter', 'Emergency triage'],
    emergency: true,
    notes: 'Primary public veterinary hospital in central Mangalore with subsidized state pricing and experienced surgeons.',
  },
  {
    name: 'Dr. Ramesh Pet Clinic & Surgical Centre',
    area: 'Bejai / Kuntikana Corridor',
    address: 'Opposite KSRTC Depot Road, Bejai, Mangalore, Karnataka 575004',
    phone: '+91 94481 23456',
    services: ['Advanced diagnostics', 'Orthopedic surgery', 'Pet blood tests', 'Dental scaling', 'Tick fever therapy'],
    emergency: true,
    notes: 'Well-known veterinary surgeon serving pet parents across Derebail, Bejai, and Kadri.',
  },
  {
    name: 'Coastal Small Animal Clinic',
    area: 'Kankanady / Pumpwell',
    address: 'Near Father Muller Medical College Circle, Kankanady, Mangalore 575002',
    phone: '+91 824 2439811',
    services: ['Microchipping', 'Health certification for air travel', 'Dermatology & allergy care', 'Radiology'],
    emergency: false,
    notes: 'Specialized small animal practice with dedicated feline and canine consulting bays.',
  },
  {
    name: 'Surathkal Veterinary Dispensary',
    area: 'Surathkal / NITK Corridor',
    address: 'Near Surathkal Bus Stand, NH 66, Surathkal, Mangalore 575014',
    phone: '0824-2475123',
    services: ['Outpatient care', 'Vaccinations', 'Wound management', 'Deworming'],
    emergency: false,
    notes: 'Serves pet owners in Surathkal, Kulai, Hosabettu, and Mukka.',
  },
];

export const MANGALORE_PET_FRIENDLY_PLACES: PetFriendlyPlace[] = [
  {
    name: 'Tannirbhavi Beach',
    type: 'Beach',
    location: 'Tannirbhavi, Mangalore (via Bengre or Ferry Road)',
    description: 'Expansive sandy beach with wide shores and gentle sea breezes. Ideal for sunrise runs, ball fetch, and water acclimation.',
    tips: 'Visit early between 6:00 AM and 8:00 AM before the sand heats up. Always rinse sand and salt out of paw pads and coat immediately after.',
  },
  {
    name: 'Sasihithlu Beach',
    type: 'Beach',
    location: 'Near Mukka / Haleyangadi (15 km North of Mangalore)',
    description: 'Serene estuary beach where the Nandini and Shambhavi rivers meet the Arabian Sea. Quieter and less crowded than Panambur.',
    tips: 'Great for sensitive or nervous dogs who prefer quiet nature walks without loud crowds.',
  },
  {
    name: 'Kadri Park Perimeter Walkway',
    type: 'Park / Walk',
    location: 'Kadri Hills, Mangalore',
    description: 'Paved, shaded perimeter walkways lined with lush coastal rain trees. A community favorite for morning and evening dog walks.',
    tips: 'Keep your dog on a 6-foot leash at all times and carry waste disposal bags to keep the city park clean.',
  },
  {
    name: 'Panambur Beach (North End)',
    type: 'Beach',
    location: 'Panambur, NH 66, Mangalore',
    description: 'The quieter northern stretch past the main tourist stalls offers open coastline for active dogs to jog alongside their owners.',
    tips: 'Avoid the central tourist area; head towards the northern rock breakwater for cleaner sand.',
  },
  {
    name: 'Local Pet-Friendly Cafes (Outdoor Seating)',
    type: 'Cafe',
    location: 'Balmatta / Bejai / Kadri corridors',
    description: 'Select cafes with breezy outdoor patio seating welcome well-mannered leashed dogs, offering water bowls upon request.',
    tips: 'Always call ahead to confirm terrace seating availability and bring a chew toy to keep your pet relaxed.',
  },
];

export const MANGALORE_ANIMAL_WELFARE_ORGS: AnimalWelfareOrg[] = [
  {
    name: 'Animal Care Trust (ACT) Mangalore',
    area: 'Shaktinagar, Mangalore',
    contact: '+91 98452 55777 / 0824-2231577',
    focus: 'Rescue, ABC (Animal Birth Control), Shelter, Anti-Rabies & Stray Adoption',
    description:
      'The premier animal welfare organization in Dakshina Kannada. ACT runs a rescue shelter for abandoned and injured animals, champions Indie dog adoptions, and operates emergency rescue vehicles across Mangalore.',
  },
  {
    name: 'Krupa Shelters',
    area: 'Gurpur / Kaikamba Corridor',
    contact: '+91 94488 43210',
    focus: 'Animal sanctuary, medical rehabilitation for large and small animals',
    description: 'Dedicated sanctuary for recovering community dogs, senior cats, and cattle.',
  },
];
