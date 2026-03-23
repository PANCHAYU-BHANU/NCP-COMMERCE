import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NationalLevel from './pages/NationalLevel';
import Zone from './pages/Zone';
import Schools from './pages/Schools';
import Issues from './pages/Issues';
import Solutions from './pages/Solutions';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-16 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/national" element={<NationalLevel />} />
            <Route path="/zone" element={<Zone />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/solutions" element={<Solutions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
