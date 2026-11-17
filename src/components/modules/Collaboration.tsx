import { CORE_DATA } from '../../data/mockData';
import { MessageSquare, FileText, Send, ChevronRight, Share2 } from 'lucide-react';

export const Collaboration = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-[calc(100vh-10rem)] gap-8">
      {/* ECO Tracking List */}
      <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h3 className="font-bold flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-500" />
            Engineering Changes (ECO)
          </h3>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-black rounded-full">3 Active</span>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {CORE_DATA.ECOs.map((eco) => (
            <div key={eco.id} className="p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{eco.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  eco.status === 'Approved' ? 'bg-green-100 text-green-700' :
                  eco.status === 'Reviewing' ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {eco.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{eco.description}</h4>
              <p className="text-[11px] text-slate-500 mt-1">Part: {eco.part} • {eco.date}</p>
              <div className="flex items-center justify-between mt-4">
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-bold">JD</div>
                    ))}
                 </div>
                 <ChevronRight className="h-4 w-4 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal Messaging / Chat */}
      <div className="lg:col-span-2 bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
         
         <div className="p-6 border-b border-slate-800 flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
               <div className="h-10 w-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
               </div>
               <div>
                  <h3 className="text-white font-bold">Project Alpha Stream</h3>
                  <p className="text-[10px] text-green-500 font-black uppercase tracking-widest flex items-center">
                     <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                     5 members online
                  </p>
               </div>
            </div>
            <div className="flex space-x-2">
               <button className="p-2 text-slate-400 hover:text-white transition-colors">
                  <Share2 className="h-5 w-5" />
               </button>
            </div>
         </div>

         <div className="flex-1 p-6 overflow-y-auto space-y-6 relative z-10">
            {[
              { user: 'Sarah Miller', role: 'Eng Lead', msg: 'The thermal results for V2 are in. Looking better than expected.', time: '10:24 AM', type: 'other' },
              { user: 'You', role: 'System Admin', msg: 'Great to hear. Do we need to update the ECO draft?', time: '10:30 AM', type: 'me' },
              { user: 'Sarah Miller', role: 'Eng Lead', msg: 'Yes, let\'s bump the heat-sink spec to copper-core. I\'ll upload the PDF now.', time: '10:32 AM', type: 'other' },
            ].map((m, i) => (
              <div key={i} className={`flex items-start space-x-4 ${m.type === 'me' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                 <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-[10px] ${m.type === 'me' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {m.user === 'You' ? 'YO' : m.user.split(' ').map(n => n[0]).join('')}
                 </div>
                 <div className={`max-w-[70%] p-4 rounded-2xl ${m.type === 'me' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800/50 text-slate-300 border border-slate-700 rounded-tl-none'}`}>
                    <div className="flex items-center space-x-2 mb-1">
                       <span className={`text-[10px] font-black uppercase ${m.type === 'me' ? 'text-blue-100' : 'text-slate-500'}`}>{m.user}</span>
                       <span className={`text-[8px] ${m.type === 'me' ? 'text-blue-200/50' : 'text-slate-600'}`}>{m.time}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{m.msg}</p>
                 </div>
              </div>
            ))}
         </div>

         <div className="p-6 bg-slate-900/80 backdrop-blur-md border-t border-slate-800 relative z-10">
            <div className="relative group">
               <input 
                  type="text" 
                  placeholder="Type a message to the team..." 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-6 pr-14 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-slate-800 transition-all"
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                  <Send className="h-4 w-4" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
