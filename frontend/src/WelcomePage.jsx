import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, Scissors, Minimize2, Type, RotateCw, 
  FileText, Lock, TableProperties, FileImage, FileJson, Unlock 
} from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="space-y-12 pb-20 animate-fade-in max-w-6xl mx-auto">
      
      {/* --- SECTION 1: Core Utilities --- */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <Layers size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Core Utilities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ToolCard 
            to="/merge-pdf" 
            icon={<Layers className="text-blue-600" />} 
            title="Merge PDFs" 
            desc="Combine multiple individual PDF files into one massive, organized document."
            color="bg-blue-50"
          />
          <ToolCard 
            to="/split-pdf" 
            icon={<Scissors className="text-purple-600" />} 
            title="Extract Pages" 
            desc="Slice a large PDF and extract only the specific pages you actually need."
            color="bg-purple-50"
          />
          <ToolCard 
            to="/compress-pdf" 
            icon={<Minimize2 className="text-teal-600" />} 
            title="Optimize Size" 
            desc="Reduce file bloat and compress your PDFs without destroying visual quality."
            color="bg-teal-50"
          />
          <ToolCard 
            to="/image-to-pdf" 
            icon={<FileImage className="text-sky-600" />} 
            title="Images to PDF" 
            desc="Convert your JPGs or PNGs into a structured PDF document."
            color="bg-sky-50"
          />
        </div>
      </section>

      {/* --- SECTION 2: Editing & Security --- */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
            <Lock size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Editing & Security</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ToolCard 
            to="/edit-pdf" 
            icon={<Type className="text-amber-600" />} 
            title="Annotate & Edit" 
            desc="Stamp text and watermarks onto your specific PDF pages."
            color="bg-amber-50"
          />
          <ToolCard 
            to="/rotate-pdf" 
            icon={<RotateCw className="text-indigo-600" />} 
            title="Rotate & Fix" 
            desc="Instantly correct upside-down or misaligned scanned documents."
            color="bg-indigo-50"
          />
          <ToolCard 
            to="/protect-pdf" 
            icon={<Lock className="text-red-600" />} 
            title="Protect PDF" 
            desc="Secure confidential files with 128-bit password encryption."
            color="bg-red-50"
          />
          <ToolCard 
            to="/unlock-pdf" 
            icon={<Unlock className="text-emerald-600" />} 
            title="Unlock PDF" 
            desc="Permanently remove passwords from your locked documents."
            color="bg-emerald-50"
          />
        </div>
      </section>

      {/* --- SECTION 3: Data Extraction & Conversion --- */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
            <TableProperties size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Data Extraction & Conversion</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ToolCard 
            to="/extract-text" 
            icon={<FileText className="text-emerald-600" />} 
            title="Extract Text" 
            desc="Pull raw text and copyable data straight from any PDF document."
            color="bg-emerald-50"
          />
          <ToolCard 
            to="/pdf-to-csv" 
            icon={<TableProperties className="text-green-600" />} 
            title="PDF to CSV (Excel)" 
            desc="Parse and convert structured PDF tables into CSV data streams."
            color="bg-green-50"
          />
          <ToolCard 
            to="/pdf-to-word" 
            icon={<FileJson className="text-blue-700" />} 
            title="PDF to Word" 
            desc="Map PDF data into an editable Microsoft Word document (.doc)."
            color="bg-blue-100"
          />
        </div>
      </section>

    </div>
  );
}

// Reuseable Card Component for consistent Hover Effects
function ToolCard({ to, icon, title, desc, color }) {
  return (
    <Link to={to} className="group p-6 bg-white border border-slate-200 rounded-[2rem] transition-all duration-300 hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1.5 flex flex-col items-start gap-4">
      <div className={`${color} p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <div className="text-left">
        <h3 className="text-lg font-black text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
}