import { motion } from 'framer-motion';

interface ConditionsSectionProps {
    conditions: string;
    setConditions: React.Dispatch<React.SetStateAction<string>>;
}

const commonConditions = [
    "Diabetes",
    "Hypertension",
    "Asthma",
    "Arthritis",
    "Heart Disease",
];

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ConditionsSection = ({ conditions, setConditions }: ConditionsSectionProps) => {

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
            <h3 className="text-2xl font-bold mb-6 text-white">Current Conditions</h3>
            <div className="bg-[#1F2023]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="grid grid-cols-1 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="conditions-input">Enter chronic conditions</label>
                        <input
                            className="form-input w-full rounded-lg border-white/20 bg-black/20 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-500 text-white"
                            id="conditions-input"
                            placeholder="e.g., Type 2 Diabetes, Hypertension"
                            value={conditions}
                            onChange={(e) => setConditions(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {commonConditions.map(c => (
                        <button
                            key={c}
                            onClick={() => handleAddShortcut(c)}
                            className="text-sm font-medium bg-black/20 hover:bg-black/40 px-3 py-1 rounded-full transition-colors text-gray-300"
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default ConditionsSection;
