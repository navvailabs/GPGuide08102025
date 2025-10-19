import { BriefcaseMedical, ShieldCheck, Lock } from 'lucide-react';

const Footer = () => {
    const sections = {
        "Product": ["Essential Plan - $14.99", "Professional Plan - $22", "Features Comparison", "Template Examples", "How It Works", "Mobile Apps"],
        "Support": ["Help Center", "Video Tutorials", "Contact Support", "Privacy Policy", "Terms of Service", "Medical Disclaimer"],
        "Company": ["About GPGuide", "Our Mission", "Security & Compliance", "Professional Indemnity", "Partner Program", "Careers"]
    };

    return (
        <footer className="bg-black/30 backdrop-blur-xl border-t border-white/10 text-gray-400 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4 pr-8">
                        <div className="flex items-center space-x-2">
                            <BriefcaseMedical className="h-8 w-8 text-premium-gold" />
                            <span className="text-2xl font-satoshi font-bold text-gradient-gold">GPGuide</span>
                        </div>
                        <p className="text-sm">Professional clinical decision support for Australian GPs.</p>
                        <p className="text-xs">New Era Pty Ltd (trading as GPGuide)<br/>ABN: 12 345 678 901<br/>Sydney, Australia</p>
                    </div>

                    {Object.entries(sections).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-bold text-white mb-4">{title}</h4>
                            <ul className="space-y-2">
                                {links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-sm hover:text-white transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 border-t border-white/10 pt-8">
                    <div className="p-4 bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl mb-8">
                        <p className="text-xs text-gray-400 text-center">
                            Disclaimer: GPGuide is a clinical decision support tool and should be used to supplement, not replace, professional medical judgment. All patient information is hypothetical and for illustrative purposes only.
                        </p>
                    </div>
                    <div className="bg-premium-gold/10 border border-premium-gold/20 p-4 rounded-lg text-premium-gold text-xs mb-8">
                        © 2025 New Era Pty Ltd (trading as GPGuide). All rights reserved. GPGuide provides educational clinical documentation and decision-support tools for Australian healthcare professionals. Use requires professional judgment and clinical oversight. GPGuide is not affiliated with RACGP, AMA, eTG, or PBS. Full details in our <a href="#" className="underline hover:text-white">Terms of Service</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>.
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                            <div className="flex items-center space-x-1.5">
                                <Lock className="h-4 w-4" />
                                <span>Australian Privacy Compliant</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                                <ShieldCheck className="h-4 w-4" />
                                <span>ISO 27001 Certified</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                                <ShieldCheck className="h-4 w-4" />
                                <span>$2M Professional Indemnity</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
