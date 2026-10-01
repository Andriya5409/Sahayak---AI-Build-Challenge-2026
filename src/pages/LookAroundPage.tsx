import React, { useState } from 'react';
import { 
  Eye, 
  Mic, 
  RefreshCw, 
  Volume2, 
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
        <div className="flex items-center gap-2 bg-sahayak-primaryLight text-sahayak-primary px-4 py-1.5 rounded-full font-semibold text-sm">
          <Eye className="w-5 h-5 text-sahayak-primary animate-pulse" />
          <span>{t('lookAroundTitle')}</span>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('camera')}
          className="text-sahayak-textMuted hover:text-sahayak-text font-semibold text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-sahayak-bgWarm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('exitLookAround')}</span>
        </button>
      </div>

      <div className="text-center space-y-1">
        <h1 className="text-3xl sm:text-4xl font-semibold text-sahayak-text">
          {t('whereAreMyItems')}
        </h1>
        <p className="text-lg sm:text-xl text-sahayak-textMuted font-medium">
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
            className={`px-4 py-2.5 rounded-2xl font-semibold text-base transition-all border flex items-center gap-2 ${
              selectedObjectIndex === i
                ? 'bg-sahayak-primary text-white border-sahayak-primary shadow-soft'
                : 'bg-white text-sahayak-text border-transparent hover:bg-sahayak-primaryLight'
            }`}
          >
            <span>{i === 0 ? '👓' : i === 1 ? '💊' : '🦯'}</span>
            <span>{obj.objectName}</span>
          </button>
        ))}
      </div>

      {/* Realtime Continuous AR Scanning Viewfinder */}
      <div className="relative rounded-3xl overflow-hidden shadow-soft bg-sahayak-text aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80"
          alt="Room scanning"
          className="w-full h-full object-cover opacity-85"
        />

        {/* Live scanning line */}
        {isScanning && (
          <div className="absolute inset-0 bg-sahayak-primary/20 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="flex flex-col items-center gap-3 bg-white/90 text-sahayak-primary px-6 py-4 rounded-2xl shadow-soft">
              <RefreshCw className="w-8 h-8 animate-spin" />
              <p className="font-semibold text-lg text-sahayak-text">{t('scanningRoomSpace')}</p>
            </div>
          </div>
        )}

        {/* AR Bounding Box Highlighter */}
        {!isScanning && currentObj.boundingBox && (
          <div
            className="absolute border-2 border-sahayak-primary bg-sahayak-primaryLight/20 rounded-xl z-10 transition-all duration-500 flex flex-col justify-between p-2"
            style={{
              left: `${currentObj.boundingBox.x}%`,
              top: `${currentObj.boundingBox.y}%`,
              width: `${currentObj.boundingBox.width}%`,
              height: `${currentObj.boundingBox.height}%`,
            }}
          >
            <div className="bg-sahayak-primary text-white font-semibold text-xs sm:text-sm px-2.5 py-1 rounded-lg self-start shadow-soft flex items-center gap-1.5 whitespace-nowrap">
              <Target className="w-4 h-4 text-white" />
              <span>{currentObj.objectName} ({(currentObj.confidence * 100).toFixed(0)}%)</span>
            </div>
            <span className="text-[10px] text-white font-semibold bg-sahayak-text/60 px-2 py-0.5 rounded self-end">
              {currentObj.tips}
            </span>
          </div>
        )}

        {/* Top Status Tag */}
        <div className="absolute top-4 left-4 bg-white/90 text-sahayak-text px-3.5 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-soft">
          <span className="w-2 h-2 rounded-full bg-sahayak-primary animate-ping" />
          <span>{t('scanning')}</span>
        </div>
      </div>

      {/* AI Location Explanation Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sahayak-primaryLight shadow-soft space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sahayak-primaryLight text-sahayak-primary flex items-center justify-center text-3xl shrink-0">
            📍
          </div>
          <div>
            <h3 className="text-xl font-semibold text-sahayak-textMuted mb-1">
              {t('found')} {currentObj.objectName}
            </h3>
            <p className="text-2xl sm:text-3xl font-semibold text-sahayak-text leading-snug">
              "{currentObj.locationDescription}"
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-sahayak-bgWarm flex flex-col sm:flex-row gap-3">
          <VoiceSpeakButton
            textToSpeak={currentObj.locationDescription}
            label={t('hearThis')}
            size="md"
            className="flex-1"
          />

          <button
            type="button"
            onClick={handleScanAgain}
            className="py-3 px-5 rounded-2xl bg-sahayak-bgWarm hover:bg-sahayak-primaryLight text-sahayak-textMuted font-semibold text-lg flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RefreshCw className="w-5 h-5 text-sahayak-textMuted" />
            <span>{t('scanAgain')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
