import { useState } from 'react';
import { Download, Check, X, File, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PackageBuilder = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const availableDocs = [
    { id: 'DOC-01', name: 'Master BOM Export (CSV)', type: 'Data', size: '240 KB' },
    { id: 'DOC-02', name: 'Quality Inspection Report', type: 'Certificate', size: '1.2 MB' },
    { id: 'DOC-03', name: 'Material Certs (Heat Lot 405)', type: 'Certificate', size: '4.5 MB' },
    { id: 'DOC-04', name: 'AS9100 Compliance Pack', type: 'Legal', size: '12 MB' },
    { id: 'DOC-05', name: 'Schematic View (PDF)', type: 'Engineering', size: '800 KB' },
  ];

  const toggleDoc = (id: string) => {
    setSelectedDocs(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      onClose();
      alert('Simulation: Package successfully generated and downloaded!');
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
           <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             exit={{ y: 20, opacity: 0 }}
             className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
           >
             <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                   <h3 className="text-2xl font-black text-slate-800 tracking-tight">Data Package Builder</h3>
                   <p className="text-slate-500 text-sm mt-1">Select artifacts for secure bulk download.</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
                   <X className="h-6 w-6 text-slate-400" />
                </button>
             </div>

             <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {availableDocs.map((doc) => (
                     <div 
                       key={doc.id}
                       onClick={() => toggleDoc(doc.id)}
                       className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                         selectedDocs.includes(doc.id) ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200'
                       }`}
                     >
                        <div className="flex items-start justify-between">
                           <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${selectedDocs.includes(doc.id) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                 <File className="h-5 w-5" />
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-800">{doc.name}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.type} • {doc.size}</p>
                              </div>
                           </div>
                           {selectedDocs.includes(doc.id) && <Check className="h-5 w-5 text-blue-600" />}
                        </div>
                     </div>
                   ))}
                </div>

                <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-4">
                   <ShieldCheck className="h-8 w-8 text-green-500" />
                   <div>
                      <p className="text-xs font-bold text-slate-700">Enterprise Security Active</p>
                      <p className="text-[10px] text-slate-500">All downloads are encrypted and logged for audit compliance.</p>
                   </div>
                </div>
             </div>

             <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">{selectedDocs.length} items selected</span>
                <div className="flex space-x-4">
                   <button 
                     onClick={onClose}
                     className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800"
                   >
                     Cancel
                   </button>
                   <button 
                     disabled={selectedDocs.length === 0 || isDownloading}
                     onClick={handleDownload}
                     className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 disabled:opacity-50 disabled:shadow-none transition-all"
                   >
                     {isDownloading ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     ) : (
                        <>
                          <Download className="h-5 w-5" />
                          <span>Generate Package</span>
                        </>
                     )}
                   </button>
                </div>
             </div>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
