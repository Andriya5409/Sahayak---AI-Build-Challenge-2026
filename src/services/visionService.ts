import { 
  MedicineVisionResult, 
  DocumentVisionResult, 
  ObjectVisionResult, 
  CameraCaptureMode 
} from '../types';
import { 
  mockMedicineResult, 
  mockDocumentResult, 
  mockLookAroundObjects 
} from '../mock/data';

export interface IVisionService {
  analyzeMedicine(imageBlobOrDataUrl: string): Promise<MedicineVisionResult>;
  analyzeDocument(imageBlobOrDataUrl: string): Promise<DocumentVisionResult>;
  lookAroundScan(query?: string, imageBlobOrDataUrl?: string): Promise<ObjectVisionResult>;
}

class VisionService implements IVisionService {
  public async analyzeMedicine(imageBlobOrDataUrl: string): Promise<MedicineVisionResult> {
    try {
      const response = await fetch('/api/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBlobOrDataUrl, mode: 'medicine' }),
      });
      if (response.ok) {
        const data = await response.json();
        return {
          ...data,
          imageUrl: imageBlobOrDataUrl || data.imageUrl || mockMedicineResult.imageUrl,
        };
      }
    } catch (err) {
      console.warn('Medicine vision API error, using fallback:', err);
    }

    await new Promise((r) => setTimeout(r, 800));
    return {
      id: 'med_error',
      name: 'Could not identify clearly',
      genericName: 'Unknown',
      strength: '-',
      category: 'Unknown',
      commonUse: 'Please try taking another clear photo.',
      dosageAdvice: 'Consult a doctor.',
      instructions: [],
      disclaimer: 'Please always confirm medicine and dosage with your doctor or pharmacist.',
      imageUrl: imageBlobOrDataUrl,
    };
  }

  public async analyzeDocument(imageBlobOrDataUrl: string): Promise<DocumentVisionResult> {
    try {
      const response = await fetch('/api/document/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBlobOrDataUrl }),
      });
      if (response.ok) {
        const data = await response.json();
        return {
          ...data,
          imageUrl: imageBlobOrDataUrl || data.imageUrl || mockDocumentResult.imageUrl,
        };
      }
    } catch (err) {
      console.warn('Document OCR API error, using fallback:', err);
    }

    await new Promise((r) => setTimeout(r, 900));
    return {
      id: 'doc_failed',
      documentType: 'electricity_bill',
      title: 'Analysis Failed',
      simpleExplanation: 'I could not read this document clearly. Please try again.',
      keyPoints: [],
      actionRecommendation: 'Try another photo.',
      imageUrl: imageBlobOrDataUrl,
    };
  }

  public async lookAroundScan(query?: string, imageBlobOrDataUrl?: string): Promise<ObjectVisionResult> {
    try {
      const response = await fetch('/api/vision/look-around', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, imageBlobOrDataUrl }),
      });
      if (response.ok) {
        const data = await response.json();
        const obj = Array.isArray(data) ? data[0] : data;
        if (obj) return obj;
      }
    } catch (err) {
      console.warn('Look around API error, using fallback:', err);
    }

    await new Promise((r) => setTimeout(r, 600));
    if (query && query.toLowerCase().includes('medicine')) {
      return mockLookAroundObjects[1];
    }
    if (query && query.toLowerCase().includes('stick')) {
      return mockLookAroundObjects[2];
    }
    return mockLookAroundObjects[0];
  }
}

export const visionService = new VisionService();
