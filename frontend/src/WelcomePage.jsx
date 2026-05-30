// import { Link } from 'react-router-dom';
// import { 
//   FileOutput, Scissors, Minimize2, 
//   FileText, FileSpreadsheet, RotateCw, 
//   Lock, Wand2, Layers, Sparkles
// } from 'lucide-react';

// export default function WelcomePage() {
//   return (
//     <div className="flex flex-col items-center justify-center py-10 animate-fade-in relative overflow-hidden">
      
//       {/* Subtle Background Glow */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

//       {/* --- REIMAGINED UPS LOGO --- */}
//       <div className="mb-8 flex items-center justify-center gap-4 relative z-10">
//         <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-2xl shadow-xl shadow-blue-500/20 ring-1 ring-white/20">
//           <Layers className="text-white w-8 h-8" />
//           <div className="absolute -top-1 -right-1 flex h-4 w-4">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white"></span>
//           </div>
//         </div>
//         <div className="flex flex-col justify-center">
//           <span className="text-4xl font-black tracking-tighter text-slate-900 leading-none drop-shadow-sm">
//             UPS
//           </span>
//           <span className="text-sm font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 uppercase leading-none mt-1.5">
//             Workspace
//           </span>
//         </div>
//       </div>
      
//       <p className="text-lg text-slate-500 max-w-2xl text-center mb-16 relative z-10 leading-relaxed">
//         The ultimate locally-processed utility toolkit. Optimize, split, merge, and annotate your documents with <span className="font-semibold text-slate-700">zero external dependencies.</span>
//       </p>

//       {/* --- SECTION 1: CORE UTILITIES --- */}
//       <div className="w-full max-w-6xl mb-14 relative z-10">
//         <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2 tracking-tight">
//           <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg"><Layers className="w-5 h-5" /></div>
//           Core Utilities
//         </h2>
        
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {/* Merge Card */}
//           <Link to="/merge-pdf" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 transition-all duration-300">
//             <div className="flex items-center gap-4 mb-3">
//               <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><FileOutput className="w-6 h-6" /></div>
//               <h3 className="font-bold text-lg text-slate-800">Merge PDFs</h3>
//             </div>
//             <p className="text-sm text-slate-500 leading-relaxed">Combine multiple individual PDF files into one massive, organized document.</p>
//           </Link>

//           {/* Split Card */}
//           <Link to="/split-pdf" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300">
//             <div className="flex items-center gap-4 mb-3">
//               <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Scissors className="w-6 h-6" /></div>
//               <h3 className="font-bold text-lg text-slate-800">Extract Pages</h3>
//             </div>
//             <p className="text-sm text-slate-500 leading-relaxed">Slice a large PDF and extract only the specific pages you actually need.</p>
//           </Link>

//           {/* Compress Card */}
//           <Link to="/compress-pdf" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-300 transition-all duration-300">
//             <div className="flex items-center gap-4 mb-3">
//               <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors"><Minimize2 className="w-6 h-6" /></div>
//               <h3 className="font-bold text-lg text-slate-800">Optimize Size</h3>
//             </div>
//             <p className="text-sm text-slate-500 leading-relaxed">Reduce file bloat and compress your PDFs without destroying visual quality.</p>
//           </Link>
//         </div>
//       </div>

//       {/* --- SECTION 2: EDITING & PRO FEATURES --- */}
//       <div className="w-full max-w-6xl relative z-10">
//         <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2 tracking-tight">
//           <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg"><Wand2 className="w-5 h-5" /></div>
//           Editing & Conversion
//         </h2>
        
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
//           {/* Edit Card */}
//           <Link to="/edit-pdf" className="col-span-1 lg:col-span-2 group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-amber-300 transition-all duration-300 flex flex-col justify-center">
//             <div className="flex items-center gap-4 mb-2">
//               <div className="bg-amber-50 p-3 rounded-xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors"><Wand2 className="w-6 h-6" /></div>
//               <div>
//                 <h3 className="font-bold text-lg text-slate-800">Annotate & Edit</h3>
//                 <p className="text-sm text-slate-500">Stamp watermarks and text onto pages.</p>
//               </div>
//             </div>
//           </Link>

//           {/* Rotate Card */}
//           <Link to="/rotate-pdf" className="col-span-1 lg:col-span-2 group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-teal-300 transition-all duration-300 flex flex-col justify-center">
//             <div className="flex items-center gap-4 mb-2">
//               <div className="bg-teal-50 p-3 rounded-xl text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors"><RotateCw className="w-6 h-6" /></div>
//               <div>
//                 <h3 className="font-bold text-lg text-slate-800">Rotate & Fix</h3>
//                 <p className="text-sm text-slate-500">Instantly correct upside-down scans.</p>
//               </div>
//             </div>
//           </Link>

//           {/* PRO: PDF to Word */}
//           <div className="col-span-1 lg:col-span-2 group bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200 relative overflow-hidden cursor-not-allowed">
//             <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10"></div>
//             <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wider">
//               <Lock className="w-3 h-3"/> Enterprise
//             </div>
//             <div className="relative z-0 flex items-center gap-4 opacity-60">
//               <div className="bg-slate-200 p-3 rounded-xl text-slate-600"><FileText className="w-6 h-6" /></div>
//               <div>
//                 <h3 className="font-bold text-lg text-slate-800">PDF to Word</h3>
//                 <p className="text-xs text-slate-500 font-medium">Requires Cloud OCR API</p>
//               </div>
//             </div>
//           </div>

