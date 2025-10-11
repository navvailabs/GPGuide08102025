import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import AppLayout from '@/components/app/AppLayout';
import ConditionsSection from '@/components/care-plan/ConditionsSection';
import GoalsSection from '@/components/care-plan/GoalsSection';
import PreviewSection from '@/components/care-plan/PreviewSection';

const GPCarePlanGenerator = () => {
    const [conditions, setConditions] = useState<string>('Hypertension, Type 2 Diabetes');
    const [goals, setGoals] = useState<string>(
`Lower A1c to <7.0% in 3 months.
Walk 30 mins, 5 days/week.`
    );
    const [isPreviewGenerated, setIsPreviewGenerated] = useState(false);

    const handleGeneratePreview = () => {
        setIsPreviewGenerated(true);
    };

    const handleReset = () => {
        setConditions('');
        setGoals('');
        setIsPreviewGenerated(false);
    };

    return (
        <AppLayout>
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
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Generate Care Plan</h2>
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
        </AppLayout>
    );
};

export default GPCarePlanGenerator;
