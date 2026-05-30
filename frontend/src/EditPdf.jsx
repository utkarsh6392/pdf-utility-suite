import { useState } from 'react';
import axios from 'axios';
import { Type, UploadCloud, Loader2, ArrowLeft, CheckCircle2, Share2, Download, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EditPdf() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [xCoord, setXCoord] = useState(100);
  const [yCoord, setYCoord] = useState(100);
  const [loading, setLoading] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResultBlob(null);
    setErrorMessage('');
  };

  const handleAnnotate = async () => {
    if (!file || !text.trim()) return;
    setLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);
    formData.append('x', xCoord);
    formData.append('y', yCoord);

    try {
      const response = await axios.post('https://ups-docs-backend.onrender.com/api/pdf/add-text', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      setResultBlob(blob);
    } catch (e) {
      setErrorMessage("Annotation failed. Verify backend service and inputs.");
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
    link.setAttribute('download', `Edited_${file.name}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const triggerShare = async () => {
    if (!resultBlob) return;
    const sharedFile = new File([resultBlob], `Edited_${file.name}`, { type: 'application/pdf' });
    
    if (navigator.canShare && navigator.canShare({ files: [sharedFile] })) {
      try {
        await navigator.share({
          files: [sharedFile],
          title: 'Annotated PDF',
          text: 'Stamped text successfully via UPS DOCS Suite.',
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
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-amber-600 transition mb-8 font-semibold">
        <ArrowLeft className="w-4 h-4"/> Back to Workspace
      </Link>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-8 md:p-10 text-center">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Type className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">Annotate & Edit</h1>
        <p className="text-slate-500 mb-8">Stamp customized text or watermarks onto your PDF pages instantly.</p>

        {!resultBlob ? (
          <>
            <label className="block w-full py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-amber-50/30 hover:border-amber-300 transition-all cursor-pointer mb-6 group">
              <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:scale-110 transition-transform text-amber-500" />
              <span className="text-slate-700 font-bold block text-sm max-w-xs mx-auto truncate">
                {file ? file.name : "Select your PDF document"}
              </span>
              <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
            </label>

            {file && (
              <div className="space-y-4 text-left mb-6 animate-fade-in">
                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-1">Text to Insert:</label>
                  <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    placeholder="e.g., Approved by Utkarsh" 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 text-sm font-bold mb-1 flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5 text-slate-400" /> X Axis (Width)
                    </label>
                    <input 
                      type="number" 
                      value={xCoord} 
                      onChange={(e) => setXCoord(Number(e.target.value))}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-bold mb-1 flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5 text-slate-400" /> Y Axis (Height)
                    </label>
                    <input 
                      type="number" 
                      value={yCoord} 
                      onChange={(e) => setYCoord(Number(e.target.value))}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={handleAnnotate} 
              disabled={!file || !text.trim() || loading} 
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-amber-600 transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-3"
            >
              {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Stamping Metadata Engine...</> : "Stamp Text Now"}
            </button>
          </>
        ) : (
          <div className="py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-800 mb-2">Annotation Stamped!</h2>
            <p className="text-sm text-slate-500 mb-8">Your modified PDF layers have been compiled successfully.</p>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={triggerDownload} className="flex items-center justify-center gap-2 bg-amber-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-100">
                <Download className="w-4 h-4" /> Download
              </button>
              <button onClick={triggerShare} className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Share2 className="w-4 h-4" /> Share Direct
              </button>
            </div>

            <button onClick={() => setResultBlob(null)} className="mt-8 text-sm text-slate-400 hover:text-slate-600 font-medium transition underline">
              Annotate another file
            </button>
          </div>
        )}

        {errorMessage && <p className="mt-4 text-sm font-bold text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}