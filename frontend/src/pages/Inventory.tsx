import React from 'react';
import { Package, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

const Inventory = () => {
    // Hardcoded Showcase Data matching Seed
    const inventory = [
        { id: 101, name: "Matrix SoColor Red", category: "Hair Color", stock: 120, unit: "ml", reorder: 500, status: "Critical", service: "Luxury Hair Dye", expiry: "Dec 31, 2026" },
        { id: 102, name: "Electric Blue Dye", category: "Hair Color", stock: 800, unit: "ml", reorder: 200, status: "Healthy", service: "Creative Color", expiry: "Jun 30, 2027" },
        { id: 103, name: "Gold Keratin Tub", category: "Treatment", stock: 5, unit: "tubs", reorder: 8, status: "Critical", service: "Keratin Treatment", expiry: "Aug 20, 2026" },
        { id: 104, name: "Charcoal Face Mask", category: "Skin Care", stock: 200, unit: "packets", reorder: 50, status: "Healthy", service: "Detox Facial", expiry: "May 15, 2026" },
        { id: 105, name: "Sandalwood Beard Oil", category: "Grooming", stock: 50, unit: "bottles", reorder: 15, status: "Healthy", service: "Beard Grooming", expiry: "Jan 01, 2029" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Smart Inventory & Logistics</h1>
                    <p className="text-slate-400">Automated deduction and <span className="text-red-400 font-semibold">Real-time Stock Alerts</span>.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition">
                    <RefreshCw size={16} />
                    Sync with Warehouse
                </button>
            </div>

            {/* Table */}
            <div className="bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                            <th className="p-6 font-semibold">Product Name</th>
                            <th className="p-6 font-semibold">Category</th>
                            <th className="p-6 font-semibold">Stock Level</th>
                            <th className="p-6 font-semibold text-center">Status Alert</th>
                            <th className="p-6 font-semibold">Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                        {inventory.map((item) => (
                            <tr key={item.id} className="hover:bg-white/5 transition duration-150">
                                <td className="p-6 font-medium text-white flex items-center gap-3">
                                    <div className="p-2 bg-slate-700/50 rounded-lg">
                                        <Package size={16} className="text-indigo-400" />
                                    </div>
                                    {item.name}
                                </td>
                                <td className="p-6 text-slate-400">{item.category}</td>
                                <td className="p-6 font-mono">
                                    <span className={item.stock < item.reorder ? "text-red-400 font-bold" : "text-emerald-400"}>
                                        {item.stock}
                                    </span>
                                    <span className="text-slate-500 text-xs ml-1">{item.unit}</span>
                                </td>
                                <td className="p-6 flex justify-center">
                                    {item.status === 'Critical' && (
                                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold animate-pulse">
                                            <AlertTriangle size={12} /> CRITICAL LOW
                                        </span>
                                    )}
                                    {item.status === 'Low' && (
                                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 text-xs font-bold">
                                            <AlertTriangle size={12} /> REORDER SOON
                                        </span>
                                    )}
                                    {item.status === 'Healthy' && (
                                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                                            <CheckCircle size={12} /> HEALTHY
                                        </span>
                                    )}
                                </td>
                                <td className="p-6 text-slate-400 italic font-mono text-xs">
                                    {item.expiry}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/5">
                    <p className="text-slate-500 text-xs uppercase mb-1">Total Valuation</p>
                    <p className="text-2xl font-bold text-white">₹ 4,50,000</p>
                </div>
                <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/5">
                    <p className="text-slate-500 text-xs uppercase mb-1">Items to Restock</p>
                    <p className="text-2xl font-bold text-red-400">3 Items</p>
                </div>
                <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/5">
                    <p className="text-slate-500 text-xs uppercase mb-1">Monthly Usage</p>
                    <p className="text-2xl font-bold text-indigo-400">+12% vs Last Mo</p>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
