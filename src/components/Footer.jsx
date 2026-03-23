import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-surface/80 border-t border-white/10 py-6 text-center shadow-lg relative z-40">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-slate-400 text-sm md:text-base font-medium mb-3 md:mb-0">
          © 2026 NCP Commerce. All Rights Reserved | NCP Commerce Department
        </p>
        <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Powered By:</span>
          <span className="text-primary font-bold text-sm bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Panchayu Bhanu Mihisara
          </span>
        </div>
      </div>
    </footer>
  );
}
