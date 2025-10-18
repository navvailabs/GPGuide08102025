import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Loader2, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StyledTextarea } from '@/components/ui/StyledTextarea';
import { QuickActionButton } from '@/components/ui/QuickActionButton';
import InspiredCard from '@/components/ui/InspiredCard';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const quickDiagnoses = [
    "Acute lumbar strain with muscle spasm",
    "Major depressive disorder, moderate severity",
    "Rotator cuff tendinopathy",
    "Acute exacerbation of chronic anxiety disorder",
    "Post-operative recovery",
    "Cervical spondylosis with radiculopathy"
];

const WorkersCompAssist = () => {
    const [injuryDetails, setInjuryDetails] = useState('');
    const [workCapacity, setWorkCapacity] = useState('');
    const [treatmentPlan, setTreatmentPlan] = useState('');
    const [summary, setSummary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleAddDiagnosis = (diagnosisToAdd: string) => {
        setInjuryDetails(prev => {
            if (!prev.trim()) return diagnosisToAdd;
            return `${prev.trim()}\n${diagnosisToAdd}`;
        });
    };

    const handleGenerateSummary = () => {
        setIsLoading(true);
        setSummary(null);

        setTimeout(() => {
            let summaryText = `This patient presents for a Workers Compensation certificate. `;
            summaryText += `Injury details: ${injuryDetails || '[Injury Details]'}. `;
            summaryText += `Regarding work capacity: ${workCapacity || '[Work Capacity Details]'}. `;
            summaryText += `The current treatment plan is: ${treatmentPlan || '[Treatment Plan]'}.`;
            
            setSummary(summaryText);
            setIsLoading(false);
        }, 1000);
    };

    const handleReset = () => {
        setInjuryDetails('');
        setWorkCapacity('');
        setTreatmentPlan('');
        setSummary(null);
    };

    const handleCopy = () => {
        if (!summary) return;
        navigator.clipboard.writeText(summary).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
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
            <motion.div variants={sectionVariants} className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Workers Compensation Assist</h2>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">Quickly generate statements for Certificates of Capacity.</p>
            </motion.div>

            <div className="space-y-8">
                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="injury-details-textarea">Injury Details & Diagnosis</label>
                        <StyledTextarea
                            id="injury-details-textarea"
                            value={injuryDetails}
                            onChange={(e) => setInjuryDetails(e.target.value)}
                            placeholder="e.g., Right shoulder rotator cuff strain from lifting heavy box on [Date]..."
                            rows={3}
                        />
                        <div className="mt-4">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggestions:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {quickDiagnoses.map(diagnosis => (
                                    <QuickActionButton
                                        key={diagnosis}
                                        onClick={() => handleAddDiagnosis(diagnosis)}
                                        className="w-full justify-start text-left"
                                    >
                                        {diagnosis}
                                    </QuickActionButton>
                                ))}
                            </div>
                        </div>
                    </InspiredCard>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="work-capacity-textarea">Work Capacity</label>
                        <StyledTextarea
                            id="work-capacity-textarea"
                            value={workCapacity}
                            onChange={(e) => setWorkCapacity(e.target.value)}
                            placeholder="e.g., Fit for suitable duties. Avoid lifting >5kg with right arm. Can perform sedentary tasks..."
                            rows={4}
                        />
                    </InspiredCard>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="wc-treatment-plan-textarea">Treatment Plan</label>
                        <StyledTextarea
                            id="wc-treatment-plan-textarea"
                            value={treatmentPlan}
                            onChange={(e) => setTreatmentPlan(e.target.value)}
                            placeholder="e.g., Analgesia, physiotherapy referral, review in 2 weeks..."
                            rows={3}
                        />
                    </InspiredCard>
                </motion.section>

                <motion.div variants={sectionVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
                    <button
                        onClick={handleGenerateSummary}
                        disabled={isLoading || !injuryDetails}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                        {isLoading ? 'Generating...' : 'Generate Summary'}
                    </button>
                    <button
                        onClick={handleReset}
                        disabled={isLoading}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-800 dark:text-white font-semibold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <RefreshCw className="h-5 w-5" />
                        Reset
                    </button>
                </motion.div>

                {summary && (
                    <motion.div variants={sectionVariants} className="border-t border-gray-200 dark:border-white/10 pt-8 mt-12">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Generated Summary</h3>
                            <button
                                onClick={handleCopy}
                                className={cn('flex items-center justify-center gap-2 h-9 px-3 bg-gray-100 dark:bg-black/20 hover:bg-gray-200 dark:hover:bg-black/40 font-semibold rounded-lg transition-all text-gray-700 dark:text-gray-300 text-sm', isCopied && 'text-success-green')}
                            >
                                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        </div>
                        <InspiredCard className="text-gray-600 dark:text-gray-300">
                            <p>{summary}</p>
                        </InspiredCard>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default WorkersCompAssist;
