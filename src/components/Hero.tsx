import { motion } from 'framer-motion';
import { Zap, ShieldCheck, FileText, DollarSign, CheckCircle } from 'lucide-react';
import { TextShimmer } from './ui/text-shimmer';

const Hero = () => {
    const features = [
        { icon: Zap, text: "Save 5+ Hours Weekly" },
        { icon: ShieldCheck, text: "No Patient Data Stored" },
        { icon: FileText, text: "Professional Templates" },
        { icon: DollarSign, text: "Boost Practice Revenue" }
    ];

    return (
        <section className="relative w-full overflow-hidden bg-background-light dark:bg-background-dark font-body text-text-secondary dark:text-gray-300">
            <div className="absolute top-0 left-0 w-full h-[120vh] bg-gradient-to-r from-primary-gradient-start to-primary-gradient-end transform -skew-y-6 -translate-y-24" style={{ zIndex: 0 }}></div>
            
            <main className="relative z-10 px-6 pt-16 pb-8 sm:pt-24 sm:pb-12 lg:px-8">
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    <div className="lg:col-span-6 flex flex-col items-start text-left">
                        <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-green-300 rounded-full bg-green-500/20 ring-1 ring-inset ring-green-400/30">
                            <span className="w-2 h-2 mr-2 bg-green-400 rounded-full animate-pulse"></span>
                            Used by 500+ Australian GPs
                        </span>

                        <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-white tracking-tighter leading-tight mb-4">
                            HIGH YIELD GP <br />
                            <span className="text-accent-gold">RESOURCE GUIDE</span>
                        </h1>

                        <p className="text-lg text-white/80 mb-4">For GPs, GP Registrars, Aspiring GPs</p>
                        <p className="text-lg text-white/90 mb-8 max-w-xl">
                            Stop drowning in documentation. Generate professional care plan templates in minutes, not hours. Reclaim your time for patient care while maintaining clinical excellence.
                        </p>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 text-white/90 w-full">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <feature.icon className="w-5 h-5 text-accent-gold flex-shrink-0" />
                                    <span>{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full sm:w-auto">
                            <a className="inline-block text-center font-bold text-text-primary bg-accent-gold hover:bg-yellow-500 transition-all duration-300 rounded-lg px-8 py-4 shadow-layered-lg transform hover:scale-105" href="#pricing">
                                Start Weekly Plan
                                <span className="block text-sm font-normal opacity-75">$14.99/week</span>
                            </a>
                            <a className="inline-flex flex-col items-center justify-center text-center font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 rounded-lg px-8 py-4 shadow-layered-lg transform hover:scale-105" href="#pricing">
                                Choose Pro Plan
                                <span className="block text-sm font-normal opacity-75">$22/week</span>
                            </a>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-6 gap-y-2 text-white/70 text-sm mt-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>Cancel anytime, no contracts</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>500+ active Australian GPs</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative h-[500px] lg:h-auto @container">
                        <div className="relative w-full h-full bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-xl shadow-layered-xl border border-white/20 dark:border-white/10 p-6">
                            <div className="h-full flex flex-col border border-border-light dark:border-border-dark rounded-lg bg-surface-light dark:bg-surface-dark shadow-inner-light dark:shadow-inner-dark">
                                <div className="flex items-center justify-between p-3 border-b border-border-light dark:border-border-dark">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                                        <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                                        <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                                    </div>
                                    <p className="text-sm font-medium text-text-primary dark:text-gray-300">Template Generator</p>
                                    <div className="w-12"></div>
                                </div>
                                <div className="flex-1 p-4 @sm:p-6 space-y-4 overflow-y-auto">
                                    <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-layered">
                                        <label className="block text-sm font-bold text-text-primary dark:text-white mb-2" htmlFor="patient-condition">Patient Condition</label>
                                        <input className="w-full px-4 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-md focus:ring-2 focus:ring-primary-gradient-start focus:border-transparent transition" id="patient-condition" type="text" defaultValue="Type 2 Diabetes Mellitus" />
                                    </div>
                                    
                                    <div className="text-sm text-text-secondary dark:text-gray-400 px-1">
                                        <span className="font-medium">Process:</span> Input → <span className="text-accent-gold font-semibold">Generate</span> → Export
                                    </div>
                                    
                                    <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-layered flex flex-col items-center justify-center text-center h-40">
                                        <TextShimmer className='font-mono text-sm [--base-color:theme(colors.text-secondary)] dark:[--base-color:theme(colors.gray.400)] [--base-gradient-color:theme(colors.text-primary)] dark:[--base-gradient-color:theme(colors.white)]' duration={1.5}>
                                            Generating template...
                                        </TextShimmer>
                                        <p className="text-text-secondary dark:text-gray-500 text-xs mt-2 animate-pulse">
                                            Analyzing "Type 2 Diabetes Mellitus" input...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-screen-xl mx-auto mt-16">
                    <div className="p-4 bg-disclaimer-light dark:bg-disclaimer-dark rounded-lg border border-border-light dark:border-border-dark">
                        <p className="text-xs text-text-secondary dark:text-gray-400 text-center">
                            Disclaimer: GPGuide is a clinical decision support tool and should be used to supplement, not replace, professional medical judgment. All patient information is hypothetical and for illustrative purposes only.
                        </p>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default Hero;
