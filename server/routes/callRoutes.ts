import { Router } from 'express';
import { store } from '../data/store.js';

export const callRouter = Router();

interface CallSession {
  id: string;
  contactName: string;
  relation: string;
  phone: string;
  status: 'dialing' | 'connected' | 'ended';
  isEmergency: boolean;
  startTime: string;
  endTime?: string;
}

const activeCalls: Map<string, CallSession> = new Map();

// POST /api/calls/initiate
callRouter.post('/initiate', async (req, res) => {
  const { contact, isEmergency } = req.body;
  if (!contact) {
    return res.status(400).json({ error: 'Contact is required to initiate call' });
  }

  const callId = 'call_' + Date.now();
  const session: CallSession = {
    id: callId,
    contactName: contact.name,
    relation: contact.relation || '',
    phone: contact.phone || '',
    status: 'dialing',
    isEmergency: !!isEmergency,
    startTime: new Date().toISOString(),
  };

  activeCalls.set(callId, session);

  await store.addCaregiverActivity({
    title: isEmergency ? `🚨 Emergency Call Initiated` : `📞 Call to ${contact.name}`,
    description: `Outgoing call to ${contact.relation} (${contact.phone})`,
    type: 'call',
  });

  res.json({
    callId,
    session,
    message: `Call initiated to ${contact.name}`,
  });
});

// POST /api/calls/terminate
callRouter.post('/terminate', async (req, res) => {
  const { callId } = req.body;
  if (callId && activeCalls.has(callId)) {
    const session = activeCalls.get(callId)!;
    session.status = 'ended';
    session.endTime = new Date().toISOString();
  }

  res.json({ success: true, message: 'Call terminated' });
});

// GET /api/calls/status/:id
callRouter.get('/status/:id', async (req, res) => {
  const { id } = req.params;
  const session = activeCalls.get(id);
  if (!session) {
    return res.status(404).json({ error: 'Call session not found' });
  }
  res.json(session);
});
