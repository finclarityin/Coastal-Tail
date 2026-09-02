import { GroomingEnquiry, ProductOrder, CartItem } from '../types';

export const COASTAL_TAILS_PHONE = '79969 89956';
export const COASTAL_TAILS_PHONE_RAW = '7996989956';
export const COASTAL_TAILS_INTERNATIONAL_PHONE = '917996989956';
export const COASTAL_TAILS_WHATSAPP_LINK = 'https://wa.me/917996989956';
export const COASTAL_TAILS_EMAIL = 'care@coastaltails.in';
export const COASTAL_TAILS_WEBSITE = 'coastaltails.in';
export const COASTAL_TAILS_STORE_NAME = 'Coastal Tails - Pet Aura';
export const COASTAL_TAILS_SHOP_NO = 'Shop No:B2 , Dwaraka Enclave';
export const COASTAL_TAILS_ADDRESS = 'Shop No:B2 , Dwaraka Enclave, Derebail, Mangaluru, Karnataka 575006';
export const COASTAL_TAILS_GOOGLE_MAPS_LINK = 'https://share.google/Eh5iR7YSfNaqCIG1x';
export const COASTAL_TAILS_HOURS = 'Mon - Sun : 9:30 AM - 9:30 PM';

/**
 * Formats a number to Indian Rupee (INR) format (e.g. ₹1,250)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Builds the WhatsApp web / mobile deep link
 */
export function buildWhatsAppLink(message: string): string {
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${COASTAL_TAILS_INTERNATIONAL_PHONE}?text=${encodedText}`;
}

/**
 * Generates structured WhatsApp message for Grooming Enquiries
 */
export function createGroomingEnquiryUrl(enquiry: GroomingEnquiry): string {
  const addOnsText = enquiry.selectedAddOns && enquiry.selectedAddOns.length > 0
    ? `\n✨ *Requested Add-ons:* ${enquiry.selectedAddOns.join(', ')}`
    : '';

  const notesText = enquiry.notes ? `\n📝 *Special Notes:* ${enquiry.notes}` : '';

  const message = `🌊 *COASTAL TAILS – GROOMING ENQUIRY* 🐾
-----------------------------------------
Hello Coastal Tails Team! I would like to get price confirmation & book a grooming appointment for my pet.

🐶🐱 *Pet Type:* ${enquiry.petType === 'dog' ? 'Dog 🐕' : 'Cat 🐈'}
🐾 *Pet Name:* ${enquiry.petName || 'Not specified'}
🏷️ *Breed:* ${enquiry.breed || 'Not specified'}
⚖️ *Size / Coat:* ${enquiry.sizeOrCoat || 'Standard'}
🩺 *Coat Condition:* ${enquiry.coatCondition}
✂️ *Service Package:* ${enquiry.requestedPackage}
🚐 *Service Location:* ${enquiry.serviceMode === 'doorstep' ? 'Mobile Doorstep Van 🚐' : 'Coastal Tails - Pet Aura Studio (Derebail) 🏢'}${addOnsText}

📅 *Preferred Date:* ${enquiry.preferredDate || 'Earliest available'}
⏰ *Preferred Slot:* ${enquiry.preferredTimeSlot || 'Flexible'}

👤 *Customer Name:* ${enquiry.customerName}
📞 *Contact Number:* ${enquiry.customerMobile}${notesText}
-----------------------------------------
Please share the price quote, available appointment slots, and confirmation. Thank you!`;

  return buildWhatsAppLink(message);
}

/**
 * Generates structured WhatsApp message for Retail Food & Accessories Checkout
 */
export function createProductOrderUrl(
  order: ProductOrder,
  items: CartItem[],
  subtotal: number,
  deliveryFee: number = 0,
  grandTotal: number = subtotal
): string {
  const orderId = `CT-${Math.floor(100000 + Math.random() * 900000)}`;

  const itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}* (${item.product.brand})\n   • Qty: ${item.quantity} × ${formatINR(item.product.price)} = *${formatINR(item.product.price * item.quantity)}* [${item.product.sizeOrWeight}]`
    )
    .join('\n\n');

  const notesText = order.orderNotes ? `\n📝 *Order Notes:* ${order.orderNotes}` : '';

  const message = `🛍️ *COASTAL TAILS – PET STORE ORDER* 📦
-----------------------------------------
Order Reference: *#${orderId}*

Hello Coastal Tails Team! I would like to place an order for the following pet essentials:

🛒 *ORDERED ITEMS:*
${itemsList}

💰 *Subtotal:* ${formatINR(subtotal)}
🚚 *Delivery:* ${deliveryFee === 0 ? 'FREE Mangaluru Delivery' : formatINR(deliveryFee)}
💵 *Estimated Total:* *${formatINR(grandTotal)}*

👤 *CUSTOMER DETAILS:*
• *Name:* ${order.customerName}
• *Mobile:* ${order.mobileNumber}
• *WhatsApp:* ${order.whatsappNumber}
• *Delivery Area:* ${order.areaLocation}, Mangaluru
• *Full Address:* ${order.deliveryAddress}
• *Preferred Contact Time:* ${order.preferredContactTime || 'Anytime'}${notesText}
-----------------------------------------
Please confirm item availability, final invoice, and dispatch timing. Thank you!`;

  return buildWhatsAppLink(message);
}

/**
 * Generates structured WhatsApp message for Pet Parent Club Membership
 */
export function createMembershipEnquiryUrl(data: {
  petName: string;
  parentName?: string;
  email?: string;
  phone?: string;
  petType?: string;
}): string {
  const message = `🌊 *COASTAL TAILS – PET PARENT CLUB JOIN REQUEST* 🐾
-----------------------------------------
Hello Coastal Tails! I would like to join the Coastal Tails Pet Parent Club to enjoy:
• 15% OFF my first grooming appointment
• Member-only store discounts
• Birthday surprises for my pet
• Free grooming schedule reminders

🐾 *Pet Name:* ${data.petName || 'My Fur Baby'}
🐶🐱 *Pet Type:* ${data.petType || 'Dog/Cat'}
👤 *Pet Parent:* ${data.parentName || 'Pet Parent'}
📧 *Email:* ${data.email || 'Provided on signup'}
📞 *Phone:* ${data.phone || 'This WhatsApp number'}
-----------------------------------------
Please register me into the Coastal Tails Club. Thank you!`;

  return buildWhatsAppLink(message);
}

/**
 * Generates direct chat WhatsApp link
 */
export function createDirectWhatsAppChatUrl(topic: string = 'General Enquiry'): string {
  const message = `Hello Coastal Tails Team! 🐾 I am reaching out regarding *${topic}* at your Mangaluru Studio. Please assist me.`;
  return buildWhatsAppLink(message);
}
