import { motion } from 'framer-motion';

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

    const handleAddShortcut = (goalToAdd: string) => {
        setGoals(prev => prev ? `${prev}\n${goalToAdd}` : goalToAdd);
    };

    return (
        <motion.section variants={sectionVariants}>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">SMART Goals</h3>
            <div className="bg-white dark:bg-[#1A1B1E]/85 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg dark:shadow-2xl">
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="goals-textarea">Enter personalized goals</label>
                <textarea
                    id="goals-textarea"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    className="form-textarea w-full rounded-lg border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-black/20 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                    placeholder="Describe a specific, measurable, achievable, relevant, and time-bound goal..."
                    rows={5}
                ></textarea>
                <div className="mt-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggestions:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {suggestedGoals.map(goal => (
                            <button
                                key={goal}
                                onClick={() => handleAddShortcut(goal)}
                                className="text-sm font-medium bg-gray-100 dark:bg-black/20 hover:bg-gray-200 dark:hover:bg-black/40 px-3 py-2 rounded-lg transition-colors text-gray-700 dark:text-gray-300 text-left"
                            >
                                {goal}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default GoalsSection;
