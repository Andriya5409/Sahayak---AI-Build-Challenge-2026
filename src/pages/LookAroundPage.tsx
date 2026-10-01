import React, { useState } from 'react';
import { 
  Eye, 
  Mic, 
  RefreshCw, 
  Volume2, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  Search,
  Target
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockLookAroundObjects } from '../mock/data';
import { VoiceSpeakButton } from '../components/common/VoiceSpeakButton';

export const LookAroundPage: React.FC = () => {
  const { navigateTo, speakText, t } = useApp();
  const [selectedObjectIndex, setSelectedObjectIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const currentObj = mockLookAroundObjects[selectedObjectIndex];

  const handleSelectObject = (idx: number) => {
    setIsScanning(true);
    setSelectedObjectIndex(idx);
    setTimeout(() => {
      setIsScanning(false);
      speakText(mockLookAroundObjects[idx].locationDescription);
    }, 900);
  };

  const handleScanAgain = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      speakText(currentObj.locationDescription);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 animate-fade-in">
      {/* Title & Mode Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-purple-100 text-purple-950 px-4 py-1.5 rounded-full font-bold text-sm">
          <Eye className="w-5 h-5 text-purple-700 animate-pulse" />
          <span>{t('lookAroundTitle')}</span>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('camera')}
          className="text-slate-600 hover:text-slate-900 font-bold text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Look Around</span>
        </button>
      </div>

      <div className="text-center space-y-1">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          "Where are my items?"
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 font-medium">
          {t('lookAroundInstruction')}
        </p>
      </div>

      {/* Quick Item Target Filter Buttons */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {mockLookAroundObjects.map((obj, i) => (
          <button
            key={obj.id}
            type="button"
            onClick={() => handleSelectObject(i)}
            className={`px-4 py-2.5 rounded-2xl font-bold text-base transition-all border-2 flex items-center gap-2 ${
              selectedObjectIndex === i
                ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-105'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-purple-50'
            }`}
          >
            <span>{i === 0 ? '👓' : i === 1 ? '💊' : '🦯'}</span>
            <span>{obj.objectName}</span>
          </button>
        ))}
      </div>

      {/* Realtime Continuous AR Scanning Viewfinder */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-slate-800 aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80"
          alt="Room scanning"
          className="w-full h-full object-cover opacity-85"
        />

        {/* Live scanning line */}
        {isScanning && (
          <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-xs flex items-center justify-center z-20">
            <div className="flex flex-col items-center gap-3 bg-slate-900/90 text-white px-6 py-4 rounded-2xl border border-purple-400">
              <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
              <p className="font-bold text-lg">Scanning room space...</p>
            </div>
          </div>
        )}

        {/* AR Bounding Box Highlighter */}
        {!isScanning && currentObj.boundingBox && (
          <div
            className="absolute border-4 border-amber-400 bg-amber-400/20 rounded-2xl z-10 transition-all duration-500 animate-pulse-slow flex flex-col justify-between p-2 shadow-2xl"
            style={{
              left: `${currentObj.boundingBox.x}%`,
              top: `${currentObj.boundingBox.y}%`,
              width: `${currentObj.boundingBox.width}%`,
              height: `${currentObj.boundingBox.height}%`,
            }}
          >
            <div className="bg-amber-400 text-slate-950 font-black text-xs sm:text-sm px-2.5 py-1 rounded-lg self-start shadow-md flex items-center gap-1.5 whitespace-nowrap">
              <Target className="w-4 h-4 text-slate-950" />
              <span>{currentObj.objectName} ({(currentObj.confidence * 100).toFixed(0)}%)</span>
            </div>
            <span className="text-[10px] text-white font-bold bg-black/60 px-2 py-0.5 rounded self-end">
              {currentObj.tips}
            </span>
          </div>
        )}

        {/* Top Status Tag */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 border border-white/20">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span>Active Vision Tracking</span>
        </div>
      </div>

      {/* AI Location Explanation Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-purple-200 shadow-lifted space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-3xl shrink-0 shadow-md">
            ✨
          </div>
          <div>
            <h3 className="text-xl font-black text-purple-900 mb-1">
              Found {currentObj.objectName}
            </h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              "{currentObj.locationDescription}"
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <VoiceSpeakButton
            textToSpeak={currentObj.locationDescription}
            label={t('hearThis')}
            size="md"
            className="flex-1"
          />

          <button
            type="button"
            onClick={handleScanAgain}
            className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-lg flex items-center justify-center gap-2 border-2 border-slate-300 active:scale-95"
          >
            <RefreshCw className="w-5 h-5 text-slate-700" />
            <span>{t('scanAgain')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
