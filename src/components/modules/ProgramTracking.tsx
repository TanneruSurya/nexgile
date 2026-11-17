import { useMemo, useState } from 'react';
import { useRole } from '../../context/RoleContext';
import { TIMELINE_TASKS, USERS } from '../../data/mockData';
import { Calendar, ChevronRight, Filter, Plus, X, CheckCircle2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ProgramTracking = () => {
  const { role } = useRole();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredTasks = useMemo(() => {
    let tasks = TIMELINE_TASKS.filter(task => role === USERS.INTERNAL || task.role === USERS.CUSTOMER);
    if (activeFilter !== 'All') {
      tasks = tasks.filter(t => t.status === activeFilter);
    }
    return tasks;
  }, [role, activeFilter]);

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsAddModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Program Milestone Tracking</h2>
          <p className="text-slate-500 text-sm">Real-time status of active projects and customer milestones.</p>
        </div>
        <div className="flex space-x-3 relative">
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "flex items-center px-4 py-2 border rounded-lg text-sm font-semibold transition-all shadow-sm",
                isFilterOpen ? "bg-slate-100 border-slate-300 text-slate-900" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter: {activeFilter}
            </button>
            
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                  {['All', 'Completed', 'In Progress', 'Pending'].map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setActiveFilter(f);
                        setIsFilterOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm transition-colors",
                        activeFilter === f ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </button>
        </div>
      </div>

      {/* Add Milestone Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              {isSuccess ? (
                <div className="p-12 text-center flex flex-col items-center">
                  <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Milestone Created!</h3>
                  <p className="text-slate-500 mt-2 text-sm">Your new milestone has been added to the project timeline and synced across all nodes.</p>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-lg">Create New Milestone</h3>
                    <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <form onSubmit={handleCreateMilestone} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Milestone Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Final Design Review"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Start Date</label>
                        <input required type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">End Date</label>
                        <input required type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Initial Status</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20">
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </div>
                    <div className="pt-4 flex space-x-3">
                      <button 
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="flex-1 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                      >
                        Create Milestone
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gantt-style Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Completed</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">In Progress</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-slate-300 rounded-full mr-2"></span>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Pending</span>
            </div>
          </div>
          <div className="flex items-center text-slate-400 text-xs font-medium">
            <Calendar className="h-4 w-4 mr-2" />
            Q1 - Q2 2024
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <div className="min-w-[800px] space-y-4">
            {/* Timeline Header (Months) */}
            <div className="flex border-b border-slate-100 pb-2">
              <div className="w-1/4"></div>
              <div className="flex-1 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>

            {/* Task Rows */}
            {filteredTasks.map((task) => {
               // Simple calculation for mock Gantt width/position
               const startMonth = new Date(task.start).getMonth();
               const endMonth = new Date(task.end).getMonth();
               const duration = endMonth - startMonth + 1;
               const leftOffset = (startMonth / 6) * 100;
               const width = (duration / 6) * 100;

               return (
                <div key={task.id} className="flex items-center group">
                  <div className="w-1/4 pr-6">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{task.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{task.status}</p>
                  </div>
                  <div className="flex-1 h-12 relative bg-slate-50 rounded-xl overflow-hidden group-hover:bg-slate-100 transition-colors">
                    <div 
                      className={`absolute top-1/2 -translate-y-1/2 h-6 rounded-lg shadow-sm transition-all duration-500 ${
                        task.status === 'Completed' ? 'bg-green-500' : 
                        task.status === 'In Progress' ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'
                      }`}
                      style={{ left: `${leftOffset}%`, width: `${width}%` }}
                    >
                      <div className="px-3 h-full flex items-center">
                         <span className="text-[10px] font-bold text-white whitespace-nowrap overflow-hidden">
                           {task.start} → {task.end}
                         </span>
                      </div>
                    </div>
                  </div>
                  <div className="pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg">
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>
                </div>
               )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4">Critical Path Items</h3>
            <div className="space-y-4">
               {[
                 { name: 'Final Design Approval', days: '2 days left', priority: 'High' },
                 { name: 'Component Sourcing', days: 'Delayed by 4d', priority: 'Critical' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{item.priority}</p>
                    </div>
                    <span className={`text-xs font-bold ${item.priority === 'Critical' ? 'text-red-500' : 'text-blue-500'}`}>
                      {item.days}
                    </span>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
               <Activity className="h-8 w-8" />
            </div>
            <h3 className="font-bold">Project Health Score</h3>
            <p className="text-3xl font-black text-slate-900 mt-2">88 / 100</p>
            <p className="text-xs text-slate-500 mt-1 italic">Calculated based on 4 KPIs</p>
         </div>
      </div>
    </div>
  );
};

const Activity = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
