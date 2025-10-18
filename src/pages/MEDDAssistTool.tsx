import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Loader2, Copy, Check, AlertTriangle, ExternalLink, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StyledTextarea } from '@/components/ui/StyledTextarea';
import InspiredCard from '@/components/ui/InspiredCard';

// Simplified Australian Opioid Conversion Factors
// Source: Adapted from various Australian guidelines, e.g., ANZCA FPM. For educational purposes.
const CONVERSION_FACTORS: { [key: string]: { factor: number; note?: string } } = {
    // Oral
    'morphine': { factor: 1 },
    'oxycodone': { factor: 1.5 },
    'targin': { factor: 1.5 }, // Oxycodone/Naloxone
    'hydromorphone': { factor: 5 },
    'tapentadol': { factor: 0.3 },
    'tramadol': { factor: 0.1 },
    'codeine': { factor: 0.1 },
    'dextropropoxyphene': { factor: 0.1 },
    
    // Patches (factor converts mcg/hr to oral morphine mg/day)
    'fentanyl': { factor: 2.4, note: "mcg/hr" },
    'buprenorphine': { factor: 1.8, note: "mcg/hr" }, // Norspan/Buprenorphine patch
};

const FREQUENCY_MULTIPLIERS: { [key: string]: number } = {
    'mane': 1, 'nocte': 1, 'od': 1, 'daily': 1,
    'bd': 2, 'tds': 3, 'qid': 4,
    'q12h': 2, 'q8h': 3, 'q6h': 4, 'q4h': 6,
    'twice daily': 2, 'three times daily': 3, 'four times daily': 4,
};

interface MEDDResult {
    totalMEDD: number;
    breakdown: {
        originalLine: string;
        name: string;
        dailyDose: number;
        medd: number;
        error?: string;
    }[];
}

