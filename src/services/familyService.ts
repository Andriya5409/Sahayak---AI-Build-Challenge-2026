import { FamilyContact } from '../types';
import { mockFamilyContacts } from '../mock/data';

export interface IFamilyService {
  getContacts(): Promise<FamilyContact[]>;
  getEmergencyContacts(): Promise<FamilyContact[]>;
  addContact?(contact: Omit<FamilyContact, 'id'>): Promise<FamilyContact>;
  updateContact?(id: string, contact: Partial<FamilyContact>): Promise<FamilyContact>;
  deleteContact?(id: string): Promise<boolean>;
}

class FamilyService implements IFamilyService {
  private contacts: FamilyContact[] = [...mockFamilyContacts];

  public async getContacts(): Promise<FamilyContact[]> {
    try {
      const response = await fetch('/api/family');
      if (response.ok) {
        const data = await response.json();
        this.contacts = data;
        return data;
      }
    } catch (err) {
      console.warn('Family API error, using fallback:', err);
    }
    return [...this.contacts];
  }

  public async getEmergencyContacts(): Promise<FamilyContact[]> {
    try {
      const response = await fetch('/api/emergency-contacts');
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.warn('Emergency contacts API error, using fallback:', err);
    }
    return this.contacts.filter((c) => c.isEmergencyContact || c.isCaregiver);
  }

  public async addContact(contact: Omit<FamilyContact, 'id'>): Promise<FamilyContact> {
    try {
      const response = await fetch('/api/family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        const created = await response.json();
        this.contacts.push(created);
        return created;
      }
    } catch (err) {
      console.warn('Add contact API error, using fallback:', err);
    }
    const created: FamilyContact = {
      ...contact,
      id: 'fam_' + Date.now(),
    };
    this.contacts.push(created);
    return created;
  }

  public async updateContact(id: string, updates: Partial<FamilyContact>): Promise<FamilyContact> {
    try {
      const response = await fetch(`/api/family/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (response.ok) {
        const updated = await response.json();
        this.contacts = this.contacts.map((c) => (c.id === id ? updated : c));
        return updated;
      }
    } catch (err) {
      console.warn('Update contact API error, using fallback:', err);
    }
    const idx = this.contacts.findIndex((c) => c.id === id);
    if (idx !== -1) {
      this.contacts[idx] = { ...this.contacts[idx], ...updates };
      return this.contacts[idx];
    }
    throw new Error('Contact not found');
  }

  public async deleteContact(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/family/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        this.contacts = this.contacts.filter((c) => c.id !== id);
        return true;
      }
    } catch (err) {
      console.warn('Delete contact API error, using fallback:', err);
    }
    this.contacts = this.contacts.filter((c) => c.id !== id);
    return true;
  }
}

export const familyService = new FamilyService();
