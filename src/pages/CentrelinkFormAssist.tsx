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

const quickClinicalInfo = [
    "Acute lumbar strain with muscle spasm",
    "Major depressive disorder, moderate severity",
    "Rotator cuff tendinopathy",
    "Acute exacerbation of chronic anxiety disorder",
    "Post-operative recovery",
    "Cervical spondylosis with radiculopathy"
];

const quickFunctionalImpacts = [
    "Cannot sit >20 mins, standing limited to 15 mins, unable to lift >5kg, driving difficult",
    "Poor concentration, social withdrawal, unable to manage work deadlines, sleep disturbance",
    "Unable to reach overhead, difficulty with keyboard use, pain limits sustained tasks",
    "Panic attacks in workplace, avoidance of public spaces, difficulty leaving home",
    "Post-surgical pain, wound healing restrictions, no heavy lifting for 6 weeks",
    "Severe fatigue limiting daily activities to <4 hours, frequent rest required"
];

const quickTreatments = [
    "Currently: NSAIDs, heat therapy. Planned: Physio 2x/week. Expected recovery: 3-4 weeks",
    "Currently: Rest, modified duties. Planned: Exercise physiology. Expected: 6-8 weeks recovery",
    "Currently: CBT weekly. Crisis plan in place. Review 2 weeks",
    "Post-op Day 5, wound care, analgesia. RTW 4-6 weeks",
    "Supportive care, rest, fluids. Expected resolution 7-10 days"
];

const CentrelinkFormAssist = () => {
    const [clinicalInformation, setClinicalInformation] = useState('');
    const [functionalImpact, setFunctionalImpact] = useState('');
    const [treatmentPlan, setTreatmentPlan] = useState('');
    const [summary, setSummary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleAddClinicalInfo = (infoToAdd: string) => {
        setClinicalInformation(prev => {
            if (!prev.trim()) return infoToAdd;
            return `${prev.trim()}\n${infoToAdd}`;
        });
    };

    const handleAddFunctionalImpact = (impactToAdd: string) => {
        setFunctionalImpact(prev => {
            if (!prev.trim()) return impactToAdd;
            return `${prev.trim()}\n${impactToAdd}`;
        });
    };

    const handleAddTreatment = (treatmentToAdd: string) => {
        setTreatmentPlan(prev => {
            if (!prev.trim()) return treatmentToAdd;
            return `${prev.trim()}\n${treatmentToAdd}`;
        });
    };

    const handleGenerateSummary = () => {
        setIsLoading(true);
        setSummary(null);

        setTimeout(() => {
            let summaryText = `Clinical information: ${clinicalInformation || '[Clinical Information]'}. `;
            summaryText += `Functionally, this impacts the patient by: ${functionalImpact || '[Functional Impact]'}. `;
            summaryText += `The current treatment plan includes: ${treatmentPlan || '[Treatment Plan]'}. `;
            summaryText += `This information is provided to assist with their Centrelink claim (SU415).`;
            
            setSummary(summaryText);
            setIsLoading(false);
        }, 1000);
    };

    const handleReset = () => {
        setClinicalInformation('');
        setFunctionalImpact('');
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
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Centrelink SU415 Form Assist</h2>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">Generate key statements for the Centrelink Medical Certificate (SU415).</p>
            </motion.div>

            <div className="space-y-8">
                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="clinical-info-textarea">Clinical information</label>
                        <StyledTextarea
                            id="clinical-info-textarea"
                            value={clinicalInformation}
                            onChange={(e) => setClinicalInformation(e.target.value)}
                            placeholder="Enter diagnosis, presenting symptoms, and relevant clinical findings..."
                            rows={3}
                        />
                        <div className="mt-4">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggestions:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {quickClinicalInfo.map(info => (
                                    <QuickActionButton
                                        key={info}
                                        onClick={() => handleAddClinicalInfo(info)}
                                        className="w-full justify-start text-left"
                                    >
                                        {info}
                                    </QuickActionButton>
                                ))}
                            </div>
                        </div>
                    </InspiredCard>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="functional-impact-textarea">Functional Impact</label>
                        <StyledTextarea
                            id="functional-impact-textarea"
                            value={functionalImpact}
                            onChange={(e) => setFunctionalImpact(e.target.value)}
                            placeholder="Describe impact on daily activities, work capacity, etc."
                            rows={4}
                        />
                        <div className="mt-4">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggestions:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {quickFunctionalImpacts.map(impact => (
                                    <QuickActionButton
                                        key={impact}
                                        onClick={() => handleAddFunctionalImpact(impact)}
                                        className="w-full justify-start text-left"
                                    >
                                        {impact}
                                    </QuickActionButton>
                                ))}
                            </div>
                        </div>
                    </InspiredCard>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="treatment-plan-textarea">Treatment Plan & Prognosis</label>
                        <StyledTextarea
                            id="treatment-plan-textarea"
                            value={treatmentPlan}
                            onChange={(e) => setTreatmentPlan(e.target.value)}
                            placeholder="Outline current treatments, referrals, and expected prognosis..."
                            rows={3}
                        />
                        <div className="mt-4">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggestions:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {quickTreatments.map(treatment => (
                                    <QuickActionButton
                                        key={treatment}
                                        onClick={() => handleAddTreatment(treatment)}
                                        className="w-full justify-start text-left"
                                    >
                                        {treatment}
                                    </QuickActionButton>
                                ))}
                            </div>
                        </div>
                    </InspiredCard>
                </motion.section>

                <motion.div variants={sectionVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
                    <button
                        onClick={handleGenerateSummary}
                        disabled={isLoading || !clinicalInformation}
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

export default CentrelinkFormAssist;
