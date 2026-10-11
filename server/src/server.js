import 'dotenv/config';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB(); // non-fatal: falls back to local content if unavailable
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`[server] Nivriti Universe API listening on http://localhost:${PORT}`);
  });
}

start();
