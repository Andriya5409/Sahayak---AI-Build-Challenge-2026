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

/**
 * Vision Service Placeholder
 * 
 * BACKEND INTEGRATION NOTE:
 * Replace mock methods with calls to multimodal vision API (e.g. Gemini 1.5 Pro / Flash Vision endpoint
 * POST /api/vision/analyze-medicine, POST /api/vision/analyze-document, POST /api/vision/look-around).
 */
export interface IVisionService {
  analyzeMedicine(imageBlobOrDataUrl: string): Promise<MedicineVisionResult>;
  analyzeDocument(imageBlobOrDataUrl: string): Promise<DocumentVisionResult>;
  lookAroundScan(query?: string): Promise<ObjectVisionResult>;
}

class VisionService implements IVisionService {
  public async analyzeMedicine(imageBlobOrDataUrl: string): Promise<MedicineVisionResult> {
    // Simulated processing time
    await new Promise((r) => setTimeout(r, 1200));
    return {
      ...mockMedicineResult,
      imageUrl: imageBlobOrDataUrl || mockMedicineResult.imageUrl,
    };
  }

  public async analyzeDocument(imageBlobOrDataUrl: string): Promise<DocumentVisionResult> {
    // Simulated processing time
    await new Promise((r) => setTimeout(r, 1300));
    return {
      ...mockDocumentResult,
      imageUrl: imageBlobOrDataUrl || mockDocumentResult.imageUrl,
    };
  }

  public async lookAroundScan(query?: string): Promise<ObjectVisionResult> {
    await new Promise((r) => setTimeout(r, 800));
    
    if (query && query.toLowerCase().includes('medicine')) {
      return mockLookAroundObjects[1];
    }
    if (query && query.toLowerCase().includes('stick')) {
      return mockLookAroundObjects[2];
    }
    // Default glasses
    return mockLookAroundObjects[0];
  }
}

export const visionService = new VisionService();
