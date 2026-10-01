import { FamilyContact } from '../types';
import { mockFamilyContacts } from '../mock/data';

/**
 * Family Service Placeholder
 * 
 * BACKEND INTEGRATION NOTE:
 * Connect to backend contacts API:
 * GET /api/family/contacts
 * POST /api/family/emergency-ping
 */
export interface IFamilyService {
  getContacts(): Promise<FamilyContact[]>;
  getEmergencyContacts(): Promise<FamilyContact[]>;
}

class FamilyService implements IFamilyService {
  private contacts: FamilyContact[] = [...mockFamilyContacts];

  public async getContacts(): Promise<FamilyContact[]> {
    await new Promise((r) => setTimeout(r, 150));
    return [...this.contacts];
  }

  public async getEmergencyContacts(): Promise<FamilyContact[]> {
    await new Promise((r) => setTimeout(r, 150));
    return this.contacts.filter((c) => c.isEmergencyContact);
  }
}

export const familyService = new FamilyService();
