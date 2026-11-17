import { useState, useMemo } from 'react';
import { useRole } from '../../context/RoleContext';
import { CORE_DATA, PRODUCTION_DATA, AUDIT_HISTORY, USERS } from '../../data/mockData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';
import { History, Eye, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Dashboard = () => {
  const { role } = useRole();
  const [selectedAuditId, setSelectedAuditId] = useState<string | null>(null);

  const filteredBOMs = useMemo(() => {
    return CORE_DATA.BOMs.filter(bom => role === USERS.INTERNAL || bom.owner === USERS.CUSTOMER);
  }, [role]);

  const stats = [
    { label: 'Active Programs', value: '12', change: '+2', trend: 'up' },
    { label: 'Yield Rate', value: '96.4%', change: '-0.2%', trend: 'down' },
    { label: 'Open NCRs', value: '08', change: '-3', trend: 'up' },
    { label: 'WIP Value', value: '$1.2M', change: '+$140k', trend: 'up' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className={`flex items-center text-xs font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="h-4 w-4 mr-0.5" /> : <ArrowDownRight className="h-4 w-4 mr-0.5" />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Production Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-500" />
              Production Visibility (WIP vs Plan)
            </h3>
            <select className="text-xs border-slate-200 rounded-lg bg-slate-50 p-1.5 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PRODUCTION_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar dataKey="wip" fill="#3b82f6" radius={[4, 4, 0, 0]} name="WIP" />
                <Bar dataKey="plan" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Plan" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quality Yield Line */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h3 className="font-bold text-slate-800 mb-6">Yield Performance</h3>
           <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PRODUCTION_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip />
                <Line type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* BOM Table with Audit History Trigger */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Master BOM Inventory</h3>
          <button className="text-xs font-semibold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Part ID</th>
                <th className="px-6 py-4">Part Name</th>
                <th className="px-6 py-4">Version</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Last Modified</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredBOMs.map((bom) => (
                <tr key={bom.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-blue-600">{bom.id}</td>
                  <td className="px-6 py-4 font-medium">{bom.partName}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold">{bom.version}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold ${
                      bom.status === 'Released' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {bom.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{bom.owner}</td>
                  <td className="px-6 py-4 text-slate-500">{bom.lastModified}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button 
                      onClick={() => setSelectedAuditId(bom.id)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="View Audit History"
                    >
                      <History className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit History Modal */}
      <AnimatePresence>
        {selectedAuditId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Audit History</h3>
                  <p className="text-xs text-slate-500">Tracking changes for {selectedAuditId}</p>
                </div>
                <button onClick={() => setSelectedAuditId(null)} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {AUDIT_HISTORY.filter(h => h.target === selectedAuditId).length > 0 ? (
                    AUDIT_HISTORY.filter(h => h.target === selectedAuditId).map((history, i) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          <History className="h-4 w-4" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-100 bg-slate-50 shadow">
                           <div className="flex items-center justify-between space-x-2 mb-1">
                             <div className="font-bold text-slate-900 text-sm">{history.action}</div>
                             <time className="font-mono text-[10px] text-blue-500">{history.timestamp}</time>
                           </div>
                           <div className="text-slate-500 text-xs">User: {history.user}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-400 italic text-sm">No audit history found for this item.</div>
                  )}
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedAuditId(null)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
