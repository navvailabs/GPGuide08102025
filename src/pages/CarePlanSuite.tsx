import { useState } from 'react';
import CarePlanLayout from '@/components/app/CarePlanLayout';
import GPCarePlan from '@/pages/GPCarePlan';
import MentalHealthCarePlan from '@/pages/MentalHealthCarePlan';

export type ActiveView = 'gp-care-plan' | 'mental-health-care-plan';

const CarePlanSuite = () => {
    const [activeView, setActiveView] = useState<ActiveView>('gp-care-plan');

    // State for GPCarePlan
    const [gpConditions, setGpConditions] = useState<string>('Hypertension, Type 2 Diabetes');
    const [gpGoals, setGpGoals] = useState<string>(`Lower A1c to <7.0% in 3 months.\nWalk 30 mins, 5 days/week.`);
    const [gpIsPreviewGenerated, setGpIsPreviewGenerated] = useState(false);

    // State for MentalHealthCarePlan
    const [mhPresentation, setMhPresentation] = useState<string>('');
    const [mhHistory, setMhHistory] = useState<string>('');
    const [mhGoals, setMhGoals] = useState<string>('');
    const [mhIsPreviewGenerated, setMhIsPreviewGenerated] = useState(false);

    const renderContent = () => {
        switch (activeView) {
            case 'gp-care-plan':
                return <GPCarePlan
                    conditions={gpConditions}
                    setConditions={setGpConditions}
                    goals={gpGoals}
                    setGoals={setGpGoals}
                    isPreviewGenerated={gpIsPreviewGenerated}
                    setIsPreviewGenerated={setGpIsPreviewGenerated}
                />;
            case 'mental-health-care-plan':
                return <MentalHealthCarePlan 
                    presentation={mhPresentation}
                    setPresentation={setMhPresentation}
                    history={mhHistory}
                    setHistory={setMhHistory}
                    goals={mhGoals}
                    setGoals={setMhGoals}
                    isPreviewGenerated={mhIsPreviewGenerated}
                    setIsPreviewGenerated={setMhIsPreviewGenerated}
                />;
            default:
                return <GPCarePlan
                    conditions={gpConditions}
                    setConditions={setGpConditions}
                    goals={gpGoals}
                    setGoals={setGpGoals}
                    isPreviewGenerated={gpIsPreviewGenerated}
                    setIsPreviewGenerated={setGpIsPreviewGenerated}
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
