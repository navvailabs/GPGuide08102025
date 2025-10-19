import { useState } from 'react';
import CarePlanLayout from '@/components/app/CarePlanLayout';
import GPCarePlan from '@/pages/GPCarePlan';
import MentalHealthCarePlan from '@/pages/MentalHealthCarePlan';
import DexaScanTool from '@/pages/DexaScanTool';
import CentrelinkFormAssist from '@/pages/CentrelinkFormAssist';
import WorkersCompAssist from '@/pages/WorkersCompAssist';
import MEDDAssistTool from '@/pages/MEDDAssistTool';

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

export type ActiveView = 'gp-care-plan' | 'mental-health-care-plan' | 'dexa-scan-tool' | 'centrelink-form-assist' | 'workers-comp-assist' | 'medd-assist-tool';

const CarePlanSuite = () => {
    const [activeView, setActiveView] = useState<ActiveView>('gp-care-plan');

    // State for GPCarePlan
    const [gpConditions, setGpConditions] = useState<string>('');
    const [gpGoals, setGpGoals] = useState<string>('');
    const [gpAlliedHealth, setGpAlliedHealth] = useState<string>('');
    const [gpCarePlanHtml, setGpCarePlanHtml] = useState<string | null>(null);

    // State for MentalHealthCarePlan
    const [mhPresentation, setMhPresentation] = useState<string>('');
    const [mhAssessment, setMhAssessment] = useState<string>('');
    const [mhMse, setMhMse] = useState<string>('');
    const [mhHistory, setMhHistory] = useState<string>('');
    const [mhGoals, setMhGoals] = useState<string>('');
    const [mhCarePlanHtml, setMhCarePlanHtml] = useState<string | null>(null);

    // State for DexaScanTool
    const [dexaInputs, setDexaInputs] = useState({
        age: '',
        gender: 'Female' as 'Female' | 'Male' | 'Other',
        indications: [] as string[],
        notes: ''
    });
    const [dexaSummary, setDexaSummary] = useState<string | null>(null);

    // State for MEDDAssistTool
    const [meddInput, setMeddInput] = useState<string>('');
    const [meddResult, setMeddResult] = useState<MEDDResult | null>(null);

    const renderContent = () => {
        switch (activeView) {
            case 'gp-care-plan':
                return <GPCarePlan
                    conditions={gpConditions}
                    setConditions={setGpConditions}
                    alliedHealth={gpAlliedHealth}
                    setAlliedHealth={setGpAlliedHealth}
                    goals={gpGoals}
                    setGoals={setGpGoals}
                    carePlanHtml={gpCarePlanHtml}
                    setCarePlanHtml={setGpCarePlanHtml}
                />;
            case 'mental-health-care-plan':
                return <MentalHealthCarePlan 
                    presentation={mhPresentation}
                    setPresentation={setMhPresentation}
                    assessment={mhAssessment}
                    setAssessment={setMhAssessment}
                    mse={mhMse}
                    setMse={setMhMse}
                    history={mhHistory}
                    setHistory={setMhHistory}
                    goals={mhGoals}
                    setGoals={setMhGoals}
                    carePlanHtml={mhCarePlanHtml}
                    setCarePlanHtml={setMhCarePlanHtml}
                />;
            case 'dexa-scan-tool':
                return <DexaScanTool
                    inputs={dexaInputs}
                    setInputs={setDexaInputs}
                    summary={dexaSummary}
                    setSummary={setDexaSummary}
                />;
            case 'centrelink-form-assist':
                return <CentrelinkFormAssist />;
            case 'workers-comp-assist':
                return <WorkersCompAssist />;
            case 'medd-assist-tool':
                return <MEDDAssistTool
                    medicationInput={meddInput}
                    setMedicationInput={setMeddInput}
                    result={meddResult}
                    setResult={setMeddResult}
                />;
            default:
                return <GPCarePlan
                    conditions={gpConditions}
                    setConditions={setGpConditions}
                    alliedHealth={gpAlliedHealth}
                    setAlliedHealth={setGpAlliedHealth}
                    goals={gpGoals}
                    setGoals={setGpGoals}
                    carePlanHtml={gpCarePlanHtml}
                    setCarePlanHtml={setGpCarePlanHtml}
                 />;
        }
    };

    return (
        <CarePlanLayout activeView={activeView} setActiveView={setActiveView}>
            {renderContent()}
        </CarePlanLayout>
    );
};

export default CarePlanSuite;
