import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  FileText, 
  Pill, 
  Search, 
  Eye, 
  Sparkles, 
  RotateCw, 
  Image as ImageIcon,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CameraCaptureMode } from '../types';
import { visionService } from '../services/visionService';

export const CameraPage: React.FC = () => {
  const { 
    cameraMode, 
    setCameraMode, 
    navigateTo, 
    setMedicineResult, 
    setDocumentResult,
    t 
  } = useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Setup sample previews based on selected mode
  const sampleImages: Record<CameraCaptureMode, { title: string; image: string; tag: string }> = {
    medicine: {
      title: 'Paracetamol 500 mg Strip',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      tag: 'Medicine Scan',
    },
    document: {
      title: 'State Electricity Board Bill (KSEB)',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      tag: 'Bill / Document Scan',
    },
    object: {
      title: 'Everyday Household Object',
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
      tag: 'Object Scan',
    },
    look_around: {
      title: 'Living Room Space',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
      tag: 'Realtime Room Scan',
    },
  };

  const currentSample = sampleImages[cameraMode];

  // Try initiating camera stream if available
  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setUseWebcam(true);
          }
        }
      } catch (err) {
        // Fallback to high-res sample viewfinder
        setUseWebcam(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    setIsProcessing(true);

    if (cameraMode === 'look_around') {
      setTimeout(() => {
        setIsProcessing(false);
        navigateTo('look-around');
      }, 1000);
      return;
    }

    if (cameraMode === 'document') {
      const docResult = await visionService.analyzeDocument(currentSample.image);
      setDocumentResult(docResult);
      setTimeout(() => {
        setIsProcessing(false);
        navigateTo('vision-document');
      }, 1200);
      return;
    }

    // Default Medicine or Object -> Medicine Result
    const medResult = await visionService.analyzeMedicine(currentSample.image);
    setMedicineResult(medResult);
    setTimeout(() => {
      setIsProcessing(false);
      navigateTo('vision-medicine');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 bg-sahayak-bg min-h-screen px-4 py-6">
      {/* Title & Instruction */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold text-sahayak-text tracking-tight">
          {t('showTitle')}
        </h1>
        <p className="text-lg sm:text-xl text-sahayak-textMuted max-w-xl mx-auto">
          {t('showInstruction')}
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={() => setCameraMode('medicine')}
          className={`py-3 px-3 rounded-xl font-medium text-base flex flex-col items-center justify-center gap-1.5 transition-all border ${
            cameraMode === 'medicine'
              ? 'bg-sahayak-primary text-white border-sahayak-primary shadow-soft'
              : 'bg-white text-sahayak-textLight border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Pill className="w-6 h-6" />
          <span>{t('modeMedicine')}</span>
        </button>

        <button
          type="button"
          onClick={() => setCameraMode('document')}
          className={`py-3 px-3 rounded-xl font-medium text-base flex flex-col items-center justify-center gap-1.5 transition-all border ${
            cameraMode === 'document'
              ? 'bg-sahayak-primary text-white border-sahayak-primary shadow-soft'
              : 'bg-white text-sahayak-textLight border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-6 h-6" />
          <span>{t('modeDocument')}</span>
        </button>

        <button
          type="button"
          onClick={() => setCameraMode('object')}
          className={`py-3 px-3 rounded-xl font-medium text-base flex flex-col items-center justify-center gap-1.5 transition-all border ${
            cameraMode === 'object'
              ? 'bg-sahayak-primary text-white border-sahayak-primary shadow-soft'
              : 'bg-white text-sahayak-textLight border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Search className="w-6 h-6" />
          <span>{t('modeObject')}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCameraMode('look_around');
            navigateTo('look-around');
          }}
          className={`py-3 px-3 rounded-xl font-medium text-base flex flex-col items-center justify-center gap-1.5 transition-all border ${
            cameraMode === 'look_around'
              ? 'bg-sahayak-primary text-white border-sahayak-primary shadow-soft'
              : 'bg-white text-sahayak-textLight border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Eye className="w-6 h-6" />
          <span>{t('modeLookAround')}</span>
        </button>
      </div>

      {/* Camera Viewfinder Area */}
      <div className="relative rounded-2xl overflow-hidden shadow-warm bg-black border border-slate-800 aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center">
        {useWebcam ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={currentSample.image}
            alt={currentSample.title}
            className="w-full h-full object-cover opacity-90"
          />
        )}

        {/* Viewfinder Target Framing Overlay */}
        <div className="absolute inset-0 pointer-events-none p-6 sm:p-10 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 border-t-2 border-l-2 border-white/50 rounded-tl-lg shadow-sm" />
            <div className="bg-black/50 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-sahayak-primary animate-pulse" />
              <span>{currentSample.tag}</span>
            </div>
            <div className="w-8 h-8 border-t-2 border-r-2 border-white/50 rounded-tr-lg shadow-sm" />
          </div>

          <div className="flex justify-between items-end">
            <div className="w-8 h-8 border-b-2 border-l-2 border-white/50 rounded-bl-lg shadow-sm" />
            <p className="text-white bg-black/50 px-3 py-1.5 rounded-lg text-sm shadow-sm text-center max-w-xs">
              {t('holdSteady')}
            </p>
            <div className="w-8 h-8 border-b-2 border-r-2 border-white/50 rounded-br-lg shadow-sm" />
          </div>
        </div>

        {/* Processing Scanner Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-sahayak-primary/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white z-20 animate-fade-in">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-white animate-spin" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              {t('letMeTakeALook')}
            </h3>
          </div>
        )}
      </div>

      {/* Large Capture Button */}
      <div className="flex flex-col items-center justify-center pt-2">
        <button
          type="button"
          onClick={handleCapture}
          disabled={isProcessing}
          className="w-full sm:w-80 py-4 px-8 rounded-2xl bg-sahayak-primary hover:opacity-90 active:opacity-80 text-white font-semibold text-xl flex items-center justify-center gap-3 shadow-warm transition-all"
          aria-label={t('captureButton')}
        >
          <Camera className="w-7 h-7" />
          <span>{t('captureButton')}</span>
        </button>
      </div>
    </div>
  );
};
