import BookingForm from '../components/BookingForm';

const Home = () => {
    return (
        <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Col: Text */}
            <div className="space-y-6 text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent pb-2">
                    Style. <br />
                    Precision. <br />
                    Excellence.
                </h1>
                <p className="text-lg text-slate-400 max-w-md mx-auto md:mx-0 leading-relaxed">
                    Experience the next generation of salon management. Book your premium appointment with our expert stylists in seconds.
                </p>

                <div className="flex gap-4 justify-center md:justify-start pt-4">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white">4.9</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wide">Rating</span>
                    </div>
                    <div className="w-px h-10 bg-slate-700"></div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white">15+</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wide">Stylists</span>
                    </div>
                    <div className="w-px h-10 bg-slate-700"></div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white">2k+</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wide">Clients</span>
                    </div>
                </div>
            </div>

            {/* Right Col: Form */}
            <div>
                <BookingForm />
            </div>
        </div>
    );
};

export default Home;
