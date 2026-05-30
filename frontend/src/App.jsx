import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import all your tool components
import WelcomePage from './WelcomePage';
import ImageToPdf from './ImageToPdf';
import MergePdf from './MergePdf';
import SplitPdf from './SplitPdf';
import CompressPdf from './CompressPdf';
import EditPdf from './EditPdf';
import RotatePdf from './RotatePdf';
import ExtractText from './ExtractText';
import ProtectPdf from './ProtectPdf';
import PdfToCsv from './PdfToCsv';
import PdfToWord from './PdfToWord'; // Naya PDF to Word import

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
        
        {/* UPS Custom Navbar */}
        <nav className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center hover:opacity-80 transition">
              <div className="bg-blue-600 text-white px-2 py-1 rounded-l-md font-black text-xl tracking-tighter">UPS</div>
              <div className="bg-slate-800 text-white px-2 py-1 rounded-r-md font-bold text-xl tracking-widest">DOCS</div>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex gap-4 font-medium text-sm text-slate-600 items-center">
              <Link to="/image-to-pdf" className="hover:text-blue-600 transition">Image to PDF</Link>
              <Link to="/merge-pdf" className="hover:text-blue-600 transition">Merge</Link>
              <Link to="/split-pdf" className="hover:text-blue-600 transition">Split</Link>
              <Link to="/compress-pdf" className="hover:text-blue-600 transition">Compress</Link>
              <Link to="/edit-pdf" className="hover:text-blue-600 transition">Edit</Link>
              <Link to="/rotate-pdf" className="hover:text-blue-600 transition">Rotate</Link>
              <Link to="/extract-text" className="hover:text-blue-600 transition">Extract Text</Link>
              <Link to="/pdf-to-csv" className="hover:text-green-600 transition">PDF to CSV</Link>
              <Link to="/pdf-to-word" className="hover:text-blue-700 transition font-bold">PDF to Word</Link>
              
              <Link to="/protect-pdf" className="hover:text-red-600 font-bold transition flex items-center gap-1 border-l-2 border-slate-200 pl-4 ml-1">
                Protect 🔒
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content Routing */}
        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/merge-pdf" element={<MergePdf />} />
            <Route path="/split-pdf" element={<SplitPdf />} />
            <Route path="/compress-pdf" element={<CompressPdf />} />
            <Route path="/edit-pdf" element={<EditPdf />} />
            <Route path="/rotate-pdf" element={<RotatePdf />} />
            <Route path="/extract-text" element={<ExtractText />} />
            <Route path="/protect-pdf" element={<ProtectPdf />} />
            <Route path="/pdf-to-csv" element={<PdfToCsv />} />
            <Route path="/pdf-to-word" element={<PdfToWord />} /> {/* Naya Route */}
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;