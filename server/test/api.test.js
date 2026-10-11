import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';

// These tests run in fallback mode (no MONGODB_URI), exercising the local
// seed-content path. They verify the public API shape and that no internal
// fields leak.
const app = createApp();

test('GET /api/health returns ok and a mode', async () => {
  const res = await request(app).get('/api/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
  assert.ok(['database', 'fallback'].includes(res.body.mode));
});

test('GET /api/birthday returns recipient Nivriti', async () => {
  const res = await request(app).get('/api/birthday');
  assert.equal(res.status, 200);
  assert.equal(res.body.data.recipient, 'Nivriti');
  assert.ok(Array.isArray(res.body.data.intro.bootLines));
  assert.ok(res.body.data.letter.paragraphs.length > 0);
});

test('GET /api/world-objects returns the 8 objects in order', async () => {
  const res = await request(app).get('/api/world-objects');
  assert.equal(res.status, 200);
  assert.equal(res.body.data.length, 8);
  const keys = res.body.data.map((o) => o.key);
  assert.ok(keys.includes('sunflower'));
  assert.ok(keys.includes('perfume'));
  // ordered
  const orders = res.body.data.map((o) => o.order);
  assert.deepEqual(orders, [...orders].sort((a, b) => a - b));
});

test('GET /api/fragrances includes a signature fragrance', async () => {
  const res = await request(app).get('/api/fragrances');
  assert.equal(res.status, 200);
  assert.equal(res.body.data.length, 3);
  const sig = res.body.data.find((f) => f.signature);
  assert.ok(sig);
  assert.equal(sig.name, 'Nivriti');
  assert.ok(sig.layeredNotes.top);
});

test('GET /api/letter returns a salutation and paragraphs', async () => {
  const res = await request(app).get('/api/letter');
  assert.equal(res.status, 200);
  assert.match(res.body.data.salutation, /Nivriti/);
});

test('unknown route returns 404 json', async () => {
  const res = await request(app).get('/api/nope');
  assert.equal(res.status, 404);
  assert.equal(res.body.error, 'Not found');
});
