import { Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

interface PreviewSectionProps {
    carePlanHtml: string | null;
}

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const PreviewSection = ({ carePlanHtml }: PreviewSectionProps) => {

    if (!carePlanHtml?.trim()) {
        return null;
    }

    const handleDownloadWord = () => {
        if (!carePlanHtml) return;

        // Using a simpler, dependency-free method to generate a .doc file.
        const fullHtml = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>GP Chronic Condition Management Plan</title>
                <!--[if gte mso 9]>
                <xml>
                    <w:WordDocument>
                        <w:View>Print</w:View>
                        <w:Zoom>90</w:Zoom>
                        <w:DoNotOptimizeForBrowser/>
                    </w:WordDocument>
                </xml>
                <![endif]-->
                <style>
                    @page WordSection1 {
                        size: 8.5in 11.0in;
                        margin: 1.0in 1.25in 1.0in 1.25in;
                    }
                    div.WordSection1 {
                        page: WordSection1;
                    }
                    body { font-family: Calibri, sans-serif; font-size: 11pt; }
                    table { border-collapse: collapse; width: 100%; }
                    th, td { border: 1px solid black; padding: 8px; text-align: left; vertical-align: top; }
                    th { background-color: #EAEAEA; }
                    ul { margin-top: 0; padding-left: 20px; }
                    h2, h3, h4, h5, h6 { font-family: Calibri, sans-serif; }
                </style>
            </head>
            <body>
                <div class="WordSection1">
                    ${carePlanHtml}
                </div>
            </body>
            </html>
        `;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(fullHtml);
        const fileDownloadLink = document.createElement("a");
        document.body.appendChild(fileDownloadLink);
        fileDownloadLink.href = source;
        fileDownloadLink.download = 'GP-Care-Plan.doc';
        fileDownloadLink.click();
        document.body.removeChild(fileDownloadLink);
    };

    const handleDownloadPdf = () => {
        // This is a placeholder. True PDF generation would require a library like jspdf.
        alert("PDF download functionality is not yet implemented.");
    };

    return (
        <motion.div variants={sectionVariants} className="border-t border-white/10 pt-8 mt-12">
            <div
                className="care-plan-container"
                dangerouslySetInnerHTML={{ __html: carePlanHtml }}
            />
            <div className="mt-8 flex flex-wrap justify-end gap-4">
                <button
                    onClick={handleDownloadWord}
                    className="flex items-center justify-center gap-2 h-10 px-4 bg-black/20 hover:bg-black/40 font-semibold rounded-lg transition-colors text-gray-300"
                >
                    <FileText className="h-4 w-4" />
                    Download as Word
                </button>
                <button
                    onClick={handleDownloadPdf}
                    className="flex items-center justify-center gap-2 h-10 px-4 bg-black/20 hover:bg-black/40 font-semibold rounded-lg transition-colors text-gray-300"
                >
                    <Download className="h-4 w-4" />
                    Download as PDF
                </button>
            </div>
        </motion.div>
    );
};

export default PreviewSection;
