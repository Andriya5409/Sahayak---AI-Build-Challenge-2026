import { Router } from 'express';
import { store } from '../data/store.js';

export const caregiverRouter = Router();

// GET /api/caregiver
caregiverRouter.get('/', (req, res) => {
  const caregiverInfo = store.getCaregiver();
  res.json(caregiverInfo);
});

// GET /api/caregiver/activity
caregiverRouter.get('/activity', (req, res) => {
  const activities = store.getCaregiverActivities();
  res.json(activities);
});

// POST /api/caregiver/activity
caregiverRouter.post('/activity', (req, res) => {
  const { title, description, type } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Activity title is required' });
  }

  const activity = store.addCaregiverActivity({
    title,
    description: description || '',
    type: type || 'checkup',
  });
  res.status(201).json(activity);
});
