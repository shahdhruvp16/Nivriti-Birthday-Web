import mongoose from 'mongoose';

// Tracks DB connectivity so controllers can transparently fall back to local
// seed content when MongoDB is not configured or unreachable.
export const dbState = {
  connected: false,
  mode: 'fallback', // 'database' | 'fallback'
  reason: 'MONGODB_URI not provided'
};

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    dbState.connected = false;
    dbState.mode = 'fallback';
    dbState.reason = 'MONGODB_URI not set — serving local seed content';
    console.warn('[db] No MONGODB_URI set. Running in FALLBACK mode (local seed content).');
    return false;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    dbState.connected = true;
    dbState.mode = 'database';
    dbState.reason = 'Connected to MongoDB';
    console.log('[db] Connected to MongoDB.');

    mongoose.connection.on('disconnected', () => {
      dbState.connected = false;
      dbState.mode = 'fallback';
      dbState.reason = 'MongoDB disconnected';
      console.warn('[db] MongoDB disconnected — falling back to local seed content.');
    });

    return true;
  } catch (err) {
    dbState.connected = false;
    dbState.mode = 'fallback';
    // Store a sanitized reason only — never the raw URI/credentials.
    dbState.reason = 'Could not connect to MongoDB — serving local seed content';
    console.error('[db] Connection failed:', err.message);
    if (process.env.NODE_ENV === 'production' && process.env.REQUIRE_DB === 'true') {
      // In production you may want to fail loudly instead of hiding the problem.
      console.error('[db] REQUIRE_DB=true in production — this is a configuration error.');
    }
    return false;
  }
}

export default connectDB;
