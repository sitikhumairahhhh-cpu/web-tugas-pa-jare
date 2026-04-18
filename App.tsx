
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { CustomizerUI } from './components/CustomizerUI';
import { VisualPreview } from './components/VisualPreview';
import { CheckoutModal } from './components/CheckoutModal';
import { BraceletMetal, CordStyle, CustomizationState, SingleBraceletState, OrderType } from './types';
import { ChevronRight, Star, ShieldCheck, Truck, RotateCcw, Sparkles, User, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const initialBracelet = (): SingleBraceletState => ({
  image: null,
  metal: BraceletMetal.SILVER,
  cord: CordStyle.CLASSIC_CHAIN,
  size: 18,
  caption: '',
  transform: { scale: 1, x: 0, y: 0 },
});

const App: React.FC = () => {
  const [customState, setCustomState] = useState<CustomizationState>({
    bracelets: [initialBracelet(), initialBracelet()],
    activeIndex: 0,
    orderType: OrderType.COUPLE,
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleStateChange = (newState: SingleBraceletState) => {
    const newBracelets = [...customState.bracelets] as [SingleBraceletState, SingleBraceletState];
    newBracelets[customState.activeIndex] = newState;
    setCustomState({ ...customState, bracelets: newBracelets });
  };

  const handleOrderTypeChange = (type: OrderType) => {
    setCustomState({ 
      ...customState, 
      orderType: type,
      activeIndex: 0 
    });
  };

  const setActiveIndex = (index: number) => {
    setCustomState({ ...customState, activeIndex: index });
  };

  const activeBracelet = customState.bracelets[customState.activeIndex];
  
  const isReady = customState.orderType === OrderType.COUPLE 
    ? !!(customState.bracelets[0].image && customState.bracelets[1].image)
    : !!customState.bracelets[0].image;

  const currentPrice = customState.orderType === OrderType.COUPLE ? 150000 : 85000;
  const originalPrice = customState.orderType === OrderType.COUPLE ? 399000 : 199000;

  const testimonials = [
    { 
      name: "Siska K.", 
      review: "Packaging-nya mewah banget, dapet 2 gelang. Pas dilihat ke cahaya fotonya keluar! Benar-benar kado yang sangat berkesan.",
      date: "2 hari yang lalu"
    },
    { 
      name: "Andi R.", 
      review: "Kado anniv paling oke. Bahannya kuat, dipake mandi juga aman gak karatan. Pengiriman cepat dan packing aman.",
      date: "1 minggu yang lalu"
    },
    { 
      name: "Lia M.", 
      review: "Fitur AI-nya ngebantu banget buat nulis kartu ucapan. Gelangnya pas di tangan, magnetnya juga kuat banget.",
      date: "2 minggu yang lalu"
    }
  ];

  const faqs = [
    { q: "Apakah fotonya bisa diganti?", a: "Tentu, Anda bisa mengunggah foto apa pun. Kami merekomendasikan foto dengan pencahayaan terang untuk hasil proyeksi maksimal." },
    { q: "Pakai material apa?", a: "Kami menggunakan Perak S925, Emas 18K, atau Black Steel premium yang tahan karat dan aman untuk kulit sensitif." },
    { q: "Berapa lama pengerjaannya?", a: "Proses custom foto membutuhkan waktu 24 jam, dan pengiriman estimasi 2-4 hari kerja." }
  ];

  return (
    <Layout>
      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        orderType={customState.orderType}
        price={currentPrice}
      />

      {/* Hero Section */}
      <section className="bg-white py-20 md:py-32 border-b border-stone-100 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-1 text-amber-500 mb-6"
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-stone-500 text-[10px] font-black ml-3 tracking-[0.3em] uppercase">10,000+ COPIES SOLD</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold mb-8 serif leading-[1.1]"
          >
            Abadikan Momen Terindah <br />
            <span className="italic text-stone-300 font-normal">Dalam Genggaman Anda.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-stone-500 text-base md:text-xl mb-12 leading-relaxed"
          >
            Satu-satunya perhiasan yang menyimpan kenangan abadi. Gunakan proyektor kristal Lumina untuk melihat foto favorit Anda kapan saja, di mana saja.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-y-4 gap-x-10 text-[10px] font-black tracking-[0.3em] uppercase text-stone-400"
          >
            <span className="flex items-center gap-2 outline-none"><Truck className="w-4 h-4 text-amber-600" /> GRATIS ONGKIR</span>
            <span className="flex items-center gap-2"><RotateCcw className="w-4 h-4 text-amber-600" /> GARANSI 30 HARI</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-600" /> PREMIUM QUALITY</span>
          </motion.div>
        </div>
      </section>

      {/* Main Configurator */}
      <section className="py-20 md:py-32 bg-stone-50" id="customize">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
            
            {/* Sticky Preview */}
            <div className="lg:sticky lg:top-32">
              <div className="bg-white rounded-[48px] overflow-hidden shadow-2xl shadow-stone-200 border border-stone-100 relative group">
                <VisualPreview 
                  state={activeBracelet} 
                  label={customState.orderType === OrderType.COUPLE ? `Melihat Gelang ${customState.activeIndex + 1}` : 'Custom Gelang Satuan'} 
                />
                
                {/* Bracelet Switcher Overlay (Only for Couple) */}
                {customState.orderType === OrderType.COUPLE && (
                  <div className="absolute top-10 left-10 flex flex-col gap-4 z-20">
                    {customState.bracelets.map((b, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-16 h-16 rounded-3xl border-2 transition-all flex items-center justify-center overflow-hidden bg-white shadow-xl ${
                          customState.activeIndex === idx ? 'border-amber-500 scale-110' : 'border-stone-50 opacity-60 grayscale hover:grayscale-0'
                        }`}
                      >
                        {b.image ? (
                          <img src={b.image} className="w-full h-full object-cover" alt={`P${idx + 1}`} />
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-stone-400">{idx + 1}</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <div className="absolute bottom-10 right-10 z-20">
                  <div className="bg-stone-900/5 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-stone-900" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-stone-800">Preview Mode</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-8">
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-stone-100 mb-2">
                       <ShieldCheck className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-stone-400">Secure</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-stone-100 mb-2">
                       <RotateCcw className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-stone-400">Easy Return</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-stone-100 mb-2">
                       <Truck className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-stone-400">Fast Ship</span>
                 </div>
              </div>
            </div>

            {/* Configurator UI */}
            <div className="flex flex-col gap-12">
              <div className="space-y-6">
                <nav className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] text-stone-400 uppercase">
                  <a href="#" className="hover:text-stone-900 transition-colors">Katalog</a>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-stone-900">{customState.orderType === OrderType.COUPLE ? 'Paket Couple' : 'Satuan'}</span>
                </nav>
                
                <h2 className="text-4xl md:text-5xl font-bold serif leading-tight">Lumina Memorial <br />Edition Bracelet</h2>
                
                <div className="flex items-center gap-6">
                  <div className="bg-amber-500 rounded-2xl px-6 py-4 text-white shadow-xl shadow-amber-500/20">
                    <span className="text-[10px] font-black uppercase tracking-widest block mb-1 opacity-80">Harga Sekarang</span>
                    <span className="text-3xl font-black">Rp {currentPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div>
                    <span className="text-sm text-stone-300 line-through block font-bold">Rp {originalPrice.toLocaleString('id-ID')}</span>
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Hemat 60% Akhir Pekan Ini</span>
                  </div>
                </div>
              </div>

              {/* Order Type Selector */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 text-center lg:text-left">Pilih Paket Koleksi</h3>
                <div className="grid grid-cols-2 gap-4 p-2 bg-stone-200/50 rounded-[32px] border border-stone-200">
                  <button 
                    onClick={() => handleOrderTypeChange(OrderType.COUPLE)}
                    className={`flex flex-col items-center justify-center gap-2 py-6 rounded-[24px] transition-all ${customState.orderType === OrderType.COUPLE ? 'bg-white text-stone-900 shadow-xl' : 'text-stone-400 hover:text-stone-600'}`}
                  >
                    <Users className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Paket Couple</span>
                  </button>
                  <button 
                    onClick={() => handleOrderTypeChange(OrderType.SINGLE)}
                    className={`flex flex-col items-center justify-center gap-2 py-6 rounded-[24px] transition-all ${customState.orderType === OrderType.SINGLE ? 'bg-white text-stone-900 shadow-xl' : 'text-stone-400 hover:text-stone-600'}`}
                  >
                    <User className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Gelang Satuan</span>
                  </button>
                </div>
              </div>

              {/* Selection Tabs (Only for Couple) */}
              {customState.orderType === OrderType.COUPLE && (
                <div className="flex p-2 bg-stone-200/50 rounded-[28px] border border-stone-200">
                  <button 
                    onClick={() => setActiveIndex(0)}
                    className={`flex-1 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${customState.activeIndex === 0 ? 'bg-white text-stone-900 shadow-lg' : 'text-stone-400 hover:text-stone-600'}`}
                  >
                    Gelang Pertama {customState.bracelets[0].image && '✓'}
                  </button>
                  <button 
                    onClick={() => setActiveIndex(1)}
                    className={`flex-1 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${customState.activeIndex === 1 ? 'bg-white text-stone-900 shadow-lg' : 'text-stone-400 hover:text-stone-600'}`}
                  >
                    Gelang Kedua {customState.bracelets[1].image && '✓'}
                  </button>
                </div>
              )}

              {/* Main Customizer UI Component */}
              <div className="bg-white p-10 rounded-[48px] shadow-xl shadow-stone-200 border border-stone-100">
                <CustomizerUI 
                  state={activeBracelet} 
                  onChange={handleStateChange} 
                />
              </div>

              {/* Checkout Action */}
              <div className="pt-6 space-y-6">
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  disabled={!isReady}
                  className="w-full bg-stone-900 text-white py-6 rounded-[32px] font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-4 hover:bg-stone-800 transition-all shadow-2xl shadow-stone-900/20 disabled:opacity-30 group"
                >
                  Pesan Sekarang <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <p className="text-[8px] text-center font-black text-stone-400 uppercase tracking-widest">
                  🔒 Pembayaran Aman & Terenkripsi • Pengembalian Dana 100% Jika Barang Rusak
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-md">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-4">Momen Berharga</h3>
              <h2 className="text-4xl font-bold serif leading-tight">Dengarkan Apa Kata <br />Sahabat Lumina</h2>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">4.9/5</p>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Rating Google</p>
              </div>
              <div className="w-px h-12 bg-stone-800" />
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">15K+</p>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Pesanan Selesai</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-stone-800 p-10 rounded-[40px] border border-stone-700 hover:border-amber-500/30 transition-all group">
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-stone-300 text-sm leading-relaxed mb-8 italic italic font-light">"{t.review}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-widest">{t.name}</span>
                  <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4">
           <h3 className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-6 tracking-widest">Tanya Jawab</h3>
           <h2 className="text-center text-3xl md:text-5xl font-bold serif mb-16">Informasi Pesanan</h2>
           
           <div className="space-y-6">
             {faqs.map((f, i) => (
               <div key={i} className="p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:border-stone-200 transition-all">
                 <h4 className="font-bold text-stone-900 mb-3 flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                   {f.q}
                 </h4>
                 <p className="text-stone-500 text-sm leading-relaxed">{f.a}</p>
               </div>
             ))}
           </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
