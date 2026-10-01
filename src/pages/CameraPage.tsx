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
    <div className="max-w-3xl mx-auto space-y-6 pb-24">
      {/* Title & Instruction */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t('showTitle')}
        </h1>
        <p className="text-xl sm:text-2xl text-slate-600 font-semibold max-w-xl mx-auto">
          {t('showInstruction')}
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={() => setCameraMode('medicine')}
          className={`py-3.5 px-3 rounded-2xl font-bold text-base sm:text-lg flex flex-col items-center justify-center gap-1.5 transition-all border-2 ${
            cameraMode === 'medicine'
              ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-102'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Pill className="w-6 h-6" />
          <span>{t('modeMedicine')}</span>
        </button>

        <button
          type="button"
          onClick={() => setCameraMode('document')}
          className={`py-3.5 px-3 rounded-2xl font-bold text-base sm:text-lg flex flex-col items-center justify-center gap-1.5 transition-all border-2 ${
            cameraMode === 'document'
              ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-102'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-6 h-6" />
          <span>{t('modeDocument')}</span>
        </button>

        <button
          type="button"
          onClick={() => setCameraMode('object')}
          className={`py-3.5 px-3 rounded-2xl font-bold text-base sm:text-lg flex flex-col items-center justify-center gap-1.5 transition-all border-2 ${
            cameraMode === 'object'
              ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-102'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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
          className={`py-3.5 px-3 rounded-2xl font-bold text-base sm:text-lg flex flex-col items-center justify-center gap-1.5 transition-all border-2 ${
            cameraMode === 'look_around'
              ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-102'
              : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
          }`}
        >
          <Eye className="w-6 h-6 text-purple-600" />
          <span>{t('modeLookAround')}</span>
        </button>
      </div>

      {/* Camera Viewfinder Area */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-slate-800 aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center">
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
            <div className="w-12 h-12 border-t-4 border-l-4 border-amber-400 rounded-tl-xl shadow-sm" />
            <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 border border-white/20">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{currentSample.tag}</span>
            </div>
            <div className="w-12 h-12 border-t-4 border-r-4 border-amber-400 rounded-tr-xl shadow-sm" />
          </div>

          <div className="flex justify-between items-end">
            <div className="w-12 h-12 border-b-4 border-l-4 border-amber-400 rounded-bl-xl shadow-sm" />
            <p className="text-white bg-black/70 px-4 py-2 rounded-xl text-base font-bold shadow-md text-center max-w-xs">
              Hold steady in good light
            </p>
            <div className="w-12 h-12 border-b-4 border-r-4 border-amber-400 rounded-br-xl shadow-sm" />
          </div>
        </div>

        {/* Processing Scanner Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-indigo-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white z-20 animate-fade-in">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
              <Sparkles className="w-10 h-10 text-amber-300 absolute inset-0 m-auto animate-pulse" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-amber-300 mb-2">
              {t('processingVision')}
            </h3>
            <p className="text-xl text-indigo-100 font-medium max-w-sm">
              {t('processingSub')}
            </p>
          </div>
        )}
      </div>

      {/* Large Capture Button */}
      <div className="flex flex-col items-center justify-center pt-2">
        <button
          type="button"
          onClick={handleCapture}
          disabled={isProcessing}
          className="w-full sm:w-80 py-5 px-8 rounded-3xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-black text-2xl sm:text-3xl flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all border-4 border-indigo-400/50"
          aria-label={t('captureButton')}
        >
          <Camera className="w-9 h-9 stroke-[2.5]" />
          <span>{t('captureButton')}</span>
        </button>

        <p className="text-slate-500 text-sm font-semibold mt-3">
          Tap once to take picture & read automatically
        </p>
      </div>
    </div>
  );
};
