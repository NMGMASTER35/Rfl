export const STOREFRONT_ITEMS = [
  {
    id: 'store-1',
    packageId: 4101,
    name: 'Priority Supporter',
    description: 'Queue priority, supporter role, and monthly merch raffle entry.',
    price: '£12.00',
    priceValue: { amount: 12, currency: 'GBP' },
    active: true,
    platform: 'Tebex',
    category: 'Support'
  },
  {
    id: 'store-2',
    packageId: 4125,
    name: 'Gang Package',
    description: 'Faction toolkit review with staff, custom spray, and stash upgrades.',
    price: '£45.00',
    priceValue: { amount: 45, currency: 'GBP' },
    active: true,
    platform: 'Tebex',
    category: 'Faction'
  },
  {
    id: 'store-3',
    name: 'One-time Donation',
    description: 'Support server costs via PayPal. Includes Discord donor tag.',
    price: 'Custom',
    priceValue: null,
    active: true,
    platform: 'PayPal',
    donateUrl: 'https://paypal.me/apexrp'
  }
];

export function getStorefrontItemById(id) {
  return STOREFRONT_ITEMS.find((item) => item.id === id) ?? null;
}

export function getStorefrontItemByPackageId(packageId) {
  if (packageId === undefined || packageId === null) {
    return null;
  }

  const numericId = Number(packageId);
  if (!Number.isFinite(numericId)) {
    return null;
  }

  return (
    STOREFRONT_ITEMS.find(
      (item) => item.packageId !== undefined && Number(item.packageId) === numericId
    ) ?? null
  );
}
