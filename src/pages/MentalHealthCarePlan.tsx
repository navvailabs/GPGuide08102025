import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { StyledTextarea } from '@/components/ui/StyledTextarea';

interface MentalHealthCarePlanProps {
    presentation: string;
    setPresentation: React.Dispatch<React.SetStateAction<string>>;
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

const MentalHealthCarePlan = ({
    presentation,
    setPresentation,
    history,
    setHistory,
    goals,
    setGoals,
    isPreviewGenerated,
    setIsPreviewGenerated
}: MentalHealthCarePlanProps) => {

    const handleGeneratePreview = () => {
        setIsPreviewGenerated(true);
    };

    const handleReset = () => {
        setPresentation('');
        setHistory('');
        setGoals('');
        setIsPreviewGenerated(false);
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
                    <div className="bg-white dark:bg-[#1A1B1E]/85 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg dark:shadow-2xl">
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="mh-presentation">Patient Presentation</label>
                        <StyledTextarea
                            id="mh-presentation"
                            value={presentation}
                            onChange={(e) => setPresentation(e.target.value)}
                            placeholder="e.g., Low mood, anxiety, poor sleep..."
                            rows={3}
                        />
                    </div>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <div className="bg-white dark:bg-[#1A1B1E]/85 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg dark:shadow-2xl">
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="mh-history">Relevant History</label>
                        <StyledTextarea
                            id="mh-history"
                            value={history}
                            onChange={(e) => setHistory(e.target.value)}
                            placeholder="e.g., Past mental health history, family history, social situation..."
                            rows={3}
                        />
                    </div>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <div className="bg-white dark:bg-[#1A1B1E]/85 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg dark:shadow-2xl">
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="mh-goals">Management Goals</label>
                        <StyledTextarea
                            id="mh-goals"
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            placeholder="e.g., Referral to psychologist, psychoeducation, medication review..."
                            rows={3}
                        />
                    </div>
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
                    <div className="bg-white dark:bg-[#1A1B1E]/85 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg dark:shadow-2xl text-gray-600 dark:text-gray-300 space-y-4">
                        <p>A preview for the Mental Health Care Plan will be shown here once implemented.</p>
                        <div><strong className="text-gray-800 dark:text-white">Presentation:</strong> {presentation || 'N/A'}</div>
                        <div><strong className="text-gray-800 dark:text-white">History:</strong> {history || 'N/A'}</div>
                        <div><strong className="text-gray-800 dark:text-white">Goals:</strong> {goals || 'N/A'}</div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default MentalHealthCarePlan;
