import { useState } from 'react';
import axios from 'axios';
import { UploadCloud, Minimize2, Loader2, ArrowLeft, CheckCircle2, Share2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompressPdf() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResultBlob(null);
    setErrorMessage('');
  };

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://ups-docs-backend.onrender.com/api/pdf/compress', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      setResultBlob(blob);
    } catch (e) {
      setErrorMessage("Compression failed. Clear backend logs or check connection.");
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
    link.setAttribute('download', `Compressed_${file.name}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const triggerShare = async () => {
    if (!resultBlob) return;
    const sharedFile = new File([resultBlob], `Compressed_${file.name}`, { type: 'application/pdf' });
    
    if (navigator.canShare && navigator.canShare({ files: [sharedFile] })) {
      try {
        await navigator.share({
          files: [sharedFile],
          title: 'Compressed PDF',
          text: 'Optimized via UPS DOCS Suite.',
        });
      } catch (err) {
        console.log("Share canceled or failed", err);
      }
    } else {
      alert("Sharing not supported on this browser. Downloading instead!");
      triggerDownload();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 animate-fade-in px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition mb-8 font-semibold">
        <ArrowLeft className="w-4 h-4"/> Back to Workspace
      </Link>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-8 md:p-10 text-center">
        <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Minimize2 className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">Optimize Size</h1>
        <p className="text-slate-500 mb-8">Compress your PDF files to make them easy to email or share over networks.</p>

        {!resultBlob ? (
          <>
            <label className="block w-full py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-teal-50/30 hover:border-teal-300 transition-all cursor-pointer mb-6 group">
              <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:scale-110 transition-transform text-teal-500" />
              <span className="text-slate-700 font-bold block text-sm max-w-xs mx-auto truncate">
                {file ? file.name : "Select your PDF document"}
              </span>
              <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
            </label>

            <button 
              onClick={handleCompress} 
              disabled={!file || loading} 
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-teal-600 transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-3"
            >
              {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Optimizing PDF Engine...</> : "Compress Now"}
            </button>
          </>
        ) : (
          <div className="py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-800 mb-2">Compression Complete!</h2>
            <p className="text-sm text-slate-500 mb-8">Your optimized file is structured and ready.</p>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={triggerDownload} className="flex items-center justify-center gap-2 bg-teal-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100">
                <Download className="w-4 h-4" /> Download
              </button>
              <button onClick={triggerShare} className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Share2 className="w-4 h-4" /> Share Direct
              </button>
            </div>

            <button onClick={() => setResultBlob(null)} className="mt-8 text-sm text-slate-400 hover:text-slate-600 font-medium transition underline">
              Compress another file
            </button>
          </div>
        )}

        {errorMessage && <p className="mt-4 text-sm font-bold text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}