import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import InspiredCard from '../ui/InspiredCard';
import { StyledPillInput } from '../ui/StyledPillInput';

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
            if (!prev) return action;
            const items = prev.split(',').map(item => item.trim()).filter(Boolean);
            if (items.includes(action)) return prev;
            return `${prev}, ${action}`;
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
                    )} htmlFor="allied-health-input">Enter allied health referrals</label>
                    <StyledPillInput
                        id="allied-health-input"
                        placeholder="e.g., Dietitian, Exercise Physiologist"
                        value={alliedHealth}
                        onChange={(e) => setAlliedHealth(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <p className={cn(
                        "text-xs mb-2",
                        theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    )}>Suggestions:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {quickActions.map(action => (
                            <button
                                key={action}
                                onClick={() => handleAddQuickAction(action)}
                                className={cn(
                                    "text-sm font-medium px-3 py-2 rounded-lg transition-colors text-center",
                                    theme === 'light'
                                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        : 'bg-black/20 hover:bg-black/40 text-gray-300'
                                )}
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                </div>
            </InspiredCard>
        </motion.section>
    );
};

export default AlliedHealthSection;