interface MEDDAssistToolProps {
    medicationInput: string;
    setMedicationInput: React.Dispatch<React.SetStateAction<string>>;
    result: MEDDResult | null;
    setResult: React.Dispatch<React.SetStateAction<MEDDResult | null>>;
}

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const MEDDAssistTool = ({ medicationInput, setMedicationInput, result, setResult }: MEDDAssistToolProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const parseMedicationLine = (line: string) => {
        const cleanedLine = line.trim().toLowerCase();
        if (!cleanedLine) return null;

        // Regex to find med name, dose, and frequency info
        const match = cleanedLine.match(/^(.*?)\s+(\d+(\.\d+)?)\s*(mg|mcg|micrograms?)\s*(.*)$/);
        if (!match) {
            return { originalLine: line, name: 'Unknown', dailyDose: 0, medd: 0, error: 'Could not parse line.' };
        }

        const [, nameStr, doseStr, , unit, freqStr] = match;
        const dose = parseFloat(doseStr);
        
        const knownMed = Object.keys(CONVERSION_FACTORS).find(k => nameStr.includes(k));
        if (!knownMed) {
            return { originalLine: line, name: nameStr, dailyDose: 0, medd: 0, error: 'Medication not found in conversion list.' };
        }

        const conversion = CONVERSION_FACTORS[knownMed];

        // Handle patches (mcg/hr)
        if (conversion.note === 'mcg/hr') {
            if (unit.startsWith('mcg') || unit.startsWith('microgram')) {
                const medd = dose * conversion.factor;
                return { originalLine: line, name: knownMed, dailyDose: dose, medd, error: undefined };
            } else {
                return { originalLine: line, name: knownMed, dailyDose: 0, medd: 0, error: 'Patch dose should be in mcg/hr.' };
            }
        }

        // Handle oral meds (mg)
        const knownFreq = Object.keys(FREQUENCY_MULTIPLIERS).find(f => freqStr.includes(f));
        const multiplier = knownFreq ? FREQUENCY_MULTIPLIERS[knownFreq] : 1; // Default to once daily if not specified
        
        const dailyDose = dose * multiplier;
        const medd = dailyDose * conversion.factor;

        return { originalLine: line, name: knownMed, dailyDose, medd, error: undefined };
    };

    const handleCalculate = () => {
        setIsLoading(true);
        setResult(null);

        setTimeout(() => {
            const lines = medicationInput.split('\n').filter(line => line.trim() !== '');
            const breakdown = lines.map(line => parseMedicationLine(line)).filter(Boolean) as MEDDResult['breakdown'];
            const totalMEDD = breakdown.reduce((sum, item) => sum + item.medd, 0);

            setResult({ totalMEDD, breakdown });
            setIsLoading(false);
        }, 500);
    };

    const handleReset = () => {
        setMedicationInput('');
        setResult(null);
    };

    const handleCopy = () => {
        if (!result) return;
        let textToCopy = `Total Morphine Equivalent Daily Dose (MEDD): ${result.totalMEDD.toFixed(1)} mg\n\nBreakdown:\n`;
        result.breakdown.forEach(item => {
            textToCopy += `- ${item.originalLine}: ${item.medd.toFixed(1)} mg MEDD\n`;
        });
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };
    
    const getRiskLevel = (medd: number) => {
        if (medd >= 90) return { text: 'High Risk', color: 'text-red-500 dark:text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' };
        if (medd >= 50) return { text: 'Increased Risk', color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' };
        return { text: 'Lower Risk', color: 'text-green-500 dark:text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' };
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-4xl mx-auto"
        >
            <motion.div variants={sectionVariants} className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Morphine Equivalent Daily Dose (MEDD) Assist</h2>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">Calculate total MEDD using Australian conversion standards.</p>
            </motion.div>

            <div className="space-y-8">
                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300" htmlFor="medication-input">Opioid Medications & Doses</label>
                        <StyledTextarea
                            id="medication-input"
                            value={medicationInput}
                            onChange={(e) => setMedicationInput(e.target.value)}
                            placeholder="Enter one medication per line, e.g.,&#10;Oxycodone 10mg BD&#10;Targin 20/10 twice daily&#10;Fentanyl patch 25mcg/hr"
                            className="font-mono text-sm"
                            rows={5}
                        />
                    </InspiredCard>
                </motion.section>

                <motion.div variants={sectionVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
                    <button
                        onClick={handleCalculate}
                        disabled={isLoading || !medicationInput.trim()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Calculator className="h-5 w-5" />}
                        {isLoading ? 'Calculating...' : 'Calculate MEDD'}
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

                {result && (
                    <motion.div variants={sectionVariants} className="border-t border-gray-200 dark:border-white/10 pt-8 mt-12">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Calculation Result</h3>
                            <button
                                onClick={handleCopy}
                                className={cn('flex items-center justify-center gap-2 h-9 px-3 bg-gray-100 dark:bg-black/20 hover:bg-gray-200 dark:hover:bg-black/40 font-semibold rounded-lg transition-all text-gray-700 dark:text-gray-300 text-sm', isCopied && 'text-success-green')}
                            >
                                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        </div>
                        <InspiredCard className="space-y-6">
                            <div className="text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total MEDD</p>
                                <p className={`text-5xl font-bold ${getRiskLevel(result.totalMEDD).color}`}>{result.totalMEDD.toFixed(1)} <span className="text-2xl font-medium">mg</span></p>
                                <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${getRiskLevel(result.totalMEDD).bg} ${getRiskLevel(result.totalMEDD).color} ${getRiskLevel(result.totalMEDD).border}`}>
                                    <AlertTriangle className="h-4 w-4" />
                                    {getRiskLevel(result.totalMEDD).text}
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Breakdown</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 dark:bg-white/5">
                                            <tr>
                                                <th className="p-3 font-medium border-b border-gray-200 dark:border-white/10">Medication</th>
                                                <th className="p-3 font-medium border-b border-gray-200 dark:border-white/10 text-right">Calculated MEDD (mg)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.breakdown.map((item, index) => (
                                                <tr key={index} className="border-b border-gray-200 dark:border-white/10 last:border-b-0">
                                                    <td className="p-3">
                                                        <p className="text-gray-700 dark:text-gray-300">{item.originalLine}</p>
                                                        {item.error && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{item.error}</p>}
                                                    </td>
                                                    <td className="p-3 text-right font-mono text-gray-700 dark:text-gray-300">{item.error ? '-' : item.medd.toFixed(1)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div className="text-xs text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-200 dark:border-white/10">
                                <p><strong>Disclaimer:</strong> This tool is for educational purposes only and should not replace clinical judgment. Conversion factors are based on Australian guidelines but may vary. Always consult official resources.</p>
                                <a href="https://www.anzca.edu.au/resources/faculty-of-pain-medicine" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 transition-colors">
                                    View ANZCA FPM Guidelines <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </InspiredCard>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default MEDDAssistTool;
