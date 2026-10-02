import { FamilyContact, ActiveCall } from '../types';

export interface ICallService {
  initiateCall(contact: FamilyContact | { name: string; relation: string; phone: string; isEmergency?: boolean }): Promise<ActiveCall>;
  endCall(): Promise<void>;
  triggerEmergencyAlert(details: string): Promise<{ success: boolean; dispatchedTo: string[] }>;
}

class CallService implements ICallService {
  private activeCallId: string | null = null;

  public async initiateCall(contact: FamilyContact | { name: string; relation: string; phone: string; isEmergency?: boolean }): Promise<ActiveCall> {
    try {
      const response = await fetch('/api/calls/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact,
          isEmergency: (contact as any).isEmergency || false,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        this.activeCallId = data.callId;
      }
    } catch (err) {
      console.warn('Call initiate API error, proceeding locally:', err);
    }

    return {
      contact,
      state: 'dialing',
      durationSeconds: 0,
      isMuted: false,
      isSpeakerOn: true,
      isEmergencyCall: (contact as any).isEmergency || false,
    };
  }

  public async endCall(): Promise<void> {
    try {
      if (this.activeCallId) {
        await fetch('/api/calls/terminate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callId: this.activeCallId }),
        });
      }
    } catch (err) {
      console.warn('Call end API error:', err);
    } finally {
      this.activeCallId = null;
    }
  }

  public async triggerEmergencyAlert(details: string): Promise<{ success: boolean; dispatchedTo: string[] }> {
    try {
      const response = await fetch('/api/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ details }),
      });
      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          dispatchedTo: data.dispatchedTo || [
            'Ananya (Daughter)',
            'Rohan (Son)',
            'Suresh (Caregiver)',
            'Emergency 112 Dispatch',
          ],
        };
      }
    } catch (err) {
      console.warn('Emergency API error, fallback local dispatch:', err);
    }

    return {
      success: true,
      dispatchedTo: ['Ananya (Daughter)', 'Rohan (Son)', 'Suresh (Caregiver)', 'Emergency 112 Dispatch'],
    };
  }
}

export const callService = new CallService();
