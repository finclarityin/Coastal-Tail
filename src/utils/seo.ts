import { useEffect } from 'react';
import { ActivePage } from '../types';

interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
}

const SEO_MAP: Record<string, PageSeoConfig> = {
  home: {
    title: 'COASTAL TAILS – Premier Pet Grooming Studio & Spa | Mangaluru',
    description: "Mangaluru's top-rated pet grooming studio, luxury spa, and curated pet boutique. Compassionate certified grooming for dogs and cats in Kankanady.",
    keywords: 'pet grooming mangalore, dog grooming mangaluru, cat grooming mangalore, pet spa mangaluru, dog bath, pet boutique mangalore, coastal tails',
    canonicalPath: '/',
  },
  about: {
    title: 'About Us | Coastal Tails Pet Grooming Studio & Spa Mangaluru',
    description: 'Learn about Coastal Tails – our stress-free grooming philosophy, gentle certified groomers, hygienic spa setup, and dedication to pets in Mangaluru.',
    keywords: 'about coastal tails, certified pet groomers mangalore, hygienic pet spa kankanady',
    canonicalPath: '/about',
  },
  services: {
    title: 'Dog & Cat Grooming Packages & Spa Services | Coastal Tails Mangaluru',
    description: 'Explore full grooming, luxury baths, anti-tick medicated dips, deshedding, feline styling, and van mobile grooming services in Mangaluru.',
    keywords: 'dog grooming packages, cat bath mangalore, pet spa services mangaluru, mobile pet grooming mangalore, puppy haircut',
    canonicalPath: '/services',
  },
  shop: {
    title: 'Pet Store – Premium Food, Natural Treats & Pet Gear | Coastal Tails',
    description: 'Shop premium dog & cat food, nutritional supplements, grooming accessories, safe toys, leashes, and luxury pet care essentials in Mangaluru.',
    keywords: 'pet store mangalore, dog food online mangaluru, cat treats, pet accessories mangalore, coastal tails shop',
    canonicalPath: '/shop',
  },
  food: {
    title: 'Dog & Cat Food & Nutrition Boutique | Coastal Tails Mangaluru',
    description: 'Curated premium nutrition for pets in Mangaluru. Grain-free kibble, wet gravies, dental chews, treats, and puppy starter meals.',
    keywords: 'buy dog food mangalore, premium cat food, royal canin mangaluru, pet nutrition',
    canonicalPath: '/shop/food',
  },
  accessories: {
    title: 'Pet Accessories, Collars, Harnesses & Toys | Coastal Tails Mangaluru',
    description: 'Handpicked pet lifestyle accessories: ergonomic harnesses, waterproof leashes, plush squeakers, grooming combs, and cozy pet beds in Mangaluru.',
    keywords: 'dog harness mangalore, pet collars, cat toys mangaluru, grooming brushes',
    canonicalPath: '/shop/accessories',
  },
  membership: {
    title: 'Pet Parent VIP Club Membership (₹599/yr) | Coastal Tails Mangaluru',
    description: 'Join the Coastal Tails Pet Parent VIP Club for ₹599/year. Enjoy 15% grooming discounts, free add-on spa treatments, and priority weekend bookings.',
    keywords: 'pet membership mangalore, grooming discount club, coastal tails vip',
    canonicalPath: '/membership',
  },
  contact: {
    title: 'Contact Us & Studio Location | Coastal Tails Grooming Studio Kankanady',
    description: 'Visit Coastal Tails behind Hotel New Bharath, Kankanady, Mangaluru. Call or WhatsApp +91 99000 00000 for appointments & store enquiries.',
    keywords: 'coastal tails location, pet groomer near me kankanady, coastal tails phone number, mangalore pet salon address',
    canonicalPath: '/contact',
  },
  policies: {
    title: 'Studio Policies, Grooming Terms & Pet Safety | Coastal Tails',
    description: 'Transparent customer policies: grooming safety guarantee, mobile advance cancellation terms, hygiene return rules, and privacy practices.',
    keywords: 'coastal tails policies, grooming terms mangalore, pet safety policy',
    canonicalPath: '/policies',
  },
  'membership-terms': {
    title: 'VIP Membership Terms & Guidelines | Coastal Tails Mangaluru',
    description: 'Detailed terms and benefits for the Coastal Tails Pet Parent VIP Club annual membership program.',
    keywords: 'coastal tails membership terms, pet club rules',
    canonicalPath: '/policies/membership',
  },
};

export const updateDocumentSEO = (page: ActivePage) => {
  const config = SEO_MAP[page] || SEO_MAP.home;

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
};
