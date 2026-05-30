import { useState } from 'react';
import axios from 'axios';
import { UploadCloud, FileImage, Loader2, ArrowLeft, CheckCircle2, Share2, Download, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ImageToPdf() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selectedImages]);
    setResultBlob(null);
    setErrorMessage('');
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (images.length === 0) return;
    setLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    // CRITICAL BUG FIX SYNC: Param key matches perfectly 'files'
    images.forEach((img) => formData.append('files', img));

    try {
      const response = await axios.post('https://ups-docs-backend.onrender.com/api/pdf/convert/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      setResultBlob(blob);
    } catch (e) {
      setErrorMessage("Conversion failed. Check file limits or container connectivity.");
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
    link.setAttribute('download', 'UPS_DOCS_Images.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const triggerShare = async () => {
    if (!resultBlob) return;
    const sharedFile = new File([resultBlob], 'UPS_DOCS_Images.pdf', { type: 'application/pdf' });
    
    if (navigator.canShare && navigator.canShare({ files: [sharedFile] })) {
      try {
        await navigator.share({
          files: [sharedFile],
          title: 'Images converted to PDF',
          text: 'Generated effortlessly using UPS DOCS Suite.',
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
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-sky-600 transition mb-8 font-semibold">
        <ArrowLeft className="w-4 h-4"/> Back to Workspace
      </Link>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-8 md:p-10 text-center">
        <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileImage className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">Images to PDF</h1>
        <p className="text-slate-500 mb-8">Convert multiple JPG or PNG images into a clean single PDF layout.</p>

        {!resultBlob ? (
          <>
            <label className="block w-full py-10 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-sky-50/30 hover:border-sky-300 transition-all cursor-pointer mb-6 group">
              <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:scale-110 transition-transform text-sky-500" />
              <span className="text-slate-700 font-bold block text-sm">Select JPG or PNG files</span>
              <input type="file" className="hidden" accept="image/png, image/jpeg" multiple onChange={handleFileChange} />
            </label>

            {images.length > 0 && (
              <div className="max-h-40 overflow-y-auto mb-6 text-left space-y-2 border border-slate-100 p-3 rounded-xl bg-slate-50/50">
                {images.map((img, index) => (
                  <div key={index} className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-100 text-xs font-semibold text-slate-700">
                    <span className="truncate max-w-xs">{img.name}</span>
                    <button onClick={() => removeImage(index)} className="text-rose-500 hover:text-rose-700 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button 
              onClick={handleConvert} 
              disabled={images.length === 0 || loading} 
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-sky-600 transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-3"
            >
              {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Processing Raster Image...</> : "Convert Images Now"}
            </button>
          </>
        ) : (
          <div className="py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-800 mb-2">Conversion Complete!</h2>
            <p className="text-sm text-slate-500 mb-8">Images scaled and compiled into vector page layouts successfully.</p>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={triggerDownload} className="flex items-center justify-center gap-2 bg-sky-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-100">
                <Download className="w-4 h-4" /> Download
              </button>
              <button onClick={triggerShare} className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Share2 className="w-4 h-4" /> Share Direct
              </button>
            </div>

            <button onClick={() => { setResultBlob(null); setImages([]); }} className="mt-8 text-sm text-slate-400 hover:text-slate-600 font-medium transition underline">
              Convert more images
            </button>
          </div>
        )}

        {errorMessage && <p className="mt-4 text-sm font-bold text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}