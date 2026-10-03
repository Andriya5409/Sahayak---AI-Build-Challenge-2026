import { Router } from 'express';
import { store } from '../data/store.js';

export const profileRouter = Router();

// GET /api/profile
profileRouter.get('/', async (req, res) => {
  const profile = await store.getProfile();
  res.json(profile);
});

// PUT /api/profile
profileRouter.put('/', async (req, res) => {
  const updated = await store.updateProfile(req.body);
  res.json(updated);
});
