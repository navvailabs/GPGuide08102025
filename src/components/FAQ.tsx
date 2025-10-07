import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = {
    "Subscription & Business": [
        {
            q: "Why weekly billing instead of monthly?",
            a: "We understand GP schedules are unpredictable. Weekly billing provides flexibility to pause during holidays, between positions, or during reduced hours without long-term financial commitments. You can upgrade, downgrade, or pause anytime."
        },
        {
            q: "What's the difference between Weekly and Pro plans?",
            a: "Weekly Plan ($14.99): Essential productivity tools for individual GPs - unlimited templates, mobile access, email support, EMR integration. Pro Plan ($22): Everything in Weekly PLUS priority support, advanced analytics, team collaboration, custom templates, and dedicated account management."
        },
        {
            q: "Can I cancel anytime? What's the refund policy?",
            a: "Yes, one-click cancellation with no questions asked. You keep access until your current week ends and can export all generated templates. We also offer a 30-day money-back guarantee if you're not completely satisfied."
        },
        {
            q: "How much time will I actually save?",
            a: "Our users average 5-8 hours saved weekly. Even saving just 3 hours weekly means GPGuide pays for itself based on standard GP hourly rates ($150+). Most GPs see ROI within the first week."
        }
    ],
    "Clinical & Compliance": [
        {
            q: "Do you store any patient information?",
            a: "Absolutely not. You input clinical presentation details only (symptoms, conditions, treatment requirements). No patient names, addresses, dates of birth, or personal identifiers. Templates are generated instantly and available for immediate download - no data retention."
        },
        {
            q: "Are your templates officially approved by RACGP?",
            a: "Our templates are educational tools based on RACGP Red Book principles, current medical literature, and clinical best practices. They require your professional review and clinical judgment for each patient. We regularly update content based on guideline changes."
        },
        {
            q: "What about professional indemnity and compliance?",
            a: "GPGuide templates provide structured educational frameworks based on best practices. Professional responsibility for clinical decisions and compliance remains with the treating GP. We maintain $2M professional indemnity insurance and all templates include compliance guidance."
        },
    ],
    "Technical": [
        {
            q: "Which EMR systems work with GPGuide?",
            a: "All major Australian EMR systems including Medical Director, Best Practice, Zedmed, HotDoc, and others. Templates use universal formatting for seamless copy-paste integration. No special software installation required."
        },
        {
            q: "Is there mobile access? What about offline use?",
            a: "Yes, full functionality available on iOS and Android apps with offline capability. Generate templates without internet connection and sync when online. All features work seamlessly across desktop, tablet, and mobile."
        },
        {
            q: "What support is available?",
            a: "Weekly Plan: Email support with 48-hour response time, comprehensive help documentation, video tutorials. Pro Plan: Priority support with 24-hour priority response, dedicated account manager, phone support, and personalized training sessions."
        }
    ]
};

const AccordionItem = ({ q, a }: { q: string, a: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
            >
                <span className="text-lg font-medium text-medical-blue">{q}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="h-6 w-6 text-medical-blue" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-600"
                    >
                        {a}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    return (
        <section id="faq" className="py-20 sm:py-24 bg-trust-gray">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold text-medical-blue">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Everything you need to know about GPGuide.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {Object.entries(faqData).map(([category, items]) => (
                        <motion.div 
                            key={category} 
                            className="mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-2xl font-bold text-medical-teal mb-4">{category}</h3>
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                {items.map((item, index) => (
                                    <AccordionItem key={index} q={item.q} a={item.a} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
