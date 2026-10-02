import { Reminder } from '../types';
import { initialReminders } from '../mock/data';

export interface IReminderService {
  getReminders(): Promise<Reminder[]>;
  addReminder(reminder: Omit<Reminder, 'id' | 'completed'>): Promise<Reminder>;
  toggleCompleted(id: string): Promise<Reminder>;
  deleteReminder(id: string): Promise<boolean>;
}

class ReminderService implements IReminderService {
  private localReminders: Reminder[] = [...initialReminders];

  public async getReminders(): Promise<Reminder[]> {
    try {
      const response = await fetch('/api/reminders');
      if (response.ok) {
        const data = await response.json();
        this.localReminders = data;
        return data;
      }
    } catch (err) {
      console.warn('Reminder API get error, using fallback:', err);
    }
    return [...this.localReminders];
  }

  public async addReminder(newRem: Omit<Reminder, 'id' | 'completed'>): Promise<Reminder> {
    try {
      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRem),
      });
      if (response.ok) {
        const created: Reminder = await response.json();
        this.localReminders.unshift(created);
        return created;
      }
    } catch (err) {
      console.warn('Reminder API create error, using fallback:', err);
    }

    const created: Reminder = {
      ...newRem,
      id: 'rem_' + Date.now(),
      completed: false,
    };
    this.localReminders.unshift(created);
    return created;
  }

  public async toggleCompleted(id: string): Promise<Reminder> {
    try {
      const response = await fetch(`/api/reminders/${id}/complete`, {
        method: 'PATCH',
      });
      if (response.ok) {
        const updated: Reminder = await response.json();
        this.localReminders = this.localReminders.map((r) => (r.id === id ? updated : r));
        return updated;
      }
    } catch (err) {
      console.warn('Reminder API toggle error, using fallback:', err);
    }

    const item = this.localReminders.find((r) => r.id === id);
    if (!item) throw new Error('Reminder not found');
    item.completed = !item.completed;
    return { ...item };
  }

  public async deleteReminder(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/reminders/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        this.localReminders = this.localReminders.filter((r) => r.id !== id);
        return true;
      }
    } catch (err) {
      console.warn('Reminder API delete error, using fallback:', err);
    }

    this.localReminders = this.localReminders.filter((r) => r.id !== id);
    return true;
  }
}

export const reminderService = new ReminderService();
