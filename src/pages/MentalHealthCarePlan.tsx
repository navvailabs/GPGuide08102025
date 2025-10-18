import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { StyledTextarea } from '@/components/ui/StyledTextarea';
import InspiredCard from '@/components/ui/InspiredCard';
import { QuickActionButton } from '@/components/ui/QuickActionButton';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import MseSection from '@/components/care-plan/MseSection';

interface MentalHealthCarePlanProps {
    presentation: string;
    setPresentation: React.Dispatch<React.SetStateAction<string>>;
    assessment: string;
    setAssessment: React.Dispatch<React.SetStateAction<string>>;
    mse: string;
    setMse: React.Dispatch<React.SetStateAction<string>>;
    history: string;
    setHistory: React.Dispatch<React.SetStateAction<string>>;
    goals: string;
    setGoals: React.Dispatch<React.SetStateAction<string>>;
    isPreviewGenerated: boolean;
    setIsPreviewGenerated: React.Dispatch<React.SetStateAction<boolean>>;
}

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const clinicalDetailsSuggestions = {
    "🧠 Mood Symptoms": [
        "Low mood",
        "Loss of interest (anhedonia)",
        "Feelings of hopelessness",
        "Crying episodes",
        "Irritability",
    ],
    "⚡ Anxiety Symptoms": [
        "Excessive worry",
        "Panic attacks",
        "Restlessness",
        "Racing thoughts",
        "Tight chest / palpitations",
    ],
    "😴 Sleep & Energy": [
        "Poor sleep / insomnia",
        "Early morning waking",
        "Low energy / fatigue",
        "Poor concentration",
    ],
    "📉 Functional Impact": [
        "Reduced ability to work/study",
        "Social withdrawal",
        "Avoidance behaviour",
        "Difficulty coping with daily tasks",
    ],
    "🚨 Risk Symptoms": [
        "Suicidal thoughts (no plan)",
        "Passive suicidal ideation",
        "Self-harm urges",
        "No suicidal ideation",
    ],
};

const suggestedGoals = [
    "Improve mood by engaging in structured CBT sessions weekly",
    "Reduce anxiety attacks from daily to once a week within 6 weeks",
    "Improve sleep hygiene and achieve minimum 6 hrs sleep within 4 weeks",
    "Increase social engagement by attending one community activity weekly"
];

const MentalHealthCarePlan = ({
    presentation,
    setPresentation,
    assessment,
    setAssessment,
    mse,
    setMse,
    history,
    setHistory,
    goals,
    setGoals,
    isPreviewGenerated,
    setIsPreviewGenerated
}: MentalHealthCarePlanProps) => {
    const { theme } = useTheme();

    const handleGeneratePreview = () => {
        setIsPreviewGenerated(true);
    };

    const handleReset = () => {
        setPresentation('');
        setAssessment('');
        setMse('');
        setHistory('');
        setGoals('');
        setIsPreviewGenerated(false);
    };

    const handleAddPresentation = (presentationToAdd: string) => {
        setPresentation(prev => {
            if (!prev) return presentationToAdd;
            const items = prev.split(',').map(item => item.trim()).filter(Boolean);
            if (items.includes(presentationToAdd)) return prev;
            return `${prev}, ${presentationToAdd}`;
        });
    };

    const handleAddGoal = (goalToAdd: string) => {
        setGoals(prev => prev ? `${prev}\n${goalToAdd}` : goalToAdd);
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="max-w-4xl mx-auto"
        >
            <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="mb-10 text-center"
            >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Mental Health Care Plan Generator</h2>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">Detail the patient's presentation, history, and goals to create a comprehensive mental health care plan.</p>
            </motion.div>

            <div className="space-y-8">
                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="mh-presentation">Clinical Details</label>
                        <StyledTextarea
                            id="mh-presentation"
                            value={presentation}
                            onChange={(e) => setPresentation(e.target.value)}
                            placeholder="Low mood, anhedonia, decreased energy, early waking, loss of appetite, difficulty coping at work."
                            rows={3}
                        />
                        <div className="mt-4 space-y-4">
                            {Object.entries(clinicalDetailsSuggestions).map(([category, items]) => (
                                <div key={category}>
                                    <p className={cn(
                                        "text-xs font-semibold mb-2",
                                        theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                                    )}>{category}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map(item => (
                                            <QuickActionButton
                                                key={item}
                                                onClick={() => handleAddPresentation(item)}
                                                className="justify-center"
                                            >
                                                {item}
                                            </QuickActionButton>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </InspiredCard>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="mh-assessment">Psychological Assessment</label>
                        <StyledTextarea
                            id="mh-assessment"
                            value={assessment}
                            onChange={(e) => setAssessment(e.target.value)}
                            placeholder="K10: 28 (High) | DASS-21: D14 M / A10 M / S20 S | PHQ-9: 17 (Mod Severe) | GAD-7: 15 (Severe) | AUDIT: 8 (Hazardous)"
                            rows={3}
                        />
                    </InspiredCard>
                </motion.section>

                <MseSection mseNotes={mse} setMseNotes={setMse} />

                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="mh-history">Relevant History</label>
                        <StyledTextarea
                            id="mh-history"
                            value={history}
                            onChange={(e) => setHistory(e.target.value)}
                            placeholder="Past depression 2021, no hospital admissions. Family history mother with anxiety. Recent job loss. No suicidal ideation."
                            rows={3}
                        />
                    </InspiredCard>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="mh-goals">Management Goals</label>
                        <StyledTextarea
                            id="mh-goals"
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            placeholder="e.g., Referral to psychologist, psychoeducation, medication review..."
                            rows={4}
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
                                        onClick={() => handleAddGoal(goal)}
                                        className="w-full justify-start text-left"
                                    >
                                        {goal}
                                    </QuickActionButton>
                                ))}
                            </div>
                        </div>
                    </InspiredCard>
                </motion.section>
            </div>

            <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-12"
            >
                <button
                    onClick={handleGeneratePreview}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
                >
                    <Sparkles className="h-5 w-5" />
                    Generate Care Plan
                </button>
                <button
                    onClick={handleReset}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-800 dark:text-white font-semibold rounded-lg transition-colors"
                >
                    <RefreshCw className="h-5 w-5" />
                    Reset
                </button>
            </motion.div>

            {isPreviewGenerated && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-t border-gray-200 dark:border-white/10 pt-8 mt-12"
                >
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Generated Plan Preview</h3>
                    <InspiredCard className="text-gray-600 dark:text-gray-300 space-y-4">
                        <p>A preview for the Mental Health Care Plan will be shown here once implemented.</p>
                        <div><strong className="text-gray-800 dark:text-white">Clinical Details:</strong> {presentation || 'N/A'}</div>
                        <div><strong className="text-gray-800 dark:text-white">Psychological Assessment:</strong> {assessment || 'N/A'}</div>
                        <div><strong className="text-gray-800 dark:text-white">MSE:</strong> {mse || 'N/A'}</div>
                        <div><strong className="text-gray-800 dark:text-white">History:</strong> {history || 'N/A'}</div>
                        <div><strong className="text-gray-800 dark:text-white">Goals:</strong> {goals || 'N/A'}</div>
                    </InspiredCard>
                </motion.div>
            )}
        </motion.div>
    );
};

export default MentalHealthCarePlan;
