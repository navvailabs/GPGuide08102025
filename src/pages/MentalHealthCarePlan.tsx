import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import InspiredCard from '@/components/ui/InspiredCard';
import { StyledTextarea } from '@/components/ui/StyledTextarea';
import { QuickActionButton } from '@/components/ui/QuickActionButton';
import MseSection from '@/components/care-plan/MseSection';
import PreviewSection from '@/components/care-plan/PreviewSection';

interface MentalHealthCarePlanProps {
    clinicalDetails: string;
    setClinicalDetails: (value: string) => void;
    psychologicalAssessment: string;
    setPsychologicalAssessment: (value: string) => void;
    mse: string;
    setMse: (value: string) => void;
    relevantHistory: string;
    setRelevantHistory: (value: string) => void;
    managementGoals: string;
    setManagementGoals: (value: string) => void;
    mhcpPreviewHtml: string | null;
    setMhcpPreviewHtml: (value: string | null) => void;
}

const clinicalDetailsCategories = {
    '🧠 Mood Symptoms': ['Low mood', 'Loss of interest (anhedonia)', 'Feelings of hopelessness', 'Crying episodes', 'Irritability'],
    '⚡ Anxiety Symptoms': ['Excessive worry', 'Panic attacks', 'Restlessness', 'Racing thoughts', 'Tight chest / palpitations'],
    '😴 Sleep & Energy': ['Poor sleep / insomnia', 'Early morning waking', 'Low energy / fatigue', 'Poor concentration'],
    '📉 Functional Impact': ['Reduced ability to work/study', 'Social withdrawal', 'Avoidance behaviour', 'Difficulty coping with daily tasks'],
    '🚨 Risk Symptoms': ['Suicidal thoughts (no plan)', 'Passive suicidal ideation', 'Self-harm urges', 'No suicidal ideation'],
};

