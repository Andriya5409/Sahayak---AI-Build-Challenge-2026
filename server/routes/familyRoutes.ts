import { Router } from 'express';
import { store } from '../data/store.js';

export const familyRouter = Router();

// GET /api/family
familyRouter.get('/', (req, res) => {
  const family = store.getFamily();
  res.json(family);
});

// POST /api/family
familyRouter.post('/', (req, res) => {
  const { name, relation, relationKey, phone, avatar, avatarBg, status, isCaregiver, isEmergencyContact } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const newMember = store.addFamilyContact({
    name,
    relation: relation || 'Family Member',
    relationKey: relationKey || 'family',
    phone,
    avatar: avatar || '👤',
    avatarBg: avatarBg || 'bg-slate-100 text-slate-700',
    status: status || 'Available',
    isCaregiver: !!isCaregiver,
    isEmergencyContact: !!isEmergencyContact,
  });

  res.status(201).json(newMember);
});

// PUT /api/family/:id
familyRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const updated = store.updateFamilyContact(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Family contact not found' });
  }
  res.json(updated);
});

// DELETE /api/family/:id
familyRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleted = store.deleteFamilyContact(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Family contact not found' });
  }
  res.json({ success: true, message: 'Family member removed' });
});
