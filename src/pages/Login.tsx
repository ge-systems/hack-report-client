import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api'; // 0. Use our specialized API instance
import { useAuth } from '../utils/AuthContext';
import { deriveKey } from '../utils/crypto';
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { loginSecurely } = useAuth();
    
    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

 const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/api/auth/login', {
                email,
                password
            });

            // The backend must return a Salt and User Metadata
            const { userSalt, isAdmin, name, role } = response.data;

            if (!userSalt) {
                throw new Error("Security Error: No Salt received from server.");
            }

            // Derive the encryption key locally
            // This happens on the user's CPU. The password is consumed..
            const cryptoKey = await deriveKey(password, userSalt);

            loginSecurely(cryptoKey, { name, role, isAdmin });

            // Redirects based on privileges
            navigate(isAdmin ? '/admin' : '/dashboard');

        } catch (err: any) {
            console.error("Login Error:", err);
            setError(
                err.response?.data?.message || 
                err.message || 
                'Login failed. Please check your credentials.'
            );
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-['DM_Sans']">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-900/20">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-white font-['Syne'] tracking-tight uppercase">HACK R3P0RT</h1>
                    <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-medium">Zero-Trust Security Platform</p>
                </div>

                {/* Form Card */}
                <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-900/30 border border-red-800/50 rounded-xl text-red-300 text-sm flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                placeholder="analyst@agency.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Master Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                placeholder="••••••••"
                            />
                            <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-tighter">
                                Password is used for local key derivation and is never stored unhashed.
                            </p>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-900/30 mt-4 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span className="tracking-widest">DERIVING KEY...</span>
                                </>
                            ) : (
                                <span className="tracking-widest">UNLOCK VAULT</span>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-slate-400 text-sm mt-6">
                        Need an account? 
                        <Link to="/register" className="text-red-500 hover:text-red-400 font-bold ml-1 transition-colors">Register</Link>
                    </p>
                </div>

                <p className="text-center text-slate-500 text-xs mt-10 font-medium">
                    © 2026 HACK R3P0RT • Professional Penetration Testing Reports
                </p>
            </div>
        </div>
    );
};

export default Login;