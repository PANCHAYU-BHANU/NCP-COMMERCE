import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo.jpg';

const navItems = [
  { name: 'ජාතික මට්ටම', path: '/national' },
  { name: 'හිගුරක්ගොඩ කළාපය', path: '/zone' },
  { name: 'පාසල්', path: '/schools' },
  { name: 'හදුනාගත් ගැටළු', path: '/issues' },
  { name: 'විසදුම් යෝජනා', path: '/solutions' },
];

export default function Home() {
  const videoSectionRef = useRef(null);
  const videoRef = useRef(null);
  const finalSectionRef = useRef(null);
  const [showFinalSection, setShowFinalSection] = useState(false);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const videoSrc = `${import.meta.env.BASE_URL}home-intro.mp4`;

  const tryPlayVideo = useCallback(() => {
    const videoNode = videoRef.current;

    if (!videoNode || showFinalSection) {
      return;
    }

    videoNode.play()
      .then(() => {
        setAutoplayBlocked(false);
      })
      .catch(() => {
        setAutoplayBlocked(true);
      });
  }, [showFinalSection]);

  useEffect(() => {
    const sectionNode = videoSectionRef.current;
    const videoNode = videoRef.current;

    if (!sectionNode || !videoNode) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoInView(entry.isIntersecting);
        if (entry.isIntersecting && !showFinalSection) {
          tryPlayVideo();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(sectionNode);

    return () => {
      observer.disconnect();
    };
  }, [showFinalSection, tryPlayVideo]);

  useEffect(() => {
    if (isVideoInView && !showFinalSection) {
      tryPlayVideo();
    }
  }, [isVideoInView, showFinalSection, tryPlayVideo]);

  const handleVideoEnded = () => {
    setShowFinalSection(true);
  };

  useEffect(() => {
    if (showFinalSection && finalSectionRef.current) {
      finalSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showFinalSection]);

  return (
    <div className="relative w-full bg-background">

      {/* Sticky Initial View: Stays fixed so the map pops up over it */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 z-0">
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)] text-center leading-tight">
          2026 <br className="md:hidden" />ක්‍රියාත්මක වෙමු
        </h1>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center mt-16 opacity-50"
        >
          <span className="mb-3 text-sm tracking-widest uppercase text-slate-400">Scroll Down</span>
          <div className="flex justify-center h-12 p-1 border-2 rounded-full w-7 border-slate-400">
            <div className="w-1.5 h-3 bg-slate-400 rounded-full mt-1" />
          </div>
        </motion.div>
      </div>

      {/* Video section starts on scroll and reveals final section after video ends */}
      <section
        ref={videoSectionRef}
        className="relative min-h-[calc(100vh-4rem)] w-full z-10 bg-background shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden w-full px-4">
          <div className="relative w-full max-w-6xl overflow-hidden border shadow-2xl aspect-video rounded-2xl border-white/10 shadow-black/60 bg-slate-950">
            <video
              ref={videoRef}
              className="object-cover w-full h-full"
              src={videoSrc}
              muted
              playsInline
              preload="metadata"
              controls={autoplayBlocked}
              onEnded={handleVideoEnded}
              onError={() => setShowFinalSection(true)}
            />

            {autoplayBlocked && !showFinalSection && (
              <button
                type="button"
                onClick={tryPlayVideo}
                className="absolute inset-x-0 px-5 py-2 mx-auto border rounded-full bottom-6 w-fit bg-slate-900/80 text-slate-100 border-white/20 backdrop-blur-sm"
              >
                Tap to play video
              </button>
            )}
          </div>

          {!showFinalSection && (
            <div className="absolute px-4 py-2 text-sm -translate-x-1/2 border rounded-full bottom-8 left-1/2 md:text-base text-slate-300 bg-slate-900/70 border-white/10 backdrop-blur-sm">
              Scroll to play video
            </div>
          )}
        </div>
      </section>

      {showFinalSection && (
        <motion.section
          ref={finalSectionRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center z-20 bg-background/90 backdrop-blur-md p-4"
        >
          <h1 className="mb-10 text-5xl font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-r from-accent to-primary drop-shadow-xl">
            උතුරු මැද පළාත
          </h1>

          <div className="flex flex-col items-center mb-16 bg-surface/80 p-10 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(56,189,248,0.15)] backdrop-blur-md">
            <div className="flex items-center justify-center w-32 h-32 mb-6 overflow-hidden border-4 rounded-full shadow-2xl border-surface">
              <img src={logoUrl} alt="Commerce NCP" className="object-cover w-full h-full shadow-inner" />
            </div>
            <h3 className="block mb-2 text-3xl font-extrabold tracking-wide text-white">Commerce NCP</h3>
            <h4 className="mb-3 text-2xl font-bold text-primary">වාණිජ අංශය</h4>
            <p className="max-w-sm text-lg font-medium leading-relaxed text-center text-slate-400">
              උතුරුමැද පළාත් අධ්‍යාපන දෙපාර්තමේන්තුව
            </p>
          </div>

          <div className="flex flex-wrap justify-center max-w-5xl gap-4 md:gap-6">
            {navItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-lg font-bold transition-all duration-300 border shadow-lg bg-surface/50 border-white/10 hover:border-primary/50 hover:bg-primary/10 rounded-2xl text-slate-200 backdrop-blur-sm shadow-black/50"
                >
                  {item.name}
                </motion.button>
              </Link>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
