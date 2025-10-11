import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface PreviewSectionProps {
    conditions: string;
    goals: string;
}

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const PreviewSection = ({ conditions, goals }: PreviewSectionProps) => {
    const conditionItems = conditions.split(',').map(c => c.trim()).filter(Boolean);
    const goalItems = goals.split('\n').map(g => g.trim()).filter(Boolean);

    // Static data for demonstration as per the HTML snippet
    const managementPlan = [
        { problem: 'Hypertension', goal: 'Lower blood pressure to <130/80 mmHg within 3 months.', intervention: 'Daily blood pressure monitoring. Medication adherence. Dietician consult for low-sodium diet.' },
        { problem: 'Type 2 Diabetes', goal: 'Lower A1c to <7.0% in 3 months. Walk 30 mins, 5 days/week.', intervention: 'Monitor blood glucose daily. Follow prescribed medication. Engage in regular physical activity as planned.' }
    ];

    const alliedHealthPlan = [
        { service: 'Dietician', problem: 'Dietary management for Hypertension & Diabetes', services: '2' },
        { service: 'Exercise Physiologist', problem: 'Structured exercise plan', services: '3' }
    ];

    return (
        <motion.div variants={sectionVariants} className="border-t border-white/10 pt-8 mt-12">
            <h3 className="text-2xl font-bold mb-6 text-white">Generated Plan Preview</h3>
            <div className="space-y-8">
                <div className="bg-[#1F2023]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl overflow-x-auto">
                    <h4 className="text-lg font-bold mb-4 text-white">GP Chronic Condition Management Plan</h4>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-black/30">
                            <tr>
                                <th className="p-3 font-semibold text-white">Patient Problem</th>
                                <th className="p-3 font-semibold text-white">Goal</th>
                                <th className="p-3 font-semibold text-white">Intervention</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {managementPlan.map((item, index) => (
                                <tr key={index} className="hover:bg-white/5">
                                    <td className="p-3 align-top text-gray-300">{item.problem}</td>
                                    <td className="p-3 align-top text-gray-300">{item.goal}</td>
                                    <td className="p-3 align-top text-gray-300">{item.intervention}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-[#1F2023]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl overflow-x-auto">
                    <h4 className="text-lg font-bold mb-4 text-white">Allied Health Professional Arrangements</h4>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-black/30">
                            <tr>
                                <th className="p-3 font-semibold text-white">Service Type</th>
                                <th className="p-3 font-semibold text-white">Problem</th>
                                <th className="p-3 font-semibold text-white">No. of Services</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {alliedHealthPlan.map((item, index) => (
                                <tr key={index} className="hover:bg-white/5">
                                    <td className="p-3 align-top text-gray-300">{item.service}</td>
                                    <td className="p-3 align-top text-gray-300">{item.problem}</td>
                                    <td className="p-3 align-top text-gray-300">{item.services}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button className="flex items-center justify-center gap-2 h-10 px-4 bg-black/20 hover:bg-black/40 font-semibold rounded-lg transition-colors text-gray-300">
                    <Download className="h-4 w-4" />
                    Download as PDF
                </button>
            </div>
        </motion.div>
    );
};

export default PreviewSection;
