import { Link, useLocation } from 'react-router-dom';
import logoUrl from '../assets/logo.jpg';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'ජාතික මට්ටම', path: '/national' },
  { name: 'හිගුරක්ගොඩ කළාපය', path: '/zone' },
  { name: 'පාසල්', path: '/schools' },
  { name: 'හදුනාගත් ගැටළු', path: '/issues' },
  { name: 'විසදුම් යෝජනා', path: '/solutions' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-md border-b border-white/10 shadow-lg z-50 flex items-center px-4 w-full">
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 shrink-0 mr-2 md:mr-8 hover:opacity-80 transition-opacity">
          <img src={logoUrl} alt="NCP Commerce Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border border-primary/50 shadow-[0_0_10px_rgba(56,189,248,0.3)]" />
          <span className="hidden lg:block font-bold text-white tracking-wide whitespace-nowrap">
            Commerce <span className="text-primary">NCP</span>
          </span>
        </Link>
        
        {/* Nav Links */}
        <div className="flex space-x-2 md:space-x-6 overflow-x-auto no-scrollbar w-full items-center justify-start md:justify-end">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap ${isActive
                  ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      </div>
    </nav>
  );
}
