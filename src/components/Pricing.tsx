import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing = () => {
    const plans = [
        {
            name: 'Weekly Plan',
            price: '$14.99',
            billing: '/week',
            description: 'Perfect for Individual GPs',
            features: [
                'Unlimited care plan templates',
                'Professional formatting ready for EMR',
                'Mobile app access',
                'Email support (48hr response)',
                'Copy-paste integration',
                'Basic usage analytics',
            ],
            cta: 'Start Weekly Plan',
            isPopular: false,
            roi: 'Pays for itself by saving 1 hour per week',
            value: 'ROI: $300+ monthly value for $60 cost'
        },
        {
            name: 'Pro Plan',
            price: '$22',
            billing: '/week',
            description: 'Complete Practice Transformation',
            features: [
                'Everything in Weekly Plan',
                'Priority support (24hr response)',
                'Advanced practice analytics',
                'Team collaboration tools',
                'Custom template creation',
                'Bulk export capabilities',
                'Dedicated account manager',
            ],
            cta: 'Choose Pro Plan',
            isPopular: true,
            roi: 'Save 8+ hours weekly - $400+ monthly value',
            value: 'ROI: $800+ monthly value for $88 cost'
        },
    ];

    return (
        <section id="pricing" className="py-20 sm:py-24 bg-trust-gray text-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold text-medical-blue">Choose Your Productivity Plan</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Flexible weekly subscriptions designed for busy healthcare professionals.
                        <br />
                        No contracts • Immediate access • Start saving time today
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            className={`relative border rounded-2xl p-8 flex flex-col ${plan.isPopular ? 'border-premium-gold bg-white shadow-2xl' : 'border-gray-200 bg-white shadow-lg'}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            {plan.isPopular && (
                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-premium-gold text-white px-4 py-1 rounded-full text-sm font-bold">
                                    MOST POPULAR
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-medical-blue">{plan.name}</h3>
                            <p className="mt-2 text-gray-500">{plan.description}</p>
                            
                            <div className="mt-6">
                                <span className="text-5xl font-bold text-medical-blue">{plan.price}</span>
                                <span className="text-lg text-gray-500">{plan.billing}</span>
                                <p className="text-sm text-gray-500 mt-1">Billed weekly • Cancel anytime</p>
                            </div>

                            <ul className="mt-8 space-y-4 flex-grow">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="h-6 w-6 text-success-green mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <button className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-transform duration-300 hover:scale-105 ${plan.isPopular ? 'bg-gold-gradient text-white' : 'bg-medical-blue text-white'}`}>
                                    {plan.cta}
                                </button>
                                <div className="mt-4 text-center text-sm text-gray-600 bg-gray-100 p-2 rounded-md">
                                    <p className="font-semibold">{plan.roi}</p>
                                    <p>{plan.value}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    className="mt-12 text-center text-gray-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-success-green" />All prices include GST</li>
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-success-green" />No setup fees or hidden costs</li>
                        <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-success-green" />Pause subscription anytime</li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
