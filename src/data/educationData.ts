export interface EducationArticle {
  id: string;
  slug: string;
  category: 'grooming-education' | 'did-you-know' | 'funny-content' | 'local-mangalore';
  categoryLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  readTime: string;
  author: string;
  publishDate: string;
  featuredImage: string;
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    body: string[];
  }[];
  localTip?: string;
  relatedServiceTab?: 'dogs' | 'cats' | 'spa' | 'mobile';
}

export const EDUCATION_ARTICLES: EducationArticle[] = [
  {
    id: 'art-mangalore-humidity',
    slug: 'pet-grooming-mangalore-humidity-monsoon-guide',
    category: 'local-mangalore',
    categoryLabel: 'Local Mangalore Guide',
    title: 'Pet Grooming in Mangalore: Managing Coastal Humidity & Rainy Seasons',
    subtitle: 'Essential coat care, fungal prevention, and grooming hygiene tips for pet parents living along the coastal belt of Karnataka.',
    summary: 'Mangaluru’s warm, humid coastal air and monsoon wetness create unique challenges for dog and cat coats. Learn how proper drying, de-shedding, and hygiene trims protect your pet from hot spots and matting.',
    readTime: '4 min read',
    author: 'Coastal Tails Grooming Team',
    publishDate: 'August 2026',
    featuredImage: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1000&q=80',
    keyTakeaways: [
      'Coastal humidity traps moisture in thick undercoats, leading to fungal flare-ups if not thoroughly blown dry.',
      'Regular pad and sanitary trimming prevents mud buildup and bacterial dermatitis during Mangaluru rains.',
      'Avoid leaving beach saltwater on your pet’s skin — always rinse and condition with a pet-safe botanical balm.',
    ],
    contentSections: [
      {
        heading: 'Why Mangaluru’s Climate Needs Special Coat Care',
        body: [
          'Living in Mangaluru means our pets enjoy breezy coastal beaches and green tropical surroundings, but our relative humidity (often exceeding 80%) poses distinct grooming challenges.',
          'Double-coated breeds like Golden Retrievers, German Shepherds, and Huskies retain dampness close to the dermis. When moisture is trapped, it can cause fungal hot spots, foul odors, and severe coat matting.',
        ],
      },
      {
        heading: 'High-Velocity Drying vs. Air Drying',
        body: [
          'Never allow a dense-coated pet to air-dry after a rainy walk or bath in Mangaluru. Air-drying takes hours in humid conditions, creating the ideal damp breeding ground for skin irritation.',
          'Professional high-velocity blow dryers push moisture and trapped dead undercoat out from the skin level upward, ensuring a truly dry, breathable, and fresh coat.',
        ],
      },
      {
        heading: 'Beach Days & Salt Residue',
        body: [
          'If you take your dog to Panambur, Tannirbhavi, or Ullal Beach, always perform a fresh water rinse immediately. Salt crystals dehydrate the hair shaft, turning smooth fur brittle and prone to knotting.',
          'Our Coastal Tails Dead Sea Mineral Mud Pack and hydrating coat serums are specially designed to replenish moisture and restore skin barrier health after beach adventures.',
        ],
      },
    ],
    localTip: 'During July–September monsoons in Mangaluru, book grooming appointments every 3–4 weeks for paw-pad hygiene trims and professional high-velocity drying.',
    relatedServiceTab: 'spa',
  },
  {
    id: 'art-mobile-vs-studio',
    slug: 'home-grooming-vs-studio-grooming-mangalore',
    category: 'local-mangalore',
    categoryLabel: 'Local Mangalore Guide',
    title: 'Mobile Pet Grooming vs. Studio Grooming: Which Is Best for Your Pet?',
    subtitle: 'Comparing Coastal Tails GO doorstep mobile grooming with our central grooming studio in Mangaluru to help you choose.',
    summary: 'Deciding between a doorstep grooming van and a dedicated studio visit? We break down the convenience, pet temperament factors, and travel considerations for Mangaluru pet owners.',
    readTime: '5 min read',
    author: 'Coastal Tails Team',
    publishDate: 'August 2026',
    featuredImage: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=80',
    keyTakeaways: [
      'Coastal Tails GO mobile grooming eliminates travel stress, car sickness, and salon waiting rooms.',
      'Our studio offers full spa hydro-therapy installations and access to our boutique pet store.',
      'Senior pets and anxious cats benefit immensely from 1-on-1 doorstep mobile grooming right in their driveway.',
    ],
    contentSections: [
      {
        heading: 'The Convenience of Coastal Tails GO Doorstep Van',
        body: [
          'For busy pet parents in Surathkal, Bejai, or Kadri, Coastal Tails GO brings a complete self-contained grooming salon to your residence.',
          'Your pet steps right from your home into our air-conditioned van parked outside. There is zero car travel, no motion sickness, and zero exposure to unfamiliar barking pets.',
        ],
      },
      {
        heading: 'When to Choose the Central Grooming Studio',
        body: [
          'Our grooming studio in Derebail offers spacious grooming bays, specialized hydrotherapy baths, and the full Coastal Tails boutique where you can shop curated nutrition and pet gear while waiting.',
          'It is also a great option if you are running errands in central Mangaluru or if your building has strict parking regulations.',
        ],
      },
    ],
    localTip: 'Have an elderly dog or an easily stressed cat? Coastal Tails GO doorstep mobile grooming is usually the gentlest, lowest-stress choice.',
    relatedServiceTab: 'mobile',
  },
  {
    id: 'art-cat-grooming-importance',
    slug: 'how-often-should-cats-be-groomed-hygiene-guide',
    category: 'grooming-education',
    categoryLabel: 'Grooming Education',
    title: 'How Often Should Cats Be Groomed? A Professional Feline Care Guide',
    subtitle: 'Debunking the myth that cats only need self-grooming, and how regular brushing prevents dangerous hairballs and painful matting.',
    summary: 'While cats groom themselves, self-grooming does not remove severe undercoat tangles, trim sharp claws, or clean deep ear canals. Learn the optimal grooming schedule for short and long-haired felines.',
    readTime: '4 min read',
    author: 'Coastal Tails Feline Specialist',
    publishDate: 'August 2026',
    featuredImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80',
    keyTakeaways: [
      'Cats swallow loose hair when grooming themselves, leading to gastrointestinal hairballs.',
      'Persian and long-haired cats require professional comb-outs every 4–6 weeks to avoid pelted mats.',
      'Low-stress, quiet handling techniques make cat grooming calm and enjoyable.',
    ],
    contentSections: [
      {
        heading: 'Why Cats Benefit from Professional Grooming',
        body: [
          'Cat tongues have tiny backward-facing barbs (papillae) that act like combs. While effective for surface dirt, they also mean the cat inevitably ingests loose fur.',
          'Professional de-shedding and gentle bathing drastically reduce hair ingestion, minimizing chronic vomiting and intestinal blockages.',
        ],
      },
      {
        heading: 'Persian and Long-Haired Cat Needs',
        body: [
          'Persian cats in Mangaluru often develop mats behind the ears, armpits, and groin due to humidity and friction. Once mats form, they pull tightly against delicate feline skin, causing pain.',
          'Our Signature Cat Groom includes gentle dematting, sanitary area trimming, and optional Lion Cut styling tailored to your cat’s lifestyle.',
        ],
      },
    ],
    relatedServiceTab: 'cats',
  },
  {
    id: 'art-matting-prevention',
    slug: 'how-to-prevent-dog-coat-matting-home-care-tips',
    category: 'grooming-education',
    categoryLabel: 'Grooming Education',
    title: 'How to Prevent Dog Coat Matting: Tools, Techniques & Routine',
    subtitle: 'Practical advice from professional groomers on keeping Shih Tzus, Poodles, and Doodles knot-free between salon visits.',
    summary: 'Matting is one of the most common pet discomforts in India. Discover the line-brushing method, the right slicker brushes, and why bathing a matted dog at home makes knots tighter.',
    readTime: '5 min read',
    author: 'Coastal Tails Master Stylists',
    publishDate: 'August 2026',
    featuredImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=80',
    keyTakeaways: [
      'Never wash a matted dog without brushing out knots first — water causes wet hair knots to shrink like felt.',
      'Use a long-pinned slicker brush paired with a metal greyhound comb to check roots.',
      'Daily 5-minute brushing sessions prevent the need for drastic shave-downs.',
    ],
    contentSections: [
      {
        heading: 'The Line-Brushing Technique',
        body: [
          'Most pet parents brush only the surface of the coat, leaving dense knots forming at the skin line. Line-brushing involves parting the hair with one hand and brushing small sections from root to tip.',
          'Always follow up with a metal comb. If the comb glides freely through to the skin with zero resistance, your pet is truly tangle-free!',
        ],
      },
    ],
    relatedServiceTab: 'dogs',
  },
  {
    id: 'art-did-you-know-shedding',
    slug: 'did-you-know-pet-coat-and-shedding-facts',
    category: 'did-you-know',
    categoryLabel: 'Did You Know?',
    title: '5 Surprising Facts About Dog & Cat Shedding You Might Not Know',
    subtitle: 'Fascinating biological insights into why pets blow their coats, seasonal shedding triggers, and skin health.',
    summary: 'Think shaving a double-coated dog keeps them cooler? Think again! Explore 5 essential facts every pet parent should know about fur growth, seasonal shedding, and skin protection.',
    readTime: '3 min read',
    author: 'Coastal Tails Science Desk',
    publishDate: 'August 2026',
    featuredImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80',
    keyTakeaways: [
      'A dog’s double coat acts as natural thermal insulation, keeping them cool in summer and warm in winter.',
      'Shaving a double coat damages the hair follicles and increases sunburn and heatstroke risks.',
      'De-shedding treatments remove dead trapped fur while keeping the protective guard hairs intact.',
    ],
    contentSections: [
      {
        heading: 'Fact 1: Fur Is Natural Temperature Regulation',
        body: [
          'A healthy coat traps air close to the skin, insulating your dog from external heat. When a double coat is shaved off, the dog loses this thermal barrier and is exposed directly to hot coastal sunrays.',
        ],
      },
      {
        heading: 'Fact 2: Indoor Lighting Extends Shedding Cycles',
        body: [
          'In nature, pets shed primarily in spring and autumn based on natural daylight changes. Modern indoor living with artificial lighting means indoor pets shed continuously throughout the year.',
        ],
      },
    ],
    relatedServiceTab: 'dogs',
  },
  {
    id: 'art-funny-reactions',
    slug: 'funny-pet-reactions-to-grooming-day-transformations',
    category: 'funny-content',
    categoryLabel: 'Pet Stories & Smiles',
    title: 'Post-Groom Zoomies: Why Pets Get That Unstoppable Energy After a Bath',
    subtitle: 'The hilarious psychology behind post-grooming sprints, ear-shaking, and the famous clean-fur runway strut.',
    summary: 'Every pet parent knows the post-bath zoomies! Here is the sweet, funny science behind why dogs and cats sprint around the house after being freshly groomed.',
    readTime: '3 min read',
    author: 'Coastal Tails Fun Desk',
    publishDate: 'August 2026',
    featuredImage: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=80',
    keyTakeaways: [
      'Zoomies are a release of pent-up adrenaline and pure sensory relief after being handled calmly.',
      'Clean pets feel noticeably lighter once pounds of wet dead undercoat are removed.',
      'Rolling around is their instinctual attempt to re-apply their familiar scent!',
    ],
    contentSections: [
      {
        heading: 'The Joy of Feeling Light and Clean',
        body: [
          'Imagine walking around in heavy wet winter clothes and suddenly changing into lightweight silk pajamas! That is exactly how your dog feels when a heavy, matted, shedding coat is professionally deshedded and conditioned.',
        ],
      },
    ],
    relatedServiceTab: 'dogs',
  },
];
