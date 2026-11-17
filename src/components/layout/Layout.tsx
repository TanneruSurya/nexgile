import React, { useState } from 'react';
import { useRole } from '../../context/RoleContext';
import { USERS } from '../../data/mockData';
import { 
  LayoutDashboard, 
  Settings, 
  Bell, 
  Search, 
  Boxes, 
  ClipboardCheck, 
  Truck, 
  Wrench, 
  MessageSquare,
  LogOut,
  Download
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { PackageBuilder } from '../modals/PackageBuilder';

interface LayoutProps {
  children: React.ReactNode;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export const Layout = ({ children, activeModule, setActiveModule }: LayoutProps) => {
  const { role, setRole, logout } = useRole();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPackageBuilderOpen, setIsPackageBuilderOpen] = useState(false);

  const modules = [
    { name: 'Dashboard', icon: LayoutDashboard, roles: [USERS.INTERNAL, USERS.CUSTOMER] },
    { name: 'Program Tracking', icon: ClipboardCheck, roles: [USERS.INTERNAL, USERS.CUSTOMER] },
    { name: 'Production Visibility', icon: Boxes, roles: [USERS.INTERNAL] },
    { name: 'Quality Management', icon: Wrench, roles: [USERS.INTERNAL, USERS.CUSTOMER] },
    { name: 'Supply Chain', icon: Truck, roles: [USERS.INTERNAL] },
    { name: 'After-Sales', icon: Settings, roles: [USERS.INTERNAL, USERS.CUSTOMER] },
    { name: 'Collaboration', icon: MessageSquare, roles: [USERS.INTERNAL, USERS.CUSTOMER] },
  ];

  const filteredModules = modules.filter(m => m.roles.includes(role));

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <PackageBuilder isOpen={isPackageBuilderOpen} onClose={() => setIsPackageBuilderOpen(false)} />
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight text-blue-400">Nexgile FactoryIQ</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filteredModules.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveModule(item.name)}
              className={cn(
                "flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                activeModule === item.name ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-4">
           <div className="flex items-center space-x-3 px-4 py-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold uppercase">
                {role === USERS.INTERNAL ? 'NI' : 'CU'}
              </div>
              <div>
                <p className="text-xs font-semibold">{role === USERS.INTERNAL ? 'Admin' : 'Client Access'}</p>
                <p className="text-[10px] text-slate-500 truncate">{role}</p>
              </div>
           </div>
           <button 
             onClick={logout}
             className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-400 hover:text-white"
           >
             <LogOut className="mr-3 h-4 w-4" />
             Logout
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Global search across BOMs, NCRs, POs..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border-transparent rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Role Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setRole(USERS.INTERNAL)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-md transition-all",
                  role === USERS.INTERNAL ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Internal
              </button>
              <button
                onClick={() => setRole(USERS.CUSTOMER)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-md transition-all",
                  role === USERS.CUSTOMER ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Customer
              </button>
            </div>

            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <button 
              onClick={() => setIsPackageBuilderOpen(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Package Builder</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

      {/* Notification Center Mock */}
      {isNotificationsOpen && (
        <div className="absolute right-0 top-16 w-80 h-[calc(100vh-4rem)] bg-white shadow-2xl border-l border-slate-200 z-50 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Notifications</h3>
            <button onClick={() => setIsNotificationsOpen(false)} className="text-slate-400 hover:text-slate-600">
               ✕
            </button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Critical Delay', desc: 'Program "Project Alpha" is behind schedule.', time: '10m ago', type: 'error' },
              { title: 'New ECO Change', desc: 'BOM-002 has a new ECO pending review.', time: '1h ago', type: 'info' },
              { title: 'NCR Update', desc: 'NCR-1024 status changed to "Resolved".', time: '4h ago', type: 'success' },
            ].map((n, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                    n.type === 'error' ? "bg-red-100 text-red-700" : 
                    n.type === 'success' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  )}>{n.type}</span>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
                <h4 className="text-sm font-bold">{n.title}</h4>
                <p className="text-xs text-slate-600 mt-1">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
