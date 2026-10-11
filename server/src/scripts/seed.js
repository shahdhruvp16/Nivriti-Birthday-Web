import 'dotenv/config';
import mongoose from 'mongoose';
import Birthday from '../models/Birthday.js';
import WorldObject from '../models/WorldObject.js';
import Fragrance from '../models/Fragrance.js';
import { birthday, worldObjects, fragrances, tiramisu, letter, memories } from '../data/content.js';

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('[seed] MONGODB_URI is not set. Add it to server/.env before seeding.');
    process.exit(1);
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  console.log('[seed] Connected to MongoDB.');

  await Promise.all([
    Birthday.deleteMany({}),
    WorldObject.deleteMany({}),
    Fragrance.deleteMany({})
  ]);

  await Birthday.create({ ...birthday, tiramisu, letter, memories });
  await WorldObject.insertMany(worldObjects);
  await Fragrance.insertMany(fragrances);

  console.log('[seed] Seeded Birthday, WorldObjects, and Fragrances.');
  await mongoose.disconnect();
  console.log('[seed] Done.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('[seed] Failed:', err.message);
  process.exit(1);
});
