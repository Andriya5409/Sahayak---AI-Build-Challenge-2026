import { Router } from 'express';
import { store } from '../data/store.js';

export const reminderRouter = Router();

// GET /api/reminders
reminderRouter.get('/', (req, res) => {
  const reminders = store.getReminders();
  res.json(reminders);
});

// GET /api/reminders/today
reminderRouter.get('/today', (req, res) => {
  const reminders = store.getTodayReminders();
  res.json(reminders);
});

// GET /api/reminders/upcoming
reminderRouter.get('/upcoming', (req, res) => {
  const reminders = store.getUpcomingReminders();
  res.json(reminders);
});

// POST /api/reminders
reminderRouter.post('/', (req, res) => {
  const { title, category, time, dateLabel, datetime, dosageOrNotes, doctorName, amount, icon } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required for reminder' });
  }

  const newReminder = store.addReminder({
    title,
    category: category || 'custom',
    time: time || '8:00 PM',
    dateLabel: dateLabel || 'Today',
    datetime: datetime || new Date().toISOString(),
    completed: false,
    dosageOrNotes,
    doctorName,
    amount,
    icon: icon || (category === 'medicine' ? '💊' : category === 'appointment' ? '🏥' : category === 'bill' ? '💳' : '⏰'),
  });

  res.status(201).json(newReminder);
});

// PUT /api/reminders/:id
reminderRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const updated = store.updateReminder(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Reminder not found' });
  }
  res.json(updated);
});

// PATCH /api/reminders/:id/complete
reminderRouter.patch('/:id/complete', (req, res) => {
  const { id } = req.params;
  const updated = store.toggleReminderCompleted(id);
  if (!updated) {
    return res.status(404).json({ error: 'Reminder not found' });
  }
  res.json(updated);
});

// DELETE /api/reminders/:id
reminderRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleted = store.deleteReminder(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Reminder not found' });
  }
  res.json({ success: true, message: 'Reminder deleted' });
});
