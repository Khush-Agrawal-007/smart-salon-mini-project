import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-[20%] right-[30%] w-[30%] h-[30%] bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Header */}
                <header className="px-6 py-6 border-b border-white/5 bg-white/5 backdrop-blur-md">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <h1 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Smart Salon
                        </h1>
                        <nav className="flex items-center space-x-1">
                            <NavLink to="/" label="Book" />
                            <NavLink to="/dashboard" label="Manager" />
                            <div className="w-px h-6 bg-slate-700 mx-2"></div>
                            <NavLink to="/staff" label="Staff" />
                            <NavLink to="/inventory" label="Inventory" />
                            <NavLink to="/predictions" label="AI Insight" />
                        </nav>

                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow flex items-center justify-center p-6">
                    <div className="w-full max-w-6xl">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-6 text-center text-slate-500 text-xs">
                    © 2026 Smart Salon Management System. Built with MERN Stack.
                </footer>
            </div>
        </div>
    );
};

// Helper for Nav Links
const NavLink: React.FC<{ to: string; label: string }> = ({ to, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
                ? 'bg-indigo-500/20 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
        >
            {label}
        </Link>
    );
};

export default Layout;
