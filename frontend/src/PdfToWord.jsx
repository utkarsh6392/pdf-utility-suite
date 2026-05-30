import { useState } from 'react';
import axios from 'axios';
import { FileJson, UploadCloud, Loader2, ArrowLeft, CheckCircle2, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PdfToWord() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResultBlob(null);
    setErrorMessage('');
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://ups-docs-backend.onrender.com/api/pdf/convert/word', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob', 
      });

      const blob = new Blob([response.data], { type: 'application/msword' });
      setResultBlob(blob);
    } catch (e) {
      setErrorMessage("Conversion failed. Please check backend server status.");
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
    link.setAttribute('download', `${file.name.replace('.pdf', '')}_Converted.doc`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const triggerShare = async () => {
    if (!resultBlob) return;
    const sharedFile = new File([resultBlob], `${file.name.replace('.pdf', '')}_Converted.doc`, { type: 'application/msword' });
    
    if (navigator.canShare && navigator.canShare({ files: [sharedFile] })) {
      try {
        await navigator.share({
          files: [sharedFile],
          title: 'Converted Word Document',
          text: 'PDF mapped to Word layout via UPS DOCS Suite.',
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
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-700 transition mb-8 font-semibold">
        <ArrowLeft className="w-4 h-4"/> Back to Workspace
      </Link>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-8 md:p-10 text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileJson className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">PDF to Word</h1>
        <p className="text-slate-500 mb-8">Convert your PDF documents into editable Microsoft Word (.doc) formats.</p>

        {!resultBlob ? (
          <>
            <label className="block w-full py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-blue-50/30 hover:border-blue-400 transition-all cursor-pointer mb-6 group">
              <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:scale-110 transition-transform text-blue-600" />
              <span className="text-slate-700 font-bold block text-sm max-w-xs mx-auto truncate">
                {file ? file.name : "Select your PDF document"}
              </span>
              <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
            </label>

            <button 
              onClick={handleConvert} 
              disabled={!file || loading} 
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-3"
            >
              {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Mapping DOC Structures...</> : "Convert to Word Now"}
            </button>
          </>
        ) : (
          <div className="py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-800 mb-2">Conversion Complete!</h2>
            <p className="text-sm text-slate-500 mb-8">Your document is ready to be edited in Microsoft Word.</p>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={triggerDownload} className="flex items-center justify-center gap-2 bg-blue-700 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-200">
                <Download className="w-4 h-4" /> Download .doc
              </button>
              <button onClick={triggerShare} className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Share2 className="w-4 h-4" /> Share Direct
              </button>
            </div>

            <button onClick={() => { setResultBlob(null); setFile(null); }} className="mt-8 text-sm text-slate-400 hover:text-slate-600 font-medium transition underline">
              Convert another file
            </button>
          </div>
        )}

        {errorMessage && <p className="mt-4 text-sm font-bold text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}