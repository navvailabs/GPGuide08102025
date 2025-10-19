import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import InspiredCard from '@/components/ui/InspiredCard';

interface MentalHealthPreviewSectionProps {
    carePlanHtml: string | null;
}

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const MentalHealthPreviewSection = ({ carePlanHtml }: MentalHealthPreviewSectionProps) => {
    const [isCopied, setIsCopied] = useState(false);

    if (!carePlanHtml?.trim()) {
        return null;
    }

    const handleCopy = () => {
        if (!carePlanHtml) return;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = carePlanHtml;
        const plainText = tempDiv.innerText;

        navigator.clipboard.writeText(plainText).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    const handleDownloadWord = () => {
        if (!carePlanHtml) return;
        const generatedDate = new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
        const fullHtml = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>Mental Health Care Plan</title>
            <style>
                body { font-family: "Calibri", "sans-serif"; font-size: 11pt; color: #333333; }
                p { margin: 0 0 8pt 0; line-height: 1.15; }
                h2 { font-family: "Calibri Light", "sans-serif"; font-size: 16pt; color: #2F5496; margin: 24pt 0 6pt 0; border-bottom: 1px solid #A9C4E9; padding-bottom: 3pt; }
                h3 { font-family: "Calibri Light", "sans-serif"; font-size: 13pt; color: #366092; margin: 12pt 0 6pt 0; font-weight: bold; }
                ul { margin-top: 0; margin-bottom: 0; padding-left: 20px; }
                li { margin-bottom: 4pt; }
            </style>
            </head>
            <body><div>
            <p style='font-size:24pt; font-family:"Calibri Light", "sans-serif"; color:#1F4E79; text-align:center;'>Mental Health Care Plan</p>
            <p style='text-align:center; font-size:10pt; color:#595959; margin-bottom:24pt;'>Generated on ${generatedDate}</p>
            ${carePlanHtml}
            </div></body></html>`;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(fullHtml);
        const fileDownloadLink = document.createElement("a");
        document.body.appendChild(fileDownloadLink);
        fileDownloadLink.href = source;
        fileDownloadLink.download = 'Mental-Health-Care-Plan.doc';
        fileDownloadLink.click();
        document.body.removeChild(fileDownloadLink);
    };

    return (
        <motion.div 
            variants={sectionVariants} 
            className="border-t border-gray-200 dark:border-white/10 pt-8 mt-12"
        >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Generated Care Plan</h3>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleCopy}
                        className={cn('flex items-center justify-center gap-2 h-9 px-3 bg-gray-100 dark:bg-black/20 hover:bg-gray-200 dark:hover:bg-black/40 font-semibold rounded-lg transition-all text-gray-700 dark:text-gray-300 text-sm', isCopied && 'text-success-green')}
                    >
                        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <button
                        onClick={handleDownloadWord}
                        className="flex items-center justify-center gap-2 h-9 px-4 bg-gray-100 dark:bg-black/20 hover:bg-gray-200 dark:hover:bg-black/40 font-semibold rounded-lg transition-colors text-gray-700 dark:text-gray-300 text-sm"
                    >
                        <FileText className="h-4 w-4" />
                        Download
                    </button>
                </div>
            </div>

            <InspiredCard className="prose dark:prose-invert max-w-none p-6 md:p-8">
                <div dangerouslySetInnerHTML={{ __html: carePlanHtml }} />
            </InspiredCard>
        </motion.div>
    );
};

export default MentalHealthPreviewSection;
