import { BriefcaseMedical, ShieldCheck, Lock } from 'lucide-react';

const Footer = () => {
    const sections = {
        "Product": ["Weekly Plan - $14.99", "Pro Plan - $22", "Features Comparison", "Template Examples", "How It Works", "Mobile Apps"],
        "Support": ["Help Center", "Video Tutorials", "Contact Support", "Privacy Policy", "Terms of Service", "Medical Disclaimer"],
        "Company": ["About GPGuide", "Our Mission", "Security & Compliance", "Professional Indemnity", "Partner Program", "Careers"]
    };

    return (
        <footer className="bg-medical-blue border-t border-white/10 text-gray-400">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4 pr-8">
                        <div className="flex items-center space-x-2">
                            <BriefcaseMedical className="h-8 w-8 text-success-green" />
                            <span className="text-2xl font-satoshi font-bold text-white">GPGuide</span>
                        </div>
                        <p className="text-sm">Professional clinical decision support for Australian GPs.</p>
                        <p className="text-xs">GPGuide Pty Ltd<br/>ABN: 12 345 678 901<br/>Sydney, Australia</p>
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
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg text-amber-300 text-xs mb-8">
                        © 2025 GPGuide Pty Ltd. All rights reserved. GPGuide provides educational clinical decision support tools. Professional medical judgment required for all patient care decisions. Not affiliated with RACGP, AMA, eTG, or PBS.
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
                        <div className="flex space-x-4">
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
