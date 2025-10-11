import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import ConditionsSection from '@/components/care-plan/ConditionsSection';
import GoalsSection from '@/components/care-plan/GoalsSection';
import PreviewSection from '@/components/care-plan/PreviewSection';
import React from 'react';

interface GPCarePlanProps {
    conditions: string;
    setConditions: React.Dispatch<React.SetStateAction<string>>;
    goals: string;
    setGoals: React.Dispatch<React.SetStateAction<string>>;
    isPreviewGenerated: boolean;
    setIsPreviewGenerated: React.Dispatch<React.SetStateAction<boolean>>;
}

const GPCarePlan = ({ conditions, setConditions, goals, setGoals, isPreviewGenerated, setIsPreviewGenerated }: GPCarePlanProps) => {

    const handleGeneratePreview = () => {
        setIsPreviewGenerated(true);
    };

    const handleReset = () => {
        setConditions('');
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
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">GP Chronic Condition Management Plan</h2>
                <p className="mt-3 text-base text-gray-300">Enter patient conditions and SMART health goals to generate a personalized care plan.</p>
            </motion.div>

            <div className="space-y-12">
                <ConditionsSection conditions={conditions} setConditions={setConditions} />
                <GoalsSection goals={goals} setGoals={setGoals} />

                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6"
                >
                    <button
                        onClick={handleGeneratePreview}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
                    >
                        <Sparkles className="h-5 w-5" />
                        Generate Care Plan
                    </button>
                    <button
                        onClick={handleReset}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
                    >
                        <RefreshCw className="h-5 w-5" />
                        Reset
                    </button>
                </motion.div>

                {isPreviewGenerated && (
                    <PreviewSection conditions={conditions} goals={goals} />
                )}
            </div>
        </motion.div>
    );
};

export default GPCarePlan;
