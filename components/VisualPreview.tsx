
import React from 'react';
import { SingleBraceletState } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Search } from 'lucide-react';

interface VisualPreviewProps {
  state: SingleBraceletState;
  label: string;
}

export const VisualPreview: React.FC<VisualPreviewProps> = ({ state, label }) => {
  return (
    <div className="relative aspect-square w-full bg-stone-100 flex items-center justify-center p-8 overflow-hidden">
      {/* Background Lens Simulation */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[80%] aspect-square rounded-full bg-gradient-to-tr from-stone-200 to-white shadow-2xl border-4 border-white/50 blur-[2px]" />
      </div>

      {/* Outer Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.05)_100%)] z-10 pointer-events-none" />

      {/* Labels */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-2">{label}</span>
        <div className="h-0.5 w-12 bg-amber-500/30 rounded-full" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!state.image ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center gap-4 text-stone-300"
            >
              <div className="w-20 h-20 rounded-full bg-white/50 border-2 border-dashed border-stone-200 flex items-center justify-center">
                <Camera className="w-8 h-8" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Belum Ada Foto</p>
            </motion.div>
          ) : (
            <motion.div 
              key="image"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* The "Lens" Hole */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-[12px] border-white shadow-[0_0_0_1000px_rgba(251,250,248,0.9),_0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden group">
                {/* Projected Image */}
                <img 
                  src={state.image} 
                  className="w-full h-full object-cover origin-center transition-transform duration-300" 
                  referrerPolicy="no-referrer"
                  style={{
                    transform: `scale(${state.transform.scale}) translate(${state.transform.x}px, ${state.transform.y}px)`,
                  }}
                  alt="Projected Preview"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(0,0,0,0.3)_150%)] pointer-events-none" />
                
                {/* Sparkle Effect */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 blur-3xl rounded-full mix-blend-overlay animate-pulse" />
              </div>

              {/* Caption Overlay */}
              {state.caption && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xs text-center z-30">
                  <p className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase text-stone-600 shadow-sm border border-white">
                    "{state.caption}"
                  </p>
                </div>
              )}

              {/* Action Indicators */}
              <div className="absolute bottom-8 right-8 flex flex-col gap-2 opacity-40 hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                  <Search className="w-4 h-4 text-stone-900" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Corner Text */}
      <div className="absolute bottom-6 left-6 z-20">
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-stone-300 transform -rotate-90 origin-left inline-block">Lumina Optic Technology v1.2</span>
      </div>
    </div>
  );
};
