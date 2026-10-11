import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';

export function createApp() {
  const app = express();

  // CORS: allow the configured client origin, or all origins if unset (dev).
  const origin = process.env.CLIENT_ORIGIN || true;
  app.use(cors({ origin }));
  app.use(express.json({ limit: '64kb' }));

  app.get('/', (req, res) => {
    res.json({ name: 'Nivriti Universe API', docs: '/api/health' });
  });

  app.use('/api', apiRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  // Centralized error handler — never leak stack traces to clients.
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error('[error]', err.message);
    const status = err.status || 500;
    res.status(status).json({ error: status === 500 ? 'Internal server error' : err.message });
  });

  return app;
}

export default createApp;
