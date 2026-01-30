import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import api from '../api/axios';
import ElectricBorder from './ElectricBorder';

// Note: framer-motion is used for animations. If not installed, standard div is fine, 
// but for "Beautiful" UI we will assume standard CSS transitions or install it. 
// For this step sticking to standard Tailwind for stability unless requested.

interface Service {
    _id: string;
    name: string;
    price: number;
    durationMins: number;
    requiredSkillLevel: string;
}

interface Stylist {
    _id: string;
    name: string;
    skillLevel: string;
}

const BookingForm: React.FC = () => {
    // Data State
    const [services, setServices] = useState<Service[]>([]);
    const [stylists, setStylists] = useState<Stylist[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        customerId: '65b123456789abcde0000004', // Fallback ID if fetch fails, usually we'd fetch customers too or have auth
        stylistId: '',
        serviceId: '',
        date: new Date(),
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [successData, setSuccessData] = useState<any>(null);

    // Enhanced UI State
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>('12:00');
    const [notes, setNotes] = useState('');

    // Fetch Data on Mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, stylistsRes, customerRes] = await Promise.all([
                    api.get('/data/services'),
                    api.get('/data/stylists'),
                    api.get('/data/customers') // Fetch a demo customer to auto-fill
                ]);

                setServices(servicesRes.data.data);
                setStylists(stylistsRes.data.data);

                // Auto-select a customer for demo purposes
                if (customerRes.data.data.length > 0) {
                    setFormData(prev => ({ ...prev, customerId: customerRes.data.data[0]._id }));
                }

                setLoadingData(false);
            } catch (err) {
                console.error('Failed to load initial data', err);
                setErrorMessage('Failed to connect to backend. Is the server running?');
                setLoadingData(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        if (!formData.stylistId || !formData.serviceId) {
            setStatus('error');
            setErrorMessage('Please select a Service and a Stylist.');
            return;
        }

        try {
            // Combine Date & Time
            if (!startDate) throw new Error("Please select a date");

            const [hours, minutes] = selectedTime.split(':').map(Number);
            const startDateTime = new Date(startDate);
            startDateTime.setHours(hours, minutes, 0, 0);

            const serviceDoc = services.find(s => s._id === formData.serviceId);
            const duration = serviceDoc ? serviceDoc.durationMins : 60;

            const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

            const payload = {
                customer: formData.customerId,
                stylist: formData.stylistId,
                service: formData.serviceId,
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                notes: notes
            };

            const response = await api.post('/appointments', payload);

            setStatus('success');
            setSuccessData(response.data);
        } catch (err: any) {
            console.error(err);
            setStatus('error');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const backendMsg = err.response?.data?.message || err.message || 'Booking failed';
            setErrorMessage(backendMsg);
        }
    };

    if (loadingData) {
        return <div className="text-white text-center animate-pulse">Loading Salon Data...</div>;
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

                <ElectricBorder color="#6366f1" className="relative bg-slate-900 rounded-2xl">
                    <div className="px-8 py-10 leading-none">

                        <div className="flex items-center space-x-3 mb-8">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                                ✨
                            </div>
                            <h2 className="text-xl font-semibold text-slate-100 uppercase tracking-wide">
                                Book Appointment
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Service Dropdown */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Select Service</label>
                                <select
                                    className="cursor-target w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    value={formData.serviceId}
                                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                                >
                                    <option value="">-- Choose a Service --</option>
                                    {services.map(s => (
                                        <option key={s._id} value={s._id}>
                                            {s.name} ({s.durationMins}m - ${s.price})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Stylist Dropdown */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Select Stylist</label>
                                <select
                                    className="cursor-target w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    value={formData.stylistId}
                                    onChange={(e) => setFormData({ ...formData, stylistId: e.target.value })}
                                >
                                    <option value="">-- Choose a Stylist --</option>
                                    {stylists.map(s => (
                                        <option key={s._id} value={s._id}>
                                            {s.name} ({s.skillLevel})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date & Time Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Date Picker */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-indigo-300 uppercase tracking-wider">Select Date</label>
                                    <div className="relative">
                                        <ReactDatePicker
                                            selected={startDate}
                                            onChange={(date: Date | null) => setStartDate(date)}
                                            className="cursor-target w-full bg-slate-800/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none backdrop-blur-xl transition hover:bg-slate-800/70"
                                            placeholderText="Pick a date"
                                            minDate={new Date()}
                                            dateFormat="MMMM d, yyyy"
                                        />
                                    </div>
                                </div>

                                {/* Styled Time Selector (Pills) */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-indigo-300 uppercase tracking-wider">Select Time</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                                            <button
                                                type="button"
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`cursor-target py-2 px-1 rounded-lg text-xs font-bold transition-all duration-200 border ${selectedTime === time
                                                    ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/25 scale-105'
                                                    : 'bg-slate-800/50 text-slate-400 border-white/5 hover:bg-slate-700 hover:text-white'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Special Requests</label>
                                <textarea
                                    className="cursor-target w-full bg-slate-800/50 border border-white/10 text-white rounded-xl px-4 py-3 h-24 focus:ring-2 focus:ring-purple-500 focus:outline-none transition resize-none placeholder:text-slate-600"
                                    placeholder="Any allergies or preferences?"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>

                            <input type="hidden" value={formData.customerId} />

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={`cursor-target w-full py-4 px-4 rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] font-semibold tracking-wide
                  ${status === 'loading'
                                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-indigo-500/25'
                                        }`}
                                >
                                    {status === 'loading' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : 'Confirm Appointment'}
                                </button>
                            </div>

                            {/* Status Messages */}
                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg flex items-center gap-2">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            {status === 'success' && (
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-lg">
                                    <div className="flex items-center gap-2 font-semibold text-emerald-300 mb-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        Success!
                                    </div>
                                    Your appointment ID is <span className="font-mono bg-emerald-500/20 px-1 rounded">{successData?.data?.appointment?._id}</span>
                                </div>
                            )}
                        </form>
                    </div>
                </ElectricBorder>
            </div>
        </div>
    );
};

export default BookingForm;