const managementGoalsSuggestions = [
    'Improve mood by engaging in structured CBT sessions weekly',
    'Reduce anxiety attacks from daily to once a week within 6 weeks',
    'Improve sleep hygiene and achieve minimum 6 hrs sleep within 4 weeks',
    'Increase social engagement by attending one community activity weekly',
];

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const MentalHealthCarePlan = ({
    clinicalDetails, setClinicalDetails,
    psychologicalAssessment, setPsychologicalAssessment,
    mse, setMse,
    relevantHistory, setRelevantHistory,
    managementGoals, setManagementGoals,
    mhcpPreviewHtml, setMhcpPreviewHtml
}: MentalHealthCarePlanProps) => {
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);

    const handleGeneratePreview = async () => {
        setIsLoading(true);
        setMhcpPreviewHtml(null);
        
        const payload = {
            clinical_details: clinicalDetails,
            psychological_assessment: psychologicalAssessment,
            mental_state_examination: mse,
            relevant_history: relevantHistory,
            management_goals: managementGoals,
        };
        const webhookUrl = 'https://n8n.srv1072529.hstgr.cloud/webhook-test/ebdae1e4-3445-41da-b885-28a6995350b2';

        try {
            const response = await axios.post(webhookUrl, payload);
            setMhcpPreviewHtml(JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching care plan from webhook:', error);
            let errorMessage = 'An error occurred while generating the care plan.';
            if (axios.isAxiosError(error) && !error.response) {
                errorMessage = 'A network error occurred. This could be a CORS issue. Please check the browser console for details.';
            }
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setClinicalDetails('');
        setPsychologicalAssessment('');
        setMse('');
        setRelevantHistory('');
        setManagementGoals('');
        setMhcpPreviewHtml(null);
    };

    const handleAddClinicalDetail = (detail: string) => {
        setClinicalDetails(prev => prev ? `${prev}, ${detail}` : detail);
    };

    const handleAddManagementGoal = (goal: string) => {
        setManagementGoals(prev => prev ? `${prev}\n${goal}` : goal);
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
                <h2 className={cn("text-3xl md:text-4xl font-bold tracking-tight", theme === 'light' ? 'text-gray-900' : 'text-white')}>Mental Health Care Plan Generator</h2>
                <p className={cn("mt-3 text-base", theme === 'light' ? 'text-gray-500' : 'text-gray-400')}>
                    A structured template for creating a comprehensive MHCP.
                </p>
            </motion.div>

            <div className="space-y-8">
                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className={cn("block text-sm font-medium mb-2", theme === 'light' ? 'text-gray-600' : 'text-gray-300')}>Clinical Details</label>
                        <StyledTextarea value={clinicalDetails} onChange={(e) => setClinicalDetails(e.target.value)} placeholder="Low mood, anhedonia, decreased energy, early waking, loss of appetite, difficulty coping at work." rows={4} />
                        <div className="mt-4 space-y-3">
                            {Object.entries(clinicalDetailsCategories).map(([category, items]) => (
                                <div key={category}>
                                    <p className={cn("text-xs mb-2 font-semibold", theme === 'light' ? 'text-gray-500' : 'text-gray-400')}>{category}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map(item => <QuickActionButton key={item} onClick={() => handleAddClinicalDetail(item)}>{item}</QuickActionButton>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </InspiredCard>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className={cn("block text-sm font-medium mb-2", theme === 'light' ? 'text-gray-600' : 'text-gray-300')}>Psychological Assessment</label>
                        <StyledTextarea value={psychologicalAssessment} onChange={(e) => setPsychologicalAssessment(e.target.value)} placeholder="K10: 28 (High) | DASS-21: D14 M / A10 M / S20 S | PHQ-9: 17 (Mod Severe) | GAD-7: 15 (Severe) | AUDIT: 8 (Hazardous)" rows={2} />
                    </InspiredCard>
                </motion.section>

                <MseSection mseNotes={mse} setMseNotes={setMse} />

                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className={cn("block text-sm font-medium mb-2", theme === 'light' ? 'text-gray-600' : 'text-gray-300')}>Relevant History</label>
                        <StyledTextarea value={relevantHistory} onChange={(e) => setRelevantHistory(e.target.value)} placeholder="Past depression 2021, no hospital admissions. Family history mother with anxiety. Recent job loss. No suicidal ideation." rows={3} />
                    </InspiredCard>
                </motion.section>

                <motion.section variants={sectionVariants}>
                    <InspiredCard>
                        <label className={cn("block text-sm font-medium mb-2", theme === 'light' ? 'text-gray-600' : 'text-gray-300')}>Management Goals</label>
                        <StyledTextarea value={managementGoals} onChange={(e) => setManagementGoals(e.target.value)} placeholder="e.g., Improve mood and return to work..." rows={4} />
                        <div className="mt-4">
                            <p className={cn("text-xs mb-2", theme === 'light' ? 'text-gray-500' : 'text-gray-400')}>Suggestions:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {managementGoalsSuggestions.map(goal => <QuickActionButton key={goal} onClick={() => handleAddManagementGoal(goal)} className="w-full justify-start text-left">{goal}</QuickActionButton>)}
                            </div>
                        </div>
                    </InspiredCard>
                </motion.section>

                <motion.div variants={sectionVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
                    <button onClick={handleGeneratePreview} disabled={isLoading} className={cn("w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100", theme === 'light' ? 'bg-gray-900 text-white' : 'bg-white text-black')}>
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                        {isLoading ? 'Generating...' : 'Generate Care Plan'}
                    </button>
                    <button onClick={handleReset} disabled={isLoading} className={cn("w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 font-semibold rounded-lg transition-colors disabled:opacity-70", theme === 'light' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-white/10 text-white hover:bg-white/20')}>
                        <RefreshCw className="h-5 w-5" />
                        Reset
                    </button>
                </motion.div>

                {mhcpPreviewHtml && <PreviewSection carePlanHtml={mhcpPreviewHtml} />}
            </div>
        </motion.div>
    );
};

export default MentalHealthCarePlan;
