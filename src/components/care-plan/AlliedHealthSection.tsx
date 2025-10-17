import { motion } from 'framer-motion';

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
            <h3 className="text-2xl font-bold mb-6 text-white">Allied Health Professional Arrangements</h3>
            <div className="bg-[#1A1B1E]/85 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="grid grid-cols-1 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="allied-health-input">Enter allied health referrals</label>
                        <input
                            className="form-input w-full rounded-lg border-white/20 bg-black/20 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-500 text-white"
                            id="allied-health-input"
                            placeholder="e.g., Dietitian, Exercise Physiologist"
                            value={alliedHealth}
                            onChange={(e) => setAlliedHealth(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-xs text-gray-400 mb-2">Suggestions:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {quickActions.map(action => (
                            <button
                                key={action}
                                onClick={() => handleAddQuickAction(action)}
                                className="text-sm font-medium bg-black/20 hover:bg-black/40 px-3 py-2 rounded-lg transition-colors text-gray-300 text-center"
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default AlliedHealthSection;
