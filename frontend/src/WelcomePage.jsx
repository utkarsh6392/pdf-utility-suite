import { Link } from 'react-router-dom';
import { 
  FileOutput, Scissors, Minimize2, 
  FileText, FileSpreadsheet, RotateCw, 
  Lock, Wand2, Layers, Sparkles
} from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-10 animate-fade-in relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* --- REIMAGINED UPS LOGO --- */}
      <div className="mb-8 flex items-center justify-center gap-4 relative z-10">
        <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-2xl shadow-xl shadow-blue-500/20 ring-1 ring-white/20">
          <Layers className="text-white w-8 h-8" />
          <div className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white"></span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-4xl font-black tracking-tighter text-slate-900 leading-none drop-shadow-sm">
            UPS
          </span>
          <span className="text-sm font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 uppercase leading-none mt-1.5">
            Workspace
          </span>
        </div>
      </div>
      
      <p className="text-lg text-slate-500 max-w-2xl text-center mb-16 relative z-10 leading-relaxed">
        The ultimate locally-processed utility toolkit. Optimize, split, merge, and annotate your documents with <span className="font-semibold text-slate-700">zero external dependencies.</span>
      </p>

      {/* --- SECTION 1: CORE UTILITIES --- */}
      <div className="w-full max-w-6xl mb-14 relative z-10">
        <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2 tracking-tight">
          <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg"><Layers className="w-5 h-5" /></div>
          Core Utilities
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Merge Card */}
          <Link to="/merge-pdf" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 transition-all duration-300">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><FileOutput className="w-6 h-6" /></div>
              <h3 className="font-bold text-lg text-slate-800">Merge PDFs</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">Combine multiple individual PDF files into one massive, organized document.</p>
          </Link>

          {/* Split Card */}
          <Link to="/split-pdf" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Scissors className="w-6 h-6" /></div>
              <h3 className="font-bold text-lg text-slate-800">Extract Pages</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">Slice a large PDF and extract only the specific pages you actually need.</p>
          </Link>

          {/* Compress Card */}
          <Link to="/compress-pdf" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-300 transition-all duration-300">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors"><Minimize2 className="w-6 h-6" /></div>
              <h3 className="font-bold text-lg text-slate-800">Optimize Size</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">Reduce file bloat and compress your PDFs without destroying visual quality.</p>
          </Link>
        </div>
      </div>

      {/* --- SECTION 2: EDITING & PRO FEATURES --- */}
      <div className="w-full max-w-6xl relative z-10">
        <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2 tracking-tight">
          <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg"><Wand2 className="w-5 h-5" /></div>
          Editing & Conversion
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Edit Card */}
          <Link to="/edit-pdf" className="col-span-1 lg:col-span-2 group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-amber-300 transition-all duration-300 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-amber-50 p-3 rounded-xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors"><Wand2 className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">Annotate & Edit</h3>
                <p className="text-sm text-slate-500">Stamp watermarks and text onto pages.</p>
              </div>
            </div>
          </Link>

          {/* Rotate Card */}
          <Link to="/rotate-pdf" className="col-span-1 lg:col-span-2 group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-teal-300 transition-all duration-300 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-teal-50 p-3 rounded-xl text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors"><RotateCw className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">Rotate & Fix</h3>
                <p className="text-sm text-slate-500">Instantly correct upside-down scans.</p>
              </div>
            </div>
          </Link>

          {/* PRO: PDF to Word */}
          <div className="col-span-1 lg:col-span-2 group bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200 relative overflow-hidden cursor-not-allowed">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10"></div>
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wider">
              <Lock className="w-3 h-3"/> Enterprise
            </div>
            <div className="relative z-0 flex items-center gap-4 opacity-60">
              <div className="bg-slate-200 p-3 rounded-xl text-slate-600"><FileText className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">PDF to Word</h3>
                <p className="text-xs text-slate-500 font-medium">Requires Cloud OCR API</p>
              </div>
            </div>
          </div>

          {/* PRO: Word to PDF */}
          <div className="col-span-1 lg:col-span-2 group bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200 relative overflow-hidden cursor-not-allowed">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10"></div>
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wider">
              <Lock className="w-3 h-3"/> Enterprise
            </div>
            <div className="relative z-0 flex items-center gap-4 opacity-60">
              <div className="bg-slate-200 p-3 rounded-xl text-slate-600"><FileSpreadsheet className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">Excel to PDF</h3>
                <p className="text-xs text-slate-500 font-medium">Requires Formatting Engine</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}