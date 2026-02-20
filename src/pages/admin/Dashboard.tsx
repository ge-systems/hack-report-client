import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { 
    ShieldCheck, LayoutDashboard, FileText, ShieldAlert, Target, 
    Users, Settings, Activity, Bug, FolderLock, LayoutTemplate, 
    LogOut, Eye, CheckCircle, PauseCircle
} from 'lucide-react';

// --- Interfaces for our Data ---
interface Report {
    id: number;
    title: string;
    assessment: { client: { name: string } };
    maxSeverity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    findingCount: number;
    status: 'REVIEW' | 'PUBLISHED' | 'DRAFT';
}

interface DashboardStats {
    assessmentCount: number;
    criticalCount: number;
    totalFindings: number;
    reportCount: number;
    pendingCount: number;
}

const AdminDashboard: React.FC = () => {
    const { user, logoutSecurely } = useAuth();
    const navigate = useNavigate();

    // --- State Management (Replaces EJS Variables) ---
    const [stats, setStats] = useState<DashboardStats>({
        assessmentCount: 0,
        criticalCount: 0,
        totalFindings: 0,
        reportCount: 0,
        pendingCount: 0
    });
    
    const [reports, setReports] = useState<Report[]>([]);

    // Simulate fetching data on component mount
    useEffect(() => {
        // Placeholder - TODO: Replace this with api.get('/api/admin/dashboard') calls
        setStats({
            assessmentCount: 12,
            criticalCount: 4,
            totalFindings: 90,
            reportCount: 34,
            pendingCount: 2
        });

        setReports([
            { id: 1, title: 'External Penetration Test Q3', assessment: { client: { name: 'Acme Corp' } }, maxSeverity: 'CRITICAL', findingCount: 14, status: 'REVIEW' },
            { id: 2, title: 'Web App API Security Audit', assessment: { client: { name: 'Globex Inc' } }, maxSeverity: 'HIGH', findingCount: 8, status: 'REVIEW' },
        ]);
    }, []);

    // --- Action Handlers 
    const handleAction = (id: number, action: string) => {
        console.log(`Executing ${action} on report ${id}`);
        // TODO: await api.post(`/api/admin/reports/${id}/${action}`);
    };

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        // Add your authService.logout() call here if needed
        logoutSecurely();
        navigate('/login');
    };

    // --- Helper Functions for Styling ---
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'CRITICAL': return 'text-red-600';
            case 'HIGH': return 'text-orange-600';
            case 'MEDIUM': return 'text-blue-600';
            case 'LOW': return 'text-green-600';
            default: return 'text-slate-500';
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'PUBLISHED': return 'bg-green-100 text-green-800';
            case 'REVIEW': return 'bg-blue-100 text-blue-800';
            default: return 'bg-amber-100 text-amber-800';
        }
    };

    return (
        <div className="bg-slate-100 min-h-screen font-['DM_Sans']">

            {/* --- SIDEBAR --- */}
            <div className="fixed inset-y-0 left-0 w-60 bg-slate-950 text-white flex flex-col z-10">
                <div className="px-5 py-6 border-b border-slate-800">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/20">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-sm text-white leading-tight font-['Syne'] tracking-wide">HACK R3P0RT</p>
                            <p className="text-xs text-red-400 font-medium">Admin Console</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-2">Assessment</p>
                    
                    <Link to="/admin" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-red-600/10 border-l-2 border-red-600 text-white">
                        <LayoutDashboard className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium">Overview</span>
                    </Link>

                    <Link to="/admin/reports" className="group flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-900 transition-colors">
                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Reports</span>
                        {stats.pendingCount > 0 && (
                            <span className="ml-auto bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-md font-bold">{stats.pendingCount}</span>
                        )}
                    </Link>

                    <Link to="/admin/vulnerabilities" className="group flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-900 transition-colors">
                        <ShieldAlert className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Vulnerabilities</span>
                    </Link>

                    <Link to="/admin/targets" className="group flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-900 transition-colors">
                        <Target className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Targets</span>
                    </Link>

                    <Link to="/admin/clients" className="group flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-900 transition-colors">
                        <Users className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Clients</span>
                    </Link>

                    <Link to="/admin/settings" className="group flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-900 transition-colors">
                        <Settings className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Settings</span>
                    </Link>

                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-2 mt-4">Testing</p>
                    
                    <Link to="/admin/scans" className="group flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-900 transition-colors">
                        <Activity className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Active Scans</span>
                    </Link>

                    <Link to="/admin/exploits" className="group flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-900 transition-colors">
                        <Bug className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Exploits</span>
                    </Link>

                    <Link to="/admin/evidence" className="group flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-900 transition-colors">
                        <FolderLock className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Evidence</span>
                    </Link>

                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-2 mt-4">Tools</p>
                    
                    <Link to="/admin/templates" className="group flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-900 transition-colors">
                        <LayoutTemplate className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Templates</span>
                    </Link>
                </nav>

                <div className="px-3 py-4 border-t border-slate-800">
                    <button onClick={handleLogout} className="w-full group flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-red-900/20 transition-colors">
                        <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-red-400 transition-colors">Sign Out & Lock Vault</span>
                    </button>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="ml-60">
                {/* Top bar */}
                <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                    <div>
                        <h2 className="font-bold text-slate-900 text-lg font-['Syne'] tracking-tight">Assessment Overview</h2>
                        <p className="text-xs text-slate-500 mt-0.5">Welcome back, {user?.name || 'Administrator'}</p>
                    </div>
                    <div className="flex items-center space-x-3 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">System Online</span>
                    </div>
                </div>

                <div className="p-8">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Card 1 */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Assessments</p>
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                                    <LayoutDashboard className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-4xl font-black text-slate-900 font-['Syne']">{stats.assessmentCount}</p>
                            <p className="text-xs text-slate-500 mt-2 font-medium">In progress</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Critical Issues</p>
                                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                                    <ShieldAlert className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-4xl font-black text-red-600 font-['Syne']">{stats.criticalCount}</p>
                            <p className="text-xs text-slate-500 mt-2 font-medium">Unresolved</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Findings</p>
                                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                                    <Bug className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-4xl font-black text-slate-900 font-['Syne']">{stats.totalFindings}</p>
                            <p className="text-xs text-slate-500 mt-2 font-medium">Vulnerabilities found</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reports Issued</p>
                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500">
                                    <FileText className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-4xl font-black text-slate-900 font-['Syne']">{stats.reportCount}</p>
                            <p className="text-xs text-slate-500 mt-2 font-medium">Completed</p>
                        </div>
                    </div>

                    {/* Pending Reports Table */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h3 className="font-bold text-slate-900 font-['Syne']">Pending Reports</h3>
                                <p className="text-xs text-slate-500 mt-1">Review and finalize penetration test reports</p>
                            </div>
                            {stats.pendingCount > 0 && (
                                <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-200">
                                    {stats.pendingCount} pending review
                               </span>
                            )}
                        </div>

                        {reports.length === 0 ? (
                            <div className="px-6 py-16 text-center">
                                <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-sm font-medium text-slate-500">No pending reports at this time.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/80 border-b border-slate-100">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assessment</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Severity</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Findings</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {reports.map((report) => (
                                            <tr key={report.id} className="hover:bg-slate-50/80 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-black text-slate-600 font-['Syne']">
                                                            {report.title.charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-bold text-slate-800">{report.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{report.assessment.client.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-xs font-black tracking-wider ${getSeverityColor(report.maxSeverity)}`}>
                                                        {report.maxSeverity}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-slate-700">{report.findingCount}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${getStatusStyle(report.status)}`}>
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            onClick={() => handleAction(report.id, 'review')}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Review"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleAction(report.id, 'publish')}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                            title="Publish"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleAction(report.id, 'hold')}
                                                            className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                            title="Hold"
                                                        >
                                                            <PauseCircle className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;