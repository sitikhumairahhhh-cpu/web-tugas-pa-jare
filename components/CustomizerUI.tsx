
import React, { useRef } from 'react';
import { BraceletMetal, CordStyle, SingleBraceletState } from '../types';
import { Upload, X, Sliders, Palette, Maximize, Sparkles, Wand2 } from 'lucide-react';
import { generateCaption, enhanceDescription } from '../services/geminiService';

interface CustomizerUIProps {
  state: SingleBraceletState;
  onChange: (newState: SingleBraceletState) => void;
}

export const CustomizerUI: React.FC<CustomizerUIProps> = ({ state, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...state, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateTransform = (key: keyof typeof state.transform, value: number) => {
    onChange({
      ...state,
      transform: { ...state.transform, [key]: value }
    });
  };

  const handleAIGenerateCaption = async () => {
    if (!state.image) return;
    const newCaption = await generateCaption("Sepasang kekasih tersenyum di sore hari");
    onChange({ ...state, caption: newCaption });
  };

  const handleAIEnhance = async () => {
    if (!state.caption) return;
    const enhanced = await enhanceDescription(state.caption);
    onChange({ ...state, caption: enhanced });
  };

  return (
    <div className="space-y-10">
      {/* Photo Upload Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400">1. Unggah Foto</h4>
          {state.image && (
            <button 
              onClick={() => onChange({ ...state, image: null })}
              className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Hapus
            </button>
          )}
        </div>
        
        {!state.image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group cursor-pointer aspect-[16/6] bg-stone-100 rounded-3xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center gap-2 hover:bg-white hover:border-amber-500 transition-all duration-300 shadow-inner"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5 text-stone-400 group-hover:text-amber-500" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Pilih Foto Kenangan</p>
            <p className="text-[8px] text-stone-300 font-bold uppercase tracking-widest">JPG, PNG up to 10MB</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileUpload} 
            />
          </div>
        ) : (
          <div className="bg-white p-6 rounded-3xl border border-stone-100 space-y-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-stone-100">
                <img src={state.image} className="w-full h-full object-cover" alt="Thumb" />
              </div>
              <div>
                <span className="text-[10px] font-black text-stone-900 block uppercase tracking-widest">Foto Siap Diproyeksikan</span>
                <span className="text-[8px] text-stone-400 font-bold uppercase tracking-widest">Gunakan slider untuk mengatur posisi</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-stone-400">
                  <span className="flex items-center gap-2"><Maximize className="w-3 h-3" /> Perbesar</span>
                  <span className="text-amber-600">{(state.transform.scale * 100).toFixed(0)}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="0.05" 
                  value={state.transform.scale}
                  onChange={(e) => updateTransform('scale', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-stone-400">
                  <span className="flex items-center gap-2"><Sliders className="w-3 h-3" /> Geser X</span>
                  <span className="text-stone-900">{state.transform.x}px</span>
                </div>
                <input 
                  type="range" 
                  min="-100" 
                  max="100" 
                  value={state.transform.x}
                  onChange={(e) => updateTransform('x', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Caption & AI Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400">2. Pesan & Ucapan</h4>
          <div className="flex gap-2">
            <button 
              onClick={handleAIGenerateCaption}
              disabled={!state.image}
              className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full hover:bg-amber-100 transition-colors disabled:opacity-30"
            >
              <Sparkles className="w-3 h-3" /> Magic Write
            </button>
          </div>
        </div>
        <div className="relative">
          <textarea
            value={state.caption}
            onChange={(e) => onChange({ ...state, caption: e.target.value })}
            placeholder="Tulis pesan singkat untuk di kartu ucapan atau proyektor..."
            className="w-full aspect-[16/5] bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-stone-300 resize-none"
          />
          {state.caption && (
            <button 
              onClick={handleAIEnhance}
              className="absolute bottom-3 right-3 p-2 bg-white rounded-lg shadow-sm border border-stone-100 hover:text-amber-600 transition-colors"
              title="Perhalus dengan AI"
            >
              <Wand2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Materials & Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 flex items-center gap-2">
            <Palette className="w-3 h-3" /> 3. Material
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(BraceletMetal).map((m) => (
              <button
                key={m}
                onClick={() => onChange({ ...state, metal: m })}
                className={`py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${state.metal === m ? 'bg-stone-900 border-stone-900 text-white shadow-lg' : 'bg-white border-stone-100 text-stone-400 hover:border-stone-300'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
           <h4 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 flex items-center gap-2">
            <Maximize className="w-3 h-3" /> 4. Ukuran (cm)
          </h4>
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-stone-100">
            <input 
              type="range" 
              min="14" 
              max="22" 
              step="0.5" 
              value={state.size}
              onChange={(e) => onChange({ ...state, size: parseFloat(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm font-bold w-12 text-center text-stone-900">{state.size}</span>
          </div>
          <p className="text-[8px] text-stone-400 font-bold uppercase tracking-[0.2em]">Ukuran standar wanita: 16-18cm, pria: 18-20cm</p>
        </div>
      </div>
    </div>
  );
};
