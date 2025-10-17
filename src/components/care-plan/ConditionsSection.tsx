import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import InspiredCard from '../ui/InspiredCard';
import { StyledPillInput } from '../ui/StyledPillInput';

interface ConditionsSectionProps {
    conditions: string;
    setConditions: React.Dispatch<React.SetStateAction<string>>;
}

const commonConditions = [
    "Diabetes (Type 2)",
    "Hypertension",
    "Depression",
    "Anxiety",
    "Heart Disease",
    "Asthma",
    "Arthritis",
    "COPD",
    "Obesity",
    "Osteoporosis",
    "Chronic Pain",
    "Hyperlipidaemia",
    "Hypothyroidism",
    "GORD",
    "Atrial Fibrillation"
];

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ConditionsSection = ({ conditions, setConditions }: ConditionsSectionProps) => {
    const { theme } = useTheme();

    const handleAddShortcut = (conditionToAdd: string) => {
        setConditions(prev => {
            if (!prev) return conditionToAdd;
            const conditionsArray = prev.split(',').map(c => c.trim()).filter(Boolean);
            if (conditionsArray.includes(conditionToAdd)) return prev;
            return `${prev}, ${conditionToAdd}`;
        });
    };

    return (
        <motion.section variants={sectionVariants}>
            <h3 className={cn(
                "text-2xl font-satoshi font-bold mb-4",
                theme === 'light' ? 'text-gray-900' : 'text-white'
            )}>Current Conditions</h3>
            <InspiredCard>
                <div>
                    <label className={cn(
                        "block text-sm font-medium mb-2",
                        theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    )} htmlFor="conditions-input">Enter chronic conditions</label>
                    <StyledPillInput
                        id="conditions-input"
                        placeholder="e.g., Type 2 Diabetes, Hypertension"
                        value={conditions}
                        onChange={(e) => setConditions(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <p className={cn(
                        "text-xs mb-2",
                        theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    )}>Suggestions:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        {commonConditions.map(c => (
                            <button
                                key={c}
                                onClick={() => handleAddShortcut(c)}
                                className={cn(
                                    "text-sm font-medium px-3 py-2 rounded-lg transition-colors text-center",
                                    theme === 'light'
                                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        : 'bg-black/20 hover:bg-black/40 text-gray-300'
                                )}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </InspiredCard>
        </motion.section>
    );
};

export default ConditionsSection;
