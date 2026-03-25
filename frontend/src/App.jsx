import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import all your tool components
import WelcomePage from './WelcomePage';
import ImageToPdf from './ImageToPdf';
import MergePdf from './MergePdf';
import SplitPdf from './SplitPdf';
import CompressPdf from './CompressPdf';
import EditPdf from './EditPdf';
import RotatePdf from './RotatePdf';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
        
        {/* UPS Custom Navbar */}
        <nav className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center hover:opacity-80 transition">
              <div className="bg-blue-600 text-white px-2 py-1 rounded-l-md font-black text-xl tracking-tighter">UPS</div>
              <div className="bg-slate-800 text-white px-2 py-1 rounded-r-md font-bold text-xl tracking-widest">DOCS</div>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-6 font-medium text-sm text-slate-600">
              <Link to="/image-to-pdf" className="hover:text-blue-600 transition">Images to PDF</Link>
              <Link to="/merge-pdf" className="hover:text-blue-600 transition">Merge</Link>
              <Link to="/split-pdf" className="hover:text-blue-600 transition">Split</Link>
              <Link to="/compress-pdf" className="hover:text-blue-600 transition">Compress</Link>
              <Link to="/edit-pdf" className="hover:text-blue-600 transition">Edit</Link>
            </div>
          </div>
        </nav>

        {/* Page Content Routing */}
        <main className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/merge-pdf" element={<MergePdf />} />
            <Route path="/split-pdf" element={<SplitPdf />} />
            <Route path="/compress-pdf" element={<CompressPdf />} />
            <Route path="/edit-pdf" element={<EditPdf />} />
            <Route path="/rotate-pdf" element={<RotatePdf />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;