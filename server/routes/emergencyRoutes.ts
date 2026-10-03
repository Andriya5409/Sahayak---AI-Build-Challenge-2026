import { Router } from 'express';
import { store } from '../data/store.js';

export const emergencyRouter = Router();

// GET /api/emergency-contacts
emergencyRouter.get('/emergency-contacts', async (req, res) => {
  const contacts = await store.getEmergencyContacts();
  res.json(contacts);
});

// POST /api/emergency
emergencyRouter.post('/emergency', async (req, res) => {
  const { details } = req.body;
  const alertDetails = details || 'Emergency SOS initiated by user';

  const emergencyContacts = await store.getEmergencyContacts();
  const dispatchedTo = emergencyContacts.map((c) => `${c.name} (${c.relation})`);

  const event = await store.recordEmergency(alertDetails, dispatchedTo);

  console.log(`🚨 EMERGENCY SOS LOGGED: ${alertDetails}`);
  console.log(`📡 Broadcasted to Caregiver Portal: ${dispatchedTo.join(', ')}`);

  res.status(200).json({
    success: true,
    message: 'Emergency SOS alert recorded and Caregiver Portal notified.',
    event,
    dispatchedTo,
  });
});

// GET /api/emergency/logs
emergencyRouter.get('/emergency/logs', async (req, res) => {
  const events = await store.getEmergencyEvents();
  res.json(events);
});
