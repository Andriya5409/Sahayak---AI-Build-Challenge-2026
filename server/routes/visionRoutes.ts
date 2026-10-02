import { Router } from 'express';
import { geminiService } from '../services/geminiService.js';

export const visionRouter = Router();

// POST /api/vision
visionRouter.post('/', async (req, res) => {
  try {
    const { image, imageBlobOrDataUrl, mode, query } = req.body;
    const imageData = image || imageBlobOrDataUrl || '';
    const captureMode = mode || 'medicine';

    if (captureMode === 'document') {
      const result = await geminiService.analyzeDocument(imageData);
      return res.json(result);
    }

    if (captureMode === 'look_around' || captureMode === 'object') {
      const results = await geminiService.scanLookAround(query, imageData);
      return res.json(results[0] || results);
    }

    // Default: medicine
    const result = await geminiService.analyzeMedicine(imageData);
    return res.json(result);
  } catch (error: any) {
    console.error('Vision processing error:', error);
    res.status(500).json({ error: 'Failed to process vision query', details: error.message });
  }
});

// POST /api/document/analyze
visionRouter.post('/analyze-document', async (req, res) => {
  try {
    const { image, imageBlobOrDataUrl } = req.body;
    const imageData = image || imageBlobOrDataUrl || '';
    const result = await geminiService.analyzeDocument(imageData);
    res.json(result);
  } catch (error: any) {
    console.error('Document OCR error:', error);
    res.status(500).json({ error: 'Failed to analyze document', details: error.message });
  }
});

// POST /api/vision/look-around
visionRouter.post('/look-around', async (req, res) => {
  try {
    const { query, image } = req.body;
    const results = await geminiService.scanLookAround(query, image);
    res.json(results);
  } catch (error: any) {
    console.error('Look around error:', error);
    res.status(500).json({ error: 'Failed to scan environment', details: error.message });
  }
});
