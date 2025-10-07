import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

const PainPoints = () => {
    const points = [
        {
            title: "I work until 9 PM finishing notes",
            pains: ["2.5 hours daily on paperwork", "Missing family dinners", "Burnout from documentation"],
            gain: "GPGuide: 45 minutes daily instead",
            result: "Home by 6 PM, reclaim your evenings"
        },
        {
            title: "Every practice has different templates",
            pains: ["Wasting time adapting", "Inconsistent documentation", "Registrar/locum confusion"],
            gain: "GPGuide: One platform works everywhere",
            result: "Consistent professional templates"
        },
        {
            title: "Missing $10,000+ in billing",
            pains: ["Too rushed for CDM/MHCP plans", "Leaving money on the table", "Practice revenue suffering"],
            gain: "GPGuide: Capture every eligible item",
            result: "Templates designed for maximum billing"
        },
        {
            title: "Compliance keeps me awake at night",
            pains: ["Worried about RACGP audit failures", "Guidelines constantly changing", "Indemnity concerns"],
            gain: "GPGuide: Built-in best practices",
            result: "Peace of mind with structured templates"
        },
        {
            title: "No time for professional growth",
            pains: ["Learning takes backseat to admin", "Falling behind on best practices", "Career stagnation"],
            gain: "GPGuide: Learn while you document",
            result: "Educational prompts build skills"
        },
        {
            title: "Isolation - am I doing this right?",
            pains: ["No senior GP guidance available", "Imposter syndrome", "Rural/registrar isolation"],
            gain: "GPGuide: Structured guidance included",
            result: "Confidence through consistent quality"
        }
    ];

    return (
        <section id="features" className="py-20 sm:py-24 bg-medical-blue">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold text-white">The Hidden Cost of Documentation Burden</h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Australian GPs face unprecedented administrative challenges that are destroying work-life balance.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {points.map((point, index) => (
                        <motion.div
                            key={point.title}
                            className="glass-card p-6 flex flex-col"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h3 className="text-xl font-bold text-white mb-4">"{point.title}"</h3>
                            <div className="space-y-2 mb-4">
                                {point.pains.map(pain => (
                                    <div key={pain} className="flex items-center text-red-400">
                                        <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                                        <span>{pain}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-auto pt-4 border-t border-white/20">
                                <div className="flex items-center text-success-green font-semibold">
                                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                                    <span>{point.gain}</span>
                                </div>
                                <p className="mt-2 text-gray-300">{point.result}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
