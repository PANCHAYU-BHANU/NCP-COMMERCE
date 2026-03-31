import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, UserPlus, Save, Trash2, Edit, Calculator, CheckCircle2, FileText, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function StudentManagement() {
  const { user } = useAuth();

  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [isRegistering, setIsRegistering] = useState(false);
  const [activeModalStudent, setActiveModalStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('UNIT'); // UNIT, TERM, AL

  const [message, setMessage] = useState(null);
  const [historicalResults, setHistoricalResults] = useState([]);

  const fetchHistoricalResults = async () => {
    if (!activeModalStudent) return;
    let endpoint = activeTab.toLowerCase();
    try {
      const resp = await fetch(`http://localhost:8082/api/core/results/student/${activeModalStudent.id}/${endpoint}`);
      if (resp.ok) setHistoricalResults(await resp.json());
    } catch (e) { }
  };

  useEffect(() => {
    fetchHistoricalResults();
  }, [activeModalStudent, activeTab]);

  const handleDeleteResult = async (id, type) => {
    if (!window.confirm("Permanently destroy this result? This will rewrite public calculations.")) return;
    try {
      await fetch(`http://localhost:8082/api/core/results/${type.toLowerCase()}/${id}`, { method: 'DELETE' });
      fetchHistoricalResults();
      if (type === 'AL') fetchStudents(user.schoolId);
    } catch (e) { }
  };

  // Registration Form
  const [formData, setFormData] = useState({
    name: '',
    alYear: '2025',
    gender: 'BOY'
  });

  // Results Form
  const [resultData, setResultData] = useState({
    unitName: '',
    term: 1,
    subjectId: '',
    marks: '',
    alResultCode: 'S'
  });
  const [zScoreValue, setZScoreValue] = useState('');

  const [alBulkForm, setAlBulkForm] = useState({
    sub1: '', grade1: 'S',
    sub2: '', grade2: 'S',
    sub3: '', grade3: 'S',
    zscore: ''
  });

  // "Mulu Lakunu" Local Cache Logic
  const [termMarks, setTermMarks] = useState({});

  useEffect(() => {
    if (user && user.schoolId) {
      fetchStudents(user.schoolId);
    }
    fetchSubjects();
  }, [user]);

  const fetchStudents = async (schoolId) => {
    try {
      const resp = await fetch(`http://localhost:8082/api/core/students/school/${schoolId}`);
      if (resp.ok) setStudents(await resp.json());
    } catch (e) {
      console.warn("Could not load students");
    }
  };

  const fetchSubjects = async () => {
    try {
      const resp = await fetch('http://localhost:8082/api/core/subjects');
      if (resp.ok) setSubjects(await resp.json());
    } catch (e) {
      console.warn("Could not load subjects");
    }
  };

  const handleRegisterStudent = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        alYear: formData.alYear,
        gender: formData.gender,
        schoolId: user.schoolId
      };

      const resp = await fetch('http://localhost:8082/api/core/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (resp.ok) {
        setMessage("Student Registered!");
        setIsRegistering(false);
        setFormData({ name: '', alYear: '2026', gender: 'BOY' });
        fetchStudents(user.schoolId);
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (e) { alert("Registration failed"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student permanently?")) return;
    try {
      await fetch(`http://localhost:8082/api/core/students/${id}`, { method: 'DELETE' });
      fetchStudents(user.schoolId);
    } catch (e) { }
  };

  // --------------------------------------------------------------------------
  // Results API Submissions
  // --------------------------------------------------------------------------

  const handleTermMarkInput = (subjId, val) => {
    setTermMarks(prev => ({ ...prev, [subjId]: parseInt(val) || 0 }));
  };

  const calculateMuluLakunu = () => {
    return Object.values(termMarks).reduce((acc, curr) => acc + curr, 0);
  };

  const submitTermMarks = async () => {
    let successCount = 0;
    for (const [subjId, mrk] of Object.entries(termMarks)) {
      if (mrk > 0) {
        const payload = {
          studentId: activeModalStudent.id,
          subjectId: parseInt(subjId),
          term: resultData.term,
          marks: mrk
        };
        try {
          const resp = await fetch('http://localhost:8082/api/core/results/term', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
          });
          if (resp.ok) successCount++;
        } catch (e) { }
      }
    }
    alert(`Successfully saved ${successCount} Term Records! Mulu Lakunu calculated.`);
    fetchHistoricalResults();
    setTermMarks({}); // Reset
  };

  const submitSingleResult = async (type) => {
    let endpoint = type === 'UNIT' ? 'unit' : 'al';
    let payload = {
      studentId: activeModalStudent.id,
      subjectId: parseInt(resultData.subjectId),
      marks: type === 'UNIT' ? parseInt(resultData.marks) : 0,
      unitName: type === 'UNIT' ? resultData.unitName : undefined,
      result: type === 'AL' ? resultData.alResultCode : undefined
    };

    try {
      const resp = await fetch(`http://localhost:8082/api/core/results/${endpoint}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (resp.ok) {
        alert('Record injected successfully!');
        fetchHistoricalResults();
        setResultData(prev => ({ ...prev, marks: '', unitName: '', subjectId: '' }));
      } else {
        alert('Failed to save score.');
      }
    } catch (err) { alert('API Error'); }
  };

  const handleUpdateZScore = async () => {
    if (!zScoreValue) return;
    try {
      const resp = await fetch(`http://localhost:8082/api/core/students/${activeModalStudent.id}/zscore`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ zscore: parseFloat(zScoreValue) })
      });
      if (resp.ok) {
        alert('Z-Score Synchronized into Database Framework');
        fetchStudents(user.schoolId);
      }
    } catch (e) { }
  };

  const submitBulkAL = async () => {
    if (!alBulkForm.sub1 || !alBulkForm.sub2 || !alBulkForm.sub3) {
      alert("Verification Error: Exactly 3 A/L Subjects are mathematically required.");
      return;
    }
    if (new Set([alBulkForm.sub1, alBulkForm.sub2, alBulkForm.sub3]).size < 3) {
      alert("Constraint Error: Distinct unique subjects must be mapped. Duplicates found.");
      return;
    }

    const payload1 = { studentId: activeModalStudent.id, subjectId: parseInt(alBulkForm.sub1), result: alBulkForm.grade1 };
    const payload2 = { studentId: activeModalStudent.id, subjectId: parseInt(alBulkForm.sub2), result: alBulkForm.grade2 };
    const payload3 = { studentId: activeModalStudent.id, subjectId: parseInt(alBulkForm.sub3), result: alBulkForm.grade3 };

    try {
      await Promise.all([
        fetch('http://localhost:8082/api/core/results/al', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload1) }),
        fetch('http://localhost:8082/api/core/results/al', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload2) }),
        fetch('http://localhost:8082/api/core/results/al', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload3) })
      ]);

      if (alBulkForm.zscore && alBulkForm.zscore.trim() !== '') {
        await fetch(`http://localhost:8082/api/core/students/${activeModalStudent.id}/zscore`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ zscore: parseFloat(alBulkForm.zscore) })
        });
      }

      alert("Bulk Extraction Sequence Successfully Injected into Infrastructure!");
      setAlBulkForm({ sub1: '', grade1: 'S', sub2: '', grade2: 'S', sub3: '', grade3: 'S', zscore: '' });
      fetchHistoricalResults();
      fetchStudents(user.schoolId);
    } catch (e) { alert("Bulk Submission Fatal Hook"); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3"><GraduationCap className="w-6 h-6 text-indigo-400" /> Student Gradebook</h2>
          <p className="text-slate-400 mt-1">Manage AL Roster and Sync Raw Scores natively into the Presentation Analytics</p>
        </div>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
        >
          <UserPlus className="w-5 h-5" /> <span>Add Student</span>
        </button>
      </div>

      {message && <div className="p-4 bg-emerald-500/20 text-emerald-400 font-bold rounded-xl border border-emerald-500/30">{message}</div>}

      {/* Registration Form */}
      <AnimatePresence>
        {isRegistering && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 overflow-hidden">
            <form onSubmit={handleRegisterStudent} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs text-slate-400 font-bold uppercase">Full Legal Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-bold uppercase">A/L Batch Year</label>
                <select value={formData.alYear} onChange={e => setFormData({ ...formData, alYear: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none">
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-bold uppercase">Biological Gender</label>
                <select value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none">
                  <option value="BOY">Male (Boy)</option>
                  <option value="GIRL">Female (Girl)</option>
                </select>
              </div>
              <div className="md:col-span-4 mt-2">
                <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-black tracking-widest uppercase transition-all shadow-emerald-500/20 shadow-lg">Save Student Record</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Roster Table */}
      <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-black/60 text-slate-500 font-black tracking-widest uppercase border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Index</th>
              <th className="px-6 py-4">Student Identity</th>
              <th className="px-6 py-4">A/L Batch</th>
              <th className="px-6 py-4">Demographic</th>
              <th className="px-6 py-4 text-right">Academic Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {students.map((std) => (
              <tr key={std.id} className="hover:bg-white/5">
                <td className="px-6 py-4 font-mono text-xs opacity-50">#{std.id}</td>
                <td className="px-6 py-4 font-bold text-white">{std.name}</td>
                <td className="px-6 py-4">
                  <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded-md text-xs font-black">{std.alYear}</span>
                </td>
                <td className="px-6 py-4">{std.gender === 'BOY' ? 'Male' : 'Female'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button onClick={() => {
                      setActiveModalStudent(std);
                      setZScoreValue(std.zscore ? std.zscore : '');
                      const isPostAL = parseInt(std.alYear) < new Date().getFullYear();
                      setActiveTab(isPostAL ? 'AL' : 'TERM');
                    }} className="px-4 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/20 text-xs font-bold flex items-center gap-2 transition-colors">
                      <Calculator className="w-3.5 h-3.5" /> Manage Results
                    </button>
                    <button onClick={() => handleDelete(std.id)} className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/10"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500">Your school roster is absolutely empty. Add students to begin tracking grades.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Grade Entry Modal (Results) */}
      <AnimatePresence>
        {activeModalStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-slate-900 border border-white/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">

              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40 sticky top-0 z-10 backdrop-blur-md">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-400" /> Academic Entry Portal</h3>
                  <p className="text-slate-400 text-sm mt-1">Applying test scores natively for <span className="text-emerald-400 font-bold">{activeModalStudent.name}</span></p>
                </div>
                <button onClick={() => setActiveModalStudent(null)} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">Cancel</button>
              </div>

              {/* Tabs */}
              <div className="flex w-full border-b border-white/10 bg-black/20">
                {parseInt(activeModalStudent.alYear) >= new Date().getFullYear() && (
                  <>
                    <button onClick={() => setActiveTab('TERM')} className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'TERM' ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/10' : 'text-slate-500 hover:text-white'}`}>Wara Parikshana</button>
                    <button onClick={() => setActiveTab('UNIT')} className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'UNIT' ? 'text-cyan-400 border-b-2 border-cyan-500 bg-cyan-500/10' : 'text-slate-500 hover:text-white'}`}>Ekaka Parikshana</button>
                  </>
                )}
                {parseInt(activeModalStudent.alYear) < new Date().getFullYear() && (
                  <button onClick={() => setActiveTab('AL')} className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'AL' ? 'text-rose-400 border-b-2 border-rose-500 bg-rose-500/10' : 'text-slate-500 hover:text-white'}`}>A/L Exams</button>
                )}
              </div>

              {/* Dynamic Content */}
              <div className="p-6">

                {activeTab === 'TERM' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-between">
                      <span className="text-indigo-200 text-sm font-medium">Select Term Cycle:</span>
                      <select value={resultData.term} onChange={e => setResultData({ ...resultData, term: parseInt(e.target.value) })} className="bg-indigo-950 border border-indigo-500/50 text-indigo-300 rounded-lg px-3 py-1 outline-none font-bold">
                        <option value="1">Term 1</option><option value="2">Term 2</option><option value="3">Term 3</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      {subjects.map(subj => (
                        <div key={subj.id} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                          <span className="text-slate-300 font-bold">{subj.name}</span>
                          <input type="number" placeholder="0 - 100" onChange={(e) => handleTermMarkInput(subj.id, e.target.value)} className="w-24 bg-slate-800 border border-white/10 rounded-lg px-3 py-1.5 text-center text-white font-mono outline-none focus:border-indigo-500" />
                        </div>
                      ))}
                    </div>

                    {/* MULU LAKUNU CALCULATION */}
                    <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 rounded-2xl mt-4">
                      <div className="flex items-center gap-3">
                        <Activity className="w-6 h-6 text-emerald-400" />
                        <span className="text-emerald-100 font-black tracking-widest uppercase">Mulu Lakunu (Total)</span>
                      </div>
                      <span className="text-3xl font-black text-emerald-400 font-mono drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">{calculateMuluLakunu()}</span>
                    </div>

                    <button onClick={submitTermMarks} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-bold transition-all shadow-lg flex justify-center items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Commit Term Grades to SQL</button>

                    {/* Historical Term Table Grouped by Mulu Lakunu */}
                    <div className="mt-8 border-t border-white/10 pt-6">
                      <h4 className="text-sm font-bold text-white mb-4">Historical Wara Parikshana Records</h4>
                      {historicalResults.length === 0 ? <p className="text-xs text-slate-500 italic">No Term grades recorded</p> : (
                        [1, 2, 3].map(t => {
                          const termRecords = historicalResults.filter(r => r.term === t);
                          if (termRecords.length === 0) return null;
                          const termMuluLakunu = termRecords.reduce((acc, curr) => acc + curr.marks, 0);

                          return (
                            <div key={t} className="mb-6">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-indigo-400 font-bold text-xs uppercase tracking-wider">Term {t} Cycle</span>
                                <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Mulu Lakunu: {termMuluLakunu}</span>
                              </div>
                              {termRecords.map(r => (
                                <div key={r.id} className="flex items-center justify-between p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-lg mb-2">
                                  <div><span className="text-indigo-300 font-bold">{r.subjectName}</span></div>
                                  <div className="flex items-center gap-4">
                                    <span className="text-white font-mono font-bold text-lg">{r.marks}</span>
                                    <button onClick={() => handleDeleteResult(r.id, 'TERM')} className="text-rose-400 hover:text-rose-300 p-1.5 bg-rose-500/10 rounded border border-rose-500/20"><Trash2 className="w-3.5 h-3.5" /></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'UNIT' && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 font-bold uppercase">Target Subject</label>
                      <select value={resultData.subjectId} onChange={e => setResultData({ ...resultData, subjectId: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none">
                        <option value="" disabled>Select Subject...</option>
                        {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400 font-bold uppercase">Syllabus Section / Unit</label>
                        <input type="text" placeholder="e.g. Unit 4 - Economics" value={resultData.unitName} onChange={e => setResultData({ ...resultData, unitName: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400 font-bold uppercase">Raw Marks (0-100)</label>
                        <input type="number" placeholder="85" value={resultData.marks} onChange={e => setResultData({ ...resultData, marks: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-center outline-none" />
                      </div>
                    </div>
                    <button onClick={() => submitSingleResult('UNIT')} disabled={!resultData.subjectId || !resultData.marks || !resultData.unitName} className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-bold transition-all">Upload Single Score</button>

                    {/* Historical Unit Table */}
                    <div className="mt-8 border-t border-white/10 pt-6">
                      <h4 className="text-sm font-bold text-white mb-4">Historical Ekaka Parikshana Records</h4>
                      {historicalResults.length === 0 ? <p className="text-xs text-slate-500 italic">No Unit grades recorded</p> : historicalResults.map(r => (
                        <div key={r.id} className="flex items-center justify-between p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-lg mb-2">
                          <div><span className="text-cyan-300 font-bold">{r.subjectName}</span> <span className="text-slate-500 text-xs ml-2">({r.unitName})</span></div>
                          <div className="flex items-center gap-4">
                            <span className="text-white font-mono font-bold text-lg">{r.marks}</span>
                            <button onClick={() => handleDeleteResult(r.id, 'UNIT')} className="text-rose-400 hover:text-rose-300 p-1.5 bg-rose-500/10 rounded border border-rose-500/20"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'AL' && (
                  <div className="space-y-5">
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-between">
                      <p className="text-xs text-rose-300 leading-relaxed font-medium">Entering physical A/L Grades below will restructure the Pass/Fail algebraic algorithm exposed on the public front-page Dashboard. You MUST provide exactly 3 distinct core subjects per formal protocols. Z-Score is universally optional pending manual release arrays.</p>
                    </div>

                    {historicalResults.length >= 3 ? (
                      <div className="p-12 text-center text-rose-400 font-bold border border-rose-500/20 bg-rose-950/20 rounded-xl tracking-widest uppercase text-sm">
                        Student Node possesses locked capacity of 3 finalized Core AL Records. Overwrite restricted.
                      </div>
                    ) : (
                      <div className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-6">

                        {/* Subject 1 */}
                        <div className="grid grid-cols-5 gap-4 items-center">
                          <div className="col-span-3 space-y-1">
                            <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Target Subject 1</label>
                            <select value={alBulkForm.sub1} onChange={e => setAlBulkForm({ ...alBulkForm, sub1: e.target.value })} className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none">
                              <option value="">Select subject...</option>
                              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                          </div>
                          <div className="col-span-2 space-y-1">
                            <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Final Grade</label>
                            <select value={alBulkForm.grade1} onChange={e => setAlBulkForm({ ...alBulkForm, grade1: e.target.value })} className="w-full bg-rose-950/50 border border-white/20 rounded-lg px-3 py-2.5 text-rose-400 font-bold text-center outline-none">
                              <option value="A">Distinction (A)</option><option value="B">Very Good (B)</option><option value="C">Credit (C)</option>
                              <option value="S">Simple Pass (S)</option><option value="F">Failure (F)</option><option value="W">Withheld (W)</option>
                            </select>
                          </div>
                        </div>

                        {/* Subject 2 */}
                        <div className="grid grid-cols-5 gap-4 items-center border-t border-white/5 pt-4">
                          <div className="col-span-3 space-y-1">
                            <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Target Subject 2</label>
                            <select value={alBulkForm.sub2} onChange={e => setAlBulkForm({ ...alBulkForm, sub2: e.target.value })} className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none">
                              <option value="">Select subject...</option>
                              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                          </div>
                          <div className="col-span-2 space-y-1">
                            <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Final Grade</label>
                            <select value={alBulkForm.grade2} onChange={e => setAlBulkForm({ ...alBulkForm, grade2: e.target.value })} className="w-full bg-rose-950/50 border border-white/20 rounded-lg px-3 py-2.5 text-rose-400 font-bold text-center outline-none">
                              <option value="A">Distinction (A)</option><option value="B">Very Good (B)</option><option value="C">Credit (C)</option>
                              <option value="S">Simple Pass (S)</option><option value="F">Failure (F)</option><option value="W">Withheld (W)</option>
                            </select>
                          </div>
                        </div>

                        {/* Subject 3 */}
                        <div className="grid grid-cols-5 gap-4 items-center border-t border-white/5 pt-4">
                          <div className="col-span-3 space-y-1">
                            <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Target Subject 3</label>
                            <select value={alBulkForm.sub3} onChange={e => setAlBulkForm({ ...alBulkForm, sub3: e.target.value })} className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none">
                              <option value="">Select subject...</option>
                              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                          </div>
                          <div className="col-span-2 space-y-1">
                            <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Final Grade</label>
                            <select value={alBulkForm.grade3} onChange={e => setAlBulkForm({ ...alBulkForm, grade3: e.target.value })} className="w-full bg-rose-950/50 border border-white/20 rounded-lg px-3 py-2.5 text-rose-400 font-bold text-center outline-none">
                              <option value="A">Distinction (A)</option><option value="B">Very Good (B)</option><option value="C">Credit (C)</option>
                              <option value="S">Simple Pass (S)</option><option value="F">Failure (F)</option><option value="W">Withheld (W)</option>
                            </select>
                          </div>
                        </div>

                        {/* Target Z-Score */}
                        <div className="pt-6 border-t border-white/5">
                          <label className="text-xs text-emerald-400 font-bold uppercase tracking-widest block mb-2">National Z-Score Mapping (Optional)</label>
                          <input type="number" step="0.0001" placeholder="e.g. 1.8456 (Leave blank if missing)" value={alBulkForm.zscore} onChange={e => setAlBulkForm({ ...alBulkForm, zscore: e.target.value })} className="w-full bg-emerald-950/10 border border-emerald-500/30 rounded-lg px-4 py-3 text-white font-mono outline-none focus:border-emerald-500" />
                        </div>

                        <button onClick={submitBulkAL} className="w-full py-4 mt-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl text-white font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)]">Finalize & Export Synchronized Bulk Bundle</button>
                      </div>
                    )}

                    {/* Historical AL Table */}
                    <div className="mt-8 border-t border-white/10 pt-6">
                      <h4 className="text-sm font-bold text-white mb-4">Historical A/L Validations</h4>
                      {historicalResults.length === 0 ? <p className="text-xs text-slate-500 italic">No A/L outcomes recorded yet</p> : historicalResults.map(r => (
                        <div key={r.id} className="flex items-center justify-between p-3 bg-rose-500/5 border border-rose-500/10 rounded-lg mb-2">
                          <div><span className="text-rose-300 font-bold">{r.subjectName}</span> <span className="text-slate-500 text-xs ml-2">(Index Locked)</span></div>
                          <div className="flex items-center gap-4">
                            <span className="text-emerald-400 font-black text-xl">{r.result}</span>
                            <button onClick={() => handleDeleteResult(r.id, 'AL')} className="text-rose-400 hover:text-rose-300 p-1.5 bg-rose-500/10 rounded border border-rose-500/20"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
