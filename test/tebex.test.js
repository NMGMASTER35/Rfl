import test from 'node:test';
import assert from 'node:assert/strict';

import { createTebexCheckout, listTebexPackages } from '../lib/tebex.js';

function getFirstPackageId() {
  const packages = listTebexPackages().filter((pkg) => pkg.active);
  if (!packages.length) {
    throw new Error('No active Tebex packages defined for tests.');
  }
  return packages[0].packageId;
}

test('listTebexPackages exposes active Tebex products', () => {
  const packages = listTebexPackages();
  assert.ok(Array.isArray(packages));
  assert.ok(packages.length >= 2);
  assert.ok(packages.every((pkg) => typeof pkg.packageId === 'number'));
});

test('createTebexCheckout returns checkout metadata', () => {
  const packageId = getFirstPackageId();
  const checkout = createTebexCheckout({
    packageId,
    username: 'Nova Ridge',
    email: 'nova@example.com',
    quantity: 2,
    reference: 'queue-123'
  });

  assert.equal(checkout.package.id, packageId);
  assert.equal(checkout.purchaser.username, 'Nova Ridge');
  assert.equal(checkout.purchaser.email, 'nova@example.com');
  assert.equal(checkout.quantity, 2);
  assert.ok(checkout.redirectUrl.includes(`package=${packageId}`));
  assert.ok(new Date(checkout.expiresAt).getTime() > Date.now());
  assert.equal(checkout.reference, 'queue-123');
});

test('createTebexCheckout validates inputs', () => {
  const packageId = getFirstPackageId();

  assert.throws(() => createTebexCheckout({ packageId, username: '   ' }), /username is required/i);
  assert.throws(() => createTebexCheckout({ packageId, username: 'Nova', quantity: 0 }), /quantity must be a positive whole number/i);
  assert.throws(() => createTebexCheckout({ packageId: 999999, username: 'Nova' }), /Package not found/i);
  assert.throws(
    () => createTebexCheckout({ packageId, username: 'Nova', email: 'invalid-email' }),
    /email must be a valid address/i
  );
});
