import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface PreviewSectionProps {
    carePlanHtml: string | null;
}

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const PreviewSection = ({ carePlanHtml }: PreviewSectionProps) => {
    if (!carePlanHtml) {
        return (
            <motion.div variants={sectionVariants} className="border-t border-white/10 pt-8 mt-12">
                <div className="bg-[#1F2023]/70 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl text-center text-gray-400">
                    No care plan data to display. Generate a plan to see the preview.
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div variants={sectionVariants} className="border-t border-white/10 pt-8 mt-12">
            <h3 className="text-2xl font-bold mb-6 text-white">Generated Plan Preview</h3>
            <div
                className="care-plan-container"
                dangerouslySetInnerHTML={{ __html: carePlanHtml }}
            />
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
