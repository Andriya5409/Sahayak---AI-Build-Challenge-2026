import { FamilyContact, ActiveCall } from '../types';

/**
 * Call Service Placeholder
 * 
 * BACKEND INTEGRATION NOTE:
 * Connect to WebRTC / Agora / Twilio calling backend:
 * POST /api/calls/initiate
 * POST /api/calls/terminate
 * POST /api/emergency/trigger-sos
 */
export interface ICallService {
  initiateCall(contact: FamilyContact | { name: string; relation: string; phone: string; isEmergency?: boolean }): Promise<ActiveCall>;
  endCall(): Promise<void>;
  triggerEmergencyAlert(details: string): Promise<{ success: boolean; dispatchedTo: string[] }>;
}

class CallService implements ICallService {
  public async initiateCall(contact: FamilyContact | { name: string; relation: string; phone: string; isEmergency?: boolean }): Promise<ActiveCall> {
    await new Promise((r) => setTimeout(r, 400));
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
    await new Promise((r) => setTimeout(r, 200));
  }

  public async triggerEmergencyAlert(details: string): Promise<{ success: boolean; dispatchedTo: string[] }> {
    await new Promise((r) => setTimeout(r, 600));
    console.log('🚨 EMERGENCY SOS SENT: ', details);
    return {
      success: true,
      dispatchedTo: ['Ananya (Daughter)', 'Rohan (Son)', 'Suresh (Caregiver)', 'Emergency 112 Dispatch'],
    };
  }
}

export const callService = new CallService();
