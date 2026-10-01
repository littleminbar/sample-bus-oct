import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
// @ts-ignore
import busArrivalHandler from './api/bus-arrival.js';
// @ts-ignore
import healthHandler from './api/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// API Routes
app.all('/api/bus-arrival', (req: Request, res: Response) => {
  return busArrivalHandler(req, res);
});

app.all('/api/health', (req: Request, res: Response) => {
  return healthHandler(req, res);
});

async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SBS Transit Server] listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[SBS Transit Server] Startup failed:', err);
  process.exit(1);
});
