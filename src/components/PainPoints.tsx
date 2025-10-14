import { Clock, Calendar, FileText, FileEdit, Zap, Users, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionGradientBackground from './ui/SectionGradientBackground';

const painPointsData = [
  {
    icon: Clock,
    title: `"I work until 9 PM finishing notes."`,
    pain: "Family time sacrificed for paperwork.",
    gain: "GPGuide saves you an average of 1.5 hours per day."
  },
  {
    icon: Calendar,
    title: `"My practice is always running behind."`,
    pain: "Patient satisfaction drops with long wait times.",
    gain: "Streamline consultations with instant templates."
  },
  {
    icon: FileText,
    title: `"I struggle to keep up with guidelines."`,
    pain: "Risk of outdated or non-compliant care.",
    gain: "Access evidence-based Australian guidelines."
  },
  {
    icon: FileEdit,
    title: `"My documentation feels incomplete."`,
    pain: "Increased medicolegal risk and stress.",
    gain: "Generate comprehensive, defensible notes in seconds."
  },
  {
    icon: Zap,
    title: `"I'm experiencing burnout and fatigue."`,
    pain: "Losing passion for medicine due to admin load.",
    gain: "Focus on patient care, not paperwork, and reignite your passion."
  },
  {
    icon: Users,
    title: `"My practice struggles with consistency."`,
    pain: "Variable quality of care plans across practitioners.",
    gain: "Standardise excellence with shared templates for your whole team."
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
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">The Hidden Cost of the Documentation Burden</h2>
                    <p className="mt-4 text-lg text-gray-300">
                      Follow the journey from administrative drain to clinical efficiency, and see how GPGuide restores the balance.
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
                                            className="glass-card p-6"
                                            whileHover={{ y: -5, scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
                                        >
                                            <div className="flex flex-col gap-4 text-left">
                                                <div className="w-12 h-12 flex items-center justify-center rounded-lg p-2 shadow-md bg-medical-blue/50 border border-white/20">
                                                    <Icon className="text-cyan-300 w-7 h-7" strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold leading-tight text-white mb-3">
                                                        {point.title}
                                                    </h3>
                                                    <ul className="space-y-2.5 text-sm">
                                                        <li className="flex items-start">
                                                            <X className="h-4 w-4 text-red-400 mr-2.5 mt-0.5 flex-shrink-0" strokeWidth={3} />
                                                            <p className="text-gray-400">{point.pain}</p>
                                                        </li>
                                                        <li className="flex items-start">
                                                            <Check className="h-4 w-4 text-green-400 mr-2.5 mt-0.5 flex-shrink-0" strokeWidth={3} />
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
