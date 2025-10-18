import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing = () => {
    const plans = [
        {
            name: 'Essential Plan',
            price: '$24.99',
            salePrice: '$7.99',
            billing: '/week',
            description: 'Perfect for Individual GPs',
            features: [
                'Generate unlimited GP Management Plans, Reviews, and MHCPs',
                'Pre-formatted and MBS-aligned structure',
                'Built-in guideline references (RACGP, eTG, PBS links)',
                'Secure local document generation (no PHI stored)',
                'Instant Document export and Copy-paste integration',
                'Priority support with 24-hour response',
            ],
            cta: 'Start Essential Plan',
            isPopular: false,
            roi: 'Pays for itself by saving 1 hour per week',
            value: 'ROI: $300+ monthly value for ~$32 cost',
            limitedNote: 'Limited accounts available!',
            disclaimer: 'After one month, payment will resume at the regular weekly price of $24.99.'
        },
        {
            name: 'Professional Plan',
            price: '$39',
            salePrice: '$14.99',
            billing: '/week',
            description: 'Complete Practice Transformation',
            features: [
                'Everything in Essential Plan',
                'Access to advanced clinical tools:',
                ' - DEXA Scan Interpreter (bone density summariser)',
                ' - Opioid Calculator & Safety Checker (titration & conversion aid)',
                ' - WorkCover Template Generator',
                ' - Allied Health Referral Wizard (physio, psych, dietitian templates)',
                'Submit your own template ideas — we’ll review and build them into the platform.',
            ],
            cta: 'Choose Professional Plan',
            isPopular: true,
            roi: 'Save 8+ hours weekly - $400+ monthly value',
            value: 'ROI: $800+ monthly value for ~$60 cost',
            limitedNote: 'Limited time offer!',
            disclaimer: 'After one month, payment will resume at the regular weekly price of $39.'
        },
    ];

    return (
        <section id="pricing" className="py-20 sm:py-24 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Choose Your Productivity Plan</h2>
                    <p className="mt-4 text-lg text-neutral-300">
                        Flexible weekly subscriptions designed for busy healthcare professionals.
                        <br />
                        No contracts • Immediate access • Start saving time today
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto lg:items-stretch">
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
                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gold-gradient text-white px-4 py-1 rounded-full text-sm font-bold">
                                    MOST POPULAR
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-medical-blue">{plan.name}</h3>
                            <p className="mt-2 text-gray-500">{plan.description}</p>
                            
                            {plan.limitedNote && (
                                <div className="mt-4 bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full inline-block">
                                    {plan.limitedNote}
                                </div>
                            )}

                            <div className="mt-6">
                                {plan.salePrice ? (
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-medical-blue">{plan.salePrice}</span>
                                        <del className="text-2xl font-medium text-gray-400">{plan.price}</del>
                                        <span className="text-lg text-gray-500">{plan.billing}</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span className="text-5xl font-bold text-medical-blue">{plan.price}</span>
                                        <span className="text-lg text-gray-500">{plan.billing}</span>
                                    </div>
                                )}
                                <p className="text-sm text-gray-500 mt-1">Billed weekly • Cancel anytime</p>
                            </div>

                            <ul className="mt-8 space-y-4 flex-grow">
                                {plan.features.map((feature) => {
                                    if (feature.endsWith(':')) {
                                        return (
                                            <li key={feature} className="flex items-start pt-2">
                                                <span className="text-gray-800 font-semibold">{feature}</span>
                                            </li>
                                        );
                                    }
                                    if (feature.startsWith(' - ')) {
                                        return (
                                            <li key={feature} className="flex items-start pl-5">
                                                <Check className="h-5 w-5 text-success-green mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">{feature.replace(' - ', '')}</span>
                                            </li>
                                        );
                                    }
                                    return (
                                        <li key={feature} className="flex items-start">
                                            <Check className="h-6 w-6 text-success-green mr-3 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="mt-8">
                                <button className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-transform duration-300 hover:scale-105 ${plan.isPopular ? 'bg-gold-gradient text-white' : 'bg-medical-blue text-white'}`}>
                                    {plan.cta}
                                </button>
                                <div className="mt-4 text-center text-sm text-gray-600 bg-gray-100 p-2 rounded-md">
                                    <p className="font-semibold">{plan.roi}</p>
                                    <p>{plan.value}</p>
                                </div>
                                {plan.disclaimer && (
                                    <p className="mt-4 text-xs text-center text-gray-500">{plan.disclaimer}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    className="mt-12 text-center text-gray-300"
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
