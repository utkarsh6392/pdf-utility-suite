import { useState } from 'react';
import axios from 'axios';
import { UploadCloud, FileText, X, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    setMessage('');
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setMessage("Please select at least two PDF files to merge.");
      return;
    }

    setLoading(true);
    setMessage('');
    
    const formData = new FormData();
    // The order they are appended is the order they will be merged!
    files.forEach(file => formData.append('files', file));

    try {
      const response = await axios.post('https://ups-docs-backend.onrender.com/api/pdf/merge', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Merged_Document.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      setMessage("Success! Your merged PDF has been downloaded.");
      setFiles([]);
    } catch (error) {
      console.error(error);
      setMessage("Failed to merge. Ensure your Spring Boot server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center gap-4">
        <Link to="/" className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-50 transition"><ArrowLeft className="h-5 w-5 text-slate-600" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Merge PDFs</h1>
          <p className="text-slate-500">Combine multiple PDF files into one in the order you select them.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-200 rounded-xl cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-colors mb-6 group">
          <UploadCloud className="h-10 w-10 text-indigo-500 mb-3 group-hover:scale-110 transition-transform" />
          <p className="text-slate-600 font-medium mb-1">Click or drag PDFs to upload</p>
          <p className="text-slate-400 text-sm">Supports .pdf only</p>
          <input type="file" className="hidden" accept="application/pdf" multiple onChange={handleFileChange} />
        </label>

        {files.length > 0 && (
          <div className="mb-6 space-y-3">
            <h3 className="font-semibold text-slate-700">Files to Merge ({files.length})</h3>
            <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="font-mono text-xs font-bold text-slate-400 w-4">{idx + 1}.</span>
                    <FileText className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700 truncate">{file.name}</span>
                  </div>
                  <button onClick={() => removeFile(idx)} className="p-1 hover:bg-red-100 text-slate-400 hover:text-red-600 rounded transition">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={handleMerge} disabled={loading || files.length < 2}
          className={`w-full py-4 rounded-xl font-bold text-white flex justify-center items-center gap-2 transition-all shadow-md ${
            loading || files.length < 2 ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
          }`}>
          {loading ? <><Loader2 className="animate-spin h-5 w-5" /> Merging...</> : 'Merge PDFs'}
        </button>

        {message && <p className={`mt-4 text-center font-medium ${message.includes('Success') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
      </div>
    </div>
  );
}