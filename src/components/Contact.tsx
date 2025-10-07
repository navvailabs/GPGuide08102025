import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, BookOpen } from 'lucide-react';

const Contact = () => {
    const contactMethods = [
        { icon: Mail, title: "Email Support", detail: "support@gpguide.com.au", response: "48-hour response guarantee" },
        { icon: Phone, title: "Pro Plan Phone Support", detail: "1800-GP-GUIDE", response: "Priority phone access" },
        { icon: MessageSquare, title: "Live Chat", detail: "Available 9 AM - 6 PM AEST", response: "Instant help during business hours" },
        { icon: BookOpen, title: "Training Resources", detail: "Comprehensive video library & guides", response: "24/7 self-help available" }
    ];

    return (
        <section className="py-20 sm:py-24 bg-trust-gray text-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-medical-blue">Get Help When You Need It</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Our Australian-based support team understands the challenges GPs face and is here to provide real help from real people.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {contactMethods.map((method, index) => (
                        <motion.div
                            key={method.title}
                            className="bg-white p-6 rounded-xl shadow-lg text-center"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex justify-center mb-4">
                                <div className="bg-medical-blue/10 p-4 rounded-full">
                                    <method.icon className="h-8 w-8 text-medical-blue" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-medical-blue">{method.title}</h3>
                            <p className="mt-2 font-semibold text-medical-teal">{method.detail}</p>
                            <p className="mt-1 text-sm text-gray-500">{method.response}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
