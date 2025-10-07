import { motion } from 'framer-motion';
import { ShieldCheck, Lock, CheckCircle } from 'lucide-react';

const Trust = () => {
    const badges = [
        { text: "Used by 500+ GPs Nationwide" },
        { text: "$2M Professional Indemnity Coverage" },
        { text: "Australian Privacy Law Compliant" },
        { text: "98% Customer Satisfaction" },
        { text: "Works with All Major EMRs" },
    ];

    const securityPoints = [
        "Bank-level encryption (AES-256)",
        "No patient identifiers stored",
        "Australian Privacy Principles compliant",
        "Regular security audits and updates",
        "Professional indemnity insurance coverage"
    ];

    return (
        <section className="py-20 sm:py-24 bg-medical-blue">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Your Data Security is Our Priority</h2>
                        <p className="mt-4 text-gray-300">We are committed to the highest standards of data protection and privacy, ensuring your practice and patient information remains secure.</p>
                        <ul className="mt-6 space-y-3">
                            {securityPoints.map(point => (
                                <li key={point} className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-success-green mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-200">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        className="flex flex-wrap justify-center gap-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {badges.map((badge, index) => (
                            <div key={index} className="glass-card flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium text-white">
                                <ShieldCheck className="h-5 w-5 text-success-green" />
                                <span>{badge.text}</span>
                            </div>
                        ))}
                        <div className="w-full flex justify-center space-x-4 mt-4">
                            <div className="bg-white/20 p-3 rounded-lg text-white font-bold text-sm">ISO 27001</div>
                            <div className="bg-white/20 p-3 rounded-lg text-white font-bold text-sm">Australian Made</div>
                            <div className="bg-white/20 p-3 rounded-lg text-white font-bold text-sm">Privacy Compliant</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Trust;
