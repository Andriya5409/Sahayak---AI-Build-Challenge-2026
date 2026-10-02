import { Router } from 'express';
import { store } from '../data/store.js';

export const profileRouter = Router();

// GET /api/profile
profileRouter.get('/', (req, res) => {
  const profile = store.getProfile();
  res.json(profile);
});

// PUT /api/profile
profileRouter.put('/', (req, res) => {
  const updated = store.updateProfile(req.body);
  res.json(updated);
});
