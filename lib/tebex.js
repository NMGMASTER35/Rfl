import { STOREFRONT_ITEMS, getStorefrontItemByPackageId } from './storefront.js';

const DEFAULT_STORE_URL = process.env.TEBEX_STORE_URL?.trim() || 'https://store.apexrp.example';
const MAX_QUANTITY = 10;
const CHECKOUT_WINDOW_MINUTES = 15;

function normaliseBaseUrl(url) {
  if (!url) return '';
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

function generateCheckoutId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `chk_${timestamp}${random}`;
}

function sanitiseEmail(email) {
  if (!email) return null;
  const trimmed = String(email).trim();
  if (!trimmed) return null;
  if (!/^.+@.+\..+$/.test(trimmed)) {
    throw new Error('email must be a valid address');
  }
  return trimmed;
}

export function listTebexPackages() {
  return STOREFRONT_ITEMS.filter((item) => item.platform === 'Tebex').map((item) => ({
    packageId: item.packageId,
    name: item.name,
    description: item.description,
    price: item.priceValue,
    active: item.active,
    category: item.category
  }));
}

export function createTebexCheckout({
  packageId,
  username,
  email,
  quantity = 1,
  returnUrl,
  reference
}) {
  const packageEntry = getStorefrontItemByPackageId(packageId);
  if (!packageEntry) {
    throw new Error('Package not found for Tebex checkout.');
  }

  if (packageEntry.platform !== 'Tebex') {
    throw new Error('Requested package is not enabled for Tebex checkout.');
  }

  if (packageEntry.active === false) {
    throw new Error('Requested package is not currently available.');
  }

  const trimmedUsername = typeof username === 'string' ? username.trim() : '';
  if (!trimmedUsername) {
    throw new Error('username is required to create a Tebex checkout.');
  }

  const quantityNumber = Number(quantity ?? 1);
  if (!Number.isInteger(quantityNumber) || quantityNumber < 1) {
    throw new Error('quantity must be a positive whole number.');
  }

  if (quantityNumber > MAX_QUANTITY) {
    throw new Error(`quantity cannot exceed ${MAX_QUANTITY} per checkout.`);
  }

  const sanitisedEmail = sanitiseEmail(email);

  if (!packageEntry.priceValue || typeof packageEntry.priceValue.amount !== 'number') {
    throw new Error('Selected package is missing pricing information.');
  }

  const checkoutId = generateCheckoutId();
  const expiresAt = new Date(Date.now() + CHECKOUT_WINDOW_MINUTES * 60 * 1000);
  const baseUrl = normaliseBaseUrl(DEFAULT_STORE_URL);

  const params = new URLSearchParams({
    package: String(packageEntry.packageId),
    username: trimmedUsername,
    quantity: String(quantityNumber)
  });

  if (reference) {
    params.set('reference', String(reference).trim());
  }

  if (returnUrl) {
    params.set('return_url', String(returnUrl));
  }

  const redirectUrl = `${baseUrl}/checkout/${checkoutId}?${params.toString()}`;

  return {
    checkoutId,
    redirectUrl,
    expiresAt,
    package: {
      id: packageEntry.packageId,
      name: packageEntry.name,
      description: packageEntry.description,
      price: packageEntry.priceValue
    },
    purchaser: {
      username: trimmedUsername,
      email: sanitisedEmail
    },
    quantity: quantityNumber,
    reference: reference ? String(reference).trim() : null
  };
}
