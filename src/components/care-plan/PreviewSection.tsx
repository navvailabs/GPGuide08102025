import { Download, FileText, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface PreviewSectionProps {
    carePlanHtml: string | null;
}

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const TableWithCopyButton = ({ tableHtml }: { tableHtml: string }) => {
    const [buttonText, setButtonText] = useState('Copy Table');

    const handleCopy = () => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tableHtml;
        const plainText = tempDiv.innerText;

        // This listener is a fallback that hijacks the 'copy' event.
        const listener = (e: ClipboardEvent) => {
            if (e.clipboardData) {
                e.clipboardData.setData('text/html', tableHtml);
                e.clipboardData.setData('text/plain', plainText);
                e.preventDefault();
            }
        };

        try {
            document.addEventListener('copy', listener);
            // This command triggers the 'copy' event, which our listener handles.
            const successful = document.execCommand('copy');
            if (successful) {
                setButtonText('Copied!');
            } else {
                // This path is taken if execCommand is not supported or fails.
                throw new Error('`document.execCommand(\'copy\')` returned false.');
            }
        } catch (err) {
            console.error('Failed to copy table:', err);
            setButtonText('Copy Failed');
        } finally {
            // Clean up the event listener and reset the button text.
            document.removeEventListener('copy', listener);
            setTimeout(() => setButtonText('Copy Table'), 2000);
        }
    };

    return (
        <div className="my-4">
            <div className="flex justify-end mb-2">
                <button
                    onClick={handleCopy}
                    className={`flex items-center justify-center gap-2 h-9 px-3 bg-black/20 hover:bg-black/40 font-semibold rounded-lg transition-all text-gray-300 text-sm ${buttonText === 'Copied!' ? 'text-success-green' : ''}`}
                >
                    {buttonText === 'Copied!' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{buttonText}</span>
                </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: tableHtml }} />
        </div>
    );
};

const HtmlRenderer = ({ htmlString }: { htmlString: string }) => {
    // Regex to split the HTML string by table elements, keeping the tables
    const parts = htmlString.split(/(<table[\s\S]*?<\/table>)/i);

    return (
        <>
            {parts.map((part, index) => {
                if (part.trim().toLowerCase().startsWith('<table')) {
                    return <TableWithCopyButton key={index} tableHtml={part} />;
                } else if (part.trim()) {
                    // Only render non-empty, non-table parts
                    return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
                }
                return null;
            })}
        </>
    );
};


const PreviewSection = ({ carePlanHtml }: PreviewSectionProps) => {

    if (!carePlanHtml?.trim()) {
        return null;
    }

    const handleDownloadWord = () => {
        if (!carePlanHtml) return;

        const generatedDate = new Date().toLocaleDateString('en-AU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

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
                        margin: 1.0in 1.0in 1.0in 1.0in;
                        mso-header-margin: .5in;
                        mso-footer-margin: .5in;
                        mso-header: h1;
                        mso-footer: f1;
                    }
                    div.WordSection1 {
                        page: WordSection1;
                    }
                    p.MsoHeader, p.MsoFooter {
                        font-family: "Calibri", "sans-serif";
                        color: #595959;
                        font-size: 9pt;
                        border-bottom: 1px solid #BFBFBF;
                        padding-bottom: 3pt;
                        margin-bottom: 0;
                    }
                    p.MsoFooter {
                        border-bottom: none;
                        border-top: 1px solid #BFBFBF;
                        padding-top: 3pt;
                    }
                    body { font-family: "Calibri", "sans-serif"; font-size: 11pt; color: #333333; }
                    p { margin: 0 0 8pt 0; line-height: 1.15; }
                    h2 {
                        font-family: "Calibri Light", "sans-serif";
                        font-size: 16pt;
                        color: #2F5496;
                        margin: 24pt 0 6pt 0;
                        border-bottom: 1px solid #A9C4E9;
                        padding-bottom: 3pt;
                    }
                    h3 {
                        font-family: "Calibri Light", "sans-serif";
                        font-size: 13pt;
                        color: #366092;
                        margin: 12pt 0 6pt 0;
                        font-weight: bold;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin-bottom: 12pt;
                    }
                    th, td {
                        border: 1px solid #D9D9D9;
                        padding: 6px;
                        text-align: left;
                        vertical-align: top;
                    }
                    th {
                        background-color: #F2F2F2;
                        font-weight: bold;
                        color: #333333;
                    }
                    ul {
                        margin-top: 0;
                        margin-bottom: 0;
                        padding-left: 20px;
                    }
                    li {
                        margin-bottom: 4pt;
                    }
                </style>
            </head>
            <body>
                <div class="WordSection1">
                    <p style='font-size:24pt; font-family:"Calibri Light", "sans-serif"; color:#1F4E79; text-align:center;'>GP Chronic Condition Management Plan</p>
                    <p style='text-align:center; font-size:10pt; color:#595959; margin-bottom:24pt;'>Generated on ${generatedDate}</p>
                    
                    ${carePlanHtml}

                    <div style='mso-element:header' id=h1>
                        <p class='MsoHeader' style='text-align:right;'>
                            GPGuide Professional Document
                        </p>
                    </div>

                    <div style='mso-element:footer' id=f1>
                        <p class='MsoFooter' style='text-align:right;'>Page <span style='mso-field-code:"PAGE"'></span> of <span style='mso-field-code:"NUMPAGES"'></span></p>
                    </div>
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
            <div className="care-plan-container">
                <HtmlRenderer htmlString={carePlanHtml} />
            </div>
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
