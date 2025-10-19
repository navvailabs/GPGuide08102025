import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import InspiredCard from '../ui/InspiredCard';
import { StyledTextarea } from '../ui/StyledTextarea';
import { QuickActionButton } from '@/components/ui/QuickActionButton';

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
            if (!prev.trim()) return conditionToAdd;
            const conditionsArray = prev.split('\n').map(c => c.trim()).filter(Boolean);
            if (conditionsArray.includes(conditionToAdd)) return prev;
            return `${prev}\n${conditionToAdd}`;
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
                    )} htmlFor="conditions-input">Enter one chronic condition per line</label>
                    <StyledTextarea
                        id="conditions-input"
                        placeholder="e.g.,&#10;Type 2 Diabetes&#10;Hypertension"
                        value={conditions}
                        onChange={(e) => setConditions(e.target.value)}
                        rows={4}
                    />
                </div>
                <div className="mt-4">
                    <p className={cn(
                        "text-xs mb-2",
                        theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    )}>Suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                        {commonConditions.map(c => (
                            <QuickActionButton
                                key={c}
                                onClick={() => handleAddShortcut(c)}
                                className="justify-center"
                            >
                                {c}
                            </QuickActionButton>
                        ))}
                    </div>
                </div>
            </InspiredCard>
        </motion.section>
    );
};

export default ConditionsSection;
