import React, { useState, useMemo } from 'react';
import { Download, FileText, Copy, Check, Table } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type ViewMode = 'table' | 'document';

interface PreviewSectionProps {
    carePlanHtml: string | null;
}

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const viewVariants = {
    enter: { opacity: 0, y: 10 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

// --- New, Corrected Document View Logic ---

const ParsedTableToDocument = ({ tableHtml }: { tableHtml: string }) => {
    const parsedContent = useMemo(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(tableHtml, 'text/html');
        const table = doc.querySelector('table');
        if (!table) return null;

        // 1. Extract headers. Handles <thead> or just the first <tr>.
        const headers: string[] = [];
        const headerRow = table.querySelector('thead tr') || table.querySelector('tr');
        if (headerRow) {
            Array.from(headerRow.children).forEach(th => {
                headers.push(th.innerHTML);
            });
        }

        // 2. Get all rows that are not the header row.
        const dataRows = Array.from(table.querySelectorAll('tr')).filter(row => row !== headerRow);

        // 3. Process each data row to create a flat list of key-value pairs.
        const allPairs: JSX.Element[] = [];

        dataRows.forEach((row, rowIndex) => {
            const cells = Array.from(row.children) as HTMLElement[];

            // Handle full-width section title rows
            if (cells.length === 1 && (cells[0].colSpan > 1 || headers.length <= 1)) {
                const textContent = cells[0].textContent?.trim();
                if (textContent) {
                    allPairs.push(
                        <h4 key={`section-title-${rowIndex}`} className="text-xl font-bold text-white mt-8 mb-4 first:mt-0 border-b border-white/15 pb-2" dangerouslySetInnerHTML={{ __html: cells[0].innerHTML }} />
                    );
                }
                return; // Move to the next row
            }
            
            // Handle standard data rows by creating pairs with headers
            cells.forEach((cell, cellIndex) => {
                const header = headers[cellIndex];
                const content = cell.innerHTML;
                const textContent = cell.textContent?.trim();

                if (header && textContent) {
                    allPairs.push(
                        <div key={`pair-${rowIndex}-${cellIndex}`} className="py-4 border-b border-white/10 last:border-b-0">
                            <div className="text-base font-semibold text-gray-200 mb-1.5" dangerouslySetInnerHTML={{ __html: header }} />
                            <div 
                                className="prose prose-sm prose-invert max-w-none text-gray-300 prose-p:my-0 prose-ul:my-0 prose-li:my-1" 
                                dangerouslySetInnerHTML={{ __html: content }} 
                            />
                        </div>
                    );
                }
            });
        });

        // If the primary logic failed, try a fallback for simple 2-column key-value tables.
        if (allPairs.length === 0) {
            const fallbackPairs: JSX.Element[] = [];
            const allRows = Array.from(table.querySelectorAll('tr'));
            allRows.forEach((row, rowIndex) => {
                const cells = Array.from(row.children) as HTMLElement[];
                if (cells.length === 2) {
                    const label = cells[0].innerHTML;
                    const value = cells[1].innerHTML;
                    if (cells[0].textContent?.trim() || cells[1].textContent?.trim()) {
                        fallbackPairs.push(
                            <div key={`fallback-pair-${rowIndex}`} className="py-4 border-b border-white/10 last:border-b-0">
                                <div className="text-base font-semibold text-gray-200 mb-1.5" dangerouslySetInnerHTML={{ __html: label }} />
                                <div className="prose prose-sm prose-invert max-w-none text-gray-300 prose-p:my-0 prose-ul:my-0 prose-li:my-1" dangerouslySetInnerHTML={{ __html: value }} />
                            </div>
                        );
                    }
                }
            });
            if (fallbackPairs.length > 0) {
                 return (
                    <div className="document-view-section border border-white/15 rounded-xl p-4 sm:p-6 bg-black/20">
                        {fallbackPairs}
                    </div>
                );
            }
            return null; // No content could be parsed
        }

        return (
            <div className="document-view-section border border-white/15 rounded-xl p-4 sm:p-6 bg-black/20">
                {allPairs}
            </div>
        );

    }, [tableHtml]);

    return parsedContent;
};


const DocumentView = ({ htmlString }: { htmlString: string }) => {
    const documentParts = useMemo(() => {
        if (!htmlString) return [];
        // Split the HTML content by table tags, keeping the tables in the result.
        const parts = htmlString.split(/(<table[\s\S]*?<\/table>)/i);

        return parts.map((part, index) => {
            if (part.trim().toLowerCase().startsWith('<table')) {
                // This part is a table, render it with our document parser.
                return <ParsedTableToDocument key={`table-${index}`} tableHtml={part} />;
            } else if (part.trim()) {
                // This is content outside a table, render it directly.
                return (
                    <div 
                        key={`other-${index}`} 
                        className="prose prose-invert max-w-none text-gray-300" 
                        dangerouslySetInnerHTML={{ __html: part }} 
                    />
                );
            }
            return null;
        }).filter(Boolean);
    }, [htmlString]);

    return <div className="space-y-8">{documentParts}</div>;
};


// --- Existing Table View (Unchanged) ---
const TableWithCopyButton = ({ tableHtml }: { tableHtml: string }) => {
    const [buttonText, setButtonText] = useState('Copy Table');

    const handleCopy = () => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tableHtml;
        const plainText = tempDiv.innerText;

        const listener = (e: ClipboardEvent) => {
            if (e.clipboardData) {
                e.clipboardData.setData('text/html', tableHtml);
                e.clipboardData.setData('text/plain', plainText);
                e.preventDefault();
            }
        };

        try {
            document.addEventListener('copy', listener);
            document.execCommand('copy');
            setButtonText('Copied!');
        } catch (err) {
            console.error('Failed to copy table:', err);
            setButtonText('Copy Failed');
        } finally {
            document.removeEventListener('copy', listener);
            setTimeout(() => setButtonText('Copy Table'), 2000);
        }
    };

    return (
        <div className="my-4">
            <div className="flex justify-end mb-2">
                <button
                    onClick={handleCopy}
                    className={cn(
                        'flex items-center justify-center gap-2 h-9 px-3 bg-black/20 hover:bg-black/40 font-semibold rounded-lg transition-all text-gray-300 text-sm',
                        buttonText === 'Copied!' && 'text-success-green'
                    )}
                >
                    {buttonText === 'Copied!' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{buttonText}</span>
                </button>
            </div>
            <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: tableHtml }} />
        </div>
    );
};

