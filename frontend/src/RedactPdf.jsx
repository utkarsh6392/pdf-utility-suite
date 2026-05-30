import { useState } from 'react';
import axios from 'axios';
import { ShieldAlert, UploadCloud, Loader2, ArrowLeft, CheckCircle2, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RedactPdf() {
  const [file, setFile] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResultBlob(null);
    setErrorMessage('');
  };

  const handleRedact = async () => {
    if (!file || !keyword.trim()) return;
    setLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('keyword', keyword);

    try {
      const response = await axios.post('https://ups-docs-backend.onrender.com/api/pdf/redact', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'text/plain' });
      setResultBlob(blob);
    } catch (e) {
      setErrorMessage("Redaction engine failed. Check your file format.");
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
    link.setAttribute('download', `Redacted_${file.name.replace('.pdf', '')}.txt`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div className="max-w-xl mx-auto py-10 animate-fade-in px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-rose-600 transition mb-8 font-semibold">
        <ArrowLeft className="w-4 h-4"/> Back to Workspace
      </Link>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-8 md:p-10 text-center">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">Auto-Redaction</h1>
        <p className="text-slate-500 mb-8">Sanitize documents by masking passwords, emails, or personal names automatically.</p>

        {!resultBlob ? (
          <>
            <label className="block w-full py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-rose-50/30 hover:border-rose-300 transition-all cursor-pointer mb-6 group">
              <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:scale-110 transition-transform text-rose-500" />
              <span className="text-slate-700 font-bold block text-sm max-w-xs mx-auto truncate">
                {file ? file.name : "Select your PDF document"}
              </span>
              <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
            </label>

            {file && (
              <div className="mb-6 animate-fade-in text-left">
                <label className="block text-slate-700 text-sm font-bold mb-2">Text/Keyword to Blackout:</label>
                <input 
                  type="text" 
                  value={keyword} 
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g., Confidential, Password123, Secret" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm font-medium"
                />
              </div>
            )}

            <button 
              onClick={handleRedact} 
              disabled={!file || !keyword.trim() || loading} 
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-rose-600 transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-3"
            >
              {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Masking Sensitive Streams...</> : "Sanitize & Redact"}
            </button>
          </>
        ) : (
          <div className="py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-800 mb-2">Document Sanitized!</h2>
            <p className="text-sm text-slate-500 mb-8">All instances of "{keyword}" have been scrubbed and replaced safely.</p>

            <button onClick={triggerDownload} className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white py-3.5 px-4 rounded-xl font-bold hover:bg-rose-700 transition-all shadow-lg">
              <Download className="w-4 h-4" /> Download Scrubbed Text
            </button>

            <button onClick={() => { setResultBlob(null); setFile(null); setKeyword(''); }} className="mt-8 text-sm text-slate-400 hover:text-slate-600 font-medium transition underline">
              Sanitize another file
            </button>
          </div>
        )}

        {errorMessage && <p className="mt-4 text-sm font-bold text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}