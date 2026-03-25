import { useState } from 'react';
import axios from 'axios';
import { UploadCloud, Scissors, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SplitPdf() {
  const [file, setFile] = useState(null);
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSplit = async () => {
    if (!file || !startPage || !endPage) {
      setMessage("Please select a file and enter both page numbers.");
      return;
    }

    setLoading(true);
    setMessage('');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('start', startPage);
    formData.append('end', endPage);

    try {
      const response = await axios.post('https://ups-docs-backend.onrender.com', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Split_Pages_${startPage}_to_${endPage}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      setMessage("Success! Your extracted pages have been downloaded.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to split. Ensure your Spring Boot server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center gap-4">
        <Link to="/" className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-50 transition"><ArrowLeft className="h-5 w-5 text-slate-600" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Split PDF</h1>
          <p className="text-slate-500">Extract a specific range of pages into a new document.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        {/* Upload Zone */}
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-indigo-200 rounded-xl cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-colors mb-6 group">
          <UploadCloud className="h-8 w-8 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-slate-600 font-medium text-sm">Select PDF to split</p>
          <input type="file" className="hidden" accept="application/pdf" onChange={(e) => {setFile(e.target.files[0]); setMessage('');}} />
        </label>

        {file && <p className="text-sm text-center text-slate-700 mb-6 font-medium">Selected: {file.name}</p>}

        {/* Page Inputs */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-600 mb-2">From Page:</label>
            <input type="number" min="1" value={startPage} onChange={(e) => setStartPage(e.target.value)} placeholder="e.g. 1" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-600 mb-2">To Page:</label>
            <input type="number" min="1" value={endPage} onChange={(e) => setEndPage(e.target.value)} placeholder="e.g. 5" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        </div>

        <button onClick={handleSplit} disabled={loading || !file} className={`w-full py-4 rounded-xl font-bold text-white flex justify-center items-center gap-2 transition-all shadow-md ${loading || !file ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'}`}>
          {loading ? <><Loader2 className="animate-spin h-5 w-5" /> Processing...</> : <><Scissors className="h-5 w-5"/> Extract Pages</>}
        </button>

        {message && <p className={`mt-4 text-center font-medium ${message.includes('Success') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
      </div>
    </div>
  );
}