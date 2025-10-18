import { motion } from 'framer-motion';
import { AccordionItem } from '@/components/ui/AccordionItem';

const faqData = {
    "Subscription & Business": [
        {
            q: "Why weekly billing instead of monthly?",
            a: "We understand GP schedules are unpredictable. Weekly billing provides flexibility to pause during holidays, between positions, or during reduced hours without long-term financial commitments. You can upgrade, downgrade, or pause anytime."
        },
        {
            q: "What's the difference between Essential and Professional plans?",
            a: "Essential Plan ($14.99): Essential productivity tools for individual GPs - unlimited templates, mobile access, email support, EMR integration. Professional Plan ($22): Everything in Essential PLUS priority support, advanced analytics, team collaboration, custom templates, and dedicated account management."
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
            a: "Essential Plan: Email support with 48-hour response time, comprehensive help documentation, video tutorials. Professional Plan: Priority support with 24-hour priority response, dedicated account manager, phone support, and personalized training sessions."
        }
    ]
};

const FAQ = () => {
    return (
        <section id="faq" className="py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-neutral-300">
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
                            <h3 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">{category}</h3>
                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <AccordionItem key={index} question={item.q} answer={item.a} />
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
