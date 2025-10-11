import { Clock, Calendar, FileText, FileEdit, Zap, Users, X, Check } from 'lucide-react';
import SectionGradientBackground from './ui/SectionGradientBackground';
import AnimatedCard from './ui/dynamic-border-animations-card';

const painPointsData = [
  {
    icon: Clock,
    title: `"I work until 9 PM finishing notes."`,
    pain: "Family time sacrificed for paperwork.",
    gain: "GPGuide saves you an average of 1.5 hours per day."
  },
  {
    icon: Calendar,
    title: `"My practice is always running behind."`,
    pain: "Patient satisfaction drops with long wait times.",
    gain: "Streamline consultations with instant templates."
  },
  {
    icon: FileText,
    title: `"I struggle to keep up with guidelines."`,
    pain: "Risk of outdated or non-compliant care.",
    gain: "Access evidence-based Australian guidelines."
  },
  {
    icon: FileEdit,
    title: `"My documentation feels incomplete."`,
    pain: "Increased medicolegal risk and stress.",
    gain: "Generate comprehensive, defensible notes in seconds."
  },
  {
    icon: Zap,
    title: `"I'm experiencing burnout and fatigue."`,
    pain: "Losing passion for medicine due to admin load.",
    gain: "Focus on patient care, not paperwork, and reignite your passion."
  },
  {
    icon: Users,
    title: `"My practice struggles with consistency."`,
    pain: "Variable quality of care plans across practitioners.",
    gain: "Standardise excellence with shared templates for your whole team."
  }
];

const PainPoints = () => {
    return (
        <section id="features" className="relative overflow-hidden py-16 md:py-24">
            <SectionGradientBackground />
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">The Hidden Cost of the Documentation Burden</h2>
                    <p className="mt-4 text-lg text-gray-300">
                      Repetitive admin tasks drain your time and energy, pulling you away from what truly matters - your patients. Discover how GPGuide restores the balance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {painPointsData.map((point, index) => {
                        const Icon = point.icon;
                        return (
                            <AnimatedCard key={index}>
                                <div className="flex flex-col gap-6 w-full h-full">
                                    <div
                                        className="w-[51px] h-[50px] flex items-center justify-center rounded-[10px] p-2 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.6)]"
                                        style={{
                                        background: 'linear-gradient(rgb(10, 37, 64) 0%, rgb(15, 110, 110) 170%)',
                                        }}
                                    >
                                        <div className="w-[31px] h-[34px]">
                                            <Icon className="text-white w-full h-full" strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <h3
                                            className="text-[20px] font-medium leading-6 tracking-[-0.2px] text-white"
                                            style={{
                                                fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif',
                                            }}
                                        >
                                            {point.title}
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" strokeWidth={2.5} />
                                                <p
                                                    className="text-base font-normal leading-6 text-gray-400"
                                                    style={{
                                                        fontFamily: 'Inter, sans-serif',
                                                    }}
                                                >
                                                    {point.pain}
                                                </p>
                                            </li>
                                            <li className="flex items-start">
                                                <Check className="h-5 w-5 text-success-green mr-3 flex-shrink-0" strokeWidth={2.5} />
                                                <p
                                                    className="text-base font-semibold leading-6 text-gray-300"
                                                    style={{
                                                        fontFamily: 'Inter, sans-serif',
                                                    }}
                                                >
                                                    {point.gain}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </AnimatedCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
