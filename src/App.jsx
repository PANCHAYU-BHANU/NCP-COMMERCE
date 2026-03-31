import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NationalLevel from './pages/NationalLevel';
import Zone from './pages/Zone';
import Schools from './pages/Schools';
import DimbulagalaZone from './pages/DimbulagalaZone';
import DimbulagalaSchools from './pages/DimbulagalaSchools';
import Issues from './pages/Issues';
import Solutions from './pages/Solutions';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen pt-16 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/NCP-COMMERCE" element={<Home />} />
            <Route path="/national" element={<NationalLevel />} />
            <Route path="/zone" element={<Zone />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/dimbulagala-zone" element={<DimbulagalaZone />} />
            <Route path="/dimbulagala-schools" element={<DimbulagalaSchools />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/solutions" element={<Solutions />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
