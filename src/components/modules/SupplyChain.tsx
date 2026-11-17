import { CORE_DATA } from '../../data/mockData';
import { Truck, Package, Clock, DollarSign, Search } from 'lucide-react';

export const SupplyChain = () => {
  const stats = [
    { label: 'Pending POs', value: '14', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'In Transit', value: '08', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Delivered', value: '42', icon: Package, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Spend (MTD)', value: '$124k', icon: DollarSign, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Supply Chain Operations</h2>
        <div className="flex space-x-3">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50">Manage Vendors</button>
           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700">New Purchase Order</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className={`p-3 rounded-xl w-fit ${stat.bg} mb-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-lg">Active Purchase Orders</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search POs..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <th className="px-8 py-4">PO Number</th>
                <th className="px-8 py-4">Vendor</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CORE_DATA.POs.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 font-mono font-bold text-blue-600">{po.id}</td>
                  <td className="px-8 py-4 font-bold text-slate-800">{po.vendor}</td>
                  <td className="px-8 py-4 font-medium text-slate-600">{po.amount}</td>
                  <td className="px-8 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                      po.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      po.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      po.status === 'Pending Approval' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-slate-400 text-sm font-medium">{po.date}</td>
                  <td className="px-8 py-4 text-right">
                    <button className="text-blue-600 font-bold text-xs hover:underline">Track Order</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
