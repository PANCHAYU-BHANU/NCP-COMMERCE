import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo.jpg';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const navItems = [
  { name: 'ජාතික මට්ටම', path: '/national' },
  { name: 'හිගුරක්ගොඩ කළාපය', path: '/zone' },
  { name: 'පාසල්', path: '/schools' },
  { name: 'හදුනාගත් ගැටළු', path: '/issues' },
  { name: 'විසදුම් යෝජනා', path: '/solutions' },
];

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map Animation Sequence mapping scroll progress (0 - 1.0)
  // [0] World -> [0.45] Sri Lanka -> [1.0] Hingurakgoda, Polonnaruwa
  const targetZoom = useTransform(scrollYProgress, [0, 0.45, 1], [0.6, 6.5, 10.5]);
  const targetLat = useTransform(scrollYProgress, [0, 0.45, 1], [25.36385, 7.8731, 8.0496]);
  const targetLng = useTransform(scrollYProgress, [0, 0.45, 1], [26.06358, 80.7718, 80.9701]);

  const [viewState, setViewState] = useState({
    longitude: 26.06358,
    latitude: 25.36385,
    zoom: 0.6
  });

  // Listen to the targetZoom transform changes which correlate directly to scroll progress
  useMotionValueEvent(targetZoom, "change", (latest) => {
    setViewState({
      longitude: targetLng.get(),
      latitude: targetLat.get(),
      zoom: latest
    });
  });

  // New Topic & Buttons Sequence (0.85 - 1.0)
  const finalOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.85, 1], [50, 0]);

  return (
    <div className="w-full bg-background relative">

      {/* Sticky Initial View: Stays fixed so the map pops up over it */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 z-0">
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)] text-center leading-tight">
          2026 <br className="md:hidden" />ක්‍රියාත්මක වෙමු
        </h1>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-16 opacity-50 flex flex-col items-center"
        >
          <span className="text-slate-400 mb-3 tracking-widest text-sm uppercase">Scroll Down</span>
          <div className="w-7 h-12 border-2 border-slate-400 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-3 bg-slate-400 rounded-full mt-1" />
          </div>
        </motion.div>
      </div>

      {/* Map Section slides up OVER the initial view */}
      <div ref={containerRef} className="relative min-h-[400vh] w-full z-10 bg-background shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden w-full">

          <div className="absolute inset-0 w-full h-full z-10 transition-opacity duration-500">
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              mapStyle="https://api.maptiler.com/maps/topo-v4/style.json?key=J0F7TKrMgIrdXNixtJo8"
              interactive={false} /* Disabled manual zooming, map controlled entirely by scrolling */
            />
            {/* Abstract dark overlay to blend the map slightly with the dark theme */}
            <div className="absolute inset-0 bg-slate-900/40 pointer-events-none" />
          </div>

          {/* Stage 3: Final Topic & Buttons */}
          <motion.div
            style={{ opacity: finalOpacity, y: finalY }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-background/70 backdrop-blur-md p-4 pointer-events-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary mb-10 text-center drop-shadow-xl">
              උතුරු මැද පළාත
            </h1>

            {/* Logo Section */}
            <div className="flex flex-col items-center mb-16 bg-surface/80 p-10 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(56,189,248,0.15)] backdrop-blur-md">
              <div className="w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-2xl border-4 border-surface overflow-hidden">
                <img src={logoUrl} alt="Commerce NCP" className="w-full h-full object-cover shadow-inner" />
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-2 tracking-wide block">Commerce NCP</h3>
              <h4 className="text-2xl font-bold text-primary mb-3">වාණිජ අංශය</h4>
              <p className="text-slate-400 text-center max-w-sm text-lg font-medium leading-relaxed">
                උතුරුමැද පළාත් අධ්‍යාපන දෙපාර්තමේන්තුව
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl">
              {navItems.map((item, index) => (
                <Link key={index} to={item.path}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-surface/50 border border-white/10 hover:border-primary/50 hover:bg-primary/10 rounded-2xl text-slate-200 font-bold transition-all duration-300 shadow-lg text-lg backdrop-blur-sm shadow-black/50"
                  >
                    {item.name}
                  </motion.button>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
