import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Users, BookOpen, ChevronDown, X, School, Table2 } from 'lucide-react';

const divisionsData = [
  {
    id: "aralaganwila",
    name: "අරලගංවිල කොට්ඨාසය",
    color: "from-emerald-500 to-teal-400",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    schools: [
      { name: "ලීලාරත්න විජේසිංහ ම.වි", teachers: "-", grade12: "-", grade13: "-", pass: "100.00" },
      { name: "නිකවත්ලන්ද ම.වි", teachers: 3, grade12: 2, grade13: 7, pass: "66.67" },
      { name: "වෙහෙරගල ම.වි", teachers: 3, grade12: 14, grade13: 25, pass: "76.47" },
      { name: "විලායාය ජාතික පාසල", teachers: 3, grade12: 39, grade13: 43, pass: "80.00" },
    ]
  },
  {
    id: "welikanda",
    name: "වැලිකන්ද කොට්ඨාසය",
    color: "from-blue-500 to-cyan-400",
    border: "border-blue-500/30",
    text: "text-blue-400",
    schools: [
      { name: "අසේලපුර ම.වි", teachers: "-", grade12: "-", grade13: "-", pass: "50.00" },
      { name: "නෙළුම්වැව ම.වි", teachers: "-", grade12: "-", grade13: "-", pass: "50.00" },
      { name: "සෙවනපිටිය ම.වි", teachers: 4, grade12: 10, grade13: 18, pass: "75.00" },
      { name: "වැලිකන්ද ම.වි", teachers: 2, grade12: 16, grade13: 14, pass: "87.50" },
    ]
  },
  {
    id: "dimbulagala",
    name: "දිඹුලාගල කොට්ඨාසය",
    color: "from-purple-500 to-fuchsia-400",
    border: "border-purple-500/30",
    text: "text-purple-400",
    schools: [
      { name: "මනම්පිටිය සිංහල ම.වි", teachers: 2, grade12: 2, grade13: 5, pass: "22.22" },
      { name: "මනම්පිටිය දෙමළ ම.වි", teachers: "-", grade12: "-", grade13: "-", pass: "0.00" },
      { name: "සිරිපුර ම.ම.වි", teachers: 3, grade12: 48, grade13: 54, pass: "66.67" },
      { name: "මඟුල්දමන ම.වි", teachers: "-", grade12: "-", grade13: "-", pass: "30.00" },
    ]
  }
];