const TableView = ({ htmlString }: { htmlString: string }) => {
    const parts = useMemo(() => htmlString.split(/(<table[\s\S]*?<\/table>)/i), [htmlString]);

    return (
        <>
            {parts.map((part, index) => {
                if (part.trim().toLowerCase().startsWith('<table')) {
                    return <TableWithCopyButton key={index} tableHtml={part} />;
                } else if (part.trim()) {
                    return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
                }
                return null;
            })}
        </>
    );
};

// --- Main Component ---
const PreviewSection = ({ carePlanHtml }: PreviewSectionProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>('table');

    if (!carePlanHtml?.trim()) {
        return null;
    }

    const handleDownloadWord = () => {
        if (!carePlanHtml) return;
        const generatedDate = new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
        const fullHtml = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>GP Chronic Condition Management Plan</title>
            <!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>90</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]-->
            <style>
                @page WordSection1 { size: 8.5in 11.0in; margin: 1.0in 1.0in 1.0in 1.0in; mso-header-margin: .5in; mso-footer-margin: .5in; mso-header: h1; mso-footer: f1; }
                div.WordSection1 { page: WordSection1; }
                p.MsoHeader, p.MsoFooter { font-family: "Calibri", "sans-serif"; color: #595959; font-size: 9pt; border-bottom: 1px solid #BFBFBF; padding-bottom: 3pt; margin-bottom: 0; }
                p.MsoFooter { border-bottom: none; border-top: 1px solid #BFBFBF; padding-top: 3pt; }
                body { font-family: "Calibri", "sans-serif"; font-size: 11pt; color: #333333; }
                p { margin: 0 0 8pt 0; line-height: 1.15; }
                h2 { font-family: "Calibri Light", "sans-serif"; font-size: 16pt; color: #2F5496; margin: 24pt 0 6pt 0; border-bottom: 1px solid #A9C4E9; padding-bottom: 3pt; }
                h3 { font-family: "Calibri Light", "sans-serif"; font-size: 13pt; color: #366092; margin: 12pt 0 6pt 0; font-weight: bold; }
                table { border-collapse: collapse; width: 100%; margin-bottom: 12pt; }
                th, td { border: 1px solid #D9D9D9; padding: 6px; text-align: left; vertical-align: top; }
                th { background-color: #F2F2F2; font-weight: bold; color: #333333; }
                ul { margin-top: 0; margin-bottom: 0; padding-left: 20px; }
                li { margin-bottom: 4pt; }
            </style>
            </head>
            <body><div class="WordSection1">
            <p style='font-size:24pt; font-family:"Calibri Light", "sans-serif"; color:#1F4E79; text-align:center;'>GP Chronic Condition Management Plan</p>
            <p style='text-align:center; font-size:10pt; color:#595959; margin-bottom:24pt;'>Generated on ${generatedDate}</p>
            ${carePlanHtml}
            <div style='mso-element:header' id=h1><p class='MsoHeader' style='text-align:right;'>GPGuide Professional Document</p></div>
            <div style='mso-element:footer' id=f1><p class='MsoFooter' style='text-align:right;'>Page <span style='mso-field-code:"PAGE"'></span> of <span style='mso-field-code:"NUMPAGES"'></span></p></div>
            </div></body></html>`;
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(fullHtml);
        const fileDownloadLink = document.createElement("a");
        document.body.appendChild(fileDownloadLink);
        fileDownloadLink.href = source;
        fileDownloadLink.download = 'GP-Care-Plan.doc';
        fileDownloadLink.click();
        document.body.removeChild(fileDownloadLink);
    };

    const handleDownloadPdf = () => {
        alert("PDF download functionality is not yet implemented.");
    };

    return (
        <motion.div variants={sectionVariants} className="border-t border-white/10 pt-8 mt-12">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold text-white">Generated Plan Preview</h3>
                <div className="flex items-center bg-black/20 p-1 rounded-lg self-start sm:self-center">
                    <button
                        onClick={() => setViewMode('table')}
                        className={cn(
                            'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                            viewMode === 'table'
                                ? 'bg-white text-black'
                                : 'text-gray-300 hover:bg-white/10'
                        )}
                    >
                        <Table className="h-4 w-4" />
                        <span>Table</span>
                    </button>
                    <button
                        onClick={() => setViewMode('document')}
                        className={cn(
                            'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                            viewMode === 'document'
                                ? 'bg-white text-black'
                                : 'text-gray-300 hover:bg-white/10'
                        )}
                    >
                        <FileText className="h-4 w-4" />
                        <span>Document</span>
                    </button>
                </div>
            </div>

            <motion.div
                layout
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="care-plan-container"
            >
                <AnimatePresence initial={false}>
                    <motion.div
                        key={viewMode}
                        variants={viewVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        {viewMode === 'table' ? (
                            <TableView htmlString={carePlanHtml} />
                        ) : (
                            <DocumentView htmlString={carePlanHtml} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>

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
