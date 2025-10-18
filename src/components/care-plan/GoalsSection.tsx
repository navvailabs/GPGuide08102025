import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import InspiredCard from '../ui/InspiredCard';
import { StyledTextarea } from '../ui/StyledTextarea';
import { QuickActionButton } from '@/components/ui/QuickActionButton';

interface GoalsSectionProps {
    goals: string;
    setGoals: React.Dispatch<React.SetStateAction<string>>;
}

const suggestedGoals = [
    "Achieve HbA1c ≤7.0% within 6 months",
    "Achieve blood pressure <140/90 mmHg within 3 months",
    "Reduce total cholesterol to <4.0 mmol/L in 6 months",
    "Achieve 5-10% body weight reduction over 6 months",
    "Improve functional mobility and posture within 3 months",
    "Reduce pain score by 30% within 3 months through physiotherapy"
];

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const GoalsSection = ({ goals, setGoals }: GoalsSectionProps) => {
    const { theme } = useTheme();

    const handleAddShortcut = (goalToAdd: string) => {
        setGoals(prev => prev ? `${prev}\n${goalToAdd}` : goalToAdd);
    };

    return (
        <motion.section variants={sectionVariants}>
            <h3 className={cn(
                "text-2xl font-satoshi font-bold mb-4",
                theme === 'light' ? 'text-gray-900' : 'text-white'
            )}>SMART Goals</h3>
            <InspiredCard>
                <label className={cn(
                    "block text-sm font-medium mb-2",
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                )} htmlFor="goals-textarea">Enter personalized goals</label>
                <StyledTextarea
                    id="goals-textarea"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="Describe a specific, measurable, achievable, relevant, and time-bound goal..."
                    rows={5}
                />
                <div className="mt-4">
                    <p className={cn(
                        "text-xs mb-2",
                        theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    )}>Suggestions:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {suggestedGoals.map(goal => (
                            <QuickActionButton
                                key={goal}
                                onClick={() => handleAddShortcut(goal)}
                                className="w-full justify-start text-left"
                            >
                                {goal}
                            </QuickActionButton>
                        ))}
                    </div>
                </div>
            </InspiredCard>
        </motion.section>
    );
};

export default GoalsSection;
