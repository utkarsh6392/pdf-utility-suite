import { useState } from 'react';
import axios from 'axios';
import { ArrowUpDown, UploadCloud, Loader2, ArrowLeft, CheckCircle2, Download, Move } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReorderPdf() {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]); // Mock pages representation e.g. [0, 1, 2]
  const [loading, setLoading] = useState(false);
  const [resultBlob, setResultBlob] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResultBlob(null);
    setErrorMessage('');
    
    // For simplicity & visual grid, we mock 4 pages to allow sequencing configuration
    setPages([0, 1, 2, 3]);
  };

  // HTML5 Drag and Drop handlers
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, targetIndex) => {
    const sourceIndex = Number(e.dataTransfer.getData('text/plain'));
    const updatedPages = [...pages];
    const [movedPage] = updatedPages.splice(sourceIndex, 1);
    updatedPages.splice(targetIndex, 0, movedPage);
    setPages(updatedPages);
  };

  const handleReorderSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', file);
    // Passing the custom sequence array e.g., 2,0,1,3
    formData.append('order', pages.join(','));

    try {
      const response = await axios.post('https://ups-docs-backend.onrender.com/api/pdf/reorder', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      setResultBlob(blob);
    } catch (e) {
      setErrorMessage("Reordering mapping failed. Verify stack integration.");
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
    link.setAttribute('download', `Sequenced_${file.name}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 animate-fade-in px-4">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition mb-8 font-semibold">
        <ArrowLeft className="w-4 h-4"/> Back to Workspace
      </Link>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-8 md:p-10 text-center">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ArrowUpDown className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">Visual Page Reorder</h1>
        <p className="text-slate-500 mb-8">Drag and drop the cards below to reorganize your PDF page structure layout.</p>

        {!resultBlob ? (
          <>
            <label className="block w-full py-10 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-indigo-50/30 hover:border-indigo-300 transition-all cursor-pointer mb-8 group">
              <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:scale-110 transition-transform text-indigo-500" />
              <span className="text-slate-700 font-bold block text-sm max-w-xs mx-auto truncate">
                {file ? file.name : "Upload Document Structure"}
              </span>
              <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
            </label>

            {file && (
              <div className="mb-8 text-left">
                <label className="block text-slate-700 text-sm font-bold mb-4">Drag boxes to rearrange page order:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {pages.map((pageNumber, index) => (
                    <div
                      key={pageNumber}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, index)}
                      className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-center font-bold text-slate-700 cursor-move hover:bg-indigo-50/50 hover:border-indigo-300 transition-all shadow-sm flex flex-col items-center gap-2 group relative"
                    >
                      <Move className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                      <span className="text-sm">Page {pageNumber + 1}</span>
                      <span className="absolute top-2 right-2 text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-md font-mono">Slot {index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={handleReorderSubmit} 
              disabled={!file || loading} 
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-3"
            >
              {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Compiling Sequence Layout...</> : "Compile New Sequence"}
            </button>
          </>
        ) : (
          <div className="py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-800 mb-2">Reordering Applied!</h2>
            <p className="text-sm text-slate-500 mb-8">The system compiled the pages based on your customized sequence layout.</p>

            <button onClick={triggerDownload} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3.5 px-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg">
              <Download className="w-4 h-4" /> Download Reordered PDF
            </button>

            <button onClick={() => { setResultBlob(null); setFile(null); }} className="mt-8 text-sm text-slate-400 hover:text-slate-600 font-medium transition underline">
              Reorder another file
            </button>
          </div>
        )}

        {errorMessage && <p className="mt-4 text-sm font-bold text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}