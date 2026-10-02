import { Router } from 'express';
import { store } from '../data/store.js';

export const emergencyRouter = Router();

// GET /api/emergency-contacts
emergencyRouter.get('/emergency-contacts', (req, res) => {
  const contacts = store.getEmergencyContacts();
  res.json(contacts);
});

// POST /api/emergency
emergencyRouter.post('/emergency', (req, res) => {
  const { details } = req.body;
  const alertDetails = details || 'Emergency SOS initiated by user';

  const emergencyContacts = store.getEmergencyContacts();
  const dispatchedTo = emergencyContacts.map((c) => `${c.name} (${c.relation})`);

  const event = store.recordEmergency(alertDetails, dispatchedTo);

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
emergencyRouter.get('/emergency/logs', (req, res) => {
  const events = store.getEmergencyEvents();
  res.json(events);
});
