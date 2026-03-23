import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Users, BookOpen, ChevronDown, CheckCircle2, X, School, Table2 } from 'lucide-react';

const divisionsData = [
  {
    id: "hingurakgoda",
    name: "හිගුරක්ගොඩ කොට්ඨාසය",
    color: "from-emerald-500 to-teal-400",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    schools: [
      { name: "ආනන්ද බාලිකා ම. වි", girls: 30, boys: 0, total26: 30, total25: 19, pass: "66.67" },
      { name: "ගිරිතලේගම ජාතික පාසල", girls: 5, boys: 4, total26: 5, total25: 6, pass: "61.90" },
      { name: "මින්නේරිය ම. වි", girls: 14, boys: 27, total26: 52, total25: 32, pass: "46.15" },
      { name: "රජරට ම. වි", girls: 21, boys: 40, total26: 21, total25: 8, pass: "66.67" },
      { name: "නාගලකන්ද ජාතික පාසල", girls: 0, boys: 1, total26: 1, total25: 1, pass: "83.33" },
    ]
  },
  {
    id: "medirigiriya",
    name: "මැදිරිගිරිය කොට්ඨාසය",
    color: "from-blue-500 to-cyan-400",
    border: "border-blue-500/30",
    text: "text-blue-400",
    schools: [
      { name: "මැදිරිගිරිය ම. ම. වි", girls: 43, boys: 43, total26: 86, total25: 96, pass: "N/A" },
      { name: "දිවුලන්කඩවල ම. වි", girls: 33, boys: 32, total26: 51, total25: 27, pass: "50.94" },
      { name: "විජයපුර ම. වි", girls: 3, boys: 7, total26: 15, total25: 6, pass: "66.67" },
      { name: "කවුඩුලුවැව ම. වි", girls: "-", boys: "-", total26: 4, total25: 10, pass: "31.25" },
      { name: "මණ්ඩලගිරිය ම. වි", girls: 5, boys: 1, total26: 8, total25: 6, pass: "100.0" },
      { name: "කවුඩුල්ල ම. වි", girls: "-", boys: "-", total26: 12, total25: 2, pass: "61.54" },
    ]
  },
  {
    id: "elahera",
    name: "ඇලහැර කොට්ඨාසය",
    color: "from-purple-500 to-fuchsia-400",
    border: "border-purple-500/30",
    text: "text-purple-400",
    schools: [
      { name: "බකමූණ මහසෙන් ම. වි", girls: 25, boys: 14, total26: 51, total25: 38, pass: "71.43" },
      { name: "අත්තනකඩවල ම. වි", girls: 7, boys: 8, total26: 32, total25: 20, pass: "37.14" },
      { name: "ඉරහඳ කෙටු වැව ම. වි", girls: 9, boys: 11, total26: 20, total25: 9, pass: "66.67" },
      { name: "අත්තරගල්ලෑව ම. වි", girls: "-", boys: "-", total26: "-", total25: "-", pass: "71.43" },
    ]
  }
];

