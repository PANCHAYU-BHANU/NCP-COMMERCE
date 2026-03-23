import React from 'react';
import { motion } from 'framer-motion';
import { Target, MapPin, Activity } from 'lucide-react';

const mainStat = {
  region: 'හිගුරක්ගොඩ කලාපය (සමස්ත)',
  performance: 58.97,
  color: 'from-rose-500 to-orange-400',
  text: 'text-rose-400',
  border: 'border-rose-500/30'
};

const subStats = [
  { region: 'හිගුරක්ගොඩ', performance: 64.19, color: 'from-emerald-500 to-teal-400', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  { region: 'ඇලහැර', performance: 57.45, color: 'from-purple-500 to-fuchsia-400', text: 'text-purple-400', border: 'border-purple-500/30' },
  { region: 'මැදිරිගිරිය', performance: 55.61, color: 'from-blue-500 to-cyan-400', text: 'text-blue-400', border: 'border-blue-500/30' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
};

export default function Zone() {
  return (
    <div className="min-h-screen bg-background pt-16 pb-20 px-4 md:px-8">
      {/* Page Title Header */}
      <motion.div
        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto mb-20 text-center"
      >
        <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-br from-rose-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,113,133,0.3)] mb-4 tracking-tight">
          හිගුරක්ගොඩ කලාපය
        </h1>
        <p className="text-slate-400 text-xl font-medium tracking-wide">(Hingurakgoda Educational Zone)</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto space-y-12"
      >
        {/* Main Overall Zone Data Box */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className={`relative overflow-hidden rounded-[2.5rem] bg-surface/80 border ${mainStat.border} p-10 md:p-16 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between text-center md:text-left`}
        >
          {/* Ambient Lighting FX */}
          <div className={`absolute -right-20 -top-20 w-[400px] h-[400px] bg-gradient-to-br ${mainStat.color} opacity-10 rounded-full blur-[80px] pointer-events-none`} />
          <div className={`absolute -left-20 -bottom-20 w-[300px] h-[300px] bg-gradient-to-tr ${mainStat.color} opacity-10 rounded-full blur-[60px] pointer-events-none`} />

          <div className="z-10 relative mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-wide drop-shadow-md">
              සමස්ත ප්‍රතිශතය
            </h2>
            <div className="flex items-center justify-center md:justify-start space-x-4 text-slate-300">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${mainStat.color} bg-opacity-20 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                <Target className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-semibold">මධ්‍යක ප්‍රගතිය</span>
            </div>
          </div>

          <div className={`z-10 relative flex items-baseline space-x-2 ${mainStat.text} bg-black/20 p-8 rounded-3xl border border-white/5 shadow-inner`}>
            <span className="text-8xl md:text-[9rem] font-black drop-shadow-[0_0_40px_rgba(244,63,94,0.4)] tracking-tighter tabular-nums">
              {mainStat.performance}
            </span>
            <span className="text-5xl font-bold opacity-80">%</span>
          </div>
        </motion.div>

        {/* Divisions Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subStats.map((stat) => (
            <motion.div
              key={stat.region}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`relative overflow-hidden rounded-[2rem] bg-surface/90 border ${stat.border} p-10 shadow-xl flex flex-col items-center text-center group transition-all duration-300`}
            >
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-[2rem] pointer-events-none z-0`} />

              <div className={`p-5 rounded-full bg-white/5 mb-8 group-hover:bg-white/10 transition-colors border ${stat.border} shadow-lg z-10 relative`}>
                <MapPin className={`w-10 h-10 ${stat.text}`} />
              </div>

              <h3 className="text-3xl font-bold text-white mb-6 z-10 relative tracking-wide drop-shadow-sm">
                {stat.region}
              </h3>

              <div className={`flex items-baseline space-x-1 ${stat.text} z-10 relative`}>
                <span className="text-6xl font-black drop-shadow-lg tabular-nums tracking-tight">{stat.performance}</span>
                <span className="text-3xl font-bold opacity-80">%</span>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </div>
  );
}
