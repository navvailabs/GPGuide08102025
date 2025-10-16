import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Loader2, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DexaInputs {
    age: string;
    gender: 'Female' | 'Male' | 'Other';
    indications: string[];
    notes: string;
}

interface DexaScanToolProps {
    inputs: DexaInputs;
    setInputs: React.Dispatch<React.SetStateAction<DexaInputs>>;
    summary: string | null;
    setSummary: React.Dispatch<React.SetStateAction<string | null>>;
}

const commonIndications = [
    "Age ≥ 70 years",
    "History of low-trauma fracture",
    "Prolonged corticosteroid therapy",
    "Hypogonadism (male or female)",
    "Rheumatoid arthritis",
    "Malabsorption disorders (e.g., Coeliac disease)",
    "Chronic liver or kidney disease",
    "Hyperthyroidism or hyperparathyroidism",
    "Proven low bone mineral density (for monitoring)",
];

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const DexaScanTool = ({ inputs, setInputs, summary, setSummary }: DexaScanToolProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleIndicationToggle = (indication: string) => {
        setInputs(prev => {
            const newIndications = prev.indications.includes(indication)
                ? prev.indications.filter(i => i !== indication)
                : [...prev.indications, indication];
            return { ...prev, indications: newIndications };
        });
    };

    const handleGenerateSummary = () => {
        setIsLoading(true);
        setSummary(null);

        // Simulate generation
        setTimeout(() => {
            let summaryText = `Requesting DEXA scan for this ${inputs.age}-year-old ${inputs.gender.toLowerCase()} patient. `;

            if (inputs.indications.length > 0) {
                summaryText += `This is indicated due to: ${inputs.indications.join(', ')}. `;
            } else {
                summaryText += `This is indicated for assessment of bone mineral density. `;
            }

            if (inputs.notes.trim()) {
                summaryText += `Additional clinical context: ${inputs.notes.trim()}. `;
            }

            summaryText += `The scan is requested to assess for osteoporosis and guide future management.`;

            setSummary(summaryText);
            setIsLoading(false);
        }, 1000);
    };

    const handleReset = () => {
        setInputs({ age: '', gender: 'Female', indications: [], notes: '' });
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
            <motion.div
                variants={sectionVariants}
                className="mb-10 text-center"
            >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">DEXA Scan Referral Summary</h2>
                <p className="mt-3 text-base text-gray-400">Generate a concise summary for DEXA scan referrals based on Australian guidelines.</p>
            </motion.div>

            <div className="space-y-8">
                <motion.section variants={sectionVariants}>
                    <div className="bg-[#1F2023]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 text-white">Patient Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="age-input">Patient Age</label>
                                <input
                                    id="age-input"
                                    type="number"
                                    value={inputs.age}
                                    onChange={(e) => setInputs(prev => ({...prev, age: e.target.value}))}
                                    placeholder="e.g., 72"
                                    className="form-input w-full rounded-lg border-white/20 bg-black/20 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-500 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Patient Gender</label>
                                <div className="flex gap-2 bg-black/20 p-1 rounded-lg">
                                    {(['Female', 'Male', 'Other'] as const).map(gender => (
                                        <button
                                            key={gender}
                                            onClick={() => setInputs(prev => ({...prev, gender}))}
                                            className={cn(
                                                'flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                                                inputs.gender === gender ? 'bg-white text-black' : 'text-gray-300 hover:bg-white/10'
                                            )}
                                        >{gender}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <div className="bg-[#1F2023]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 text-white">Clinical Indications (MBS Criteria)</h3>
                        <div className="flex flex-wrap gap-2">
                            {commonIndications.map(indication => (
                                <button
                                    key={indication}
                                    onClick={() => handleIndicationToggle(indication)}
                                    className={cn(
                                        'text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 border',
                                        inputs.indications.includes(indication)
                                            ? 'bg-premium-gold/20 border-premium-gold text-premium-gold'
                                            : 'bg-black/20 border-white/10 hover:bg-black/40 text-gray-300'
                                    )}
                                >
                                    {indication}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <div className="bg-[#1F2023]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="notes-textarea">Additional Clinical Notes</label>
                        <textarea
                            id="notes-textarea"
                            value={inputs.notes}
                            onChange={(e) => setInputs(prev => ({...prev, notes: e.target.value}))}
                            className="form-textarea w-full rounded-lg border-white/20 bg-black/20 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-500 text-white"
                            placeholder="Add any other relevant details..."
                            rows={3}
                        ></textarea>
                    </div>
                </motion.section>

                <motion.div
                    variants={sectionVariants}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6"
                >
                    <button
                        onClick={handleGenerateSummary}
                        disabled={isLoading || !inputs.age}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-5 w-5" />
                                Generate Summary
                            </>
                        )}
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
                    <motion.div 
                        variants={sectionVariants} 
                        className="border-t border-white/10 pt-8 mt-12"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-white">Generated Summary</h3>
                            <button
                                onClick={handleCopy}
                                className={cn(
                                    'flex items-center justify-center gap-2 h-9 px-3 bg-black/20 hover:bg-black/40 font-semibold rounded-lg transition-all text-gray-300 text-sm',
                                    isCopied && 'text-success-green'
                                )}
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

export default DexaScanTool;
