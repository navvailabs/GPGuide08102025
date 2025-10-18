import React from 'react';
import { motion } from 'framer-motion';
import { FileText, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import InspiredCard from '@/components/ui/InspiredCard';
import { QuickActionButton } from '@/components/ui/QuickActionButton';
import { StyledTextarea } from '@/components/ui/StyledTextarea';

interface MseSectionProps {
  mseNotes: string;
  setMseNotes: React.Dispatch<React.SetStateAction<string>>;
}

const mseDomains = {
    Appearance: [
        'Well-groomed and appropriately dressed',
        'Poor hygiene and dishevelled',
        'Appears stated age',
        'Notably underweight or gaunt',
    ],
    Behaviour: [
        'Calm and cooperative',
        'Agitated and restless',
        'Guarded or withdrawn',
        'Psychomotor retardation',
    ],
    Speech: [
        'Normal rate and tone',
        'Pressured speech',
        'Slow and soft',
        'Increased latency in responses',
    ],
    Mood: [
        'Reports feeling “okay”',
        'Low mood most days',
        'Anxious and overwhelmed',
        'Irritable',
    ],
    Affect: [
        'Appropriate and reactive',
        'Blunted or flat',
        'Labile affect',
        'Incongruent with stated mood',
    ],
    'Thought Form': [
        'Logical and goal-directed',
        'Circumstantial',
        'Tangential',
        'Thought blocking',
    ],
    'Thought Content': [
        'No delusions or obsessions',
        'Passive suicidal ideation',
        'Active suicidal ideation with plan',
        'Paranoid ideation',
    ],
    Perception: [
        'No hallucinations',
        'Auditory hallucinations reported',
        'Visual hallucinations',
    ],
    Cognition: [
        'Alert and oriented to time, place, person',
        'Impaired attention or concentration',
        'Short-term memory impairment',
    ],
    'Insight & Judgement': [
        'Good insight and judgement',
        'Limited insight',
        'Poor judgement affecting function',
    ],
};

const predefinedMse = {
    normal: "Appearance is neat and appropriate. Behaviour is calm and cooperative. Speech is normal in rate and volume. Mood is euthymic with congruent affect. Thought processes are logical and goal-directed with no evidence of delusions or hallucinations. Perception is normal. Cognition is intact with full orientation to time, place, and person. Insight and judgement are good. No suicidal or homicidal ideation.",
    depression: "Appearance may be unkempt. Behaviour shows psychomotor retardation. Speech is slow and soft. Mood is reported as low. Affect is blunted. Thought content may include themes of hopelessness and passive suicidal ideation. Cognition shows impaired concentration. Insight is variable.",
    anxiety: "Appearance is tidy but may seem tense. Behaviour is restless and agitated, with fidgeting. Speech can be rapid. Mood is reported as anxious and overwhelmed. Affect is appropriate but may be overly reactive. Thought content is focused on worries. Cognition is intact but attention may be difficult to sustain. Insight is good.",
    stress: "Appearance is tired. Behaviour is irritable and tense. Speech is of normal rate but may be pressured. Mood is reported as 'stressed' or 'overwhelmed'. Affect is reactive and congruent. Thought content is preoccupied with stressors. Cognition is generally intact, though may report 'brain fog'. Insight is good."
};


const MseSection = ({ mseNotes, setMseNotes }: MseSectionProps) => {
    const { theme } = useTheme();

    const handleSelect = (domain: string, option: string) => {
        const sentence = `${domain}: ${option}.`;
        setMseNotes(prev => {
            if (prev.includes(sentence)) {
                // If sentence exists, remove it
                return prev.replace(sentence, '').replace(/\s\s+/g, ' ').trim();
            } else {
                // Otherwise, add it
                return prev ? `${prev.trim()} ${sentence}` : sentence;
            }
        });
    };
    
    const handleSetPredefinedMse = (template: keyof typeof predefinedMse) => {
        setMseNotes(predefinedMse[template]);
    };

    const isSelected = (domain: string, option: string) => {
        const sentence = `${domain}: ${option}.`;
        return mseNotes.includes(sentence);
    };

    return (
        <motion.section>
            <h3 className={cn(
                "text-2xl font-satoshi font-bold mb-4",
                theme === 'light' ? 'text-gray-900' : 'text-white'
            )}>Mental State Examination (MSE)</h3>
            <InspiredCard className="space-y-8">
                <div className="space-y-6">
                    {Object.entries(mseDomains).map(([domain, options]) => (
                        <div key={domain}>
                            <h4 className={cn(
                                "text-sm font-semibold mb-3",
                                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                            )}>{domain}</h4>
                            <div className="flex flex-wrap gap-2">
                                {options.map((option) => (
                                    <QuickActionButton
                                        key={option}
                                        onClick={() => handleSelect(domain, option)}
                                        className={cn(
                                            'justify-center',
                                            isSelected(domain, option) && '!bg-premium-gold/10 dark:!bg-premium-gold/20 !border-premium-gold !text-premium-gold'
                                        )}
                                    >
                                        {option}
                                    </QuickActionButton>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className={cn(
                            "text-sm font-medium flex items-center gap-2",
                            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                        )}>
                            <FileText className="h-4 w-4" />
                            Clinical Notes
                        </label>
                        <button
                            onClick={() => setMseNotes('')}
                            className={cn(
                                "flex items-center gap-1.5 text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                theme === 'light' 
                                    ? 'text-gray-500 hover:text-red-500' 
                                    : 'text-gray-400 hover:text-red-400'
                            )}
                            disabled={!mseNotes}
                        >
                            <XCircle className="h-4 w-4" />
                            Clear
                        </button>
                    </div>
                    <StyledTextarea
                        value={mseNotes}
                        onChange={(e) => setMseNotes(e.target.value)}
                        placeholder='Select options above or a quick action below to build notes...'
                        rows={8}
                    />
                </div>

                <div>
                    <p className={cn(
                        "text-xs mb-2",
                        theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    )}>Quick Actions:</p>
                    <div className="flex flex-wrap gap-2">
                        <QuickActionButton
                            onClick={() => handleSetPredefinedMse('normal')}
                            className="justify-center !py-2 !font-semibold bg-blue-500/10 dark:bg-blue-400/20 border-blue-500/50 text-blue-600 dark:text-blue-400 hover:!bg-blue-500/20 dark:hover:!bg-blue-400/30"
                        >
                            Normal MSE
                        </QuickActionButton>
                        <QuickActionButton
                            onClick={() => handleSetPredefinedMse('depression')}
                            className="justify-center !py-2 !font-semibold bg-sky-500/10 dark:bg-sky-400/20 border-sky-500/50 text-sky-600 dark:text-sky-400 hover:!bg-sky-500/20 dark:hover:!bg-sky-400/30"
                        >
                            Depression
                        </QuickActionButton>
                        <QuickActionButton
                            onClick={() => handleSetPredefinedMse('anxiety')}
                            className="justify-center !py-2 !font-semibold bg-amber-500/10 dark:bg-amber-400/20 border-amber-500/50 text-amber-600 dark:text-amber-400 hover:!bg-amber-500/20 dark:hover:!bg-amber-400/30"
                        >
                            Anxiety
                        </QuickActionButton>
                        <QuickActionButton
                            onClick={() => handleSetPredefinedMse('stress')}
                            className="justify-center !py-2 !font-semibold bg-rose-500/10 dark:bg-rose-400/20 border-rose-500/50 text-rose-600 dark:text-rose-400 hover:!bg-rose-500/20 dark:hover:!bg-rose-400/30"
                        >
                            Stress
                        </QuickActionButton>
                    </div>
                </div>
            </InspiredCard>
        </motion.section>
    );
};

export default MseSection;