const rawDataSheet = [
  { name: "Dimbulagala Zone", sat: [99, 78, 177], fail: [20, 37, 57], pass: [79, 41, 120], perc: ["79.80", "52.56", "67.80"], type: "zone" },
  
  { name: "Aralaganvila Division", sat: [46, 33, 79], fail: [7, 10, 17], pass: [39, 23, 62], perc: ["84.78", "69.70", "78.48"], type: "div" },
  { name: "PL/LEELARATHNA WIJESINGH", sat: [3, 0, 3], fail: [0, 0, 0], pass: [3, 0, 3], perc: ["100.00", "-", "100.00"], type: "school" },
  { name: "PL/NIKAWATHALANDA MAH", sat: [3, 6, 9], fail: [0, 3, 3], pass: [3, 3, 6], perc: ["100.00", "50.00", "66.67"], type: "school" },
  { name: "PL/VEHERAGALA MAHA VID", sat: [7, 10, 17], fail: [2, 2, 4], pass: [5, 8, 13], perc: ["71.43", "80.00", "76.47"], type: "school" },
  { name: "PL/WILAYAYA MADHYA MAHA", sat: [33, 17, 50], fail: [5, 5, 10], pass: [28, 12, 40], perc: ["84.85", "70.59", "80.00"], type: "school" },
  
  { name: "Welikanda Division", sat: [14, 4, 18], fail: [2, 3, 5], pass: [12, 1, 13], perc: ["85.71", "25.00", "72.22"], type: "div" },
  { name: "PL/ASELAPURA MAHA VIDYA", sat: [2, 2, 4], fail: [0, 2, 2], pass: [2, 0, 2], perc: ["100.00", "0.00", "50.00"], type: "school" },
  { name: "PL/NELUMWEWA MAHA VID", sat: [2, 0, 2], fail: [1, 0, 1], pass: [1, 0, 1], perc: ["50.00", "-", "50.00"], type: "school" },
  { name: "PL/SEVANAPITIYA MAHA VID", sat: [2, 2, 4], fail: [0, 1, 1], pass: [2, 1, 3], perc: ["100.00", "50.00", "75.00"], type: "school" },
  { name: "PL/WELIKANDA MAHA VIDYA", sat: [8, 0, 8], fail: [1, 0, 1], pass: [7, 0, 7], perc: ["87.50", "-", "87.50"], type: "school" },

  { name: "Dimbulagala Division", sat: [39, 41, 80], fail: [11, 24, 35], pass: [28, 17, 45], perc: ["71.79", "41.46", "56.25"], type: "div" },
  { name: "PL/MANAMPITIYA SINHALA", sat: [4, 5, 9], fail: [3, 4, 7], pass: [1, 1, 2], perc: ["25.00", "20.00", "22.22"], type: "school" },
  { name: "PL/MANAMPITIYA TAMIL M.", sat: [0, 1, 1], fail: [0, 1, 1], pass: [0, 0, 0], perc: ["-", "0.00", "0.00"], type: "school" },
  { name: "PL/SIRIPURA MADHYA MAH", sat: [34, 26, 60], fail: [8, 12, 20], pass: [26, 14, 40], perc: ["76.47", "53.85", "66.67"], type: "school" },
  { name: "PL/MAGULDAMANA MAHA", sat: [1, 9, 10], fail: [0, 7, 7], pass: [1, 2, 3], perc: ["100.00", "22.22", "30.00"], type: "school" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function DimbulagalaSchools() {
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
        <h1 className="mb-4 text-5xl font-black text-transparent md:text-7xl bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text drop-shadow-lg">
          දිඹුලාගල පාසල් දත්ත
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
                            {/* 12th Grade */}
                            <div className="p-4 border bg-black/30 rounded-xl border-white/5">
                              <div className="mb-3 text-sm font-medium text-slate-400 text-center">2027 (A/L) සිසුන්</div>
                              <div className="flex flex-col items-center justify-center">
                                <div className="text-2xl font-bold text-pink-400">{school.grade12 !== undefined ? school.grade12 : '-'}</div>
                                <div className="mt-1 text-xs text-slate-500">12 ශ්‍රේණිය</div>
                              </div>
                            </div>

                            {/* 13th Grade */}
                            <div className="p-4 border bg-black/30 rounded-xl border-white/5">
                              <div className="mb-3 text-sm font-medium text-slate-400 text-center">2026 (A/L) සිසුන්</div>
                              <div className="flex flex-col items-center justify-center">
                                <div className="text-2xl font-bold text-blue-400">{school.grade13 !== undefined ? school.grade13 : '-'}</div>
                                <div className="mt-1 text-xs text-slate-500">13 ශ්‍රේණිය</div>
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
                  <motion.span layoutId={`pass-${selectedSchool.name}`} className={`text-6xl md:text-7xl font-black drop-shadow-lg ${selectedSchool.pass === 'N/A' || selectedSchool.pass === '-' ? 'text-slate-500' : selectedSchool.divisionText}`}>
                    {selectedSchool.pass}{selectedSchool.pass !== 'N/A' && selectedSchool.pass !== '-' && <span className="ml-1 text-4xl">%</span>}
                  </motion.span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="p-6 border bg-black/30 rounded-2xl border-white/5">
                    <div className="mb-6 font-medium text-center text-slate-400">2027 (A/L) - 12 ශ්‍රේණිය</div>
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-20 h-20 mb-3 border rounded-full bg-pink-500/10 border-pink-500/20">
                          <span className="text-4xl font-black text-pink-400">{selectedSchool.grade12 !== undefined ? selectedSchool.grade12 : '-'}</span>
                        </div>
                        <div className="text-sm text-slate-400">සිසුන් සංඛ්‍යාව</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border bg-black/30 rounded-2xl border-white/5">
                    <div className="mb-6 font-medium text-center text-slate-400">2026 (A/L) - 13 ශ්‍රේණිය</div>
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-20 h-20 mb-3 border rounded-full bg-blue-500/10 border-blue-500/20">
                          <span className="text-4xl font-black text-blue-400">{selectedSchool.grade13 !== undefined ? selectedSchool.grade13 : '-'}</span>
                        </div>
                        <div className="text-sm text-slate-400">සිසුන් සංඛ්‍යාව</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Teachers Information */}
                {selectedSchool.teachers !== undefined && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-row items-center justify-between px-6 py-4 border shadow-inner bg-black/40 rounded-2xl border-white/10"
                  >
                    <div className="flex flex-row items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-emerald-500/10 border-emerald-500/20">
                        <Users className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-medium text-slate-300">ගුරු තොරතුරු</span>
                        <span className="text-[10px] tracking-wider uppercase text-slate-500">Teachers Information</span>
                      </div>
                    </div>
                    <div className={`text-3xl font-black drop-shadow-lg ${selectedSchool.teachers === '-' ? 'text-slate-500' : 'text-emerald-400'}`}>
                      {selectedSchool.teachers}
                    </div>
                  </motion.div>
                )}

              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
