import { motion } from 'framer-motion';

interface GoalsSectionProps {
    goals: string;
    setGoals: React.Dispatch<React.SetStateAction<string>>;
}

const suggestedGoals = [
    "Reduce blood sugar by 10% in 3 months.",
    "Walk 30 mins, 5 days/week.",
    "Achieve BMI of 24.9.",
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
            <h3 className="text-2xl font-bold mb-6 text-white">Patient Goals (SMART Goals)</h3>
            <div className="bg-[#1F2023]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="goals-textarea">Enter personalized goals</label>
                <textarea
                    id="goals-textarea"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    className="form-textarea w-full rounded-lg border-white/20 bg-black/20 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-500 text-white"
                    placeholder="Describe a specific, measurable, achievable, relevant, and time-bound goal..."
                    rows={5}
                ></textarea>
                <div className="mt-4 flex flex-wrap gap-2">
                    {suggestedGoals.map(goal => (
                        <button
                            key={goal}
                            onClick={() => handleAddShortcut(goal)}
                            className="text-sm text-left font-medium bg-black/20 hover:bg-black/40 px-3 py-1 rounded-full transition-colors text-gray-300"
                        >
                            {goal}
                        </button>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default GoalsSection;
