import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Brain, TrendingUp, Users, AlertOctagon } from 'lucide-react';

const Predictions = () => {
    // 1. Demand Forecast Data
    const demandData = [
        { day: 'Mon', actual: 45, predicted: 48 },
        { day: 'Tue', actual: 52, predicted: 50 },
        { day: 'Wed', actual: 49, predicted: 55 },
        { day: 'Thu', actual: 60, predicted: 65 },
        { day: 'Fri', actual: 75, predicted: 82 },
        { day: 'Sat', actual: 90, predicted: 110 },
        { day: 'Sun', actual: 65, predicted: 70 },
    ];

    // 2. Churn Data
    const churnData = [
        { name: 'Loyal', value: 60 },
        { name: 'At Risk', value: 15 },
        { name: 'Churned', value: 25 },
    ];
    const COLORS = ['#10b981', '#f59e0b', '#ef4444']; // Emerald, Amber, Red

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        <Brain size={24} />
                    </div>
                    <h1 className="text-3xl font-bold text-white">AI Demand & Churn Analytics</h1>
                </div>
                <p className="text-slate-400">Proprietary logic predicting trends with <span className="text-purple-400 font-semibold">94% Accuracy</span>.</p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 1. Demand Forecast */}
                <div className="bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <TrendingUp size={18} className="text-indigo-400" />
                                Next 7 Days Demand
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">Comparing Historical vs AI Prediction</p>
                        </div>
                        <div className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-md text-xs font-bold border border-indigo-500/30">
                            +40% SURGE (WEEKEND)
                        </div>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={demandData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="day" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="actual" stroke="#94a3b8" strokeWidth={2} name="Historical Avg" dot={false} />
                                <Line type="monotone" dataKey="predicted" stroke="#818cf8" strokeWidth={3} name="AI Prediction" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Churn Risk */}
                <div className="bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Users size={18} className="text-purple-400" />
                                Customer Churn Risk
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">Segmentation based on visit frequency</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        {/* Chart */}
                        <div className="h-64 w-64 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={churnData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {churnData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-2xl font-bold text-white">2k+</span>
                            </div>
                        </div>

                        {/* Insight Card */}
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl max-w-xs">
                            <div className="flex items-start gap-3">
                                <AlertOctagon className="text-red-400 shrink-0" size={20} />
                                <div>
                                    <p className="text-sm font-bold text-red-200 mb-1">High Risk Alert</p>
                                    <p className="text-xs text-red-200/70 leading-relaxed">
                                        AI identified <strong>3 Top Clients</strong> (Spending {'>'} ₹10k) at risk of churning.
                                    </p>
                                    <button className="mt-3 w-full py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-semibold rounded transition">
                                        Auto-Send Discount Coupon
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. New: General Insights */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Service Trends */}
                    <div className="bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Trending Services</h3>
                        <div className="space-y-4">
                            {[
                                { name: "Keratin Treatment", count: 45, trend: "+12%" },
                                { name: "Luxury Hair Dye", count: 38, trend: "+8%" },
                                { name: "Beard Grooming", count: 30, trend: "+15%" },
                                { name: "Charcoal Facial", count: 22, trend: "+5%" }
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg">
                                    <span className="text-sm font-medium">{s.name}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-white font-bold">{s.count}</span>
                                        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{s.trend}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Common Questions */}
                    <div className="bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Insights</h3>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                <p className="text-xs text-indigo-300 uppercase font-bold mb-1">Peak Booking Hour</p>
                                <p className="text-xl font-bold text-white">5:00 PM - 7:00 PM</p>
                                <p className="text-xs text-slate-400">Weekdays</p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                <p className="text-xs text-purple-300 uppercase font-bold mb-1">Top Revenue Source</p>
                                <p className="text-xl font-bold text-white">Color & Treatments</p>
                                <p className="text-xs text-slate-400">65% of total income</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Predictions;
