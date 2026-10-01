import { Reminder } from '../types';
import { initialReminders } from '../mock/data';

/**
 * Reminder Service Placeholder
 * 
 * BACKEND INTEGRATION NOTE:
 * Connect to backend CRUD API:
 * GET /api/reminders
 * POST /api/reminders
 * PATCH /api/reminders/:id/complete
 */
export interface IReminderService {
  getReminders(): Promise<Reminder[]>;
  addReminder(reminder: Omit<Reminder, 'id' | 'completed'>): Promise<Reminder>;
  toggleCompleted(id: string): Promise<Reminder>;
  deleteReminder(id: string): Promise<boolean>;
}

class ReminderService implements IReminderService {
  private reminders: Reminder[] = [...initialReminders];

  public async getReminders(): Promise<Reminder[]> {
    await new Promise((r) => setTimeout(r, 200));
    return [...this.reminders];
  }

  public async addReminder(newRem: Omit<Reminder, 'id' | 'completed'>): Promise<Reminder> {
    await new Promise((r) => setTimeout(r, 300));
    const created: Reminder = {
      ...newRem,
      id: 'rem_' + Date.now(),
      completed: false,
    };
    this.reminders.unshift(created);
    return created;
  }

  public async toggleCompleted(id: string): Promise<Reminder> {
    await new Promise((r) => setTimeout(r, 200));
    const item = this.reminders.find((r) => r.id === id);
    if (!item) throw new Error('Reminder not found');
    item.completed = !item.completed;
    return { ...item };
  }

  public async deleteReminder(id: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 200));
    this.reminders = this.reminders.filter((r) => r.id !== id);
    return true;
  }
}

export const reminderService = new ReminderService();
