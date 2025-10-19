import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import { StyledTextarea } from '@/components/ui/StyledTextarea';
import InspiredCard from '@/components/ui/InspiredCard';
import { QuickActionButton } from '@/components/ui/QuickActionButton';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import MseSection from '@/components/care-plan/MseSection';
import MentalHealthPreviewSection from '@/components/care-plan/MentalHealthPreviewSection';

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
    carePlanHtml: string | null;
    setCarePlanHtml: React.Dispatch<React.SetStateAction<string | null>>;
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
    carePlanHtml,
    setCarePlanHtml
}: MentalHealthCarePlanProps) => {
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);

    const handleGeneratePreview = async () => {
        setIsLoading(true);
        setCarePlanHtml(null);

        const payload = {
            presentation,
            assessment,
            mse,
            history,
            goals,
        };
        const webhookUrl = 'https://n8n.srv1072529.hstgr.cloud/webhook/ebdae1e4-3445-41da-b885-28a6995350b2';

        try {
            const response = await axios.post(webhookUrl, payload);
            const data = response.data;

            if (data && typeof data.output === 'string') {
                const markdownContent = data.output;
                
                // Convert Markdown to HTML
                const htmlContent = markdownContent
                    .split('\n\n')
                    .filter(paragraph => paragraph.trim() !== '') // Filter out empty paragraphs from multiple newlines
                    .map(paragraph => {
                        // Handle headings like **CLINICAL DISCLAIMER**
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                            return `<h2>${paragraph.substring(2, paragraph.length - 2)}</h2>`;
                        }
                        // Handle the crisis resources list
                        if (paragraph.includes('Lifeline:')) {
                            const listItems = paragraph.split('\n').map(item => `<li>${item.trim().replace(/  /g, ' ')}</li>`).join('');
                            return `<h3>Australian Crisis Resources for Patient</h3><ul>${listItems}</ul>`;
                        }
                        // Handle regular paragraphs and preserve single line breaks
                        return `<p>${paragraph.replace(/\n/g, '<br />')}</p>`;
                    })
                    .join('');

                setCarePlanHtml(htmlContent);
            } else {
                const receivedDataString = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
                console.error("Webhook response was not in the expected format.", data);
                alert("Failed to generate the care plan. The format of the data received from the webhook was not recognized.\n\nReceived data:\n" + receivedDataString);
            }

        } catch (error) {
            console.error('Error fetching care plan from webhook:', error);
            let errorMessage = 'An error occurred while generating the care plan.';
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    errorMessage = 'A network error occurred. This is often due to a CORS policy on the server. Please check your browser\'s developer console (F12) for "CORS" errors and ensure your webhook is configured to allow requests from this origin.';
                } else {
                    errorMessage = `The server responded with an error: ${error.response.status} ${error.response.statusText}. Check the console for more details.`;
                }
            } else if (error instanceof Error) {
                errorMessage = `An unexpected error occurred: ${error.message}`;
            }
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setPresentation('');
        setAssessment('');
        setMse('');
        setHistory('');
        setGoals('');
        setCarePlanHtml(null);
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
                    disabled={isLoading || !presentation.trim()}
                    className={cn(
                        "w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100",
                        theme === 'light'
                            ? 'bg-gray-900 text-white hover:bg-gray-700'
                            : 'bg-white text-black hover:bg-gray-200'
                    )}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="h-5 w-5" />
                            Generate Care Plan
                        </>
                    )}
                </button>
                <button
                    onClick={handleReset}
                    disabled={isLoading}
                    className={cn(
                        "w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 font-semibold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed",
                        theme === 'light'
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-white/10 text-white hover:bg-white/20'
                    )}
                >
                    <RefreshCw className="h-5 w-5" />
                    Reset
                </button>
            </motion.div>

            <MentalHealthPreviewSection carePlanHtml={carePlanHtml} />
        </motion.div>
    );
};

export default MentalHealthCarePlan;
