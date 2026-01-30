import { Scissors, Zap, Award } from 'lucide-react';

const Staff = () => {
    // Hardcoded Showcase Data
    const staff = [
        {
            id: 1,
            name: "Alice Styles",
            role: "Senior Stylist",
            skillLevel: "Expert",
            specialization: "Colorist & Treatments",
            efficiency: 98,
            clients: 124,
            image: "AS"
        },
        {
            id: 2,
            name: "Elena Vogue",
            role: "Creative Director",
            skillLevel: "Expert",
            specialization: "High-End Bridal",
            efficiency: 99,
            clients: 210,
            image: "EV"
        },
        {
            id: 3,
            name: "Bob Cutter",
            role: "Junior Stylist",
            skillLevel: "Basic",
            specialization: "Men's Cuts",
            efficiency: 85,
            clients: 45,
            image: "BC"
        },
        {
            id: 4,
            name: "Davina Smooth",
            role: "Spa Specialist",
            skillLevel: "Intermediate",
            specialization: "Keratin & Rebonding",
            efficiency: 92,
            clients: 89,
            image: "DS"
        },
        {
            id: 5,
            name: "Mike Razor",
            role: "Head Barber",
            skillLevel: "Intermediate",
            specialization: "Beard & Grooming",
            efficiency: 95,
            clients: 156,
            image: "MR"
        }
    ];

    const getBadgeColor = (level: string) => {
        switch (level) {
            case 'Expert': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
            case 'Intermediate': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
            case 'Basic': return 'bg-slate-500/20 text-slate-300 border-slate-500/50';
            default: return 'bg-slate-500/20 text-slate-300';
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Workforce Management</h1>
                <p className="text-slate-400">Manage your talent pool based on <span className="text-indigo-400 font-semibold">Skill Level Architecture</span>.</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {staff.map((s) => (
                    <div key={s.id} className="relative group bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1">
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-2xl transition duration-500"></div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* Avatar */}
                            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-[2px] mb-4">
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold text-white">
                                    {s.image}
                                </div>
                            </div>

                            {/* Name & Role */}
                            <h3 className="text-lg font-bold text-white">{s.name}</h3>
                            <p className="text-sm text-slate-400 mb-3">{s.role}</p>

                            {/* Skill Badge */}
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(s.skillLevel)} mb-6 flex items-center gap-1`}>
                                <Award size={12} />
                                {s.skillLevel}
                            </div>

                            {/* Metrics Grid */}
                            <div className="w-full grid grid-cols-2 gap-2 border-t border-white/5 pt-4">
                                <div className="flex flex-col items-center">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Efficiency</span>
                                    <div className="flex items-center gap-1 text-emerald-400 font-bold">
                                        <Zap size={14} />
                                        {s.efficiency}%
                                    </div>
                                </div>
                                <div className="flex flex-col items-center border-l border-white/5">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Active Clients</span>
                                    <div className="flex items-center gap-1 text-slate-200 font-bold">
                                        <Scissors size={14} />
                                        {s.clients}
                                    </div>
                                </div>
                            </div>

                            {/* Specialization Footer */}
                            <div className="mt-4 text-xs text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-md w-full">
                                {s.specialization}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Staff;
