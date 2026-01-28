import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Calendar, AlertTriangle, TrendingUp, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/dashboard/stats');
                setStats(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Mock Data for Chart (Since we don't have daily history yet)
    const chartData = [
        { name: 'Mon', appointments: 4 },
        { name: 'Tue', appointments: 3 },
        { name: 'Wed', appointments: 2 },
        { name: 'Thu', appointments: 6 },
        { name: 'Fri', appointments: 8 },
        { name: 'Sat', appointments: 9 },
        { name: 'Sun', appointments: 5 },
    ];

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
                <div className="animate-pulse">Loading Dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Manager Dashboard
                    </h1>
                    <p className="text-slate-400">Welcome back, Admin</p>
                </div>
                <Link to="/" className="px-4 py-2 bg-slate-800 rounded-lg text-sm hover:bg-slate-700 transition">
                    Back to Booking
                </Link>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Revenue */}
                <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <DollarSign size={64} />
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Total Revenue</p>
                            <h3 className="text-2xl font-bold">${stats?.totalRevenue}</h3>
                        </div>
                    </div>
                </div>

                {/* Bookings */}
                <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <Calendar size={64} />
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Total Bookings</p>
                            <h3 className="text-2xl font-bold">{stats?.totalAppointments}</h3>
                        </div>
                    </div>
                </div>

                {/* Low Stock Alert */}
                <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <AlertTriangle size={64} />
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-red-500/20 rounded-xl text-red-400">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Low Stock Items</p>
                            <h3 className="text-2xl font-bold text-red-400">{stats?.lowStockCount}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Chart Section */}
                <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-6">Appointments Overview</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="appointments" fill="#818cf8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Low Stock Table */}
                <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-red-400" />
                        Restock Needed
                    </h3>

                    {stats?.lowStockItems?.length === 0 ? (
                        <p className="text-slate-500 text-sm">All inventory levels are healthy.</p>
                    ) : (
                        <div className="space-y-4">
                            {stats?.lowStockItems.map((item: any) => (
                                <div key={item._id} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                    <div>
                                        <p className="font-medium text-sm">{item.itemName}</p>
                                        <p className="text-xs text-slate-400">SKU: {item.sku}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-red-400 font-bold text-lg">{item.stockLevel}</span>
                                        <p className="text-xs text-slate-500">{item.unit}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
