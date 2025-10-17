import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Loader2, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    const [diagnosis, setDiagnosis] = useState('');
    const [functionalImpact, setFunctionalImpact] = useState('');
    const [treatmentPlan, setTreatmentPlan] = useState('');
    const [summary, setSummary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleAddDiagnosis = (diagnosisToAdd: string) => {
        setDiagnosis(prev => {
            if (!prev.trim()) return diagnosisToAdd;
            return `${prev.trim()}\n${diagnosisToAdd}`;
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
            let summaryText = `This patient is diagnosed with ${diagnosis || '[Diagnosis]'}. `;
            summaryText += `Functionally, this impacts them by: ${functionalImpact || '[Functional Impact]'}. `;
            summaryText += `The current treatment plan includes: ${treatmentPlan || '[Treatment Plan]'}. `;
            summaryText += `This information is provided to assist with their Centrelink claim (SU415).`;
            
            setSummary(summaryText);
            setIsLoading(false);
        }, 1000);
    };

    const handleReset = () => {
        setDiagnosis('');
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
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Centrelink SU415 Form Assist</h2>
                <p className="mt-3 text-base text-gray-400">Generate key statements for the Centrelink Medical Certificate (SU415).</p>
            </motion.div>

            <div className="space-y-8">
                <motion.section variants={sectionVariants}>
                    <div className="bg-[#1F2023]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="diagnosis-textarea">Diagnosis</label>
                        <textarea
                            id="diagnosis-textarea"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            placeholder="List all relevant diagnoses..."
                            className="form-textarea w-full rounded-lg border-white/20 bg-black/20 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-500 text-white"
                            rows={2}
                        />
                        <div className="mt-4">
                            <p className="text-xs text-gray-400 mb-2">Suggestions:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {quickDiagnoses.map(diag => (
                                    <button
                                        key={diag}
                                        onClick={() => handleAddDiagnosis(diag)}
                                        className="text-sm font-medium bg-black/20 hover:bg-black/40 px-3 py-2 rounded-lg transition-colors text-gray-300 text-left"
                                    >
                                        {diag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <div className="bg-[#1F2023]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="functional-impact-textarea">Functional Impact</label>
                        <textarea
                            id="functional-impact-textarea"
                            value={functionalImpact}
                            onChange={(e) => setFunctionalImpact(e.target.value)}
                            placeholder="Describe impact on daily activities, work capacity, etc."
                            className="form-textarea w-full rounded-lg border-white/20 bg-black/20 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-500 text-white"
                            rows={4}
                        />
                        <div className="mt-4">
                            <p className="text-xs text-gray-400 mb-2">Suggestions:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {quickFunctionalImpacts.map(impact => (
                                    <button
                                        key={impact}
                                        onClick={() => handleAddFunctionalImpact(impact)}
                                        className="text-sm font-medium bg-black/20 hover:bg-black/40 px-3 py-2 rounded-lg transition-colors text-gray-300 text-left"
                                    >
                                        {impact}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <div className="bg-[#1F2023]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="treatment-plan-textarea">Treatment Plan & Prognosis</label>
                        <textarea
                            id="treatment-plan-textarea"
                            value={treatmentPlan}
                            onChange={(e) => setTreatmentPlan(e.target.value)}
                            placeholder="Outline current treatments, referrals, and expected prognosis..."
                            className="form-textarea w-full rounded-lg border-white/20 bg-black/20 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-500 text-white"
                            rows={3}
                        />
                        <div className="mt-4">
                            <p className="text-xs text-gray-400 mb-2">Suggestions:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {quickTreatments.map(treatment => (
                                    <button
                                        key={treatment}
                                        onClick={() => handleAddTreatment(treatment)}
                                        className="text-sm font-medium bg-black/20 hover:bg-black/40 px-3 py-2 rounded-lg transition-colors text-gray-300 text-left"
                                    >
                                        {treatment}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.div variants={sectionVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
                    <button
                        onClick={handleGenerateSummary}
                        disabled={isLoading || !diagnosis}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                        {isLoading ? 'Generating...' : 'Generate Summary'}
                    </button>
                    <button
                        onClick={handleReset}
                        disabled={isLoading}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <RefreshCw className="h-5 w-5" />
                        Reset
                    </button>
                </motion.div>

                {summary && (
                    <motion.div variants={sectionVariants} className="border-t border-white/10 pt-8 mt-12">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-white">Generated Summary</h3>
                            <button
                                onClick={handleCopy}
                                className={cn('flex items-center justify-center gap-2 h-9 px-3 bg-black/20 hover:bg-black/40 font-semibold rounded-lg transition-all text-gray-300 text-sm', isCopied && 'text-success-green')}
                            >
                                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        </div>
                        <div className="bg-[#1F2023]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl text-gray-300">
                            <p>{summary}</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default CentrelinkFormAssist;
