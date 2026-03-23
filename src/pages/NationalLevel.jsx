import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, Target, BarChart3, X } from 'lucide-react';

const statsData = [
  { region: 'ජාතික මට්ටම', count: '56,691', performance: 69.61, color: 'from-emerald-500 to-teal-400', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  { region: 'උතුරුමැද', count: '2,934', performance: 65.99, color: 'from-primary to-blue-400', text: 'text-primary', border: 'border-primary/30' },
  { region: 'අනුරාධපුර', count: '1,932', performance: 68.32, color: 'from-amber-500 to-orange-400', text: 'text-amber-400', border: 'border-amber-500/30' },
  { region: 'පොළොන්නරුව', count: '1,002', performance: 61.47, color: 'from-indigo-500 to-purple-400', text: 'text-indigo-400', border: 'border-indigo-500/30' },
];

const yearlyData = [
  { year: '2020', anu: '68.65', pol: '73.49' },
  { year: '2021', anu: '62.89', pol: '65.45' },
  { year: '2022', anu: '62.83', pol: '60.71' },
  { year: '2023', anu: '64.28', pol: '60.56' },
  { year: '2024', anu: '68.32', pol: '61.47' },
  { year: '2025', anu: '?', pol: '?' },
  { year: '2026', anu: '?', pol: '?' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function NationalLevel() {
  const [selectedId, setSelectedId] = useState(null);
  const [visibleRows, setVisibleRows] = useState(0);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-background pt-8 pb-20 px-4 md:px-8">
      
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-16 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg mb-4">
          ජාතික මට්ටම
        </h1>
        <p className="text-slate-400 text-lg md:text-xl">කාර්ය සාධන විශ්ලේෂණය සහ ප්‍රගතිය (Performance Analysis)</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto space-y-16"
      >
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <motion.div 
              layoutId={`card-${stat.region}`}
              key={stat.region}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedId(stat.region)}
              className={`relative overflow-hidden rounded-3xl bg-surface border ${stat.border} p-6 shadow-xl cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300`}
            >
              {/* Background gradient glow */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl pointer-events-none`} />
              
              <motion.h3 layoutId={`title-${stat.region}`} className="text-2xl font-bold text-white mb-6 z-10 relative">
                {stat.region}
              </motion.h3>
              
              <motion.div layoutId={`content-${stat.region}`} className="space-y-4 z-10 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Users className="w-5 h-5 opacity-70" />
                    <span className="text-sm">සිසුන් ගණන</span>
                  </div>
                  <span className="text-xl font-bold text-white">{stat.count}</span>
                </div>
                
                <div className="w-full h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Target className="w-5 h-5 opacity-70" />
                    <span className="text-sm">ප්‍රතිශතය</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${stat.text}`}>
                    <span className="text-3xl font-black">{stat.performance}</span>
                    <span className="text-lg">%</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Yearly Comparison Section (Presentation Style) */}
        <motion.div 
          variants={itemVariants} 
          className="bg-surface/50 rounded-3xl border border-white/5 p-6 md:p-10 shadow-2xl backdrop-blur-sm flex flex-col items-center w-full cursor-pointer relative hover:border-primary/30 transition-colors"
          onClick={() => {
            if (visibleRows < yearlyData.length) setVisibleRows(prev => prev + 1);
          }}
        >
          <div className="flex items-center justify-center space-x-3 mb-10 w-full pointer-events-none">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">වාර්ෂික ප්‍රගති සැසඳීම</h2>
          </div>
          
          {visibleRows < yearlyData.length && (
            <p className="absolute top-6 right-6 text-sm text-primary/70 font-semibold animate-pulse hidden md:block select-none pointer-events-none">
              දත්ත ගෙන්වීමට මෙතන Click කරන්න<br/>(Click continuously to show data)
            </p>
          )}

          <div className="overflow-x-auto w-full pointer-events-none">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-xl text-slate-400 font-semibold border-b border-white/10">වර්ෂය (Year)</th>
                  <th className="p-4 text-xl text-amber-400 font-bold border-b border-white/10">අනුරාධපුර</th>
                  <th className="p-4 text-xl text-indigo-400 font-bold border-b border-white/10">පොළොන්නරුව</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {yearlyData.slice(0, visibleRows).map((row) => (
                    <motion.tr 
                      key={row.year}
                      initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ type: 'spring', stiffness: 120 }}
                      className="hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="p-5 border-b border-white/5">
                        <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white font-bold tracking-wider">
                          {row.year}
                        </span>
                      </td>
                      <td className="p-5 border-b border-white/5 text-2xl font-semibold text-slate-200">
                        {row.anu}{row.anu !== '?' && <span className="text-sm text-slate-500 ml-1">%</span>}
                      </td>
                      <td className="p-5 border-b border-white/5 text-2xl font-semibold text-slate-200">
                        {row.pol}{row.pol !== '?' && <span className="text-sm text-slate-500 ml-1">%</span>}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {visibleRows === 0 && (
              <div className="py-16 text-center text-slate-400 text-2xl font-bold tracking-wide flex flex-col items-center gap-4 animate-bounce">
                <span className="text-primary text-5xl">🖱️</span>
                Click anywhere inside this box to reveal the rows sequence!
              </div>
            )}
          </div>
        </motion.div>

      </motion.div>

      {/* Expanded Modal Popup using Framer Motion AnimatePresence */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            {statsData.filter(s => s.region === selectedId).map(stat => (
              <motion.div
                layoutId={`card-${stat.region}`}
                key="modal"
                className={`relative w-full max-w-xl overflow-hidden rounded-[2rem] bg-surface border ${stat.border} p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-default`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Premium background glow */}
                <div className={`absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br ${stat.color} opacity-20 rounded-full blur-[60px] pointer-events-none`} />
                <div className={`absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-tr ${stat.color} opacity-10 rounded-full blur-[50px] pointer-events-none`} />
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-20"
                >
                  <X className="w-6 h-6" />
                </button>

                <motion.h3 layoutId={`title-${stat.region}`} className="text-4xl md:text-5xl font-black text-white mb-10 z-10 relative">
                  {stat.region}
                </motion.h3>
                
                <motion.div layoutId={`content-${stat.region}`} className="space-y-6 z-10 relative">
                  {/* Expanded Count Data */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center space-x-4 text-slate-300 mb-4 md:mb-0">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-20 shadow-inner`}>
                         <Users className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-xl font-medium">සම්පූර්ණ සිසුන් ගණන</span>
                    </div>
                    <span className="text-5xl font-black text-white">{stat.count}</span>
                  </div>

                  {/* Expanded Performance Data */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center space-x-4 text-slate-300 mb-4 md:mb-0">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-20 shadow-inner`}>
                         <Target className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-xl font-medium">සාමාන්‍ය ප්‍රතිශතය</span>
                    </div>
                    <div className={`flex items-baseline space-x-1 ${stat.text}`}>
                      <span className="text-7xl font-black drop-shadow-lg">{stat.performance}</span>
                      <span className="text-3xl font-bold">%</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
