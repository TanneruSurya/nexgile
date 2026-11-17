import { useRole } from '../../context/RoleContext';
import { CORE_DATA, USERS } from '../../data/mockData';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { Shield, AlertCircle, Box } from 'lucide-react';

const spcData = [
  { sample: 1, value: 10.02 },
  { sample: 2, value: 10.05 },
  { sample: 3, value: 9.98 },
  { sample: 4, value: 10.12 },
  { sample: 5, value: 10.01 },
  { sample: 6, value: 9.95 },
  { sample: 7, value: 10.08 },
  { sample: 8, value: 10.03 },
  { sample: 9, value: 10.15 },
  { sample: 10, value: 10.00 },
];

export const QualityManagement = () => {
  const { role } = useRole();

  const filteredNCRs = CORE_DATA.NCRs.filter(ncr => role === USERS.INTERNAL || ncr.owner === USERS.CUSTOMER);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Quality & Compliance</h2>
        <div className="flex space-x-2">
           <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">ISO 9001 Certified</span>
           <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200">AS9100 Compliant</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SPC Control Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-500" />
              Statistical Process Control (SPC)
            </h3>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Parameter: Critical Dimension A</div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spcData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="sample" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis domain={[9.8, 10.3]} axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip />
                <ReferenceLine y={10.2} label={{ position: 'right', value: 'UCL', fill: '#ef4444', fontSize: 10 }} stroke="#ef4444" strokeDasharray="3 3" />
                <ReferenceLine y={9.8} label={{ position: 'right', value: 'LCL', fill: '#ef4444', fontSize: 10 }} stroke="#ef4444" strokeDasharray="3 3" />
                <ReferenceLine y={10.0} label={{ position: 'right', value: 'Nominal', fill: '#10b981', fontSize: 10 }} stroke="#10b981" />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 border-t border-slate-50 pt-4 text-center">
             <div>
               <p className="text-[10px] text-slate-500 font-bold uppercase">Cp</p>
               <p className="text-lg font-black text-slate-900">1.67</p>
             </div>
             <div>
               <p className="text-[10px] text-slate-500 font-bold uppercase">Cpk</p>
               <p className="text-lg font-black text-green-600">1.42</p>
             </div>
             <div>
               <p className="text-[10px] text-slate-500 font-bold uppercase">Sigma</p>
               <p className="text-lg font-black text-slate-900">4.2σ</p>
             </div>
          </div>
        </div>

        {/* 3D/Schematic Placeholder */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative group">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
           <div className="absolute top-4 left-4 z-10">
              <div className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-md border border-slate-700 p-2 rounded-lg">
                <Box className="h-4 w-4 text-blue-400" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">3D Model Viewer</span>
              </div>
           </div>
           
           <div className="h-full flex flex-col items-center justify-center p-12 text-center relative z-10">
              {/* Mock 3D Wireframe with CSS */}
              <div className="w-48 h-48 relative preserve-3d animate-slow-spin">
                 <div className="absolute inset-0 border-2 border-blue-500/30 rounded-xl transform rotate-x-45 rotate-y-45"></div>
                 <div className="absolute inset-0 border-2 border-blue-400/50 rounded-xl transform -rotate-x-45 -rotate-y-45"></div>
                 <div className="absolute inset-4 border border-blue-300/20 rounded-full"></div>
                 <div className="absolute inset-12 border-4 border-blue-600 rounded-lg animate-pulse"></div>
              </div>
              <h4 className="text-blue-400 font-bold mt-8">Main Chassis - Isometric View</h4>
              <p className="text-slate-500 text-xs mt-2">v2.1 (Internal Release)</p>
              
              <div className="mt-8 flex space-x-4">
                 <button className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg border border-slate-700 hover:bg-slate-700 transition-all">Inspect</button>
                 <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all">Download STEP</button>
              </div>
           </div>
        </div>
      </div>

      {/* NCR Management */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
            Non-Conformance Reports (NCR)
          </h3>
          <button className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
            Raise New NCR
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredNCRs.map((ncr) => (
             <div key={ncr.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                   <span className="font-mono font-bold text-blue-600 text-sm">{ncr.id}</span>
                   <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                     ncr.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                   }`}>{ncr.severity}</span>
                </div>
                <p className="text-sm font-bold text-slate-800 mb-2">{ncr.description}</p>
                <div className="flex items-center justify-between mt-6">
                   <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-bold">QM</div>
                      <span className="text-xs text-slate-500 font-medium">{ncr.owner}</span>
                   </div>
                   <div className="text-[10px] font-bold text-slate-400">{ncr.date}</div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
