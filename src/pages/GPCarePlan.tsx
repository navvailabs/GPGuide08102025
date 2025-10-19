import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import ConditionsSection from '@/components/care-plan/ConditionsSection';
import AlliedHealthSection from '@/components/care-plan/AlliedHealthSection';
import GoalsSection from '@/components/care-plan/GoalsSection';
import PreviewSection from '@/components/care-plan/PreviewSection';
import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface GPCarePlanProps {
    conditions: string;
    setConditions: React.Dispatch<React.SetStateAction<string>>;
    alliedHealth: string;
    setAlliedHealth: React.Dispatch<React.SetStateAction<string>>;
    goals: string;
    setGoals: React.Dispatch<React.SetStateAction<string>>;
    carePlanHtml: string | null;
    setCarePlanHtml: React.Dispatch<React.SetStateAction<string | null>>;
}

const GPCarePlan = ({
    conditions,
    setConditions,
    alliedHealth,
    setAlliedHealth,
    goals,
    setGoals,
    carePlanHtml,
    setCarePlanHtml
}: GPCarePlanProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { theme } = useTheme();

    const handleGeneratePreview = async () => {
        setIsLoading(true);
        setCarePlanHtml(null);

        const payload = {
            conditions,
            alliedHealth,
            goals,
        };
        const webhookUrl = 'https://n8n.srv1072529.hstgr.cloud/webhook/Careplan';

        try {
            const response = await axios.post(webhookUrl, payload);
            
            const data = response.data;
            let htmlContent: string | null = null;

            const findHtml = (obj: any): string | null => {
                if (typeof obj === 'string') {
                    if (obj.trim().startsWith('<')) {
                        return obj;
                    }
                    try {
                        const parsed = JSON.parse(obj);
                        return findHtml(parsed);
                    } catch (e) {
                        // Not a valid JSON string
                    }
                }

                if (Array.isArray(obj)) {
                    for (const item of obj) {
                        const found = findHtml(item);
                        if (found) return found;
                    }
                } else if (typeof obj === 'object' && obj !== null) {
                    const priorityKeys = ['html', 'content', 'body', 'data', 'output', 'message'];
                    for (const key of priorityKeys) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) {
                            const found = findHtml(obj[key]);
                            if (found) return found;
                        }
                    }
                    for (const key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key) && !priorityKeys.includes(key)) {
                            const found = findHtml(obj[key]);
                            if (found) return found;
                        }
                    }
                }
                return null;
            };

            htmlContent = findHtml(data);

            if (htmlContent) {
                setCarePlanHtml(htmlContent);
            } else {
                const receivedDataString = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
                console.error("Webhook response did not contain valid HTML.", data);
                alert("Failed to display the care plan. The format of the data received from the webhook was not recognized.\n\nReceived data:\n" + receivedDataString);
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
        setConditions('');
        setAlliedHealth('');
        setGoals('');
        setCarePlanHtml(null);
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
                <h2 className={cn(
                    "text-3xl md:text-4xl font-satoshi font-bold tracking-tight",
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                )}>GP Chronic Condition Management Plan</h2>
                <p className={cn(
                    "mt-3 text-base",
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                )}>Based on content from Australian clinical guidelines</p>
            </motion.div>

            <div className="space-y-12">
                <ConditionsSection conditions={conditions} setConditions={setConditions} />
                <GoalsSection goals={goals} setGoals={setGoals} />
                <AlliedHealthSection alliedHealth={alliedHealth} setAlliedHealth={setAlliedHealth} />

                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6"
                >
                    <button
                        onClick={handleGeneratePreview}
                        disabled={isLoading || !conditions.trim() || !goals.trim()}
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

                <PreviewSection identifier="gp-care-plan" carePlanHtml={carePlanHtml} />
            </div>
        </motion.div>
    );
};

export default GPCarePlan;
