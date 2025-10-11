import { Clock, Calendar, FileText, FileEdit, Zap, Users } from 'lucide-react';
import { PainPoint3DCard } from './ui/PainPoint3DCard';
import SectionGradientBackground from './ui/SectionGradientBackground';

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
                    {painPointsData.map((point, index) => (
                        <PainPoint3DCard 
                            key={index}
                            icon={point.icon}
                            title={point.title}
                            pain={point.pain}
                            gain={point.gain}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
