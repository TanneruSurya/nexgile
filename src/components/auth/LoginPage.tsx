import { useState, type FormEvent } from 'react';
import { useRole } from '../../context/RoleContext';
import { USERS } from '../../data/mockData';
import { Shield, Lock, User, ArrowRight, Activity, Globe, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginPage = () => {
  const { login } = useRole();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent, role: typeof USERS[keyof typeof USERS]) => {
    e.preventDefault();
    setLoadingRole(role);
    // Simulate API delay
    setTimeout(() => {
      login(role);
      setLoadingRole(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-800 relative z-10"
      >
        {/* Left Side: Visual/Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-12">
              <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tighter">Nexgile <span className="text-blue-200">FactoryIQ</span></h1>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white leading-tight">
                The next generation of <span className="text-blue-200">manufacturing intelligence.</span>
              </h2>
              <p className="text-blue-100 text-lg">
                Securely manage your supply chain, quality standards, and production visibility in one unified platform.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-6 mt-12">
            {[
              { icon: Activity, label: 'Real-time Analytics', desc: 'WIP & Yield tracking' },
              { icon: Globe, label: 'Global Supply', desc: 'End-to-end visibility' },
              { icon: Cpu, label: 'IoT Integrated', desc: 'Smart factory nodes' },
              { icon: Lock, label: 'Enterprise Grade', desc: 'AS9100 Compliant' },
            ].map((feature, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="p-1.5 bg-white/10 rounded-lg">
                  <feature.icon className="h-4 w-4 text-blue-200" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{feature.label}</p>
                  <p className="text-[10px] text-blue-200/70">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Abstract background shape */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 lg:p-16 bg-slate-900 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-3xl font-bold text-white mb-2">Welcome Back</h3>
            <p className="text-slate-400">Please enter your credentials to access your workspace.</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@nexgile.com"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[10px] font-bold text-blue-500 hover:text-blue-400 uppercase tracking-wider">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 px-1">
              <input type="checkbox" id="remember" className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500/20" />
              <label htmlFor="remember" className="text-sm text-slate-400">Keep me logged in for 30 days</label>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button 
                type="submit"
                disabled={loadingRole !== null}
                onClick={(e) => handleSubmit(e, USERS.INTERNAL)}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
              >
                {loadingRole === USERS.INTERNAL ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Login as Admin</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <button 
                type="submit"
                disabled={loadingRole !== null}
                onClick={(e) => handleSubmit(e, USERS.CUSTOMER)}
                className="flex items-center justify-center space-x-2 bg-slate-800 text-white py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all border border-slate-700 disabled:opacity-50"
              >
                {loadingRole === USERS.CUSTOMER ? (
                   <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span>Login as Client</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-500 text-xs">
              Protected by Nexgile SecureShield™. Authorized access only.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
