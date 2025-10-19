import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import InspiredCard from '../ui/InspiredCard';
import { StyledTextarea } from '../ui/StyledTextarea';
import { QuickActionButton } from '@/components/ui/QuickActionButton';

interface AlliedHealthSectionProps {
    alliedHealth: string;
    setAlliedHealth: React.Dispatch<React.SetStateAction<string>>;
}

const quickActions = [
    "Diabetes Nurse Educator",
    "Physiotherapy",
    "Podiatry",
    "Occupational Therapist",
    "Exercise Physiologist"
];

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const AlliedHealthSection = ({ alliedHealth, setAlliedHealth }: AlliedHealthSectionProps) => {
    const { theme } = useTheme();

    const handleAddQuickAction = (action: string) => {
        setAlliedHealth(prev => {
            if (!prev.trim()) return action;
            const items = prev.split('\n').map(item => item.trim()).filter(Boolean);
            if (items.includes(action)) return prev;
            return `${prev}\n${action}`;
        });
    };

    return (
        <motion.section variants={sectionVariants}>
            <h3 className={cn(
                "text-2xl font-satoshi font-bold mb-4",
                theme === 'light' ? 'text-gray-900' : 'text-white'
            )}>Allied Health Professional Arrangements</h3>
            <InspiredCard>
                <div>
                    <label className={cn(
                        "block text-sm font-medium mb-2",
                        theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    )} htmlFor="allied-health-input">Enter one allied health referral per line</label>
                    <StyledTextarea
                        id="allied-health-input"
                        placeholder="e.g.,&#10;Dietitian&#10;Exercise Physiologist"
                        value={alliedHealth}
                        onChange={(e) => setAlliedHealth(e.target.value)}
                        rows={3}
                    />
                </div>
                <div className="mt-4">
                    <p className={cn(
                        "text-xs mb-2",
                        theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    )}>Suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                        {quickActions.map(action => (
                            <QuickActionButton
                                key={action}
                                onClick={() => handleAddQuickAction(action)}
                                className="justify-center"
                            >
                                {action}
                            </QuickActionButton>
                        ))}
                    </div>
                </div>
            </InspiredCard>
        </motion.section>
    );
};

export default AlliedHealthSection;
