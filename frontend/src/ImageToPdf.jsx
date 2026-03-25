import { useState } from 'react';
import axios from 'axios';
import { UploadCloud, Image as ImageIcon, X, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ImageToPdf() {
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

  const handleConvert = async () => {
    if (files.length === 0) return;

    setLoading(true);
    setMessage('');
    
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      const response = await axios.post('https://ups-docs-backend.onrender.com', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Converted_Images.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      setMessage("Success! Your PDF has been downloaded.");
      setFiles([]); // Clear after success
    } catch (error) {
      console.error(error);
      setMessage("Failed to convert. Ensure your Spring Boot server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center gap-4">
        <Link to="/" className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-50 transition"><ArrowLeft className="h-5 w-5 text-slate-600" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Images to PDF</h1>
          <p className="text-slate-500">Combine multiple JPG or PNG images into a single document.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        {/* Upload Zone */}
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors mb-6 group">
          <UploadCloud className="h-10 w-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
          <p className="text-slate-600 font-medium mb-1">Click or drag images to upload</p>
          <p className="text-slate-400 text-sm">Supports JPG, PNG</p>
          <input type="file" className="hidden" accept="image/jpeg, image/png" multiple onChange={handleFileChange} />
        </label>

        {/* File Preview List */}
        {files.length > 0 && (
          <div className="mb-6 space-y-3">
            <h3 className="font-semibold text-slate-700">Selected Files ({files.length})</h3>
            <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <ImageIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
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

        {/* Action Button */}
        <button onClick={handleConvert} disabled={loading || files.length === 0}
          className={`w-full py-4 rounded-xl font-bold text-white flex justify-center items-center gap-2 transition-all shadow-md ${
            loading || files.length === 0 ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
          }`}>
          {loading ? <><Loader2 className="animate-spin h-5 w-5" /> Processing...</> : 'Generate PDF'}
        </button>

        {message && <p className={`mt-4 text-center font-medium ${message.includes('Success') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
      </div>
    </div>
  );
}