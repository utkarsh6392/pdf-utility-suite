import { useState } from 'react';
import axios from 'axios';
import { FileText, UploadCloud, Loader2, ArrowLeft, CheckCircle2, Copy, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ExtractText() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResultText('');
    setErrorMessage('');
    setCopied(false);
  };

  const handleExtract = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://ups-docs-backend.onrender.com/api/pdf/extract-text', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob', // Backend gives text bytes, we read it as blob first
      });

      // Convert the blob to readable text for the preview box
      const textData = await response.data.text();
      setResultText(textData);
    } catch (e) {
      setErrorMessage("Text extraction failed. Ensure the PDF is not scanned/image-based.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = () => {
    if (!resultText) return;
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Extracted_${file.name.replace('.pdf', '')}.txt`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const copyToClipboard = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerShare = async () => {
    if (!resultText) return;
    const blob = new Blob([resultText], { type: 'text/plain' });
    const sharedFile = new File([blob], `Extracted_${file.name.replace('.pdf', '')}.txt`, { type: 'text/plain' });
    
    if (navigator.canShare && navigator.canShare({ files: [sharedFile] })) {
      try {
        await navigator.share({
          files: [sharedFile],
          title: 'Extracted PDF Text',
          text: 'Text extracted effortlessly using UPS DOCS Suite.',
        });
      } catch (err) {
        console.log("Sharing bypassed", err);
      }
    } else {
      triggerDownload();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 animate-fade-in px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition mb-8 font-semibold">
        <ArrowLeft className="w-4 h-4"/> Back to Workspace
      </Link>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-8 md:p-10 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileText className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">Extract Text</h1>
        <p className="text-slate-500 mb-8">Pull readable data and raw text instantly from your PDF documents.</p>

        {!resultText ? (
          <>
            <label className="block w-full py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-emerald-50/30 hover:border-emerald-300 transition-all cursor-pointer mb-6 group">
              <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:scale-110 transition-transform text-emerald-500" />
              <span className="text-slate-700 font-bold block text-sm max-w-xs mx-auto truncate">
                {file ? file.name : "Select your PDF document"}
              </span>
              <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
            </label>

            <button 
              onClick={handleExtract} 
              disabled={!file || loading} 
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-3"
            >
              {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Parsing Text Layers...</> : "Extract Text Now"}
            </button>
          </>
        ) : (
          <div className="py-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h2 className="text-2xl font-black text-slate-800 mb-2">Text Extracted!</h2>
            
            {/* Text Preview Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left relative group">
              <p className="text-sm text-slate-600 h-32 overflow-y-auto whitespace-pre-wrap font-mono">
                {resultText.length > 500 ? resultText.substring(0, 500) + '...' : resultText}
              </p>
              <button 
                onClick={copyToClipboard}
                className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-emerald-50 text-slate-500 hover:text-emerald-600 transition-all"
                title="Copy to Clipboard"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={triggerDownload} className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                <Download className="w-4 h-4" /> Save .txt
              </button>
              <button onClick={triggerShare} className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Share2 className="w-4 h-4" /> Share Direct
              </button>
            </div>

            <button onClick={() => { setResultText(''); setFile(null); }} className="mt-8 text-sm text-slate-400 hover:text-slate-600 font-medium transition underline">
              Extract from another file
            </button>
          </div>
        )}

        {errorMessage && <p className="mt-4 text-sm font-bold text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}