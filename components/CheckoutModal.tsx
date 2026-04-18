
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, MessageSquare } from 'lucide-react';
import { OrderType } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderType: OrderType;
  price: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, orderType, price }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
              <div>
                <h3 className="text-2xl font-bold serif">Ringkasan Pesanan</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mt-1">Lumina Memorial Edition</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Item Details */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-stone-100 rounded-3xl flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">
                    {orderType === OrderType.COUPLE ? 'Paket Couple (2 Gelang)' : 'Gelang Satuan'}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1">Estimasi pengiriman: 2-4 Hari Kerja</p>
                  <p className="text-xl font-bold mt-2">Rp {price.toLocaleString('id-ID')}</p>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 rounded-2xl flex flex-col gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Garansi Karat & Magnet</span>
                </div>
                <div className="p-4 bg-stone-50 rounded-2xl flex flex-col gap-2">
                  <Truck className="w-5 h-5 text-amber-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Gratis Ongkir Seluruh Indonesia</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button 
                  onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
                  className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-stone-800 transition-all shadow-lg"
                >
                  <MessageSquare className="w-5 h-5" /> Selesaikan di WhatsApp
                </button>
                <button className="w-full bg-stone-100 text-stone-500 py-5 rounded-2xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-stone-200 transition-all">
                  <CreditCard className="w-5 h-5" /> Bayar Langsung
                </button>
              </div>

              <p className="text-[10px] text-center text-stone-400 font-medium px-8 leading-relaxed">
                Dengan melanjutkan, Anda setuju dengan Syarat & Ketentuan Lumina Jewelry. Foto Anda diamankan dengan enkripsi end-to-end.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