//           {/* PRO: Word to PDF */}
//           <div className="col-span-1 lg:col-span-2 group bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200 relative overflow-hidden cursor-not-allowed">
//             <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10"></div>
//             <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wider">
//               <Lock className="w-3 h-3"/> Enterprise
//             </div>
//             <div className="relative z-0 flex items-center gap-4 opacity-60">
//               <div className="bg-slate-200 p-3 rounded-xl text-slate-600"><FileSpreadsheet className="w-6 h-6" /></div>
//               <div>
//                 <h3 className="font-bold text-lg text-slate-800">Excel to PDF</h3>
//                 <p className="text-xs text-slate-500 font-medium">Requires Formatting Engine</p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }









// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Layers, Scissors, Minimize2, Type, RotateCw, 
//   FileText, Lock, FileJson, TableProperties 
// } from 'lucide-react';

// export default function WelcomePage() {
//   return (
//     <div className="space-y-12 pb-20 animate-fade-in">
      
//       {/* --- SECTION 1: Core Utilities --- */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
//             <Layers size={20} />
//           </div>
//           <h2 className="text-xl font-bold text-slate-800 tracking-tight">Core Utilities</h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <ToolCard 
//             to="/merge-pdf" 
//             icon={<Layers className="text-blue-600" />} 
//             title="Merge PDFs" 
//             desc="Combine multiple individual PDF files into one massive, organized document."
//             color="bg-blue-50"
//           />
//           <ToolCard 
//             to="/split-pdf" 
//             icon={<Scissors className="text-purple-600" />} 
//             title="Extract Pages" 
//             desc="Slice a large PDF and extract only the specific pages you actually need."
//             color="bg-purple-50"
//           />
//           <ToolCard 
//             to="/compress-pdf" 
//             icon={<Minimize2 className="text-teal-600" />} 
//             title="Optimize Size" 
//             desc="Reduce file bloat and compress your PDFs without destroying visual quality."
//             color="bg-teal-50"
//           />
//         </div>
//       </section>

//       {/* --- SECTION 2: Editing & Security --- */}
//       <section>
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
//             <Type size={20} />
//           </div>
//           <h2 className="text-xl font-bold text-slate-800 tracking-tight">Editing & Security</h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <ToolCard 
//             to="/edit-pdf" 
//             icon={<Type className="text-amber-600" />} 
//             title="Annotate & Edit" 
//             desc="Stamp watermarks and text onto pages."
//             color="bg-amber-50"
//           />
//           <ToolCard 
//             to="/rotate-pdf" 
//             icon={<RotateCw className="text-indigo-600" />} 
//             title="Rotate & Fix" 
//             desc="Instantly correct upside-down scans."
//             color="bg-indigo-50"
//           />
//           <ToolCard 
//             to="/extract-text" 
//             icon={<FileText className="text-emerald-600" />} 
//             title="Extract Text" 
//             desc="Pull raw text and data from any PDF."
//             color="bg-emerald-50"
//           />
//           <ToolCard 
//             to="/protect-pdf" 
//             icon={<Lock className="text-red-600" />} 
//             title="Protect PDF" 
//             desc="Secure with 128-bit password encryption."
//             color="bg-red-50"
//           />
//         </div>
//       </section>

//       {/* --- SECTION 3: Future Roadmap (Coming Soon) --- */}
//       <section className="opacity-60">
//         <h2 className="text-lg font-bold text-slate-400 mb-6 px-2">Coming Soon</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center gap-5 relative overflow-hidden">
//              <div className="bg-slate-100 p-4 rounded-2xl text-slate-400"><FileJson /></div>
//              <div>
//                 <h3 className="font-bold text-slate-500">PDF to Word</h3>
//                 <p className="text-xs text-slate-400">Advanced OCR mapping in progress...</p>
//              </div>
//              <div className="absolute top-4 right-4 bg-slate-800 text-[10px] text-white px-2 py-1 rounded-full font-bold uppercase tracking-widest">Enterprise</div>
//           </div>
//           <div className="p-6 bg-white border border-slate-100 rounded-3xl flex items-center gap-5 relative overflow-hidden">
//              <div className="bg-slate-100 p-4 rounded-2xl text-slate-400"><TableProperties /></div>
//              <div>
//                 <h3 className="font-bold text-slate-500">Excel to PDF</h3>
//                 <p className="text-xs text-slate-400">Formatting engine under development...</p>
//              </div>
//              <div className="absolute top-4 right-4 bg-slate-800 text-[10px] text-white px-2 py-1 rounded-full font-bold uppercase tracking-widest">Enterprise</div>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }

// // Reuseable Card Component for consistent Hover Effects
// function ToolCard({ to, icon, title, desc, color }) {
//   return (
//     <Link to={to} className="group p-6 bg-white border border-slate-200 rounded-[2rem] transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-2 flex flex-col items-start gap-4">
//       <div className={`${color} p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
//         {React.cloneElement(icon, { size: 28 })}
//       </div>
//       <div className="text-left">
//         <h3 className="text-lg font-black text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{title}</h3>
//         <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
//       </div>
//     </Link>
//   );
// }


import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, Scissors, Minimize2, Type, RotateCw, 
  FileText, Lock, TableProperties, FileImage, FileJson 
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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