const rawDataSheet = [
  { name: "Hingurakgoda Zone", sat: [244, 185, 429], fail: [77, 99, 176], pass: [167, 86, 253], perc: ["68.44", "46.49", "58.97"], type: "zone" },
  { name: "Hingurakgoda Division", sat: [96, 52, 148], fail: [29, 24, 53], pass: [67, 28, 95], perc: ["69.79", "53.85", "64.19"], type: "div" },
  { name: "PL/ANANDA BALIKA NAT", sat: [45, 0, 45], fail: [15, 0, 15], pass: [30, 0, 30], perc: ["66.67", "-", "66.67"], type: "school" },
  { name: "PL/GIRITALEGAMA MAH", sat: [21, 21, 42], fail: [5, 11, 16], pass: [16, 10, 26], perc: ["76.19", "47.62", "61.90"], type: "school" },
  { name: "PL/RAJARATA MAHA VID", sat: [21, 21, 42], fail: [7, 7, 14], pass: [14, 14, 28], perc: ["66.67", "66.67", "66.67"], type: "school" },
  { name: "PL/MINNERIYA NATIONA", sat: [5, 8, 13], fail: [2, 5, 7], pass: [3, 3, 6], perc: ["60.00", "37.50", "46.15"], type: "school" },
  { name: "PL/NAGALAKANDA MAH", sat: [4, 2, 6], fail: [0, 1, 1], pass: [4, 1, 5], perc: ["100.0", "50.00", "83.33"], type: "school" },
  
  { name: "Medirigiriya Division", sat: [99, 88, 187], fail: [34, 49, 83], pass: [65, 39, 104], perc: ["65.66", "44.32", "55.61"], type: "div" },
  { name: "PL/DIVULANKADAWALA", sat: [28, 25, 53], fail: [12, 14, 26], pass: [16, 11, 27], perc: ["57.14", "44.00", "50.94"], type: "school" },
  { name: "PL/KAVUDULUWEWA M", sat: [7, 9, 16], fail: [5, 6, 11], pass: [2, 3, 5], perc: ["28.57", "33.33", "31.25"], type: "school" },
  { name: "PL/KAVDULLA MAHA VID", sat: [7, 6, 13], fail: [1, 4, 5], pass: [6, 2, 8], perc: ["85.71", "33.33", "61.54"], type: "school" },
  { name: "PL/MANDALAGIRI MAHA", sat: [1, 0, 1], fail: [0, 0, 0], pass: [1, 0, 1], perc: ["100.0", "-", "100.0"], type: "school" },
  { name: "PL/VIJAYAPURA MAHA V", sat: [2, 4, 6], fail: [0, 2, 2], pass: [2, 2, 4], perc: ["100.0", "50.00", "66.67"], type: "school" },

  { name: "Elahera Division", sat: [49, 45, 94], fail: [14, 26, 40], pass: [35, 19, 54], perc: ["71.43", "42.22", "57.45"], type: "div" },
  { name: "PL/ATTANAKADAWALA M", sat: [18, 17, 35], fail: [9, 13, 22], pass: [9, 4, 13], perc: ["50.00", "23.53", "37.14"], type: "school" },
  { name: "PL/BAKAMUNA MAHASEN", sat: [13, 15, 28], fail: [1, 7, 8], pass: [12, 8, 20], perc: ["92.31", "53.33", "71.43"], type: "school" },
  { name: "PL/IRAHANDA KETU WEV", sat: [13, 11, 24], fail: [3, 5, 8], pass: [10, 6, 16], perc: ["76.92", "54.55", "66.67"], type: "school" },
  { name: "PL/ATTARAGALLEWA MA", sat: [5, 2, 7], fail: [1, 1, 2], pass: [4, 1, 5], perc: ["80.00", "50.00", "71.43"], type: "school" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function Schools() {
  const [activeDivision, setActiveDivision] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [visibleTableRows, setVisibleTableRows] = useState(0);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedSchool) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedSchool]);

  return (
    <div className="relative min-h-screen px-4 pt-8 pb-32 bg-background md:px-8">
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-16 text-center max-w-7xl"
      >
        <h1 className="mb-4 text-5xl font-black text-transparent md:text-7xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text drop-shadow-lg">
          පාසල් දත්ත
        </h1>
        <p className="text-lg text-slate-400 md:text-xl">කොට්ඨාස මට්ටමින් පාසල් වල ප්‍රගතිය (School Progress by Division)</p>
      </motion.div>

      <div className="flex flex-col items-center mx-auto max-w-7xl">
        {/* Divisions Selector */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid w-full grid-cols-1 gap-6 mb-12 md:grid-cols-3"
        >
          {divisionsData.map((division) => (
            <motion.button
              key={division.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveDivision(activeDivision === division.id ? null : division.id)}
              className={`relative overflow-hidden rounded-3xl bg-surface border ${division.border} p-8 shadow-xl flex flex-col items-center justify-center transition-all duration-300 ${activeDivision === division.id ? 'ring-2 ring-white/50 bg-white/5 shadow-white/10' : ''}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${division.color} opacity-10 rounded-3xl pointer-events-none`} />
              
              <div className={`p-4 rounded-full bg-white/5 mb-4 border ${division.border} shadow-inner`}>
                <GraduationCap className={`w-10 h-10 ${division.text}`} />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">{division.name}</h3>
              <div className="flex items-center space-x-2 text-slate-400">
                <span className="text-sm">විස්තර බලන්න හැඩගස්වන්න</span>
                <motion.div animate={{ rotate: activeDivision === division.id ? 180 : 0 }}>
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Selected Division Data Display */}
        <AnimatePresence mode="wait">
          {activeDivision && (
            <motion.div
              key={activeDivision}
              initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, height: 'auto', filter: "blur(0px)" }}
              exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
              className="w-full mb-16 overflow-hidden"
            >
              <div className="bg-surface/50 border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl backdrop-blur-md">
                
                {divisionsData.filter(d => d.id === activeDivision).map(division => (
                  <div key={division.id} className="w-full">
                    <div className="flex items-center mb-8 space-x-4">
                      <BookOpen className={`w-8 h-8 ${division.text}`} />
                      <h2 className="text-3xl font-bold text-white">{division.name} පාසල් ලැයිස්තුව</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                      {division.schools.map((school, idx) => (
                        <motion.div 
                          layoutId={`card-${school.name}`}
                          key={school.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          onClick={() => setSelectedSchool({ ...school, divisionColor: division.color, divisionText: division.text, divisionName: division.name })}
                          className="p-6 transition-all duration-300 border cursor-pointer bg-white/5 border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/30 group"
                        >
                          <div className="flex items-start justify-between mb-6">
                            <motion.h3 layoutId={`title-${school.name}`} className="text-2xl font-bold transition-colors text-slate-100 group-hover:text-white">{school.name}</motion.h3>
                            <div className="flex flex-col items-end">
                              <span className="mb-1 text-xs tracking-wider uppercase text-slate-400">Pass % (Commerce)</span>
                              <motion.span layoutId={`pass-${school.name}`} className={`text-2xl font-black ${school.pass === 'N/A' ? 'text-slate-500' : division.text}`}>
                                {school.pass}{school.pass !== 'N/A' && '%'}
                              </motion.span>
                            </div>
                          </div>

                          <motion.div layoutId={`content-${school.name}`} className="grid grid-cols-2 gap-4">
                            {/* 2027 Projected Students */}
                            <div className="p-4 border bg-black/30 rounded-xl border-white/5">
                              <div className="mb-3 text-sm font-medium text-slate-400">2027 (A/L) සිසුන් සංඛ්‍යාව</div>
                              <div className="flex items-center justify-between">
                                <div className="text-center">
                                  <div className="text-xl font-bold text-pink-400">{school.girls}</div>
                                  <div className="mt-1 text-xs text-slate-500">ගැහැණු</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold text-blue-400">{school.boys}</div>
                                  <div className="mt-1 text-xs text-slate-500">පිරිමි</div>
                                </div>
                              </div>
                            </div>

                            {/* Total Historical Students */}
                            <div className="p-4 border bg-black/30 rounded-xl border-white/5">
                              <div className="mb-3 text-sm font-medium text-slate-400">මුළු සිසුන් (Total)</div>
                              <div className="flex items-center justify-between">
                                <div className="text-center">
                                  <div className="text-xl font-bold text-amber-400">{school.total26}</div>
                                  <div className="mt-1 text-xs text-slate-500">2026</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xl font-bold text-slate-300">{school.total25}</div>
                                  <div className="mt-1 text-xs text-slate-500">2025</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Raw Data Detailed Table Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="w-full mt-10 bg-surface/50 border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl backdrop-blur-md cursor-pointer group"
          onClick={() => {
            if (visibleTableRows < rawDataSheet.length) setVisibleTableRows(prev => prev + 1);
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Table2 className="w-8 h-8 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white md:text-3xl">Full Commerce Results Breakdown</h2>
            </div>
            {visibleTableRows < rawDataSheet.length && (
              <p className="text-sm font-bold text-emerald-400/80 animate-pulse">
                (Click to reveal table rows)
              </p>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center border-collapse pointer-events-none md:text-base">
              <thead className="border bg-black/40 text-slate-300 border-white/10">
                <tr>
                  <th rowSpan="2" className="p-4 border border-white/10 text-left font-bold text-emerald-300 min-w-[200px] uppercase">ZONE / SCHOOL</th>
                  <th colSpan="3" className="p-2 font-bold text-blue-200 border border-white/10">SAT</th>
                  <th colSpan="3" className="p-2 font-bold border border-white/10 text-rose-300">FAIL</th>
                  <th colSpan="3" className="p-2 font-bold border border-white/10 text-amber-200">PASS</th>
                  <th colSpan="3" className="p-2 font-bold border border-white/10 text-emerald-400">PASS %</th>
                </tr>
                <tr className="text-xs text-slate-400 md:text-sm">
                  <th className="p-2 border border-white/10">F</th>
                  <th className="p-2 border border-white/10">M</th>
                  <th className="p-2 font-bold text-white border border-white/10">Total</th>
                  <th className="p-2 border border-white/10">F</th>
                  <th className="p-2 border border-white/10">M</th>
                  <th className="p-2 font-bold text-white border border-white/10">Total</th>
                  <th className="p-2 border border-white/10">F</th>
                  <th className="p-2 border border-white/10">M</th>
                  <th className="p-2 font-bold text-white border border-white/10">Total</th>
                  <th className="p-2 border border-white/10">F</th>
                  <th className="p-2 border border-white/10">M</th>
                  <th className="p-2 font-bold border border-white/10 text-emerald-400">Total</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {rawDataSheet.slice(0, visibleTableRows).map((row, idx) => (
                    <motion.tr 
                      key={row.name + idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', stiffness: 100 }}
                      className={`transition-colors duration-200 ${row.type === 'zone' ? 'bg-emerald-900/30 font-bold text-white' : row.type === 'div' ? 'bg-blue-900/20 font-bold text-slate-100' : 'hover:bg-white/5 text-slate-300'}`}
                    >
                      <td className="p-3 text-left border border-white/10">{row.name}</td>
                      
                      {/* SAT */}
                      <td className="p-3 border border-white/10">{row.sat[0]}</td>
                      <td className="p-3 border border-white/10">{row.sat[1]}</td>
                      <td className="p-3 font-bold border border-white/10 bg-white/5">{row.sat[2]}</td>
                      
                      {/* FAIL */}
                      <td className="p-3 border border-white/10 text-rose-300/70">{row.fail[0]}</td>
                      <td className="p-3 border border-white/10 text-rose-300/70">{row.fail[1]}</td>
                      <td className="p-3 font-bold border border-white/10 bg-white/5 text-rose-300/90">{row.fail[2]}</td>
                      
                       {/* PASS */}
                      <td className="p-3 border border-white/10 text-amber-200/70">{row.pass[0]}</td>
                      <td className="p-3 border border-white/10 text-amber-200/70">{row.pass[1]}</td>
                      <td className="p-3 font-bold border border-white/10 bg-white/5 text-amber-200/90">{row.pass[2]}</td>
                      
                      {/* PASS % */}
                      <td className="p-3 border border-white/10 text-emerald-400/80">{row.perc[0]}</td>
                      <td className="p-3 border border-white/10 text-emerald-400/80">{row.perc[1]}</td>
                      <td className="p-3 font-black border border-white/10 bg-emerald-900/20 text-emerald-400">{row.perc[2]}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {visibleTableRows === 0 && (
              <div className="flex flex-col items-center gap-4 py-20 text-xl text-center text-slate-400">
                <span className="text-4xl">👆</span>
                Click anywhere inside this table area to load the detailed rows
              </div>
            )}
          </div>
        </motion.div>

      </div>

      {/* Expanded Modal Popup using Framer Motion AnimatePresence */}
      <AnimatePresence>
        {selectedSchool && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedSchool(null)}
          >
            <motion.div
              layoutId={`card-${selectedSchool.name}`}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-surface border border-white/20 p-8 md:p-12 shadow-[0_0_60px_rgba(0,0,0,0.6)] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br ${selectedSchool.divisionColor} opacity-15 rounded-full blur-[60px] pointer-events-none`} />
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedSchool(null)}
                className="absolute z-20 p-2 transition-colors rounded-full top-6 right-6 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10 mb-8">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4 ${selectedSchool.divisionText}`}>
                  <School className="w-4 h-4" />
                  <span className="text-sm font-bold tracking-wider uppercase">{selectedSchool.divisionName}</span>
                </div>
                <motion.h3 layoutId={`title-${selectedSchool.name}`} className="text-4xl font-black leading-tight text-white md:text-5xl">
                  {selectedSchool.name}
                </motion.h3>
              </div>

              <motion.div layoutId={`content-${selectedSchool.name}`} className="relative z-10 space-y-6">
                
                {/* Large Pass Rate Hero */}
                <div className="flex flex-col items-center justify-between p-8 border shadow-inner md:flex-row bg-black/40 rounded-3xl border-white/10">
                  <div className="flex flex-col items-center mb-4 md:items-start md:mb-0">
                    <span className="mb-1 text-lg font-medium text-slate-400">වාණිජ අංශයේ සමත් ප්‍රතිශතය</span>
                    <span className="text-sm tracking-widest uppercase text-slate-500">(Commerce Pass Rate)</span>
                  </div>
                  <motion.span layoutId={`pass-${selectedSchool.name}`} className={`text-6xl md:text-7xl font-black drop-shadow-lg ${selectedSchool.pass === 'N/A' ? 'text-slate-500' : selectedSchool.divisionText}`}>
                    {selectedSchool.pass}{selectedSchool.pass !== 'N/A' && <span className="ml-1 text-4xl">%</span>}
                  </motion.span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Expanded 2027 Projected Students */}
                  <div className="p-6 border bg-black/30 rounded-2xl border-white/5">
                    <div className="mb-6 font-medium text-center text-slate-400">2027 (A/L) සිසුන් සංඛ්‍යාව</div>
                    <div className="flex items-center justify-around">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-3 border rounded-full bg-pink-500/10 border-pink-500/20">
                          <span className="text-3xl font-black text-pink-400">{selectedSchool.girls}</span>
                        </div>
                        <div className="text-sm text-slate-400">ගැහැණු (Girls)</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-3 border rounded-full bg-blue-500/10 border-blue-500/20">
                          <span className="text-3xl font-black text-blue-400">{selectedSchool.boys}</span>
                        </div>
                        <div className="text-sm text-slate-400">පිරිමි (Boys)</div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Total Historical Students */}
                  <div className="p-6 border bg-black/30 rounded-2xl border-white/5">
                    <div className="mb-6 font-medium text-center text-slate-400">මුළු සිසුන් (Total Students)</div>
                    <div className="flex items-center justify-around">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-3 border rounded-full bg-amber-500/10 border-amber-500/20">
                          <span className="text-3xl font-black text-amber-400">{selectedSchool.total26}</span>
                        </div>
                        <div className="text-sm text-slate-400">2026</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-3 border rounded-full bg-slate-500/10 border-slate-500/20">
                          <span className="text-3xl font-black text-slate-300">{selectedSchool.total25}</span>
                        </div>
                        <div className="text-sm text-slate-400">2025</div>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
