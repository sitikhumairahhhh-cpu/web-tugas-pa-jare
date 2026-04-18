
import React from 'react';
import { ShoppingBag, Menu, Instagram, Facebook, Twitter } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-stone-600">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase serif leading-none">Lumina</span>
              <span className="text-[8px] font-black tracking-[0.3em] uppercase text-amber-600 mt-1">Fine Jewelry</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">
            <a href="#" className="hover:text-stone-900 transition-colors">Gelang</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Kalung</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Cerita Kami</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Testimoni</a>
          </nav>

          <div className="flex items-center gap-6">
            <button className="relative group">
              <ShoppingBag className="w-5 h-5 text-stone-900 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-[8px] text-white flex items-center justify-center rounded-full font-bold">2</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col mb-6">
              <span className="text-3xl font-bold tracking-[0.2em] uppercase serif leading-none">Lumina</span>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-amber-500 mt-2">Fine Jewelry</span>
            </div>
            <p className="text-stone-400 text-sm max-w-md leading-relaxed mb-8">
              Kami percaya bahwa setiap kenangan layak diabadikan dengan cara yang paling elegan. Lumina menghadirkan teknologi proyeksi foto pertama di Indonesia dalam balutan perhiasan premium.
            </p>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:bg-stone-800 transition-all">
                <Instagram className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:bg-stone-800 transition-all">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:bg-stone-800 transition-all">
                <Twitter className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-6">Navigasi</h4>
            <ul className="space-y-4 text-sm text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">Katalog Produk</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cara Kerja Proyektor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan Pengiriman</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-6">Bantuan</h4>
            <ul className="space-y-4 text-sm text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status Pesanan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Garansi & Retur</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-10 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest">© 2024 Lumina Jewelry. All Rights Reserved.</p>
          <div className="flex items-center gap-8">
            <span className="text-stone-500 text-[10px] font-bold uppercase tracking-widest">Privacy Policy</span>
            <span className="text-stone-500 text-[10px] font-bold uppercase tracking-widest">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
