import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Database, 
  Search, 
  Users, 
  TrendingDown, 
  Star, 
  FolderOpen, 
  FileText, 
  Award, 
  Medal, 
  Activity 
} from 'lucide-react';

const solutionsList = [
  { id: "01", text: "වාණිජ ගුරුතොරතුරු පද්ධතිය සකස් කිරීම", desc: "Establishment of a Commerce Teachers Information System.", icon: Database },
  { id: "02", text: "කාර්ය සාධනය මත සම්පත් ගුරුභවතුන් හදුනා ගැනීම", desc: "Identifying resource teachers based on their performance.", icon: Search },
  { id: "03", text: "ගුරු අදහස් විමසමින් ගුරු තුලනයක් සිදු කිරීම", desc: "Balancing teachers through consultation of teachers' views.", icon: Users },
  { id: "04", text: "ළමුන් වැඩි සංඛ්‍යාවක් ඉගෙනුම ලබන පාසල්වල ගුරු දෝලනය අවම කිරීම", desc: "Minimizing teacher turnover in schools with high student populations.", icon: TrendingDown },
  { id: "05", text: "වාණිජ බාහිර ක්‍රියාකාරකම් පාසල් තුල ජනප්‍රිය කිරීම", desc: "Popularizing commerce co-curricular activities within schools.", icon: Star },
  { id: "06", text: "සිසු පෞද්ගලික ලිපි ගොනු ශක්තිමත්ව පවත්වා ගැනීම", desc: "Maintaining strong individual student portfolios/files.", icon: FolderOpen },
  { id: "07", text: "ඒකක සහ වාර පරීක්ෂණ ශක්තිමත් කිරීම", desc: "Strengthening unit and term examinations.", icon: FileText },
  { id: "08", text: "ළමුන්ට ලකුණු ලබා දී දරුවන් ඇගයීමට භාජනය කිරීම", desc: "Evaluating and scoring children continuously.", icon: Award },
  { id: "09", text: "කලාප මට්ටමින් වාණිජ ගුරු ඇගයීම", desc: "Evaluating commerce teachers at the zonal level.", icon: Medal },
  { id: "10", text: "අඛණ්ඩ නියාමනය හා ඇගයීම සියළුම පාර්ශව විසින්", desc: "Continuous regulation and evaluation by all parties.", icon: Activity }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

export default function Solutions() {
  return (
    <div className="min-h-screen bg-background pt-16 pb-24 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Page Title Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mb-16 text-center z-10 relative"
      >
        <div className="inline-flex items-center justify-center space-x-3 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-6 py-2">
          <Lightbulb className="w-6 h-6 text-emerald-400" />
          <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Strategic Proposals</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(52,211,153,0.3)] mb-4 tracking-tight">
          විසඳුම් යෝජනා
        </h1>
        <p className="text-slate-400 text-xl font-medium tracking-wide">(Proposed Solutions & Action Plan)</p>
      </motion.div>

      {/* Solutions Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 z-10 relative"
      >
        {solutionsList.map((solution, idx) => (
          <motion.div 
            key={solution.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`relative overflow-hidden rounded-3xl bg-surface/80 border border-emerald-500/20 p-8 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center transition-all duration-300 group hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]`}
          >
            {/* Hover Glow inside card */}
            <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            
            {/* Number & Icon Badge */}
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-black/40 border border-emerald-500/30 flex items-center justify-center shadow-inner group-hover:bg-emerald-500/20 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <solution.icon className="w-8 h-8 text-emerald-400 relative z-10" />
              </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 flex-1 pr-12">
              <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 leading-relaxed group-hover:text-white transition-colors">
                {solution.text}
              </h2>
              <p className="text-emerald-400/60 text-sm font-medium">
                {solution.desc}
              </p>
            </div>
            
            {/* Huge Background Number */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[100px] font-black text-emerald-500/5 z-0 select-none pointer-events-none group-hover:text-emerald-500/10 transition-colors transform -rotate-6">
              {solution.id}
            </div>

          </motion.div>
        ))}
      </motion.div>
      
    </div>
  );
}
