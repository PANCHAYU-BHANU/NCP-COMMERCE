import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Users, BookOpen, Database, TrendingDown, ZapOff } from 'lucide-react';

const issuesList = [
  { 
    id: 1, 
    text: "ගුරු තුලනය නිවැරදි නොවීම", 
    desc: "Imbalance in teacher allocation / distribution across schools.",
    icon: Users, 
    color: "from-rose-500/20 to-red-500/5",
    accent: "text-rose-400",
    border: "border-rose-500/30"
  },
  { 
    id: 2, 
    text: "ප්‍රධාන විෂය ත්‍රිත්වය සඳහා සමාන බර තැබීම අවම වීම", 
    desc: "Minimal equal weightage given to the three main subjects.",
    icon: BookOpen, 
    color: "from-orange-500/20 to-amber-500/5",
    accent: "text-orange-400",
    border: "border-orange-500/30"
  },
  { 
    id: 3, 
    text: "ශිෂ්‍ය තොරතුරු පද්ධතිය ක්‍රියාත්මක නොවීම", 
    desc: "Student Information System (SIS) is currently non-operational.",
    icon: Database, 
    color: "from-amber-500/20 to-yellow-500/5",
    accent: "text-amber-400",
    border: "border-amber-500/30"
  },
  { 
    id: 4, 
    text: "වාණිජ විෂය සමගාමී වැඩසටහන් මන්දගාමී වීම", 
    desc: "Sluggishness or slowdown in commerce-related co-curricular programs.",
    icon: TrendingDown, 
    color: "from-red-600/20 to-rose-600/5",
    accent: "text-red-500",
    border: "border-red-500/30"
  },
  { 
    id: 5, 
    text: "ශිෂ්‍යා සහ ගුරුවරයා එකිනෙකාට ඍණාත්මකව බලපෑම", 
    desc: "Negative mutual impact/influence between students and teachers.",
    icon: ZapOff, 
    color: "from-pink-500/20 to-rose-400/5",
    accent: "text-pink-400",
    border: "border-pink-500/30"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50, filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: 'spring', stiffness: 80, damping: 15 } }
};

export default function Issues() {
  return (
    <div className="min-h-screen bg-background pt-16 pb-20 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Page Title Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mb-16 text-center z-10 relative"
      >
        <div className="inline-flex items-center justify-center space-x-3 mb-4 rounded-full bg-rose-500/10 border border-rose-500/20 px-6 py-2">
          <AlertTriangle className="w-6 h-6 text-rose-400" />
          <span className="text-rose-400 font-bold uppercase tracking-widest text-sm">Critical Focus Areas</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(244,63,94,0.3)] mb-4 tracking-tight">
          හඳුනාගත් ගැටළු
        </h1>
        <p className="text-slate-400 text-xl font-medium tracking-wide">(Key Identified Issues)</p>
      </motion.div>

      {/* Issues List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-6 z-10 relative"
      >
        {issuesList.map((issue) => (
          <motion.div 
            key={issue.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 10 }}
            className={`relative overflow-hidden rounded-2xl bg-surface/80 border ${issue.border} p-6 shadow-xl backdrop-blur-md flex items-center transition-all duration-300 group`}
          >
            {/* Dynamic Hover Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${issue.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            
            <div className="flex-shrink-0 mr-6 md:mr-8 relative z-10">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.25rem] bg-black/40 border border-white/5 flex items-center justify-center shadow-inner group-hover:bg-black/60 transition-colors`}>
                <span className={`text-4xl md:text-5xl font-black opacity-20 absolute ${issue.accent}`}>{issue.id}</span>
                <issue.icon className={`w-8 h-8 md:w-10 md:h-10 ${issue.accent} relative z-10`} />
              </div>
            </div>

            <div className="relative z-10 flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug drop-shadow-md">
                {issue.text}
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-medium">
                {issue.desc}
              </p>
            </div>
            
            {/* Decorative Number on the far right edge */}
            <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 text-[120px] font-black text-white/5 z-0 select-none pointer-events-none group-hover:text-white/10 transition-colors transform rotate-12">
              0{issue.id}
            </div>

          </motion.div>
        ))}
      </motion.div>
      
    </div>
  );
}
