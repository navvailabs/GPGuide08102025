import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const templates = [
    {
        title: 'Chronic Disease Management Plan',
        time: 'Generated in 4 minutes vs. 35 minutes manually',
        features: [
            'Comprehensive assessment framework',
            'Evidence-based intervention strategies',
            'Clear measurable goals and timelines'
        ],
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/800x500/1E40AF/FFFFFF?text=CDM+Plan'
    },
    {
        title: 'Mental Health Care Plan',
        time: 'Generated in 5 minutes vs. 40 minutes manually',
        features: [
            'Mental health screening integration',
            'Collaborative care approach',
            'Referral pathway optimization'
        ],
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/800x500/1E40AF/FFFFFF?text=MHCP'
    },
    {
        title: 'GP Management Plan',
        time: 'Generated in 3 minutes vs. 25 minutes manually',
        features: [
            'Risk stratification guidance',
            'Lifestyle intervention protocols',
            'Monitoring schedule templates'
        ],
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/800x500/1E40AF/FFFFFF?text=GPMP'
    }
];

const Showcase = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection: number) => {
        setPage([(page + newDirection + templates.length) % templates.length, newDirection]);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const currentTemplate = templates[page];

    return (
        <section id="testimonials" className="py-20 sm:py-24 bg-trust-gray text-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold text-medical-blue">Professional Templates That Save Time</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        See exactly what GPGuide generates for you - no patient data required.
                    </p>
                </motion.div>

                <div className="relative h-[600px] md:h-[500px] max-w-4xl mx-auto flex items-center justify-center overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute w-full grid md:grid-cols-2 gap-8 items-center"
                        >
                            <img src={currentTemplate.image} alt={currentTemplate.title} className="rounded-lg shadow-2xl w-full" />
                            <div className="text-left">
                                <h3 className="text-2xl font-bold text-medical-blue">{currentTemplate.title}</h3>
                                <p className="text-premium-gold font-semibold my-2">{currentTemplate.time}</p>
                                <ul className="space-y-2 mt-4">
                                    {currentTemplate.features.map(feature => (
                                        <li key={feature} className="flex items-center text-gray-700">
                                            <CheckCircle className="h-5 w-5 mr-2 text-success-green" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="mt-6 bg-medical-blue text-white font-semibold py-2 px-6 rounded-lg hover:bg-medical-teal transition-colors">
                                    View Full Template
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                        <button onClick={() => paginate(-1)} className="bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition">
                            <ChevronLeft className="h-6 w-6 text-medical-blue" />
                        </button>
                    </div>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                        <button onClick={() => paginate(1)} className="bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition">
                            <ChevronRight className="h-6 w-6 text-medical-blue" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
