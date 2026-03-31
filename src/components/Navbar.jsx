import { Link, useLocation } from 'react-router-dom';
import logoUrl from '../assets/logo.jpg';

const navItems = [
  { name: 'Home', path: '/NCP-COMMERCE' },
  { name: 'ජාතික මට්ටම', path: '/national' },
  { name: 'හිගුරක්ගොඩ කළාපය', path: '/zone' },
  { name: 'හිගුරක්ගොඩ පාසල්', path: '/schools' },
  { name: 'දිඹුලාගල කළාපය', path: '/dimbulagala-zone' },
  { name: 'දිඹුලාගල පාසල්', path: '/dimbulagala-schools' },
  { name: 'හදුනාගත් ගැටළු', path: '/issues' },
  { name: 'විසදුම් යෝජනා', path: '/solutions' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center w-full h-16 px-4 border-b shadow-lg bg-surface/90 backdrop-blur-md border-white/10">
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
        
        {/* Logo Section */}
        <Link to="/NCP-COMMERCE" className="flex items-center mr-2 space-x-3 transition-opacity shrink-0 md:mr-8 hover:opacity-80">
          <img src={logoUrl} alt="NCP Commerce Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border border-primary/50 shadow-[0_0_10px_rgba(56,189,248,0.3)]" />
          <span className="hidden font-bold tracking-wide text-white lg:block whitespace-nowrap">
            Commerce <span className="text-primary">NCP</span>
          </span>
        </Link>
        
        {/* Nav Links */}
        <div className="flex items-center justify-start w-full space-x-2 overflow-x-auto md:space-x-6 no-scrollbar md:justify-end">
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
