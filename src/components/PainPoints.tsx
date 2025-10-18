import { Clock, Calendar, FileText, FileEdit, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionGradientBackground from './ui/SectionGradientBackground';
import { GlassCrossIcon } from './ui/GlassCrossIcon';
import { GlassCheckIcon } from './ui/GlassCheckIcon';

const painPointsData = [
  {
    icon: Clock,
    title: "“I work until 9 PM finishing notes.”",
    pain: "Family time sacrificed for paperwork.",
    gain: "GPGuide saves up to 1.5 hours per day by drafting your care plan notes and MBS documentation."
  },
  {
    icon: Calendar,
    title: "“My practice is always running behind.”",
    pain: "Long wait times, reduced patient satisfaction.",
    gain: "Streamline consultations with ready-to-review templates and prefilled forms."
  },
  {
    icon: FileText,
    title: "“I struggle to keep up with guidelines.”",
    pain: "Risk of outdated or non-compliant documentation.",
    gain: "Instant access to evidence-based Australian guidelines integrated into your workflow."
  },
  {
    icon: FileEdit,
    title: "“My documentation feels incomplete.”",
    pain: "Increased medicolegal risk and stress.",
    gain: "Generate clear, comprehensive, and defensible draft notes in seconds."
  },
  {
    icon: Zap,
    title: "“I’m experiencing burnout and fatigue.”",
    pain: "Losing passion for medicine under admin load.",
    gain: "Refocus on patient care — not paperwork — and reignite your purpose."
  },
  {
    icon: Users,
    title: "“My practice struggles with consistency.”",
    pain: "Variable quality of care plans between clinicians.",
    gain: "Standardise excellence with shared, guideline-aligned templates for your team."
  }
];

const PainPoints = () => {
    return (
        <section id="features" className="relative overflow-hidden py-16 md:py-24">
            <SectionGradientBackground />
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">The Hidden Cost of GP Documentation</h2>
                    <p className="mt-4 text-lg text-neutral-300">
                      Every hour spent on admin is an hour lost to patient care. GPGuide helps Australian GPs reclaim their time, improve compliance, and restore work–life balance.
                    </p>
                </motion.div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical line */}
                    <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-white/10" />

                    <div className="space-y-16">
                        {painPointsData.map((point, index) => {
                            const Icon = point.icon;
                            const isRightSide = index % 2 !== 0;

                            return (
                                <motion.div
                                    key={index}
                                    className="relative flex items-start"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {/* Dot */}
                                    <div className="absolute top-0 left-4 md:left-1/2 -translate-x-1/2 mt-1.5 z-10">
                                        <div className="w-5 h-5 rounded-full bg-medical-blue border-2 border-cyan-400 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`w-full pl-12 md:pl-0 ${isRightSide ? 'md:pl-[calc(50%+2.5rem)]' : 'md:pr-[calc(50%+2.5rem)]'}`}>
                                        <motion.div 
                                            className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.07)] transition-all duration-300 hover:border-white/20 hover:bg-slate-800/60"
                                            whileHover={{ y: -5, scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
                                        >
                                            <div className="flex flex-col gap-4 text-left">
                                                <div className="w-12 h-12 flex items-center justify-center rounded-lg p-2 shadow-md bg-medical-blue/50 border border-white/20">
                                                    <Icon className="text-cyan-300 w-7 h-7" strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold leading-tight mb-3 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                                                        {point.title}
                                                    </h3>
                                                    <ul className="space-y-3 text-sm">
                                                        <li className="flex items-start gap-2.5">
                                                            <div className="mt-0.5 flex-shrink-0">
                                                              <GlassCrossIcon />
                                                            </div>
                                                            <p className="text-gray-400">{point.pain}</p>
                                                        </li>
                                                        <li className="flex items-start gap-2.5">
                                                            <div className="mt-0.5 flex-shrink-0">
                                                              <GlassCheckIcon />
                                                            </div>
                                                            <p className="font-semibold text-gray-200">{point.gain}</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
