import { Router, Request, Response } from 'express';
import path from 'path';

const router = Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'index.html'));
});

router.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'dashboard.html'));
});

export default router;
