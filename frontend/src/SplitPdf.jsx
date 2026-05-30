import { useState } from 'react';
import axios from 'axios';
import { Scissors, UploadCloud, Loader2, ArrowLeft, CheckCircle2, Share2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SplitPdf() {
  const [file, setFile] = useState(null);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResultBlob(null);
    setErrorMessage('');
  };

  const handleSplit = async () => {
    if (!file) return;
    if (startPage <= 0 || endPage < startPage) {
      setErrorMessage("Enter a valid range. End page must be greater than or equal to start page.");
      return;
    }
    setLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('start', startPage);
    formData.append('end', endPage);

    try {
      const response = await axios.post('https://ups-docs-backend.onrender.com/api/pdf/split', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      setResultBlob(blob);
    } catch (e) {
      setErrorMessage("Split logic failed. Ensure index bounds aren't out of PDF size limits.");
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
    link.setAttribute('download', `Split_p${startPage}-p${endPage}_${file.name}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const triggerShare = async () => {
    if (!resultBlob) return;
    const sharedFile = new File([resultBlob], `Split_${file.name}`, { type: 'application/pdf' });
    
    if (navigator.canShare && navigator.canShare({ files: [sharedFile] })) {
      try {
        await navigator.share({
          files: [sharedFile],
          title: 'Extracted PDF Segment',
          text: 'Pages extracted flawlessly using UPS DOCS Suite.',
        });
      } catch (err) {
        console.log("Sharing aborted", err);
      }
    } else {
      triggerDownload();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 animate-fade-in px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-purple-600 transition mb-8 font-semibold">
        <ArrowLeft className="w-4 h-4"/> Back to Workspace
      </Link>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-8 md:p-10 text-center">
        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Scissors className="w-8 h-8 rotate-90" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">Extract Pages</h1>
        <p className="text-slate-500 mb-8">Slice a large PDF structure and extract only the specific pages you need.</p>

        {!resultBlob ? (
          <>
            <label className="block w-full py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-purple-50/30 hover:border-purple-300 transition-all cursor-pointer mb-6 group">
              <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:scale-110 transition-transform text-purple-500" />
              <span className="text-slate-700 font-bold block text-sm max-w-xs mx-auto truncate">
                {file ? file.name : "Select your PDF document"}
              </span>
              <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
            </label>

            {file && (
              <div className="grid grid-cols-2 gap-4 text-left mb-6 animate-fade-in">
                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-1">From Page:</label>
                  <input 
                    type="number" 
                    value={startPage} 
                    onChange={(e) => setStartPage(Number(e.target.value))}
                    min="1"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-1">To Page:</label>
                  <input 
                    type="number" 
                    value={endPage} 
                    onChange={(e) => setEndPage(Number(e.target.value))}
                    min="1"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-semibold"
                  />
                </div>
              </div>
            )}

            <button 
              onClick={handleSplit} 
              disabled={!file || loading} 
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-purple-600 transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-3"
            >
              {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Slicing Document Object...</> : "Extract Pages Now"}
            </button>
          </>
        ) : (
          <div className="py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-800 mb-2">Pages Extracted!</h2>
            <p className="text-sm text-slate-500 mb-8">Target page boundaries segmented and parsed successfully.</p>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={triggerDownload} className="flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-100">
                <Download className="w-4 h-4" /> Download
              </button>
              <button onClick={triggerShare} className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Share2 className="w-4 h-4" /> Share Direct
              </button>
            </div>

            <button onClick={() => setResultBlob(null)} className="mt-8 text-sm text-slate-400 hover:text-slate-600 font-medium transition underline">
              Extract another range
            </button>
          </div>
        )}

        {errorMessage && <p className="mt-4 text-sm font-bold text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}