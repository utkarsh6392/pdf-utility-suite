import { useState } from 'react';
import axios from 'axios';
import { Layers, UploadCloud, Loader2, ArrowLeft, CheckCircle2, Share2, Download, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    setResultBlob(null);
    setErrorMessage('');
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setErrorMessage("Please select at least 2 PDF files to merge.");
      return;
    }
    setLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));

    try {
      const response = await axios.post('https://ups-docs-backend.onrender.com/api/pdf/merge', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      setResultBlob(blob);
    } catch (e) {
      setErrorMessage("Merging failed. Check backend service layers.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = () => {
    if (!resultBlob) return;
    const url = window.URL.createObjectURL(resultBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'UPS_DOCS_Merged.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const triggerShare = async () => {
    if (!resultBlob) return;
    const sharedFile = new File([resultBlob], 'UPS_DOCS_Merged.pdf', { type: 'application/pdf' });
    
    if (navigator.canShare && navigator.canShare({ files: [sharedFile] })) {
      try {
        await navigator.share({
          files: [sharedFile],
          title: 'Merged PDF Document',
          text: 'Compiled cleanly via UPS DOCS Suite.',
        });
      } catch (err) {
        console.log("Sharing skipped", err);
      }
    } else {
      triggerDownload();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 animate-fade-in px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition mb-8 font-semibold">
        <ArrowLeft className="w-4 h-4"/> Back to Workspace
      </Link>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-8 md:p-10 text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Layers className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">Merge PDFs</h1>
        <p className="text-slate-500 mb-8">Combine multiple documents into a single, organized PDF file.</p>

        {!resultBlob ? (
          <>
            <label className="block w-full py-10 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-blue-50/30 hover:border-blue-300 transition-all cursor-pointer mb-6 group">
              <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:scale-110 transition-transform text-blue-500" />
              <span className="text-slate-700 font-bold block text-sm">Select multiple PDF files</span>
              <input type="file" className="hidden" accept="application/pdf" multiple onChange={handleFileChange} />
            </label>

            {files.length > 0 && (
              <div className="max-h-40 overflow-y-auto mb-6 text-left space-y-2 border border-slate-100 p-3 rounded-xl bg-slate-50/50">
                {files.map((f, index) => (
                  <div key={index} className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-100 text-xs font-semibold text-slate-700">
                    <span className="truncate max-w-xs">{f.name}</span>
                    <button onClick={() => removeFile(index)} className="text-rose-500 hover:text-rose-700 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button 
              onClick={handleMerge} 
              disabled={files.length < 2 || loading} 
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-3"
            >
              {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Compiling Engine...</> : "Merge Files Now"}
            </button>
          </>
        ) : (
          <div className="py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-800 mb-2">Files Merged!</h2>
            <p className="text-sm text-slate-500 mb-8">Documents compiled into a single data stream successfully.</p>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={triggerDownload} className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                <Download className="w-4 h-4" /> Download
              </button>
              <button onClick={triggerShare} className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Share2 className="w-4 h-4" /> Share Direct
              </button>
            </div>

            <button onClick={() => { setResultBlob(null); setFiles([]); }} className="mt-8 text-sm text-slate-400 hover:text-slate-600 font-medium transition underline">
              Start a new merge
            </button>
          </div>
        )}

        {errorMessage && <p className="mt-4 text-sm font-bold text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}