import { CORE_DATA } from '../../data/mockData';
import { RefreshCw, Clipboard, ShieldCheck, UserCheck, MessageCircle } from 'lucide-react';

export const AfterSales = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">After-Sales & RMAs</h2>
           <p className="text-slate-500 text-sm mt-1">Post-production lifecycle and field service management.</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700">Initiate RMA</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                  <h3 className="font-bold flex items-center">
                    <RefreshCw className="h-5 w-5 mr-2 text-indigo-500" />
                    Open Returns (RMA)
                  </h3>
               </div>
               <div className="divide-y divide-slate-50">
                  {CORE_DATA.RMAs.map((rma) => (
                    <div key={rma.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                       <div className="flex items-center space-x-4">
                          <div className="p-3 bg-indigo-50 rounded-2xl">
                             <Clipboard className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-900">{rma.id} - {rma.reason}</p>
                             <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">{rma.customer} • {rma.date}</p>
                          </div>
                       </div>
                       <div className="flex items-center space-x-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                             rma.status === 'Received' ? 'bg-blue-100 text-blue-700' :
                             rma.status === 'In Repair' ? 'bg-amber-100 text-amber-700' :
                             'bg-green-100 text-green-700'
                          }`}>
                             {rma.status}
                          </span>
                          <button className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all">
                             <MessageCircle className="h-4 w-4 text-slate-400" />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <ShieldCheck className="h-10 w-10 text-indigo-400 mb-6" />
                  <h3 className="text-xl font-bold mb-2">Service Guarantee</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">All Nexgile products come with an industry-leading 3-year warranty and global on-site support.</p>
                  <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-black text-sm hover:bg-indigo-50 transition-colors">View Warranty Terms</button>
               </div>
               <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                  <UserCheck className="h-5 w-5 mr-2 text-green-500" />
                  Field Support Health
               </h3>
               <div className="space-y-6">
                  <div>
                     <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                        <span className="text-slate-500">SLA Compliance</span>
                        <span className="text-slate-900">98.2%</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[98.2%]"></div>
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                        <span className="text-slate-500">Repair TAT (Days)</span>
                        <span className="text-slate-900">4.2 Avg</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[65%]"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
