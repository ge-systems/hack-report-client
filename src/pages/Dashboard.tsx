import React from 'react';
import { useAuth } from '../utils/AuthContext';

const Dashboard: React.FC = () => {
  const { logoutSecurely } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-black p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold font-['Syne'] text-black">Dashboard</h1>
            <p className="text-slate-400 mt-1">Secure Pentest Management</p>
          </div>
          <button 
            onClick={logoutSecurely}
            className="bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-400 px-4 py-2 rounded-lg transition-all text-sm font-semibold border border-slate-700"
          >
            Lock Vault & Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Assessments</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;