import dotenv from 'dotenv';
dotenv.config(); // Load env vars BEFORE importing routes that might use them

import express, { Request, Response } from 'express';
import cors from 'cors';
import auditRoutes from './routes/audit';
import profileRoutes from './routes/profile';
import repoRoutes from './routes/repo';


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/profile', profileRoutes);
app.use('/api/repo', repoRoutes);
app.use('/api/audit', auditRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
