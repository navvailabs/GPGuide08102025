import React, { useState, useMemo } from 'react';
import { FileText, Copy, Check, Table } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LiquidGlassCard } from '@/components/ui/liquid-notification';

type ViewMode = 'table' | 'document';

interface PreviewSectionProps {
    carePlanHtml: string | null;
    identifier: string;
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

// --- New Card-Specific Copy Button ---
const CardCopyButton = ({ contentToCopy }: { contentToCopy: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevents any parent onClick handlers
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contentToCopy;
        const plainText = tempDiv.innerText;

        const listener = (e: ClipboardEvent) => {
            if (e.clipboardData) {
                e.clipboardData.setData('text/html', contentToCopy);
                e.clipboardData.setData('text/plain', plainText);
                e.preventDefault();
            }
        };

        try {
            document.addEventListener('copy', listener);
            document.execCommand('copy');
            setIsCopied(true);
        } catch (err) {
            console.error('Failed to copy card content:', err);
        } finally {
            document.removeEventListener('copy', listener);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={cn(
                "absolute top-4 right-4 z-10 flex items-center justify-center h-9 w-9 bg-gray-100/50 dark:bg-black/30 hover:bg-gray-200/70 dark:hover:bg-black/50 backdrop-blur-sm font-semibold rounded-full transition-all text-gray-600 dark:text-gray-300 text-sm p-0",
                isCopied && "text-success-green bg-green-500/10 dark:bg-green-500/20"
            )}
            aria-label={isCopied ? "Copied" : "Copy section"}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isCopied ? "check" : "copy"}
                    initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                >
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};


// --- Updated Document View Logic ---

const ParsedTableToDocument = ({ tableHtml }: { tableHtml: string }) => {
    const cardAccents = useMemo(() => [
        'border-sky-500/50 dark:border-sky-400/50',
        'border-rose-500/50 dark:border-rose-400/50',
        'border-amber-500/50 dark:border-amber-400/50',
        'border-emerald-500/50 dark:border-emerald-400/50',
        'border-violet-500/50 dark:border-violet-400/50',
    ], []);

    const parsedContent = useMemo(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(tableHtml, 'text/html');
        const table = doc.querySelector('table');
        if (!table) return null;

        const headers: string[] = [];
        const headerRow = table.querySelector('thead tr') || table.querySelector('tr');
        if (headerRow) {
            Array.from(headerRow.children).forEach(th => {
                headers.push(th.innerHTML);
            });
        }

        const dataRows = Array.from(table.querySelectorAll('tr')).filter(row => row !== headerRow);

        const documentSections = dataRows.map((row, rowIndex) => {
            const cells = Array.from(row.children) as HTMLElement[];

            if (cells.length === 1 && (cells[0].colSpan > 1 || headers.length <= 1)) {
                const textContent = cells[0].textContent?.trim();
                if (textContent) {
                    return (
                        <div key={`section-title-${rowIndex}`} className="mt-8 mb-4 first:mt-0">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: cells[0].innerHTML }} />
                             <hr className="mt-2 border-gray-200 dark:border-white/10"/>
                        </div>
                    );
                }
                return null;
            }

            const contentPairs = cells.map((cell, cellIndex) => {
                const header = headers[cellIndex];
                const content = cell.innerHTML;
                const textContent = cell.textContent?.trim();
                if (header && textContent) {
                    return { header, content };
                }
                return null;
            }).filter(Boolean) as { header: string, content: string }[];

            if (contentPairs.length === 0) return null;

            const topSection = contentPairs[0];
            const otherSections = contentPairs.slice(1);

            let cardHtmlString = `<h3>${topSection.header.trim().replace(/:$/, '')}</h3><div>${topSection.content}</div>`;
            otherSections.forEach(pair => {
                cardHtmlString += `<div><h4>${pair.header.trim().replace(/:$/, '')}</h4><div>${pair.content}</div></div>`;
            });

            return (
                <LiquidGlassCard
                    key={`row-card-${rowIndex}`}
                    shadowIntensity='md'
                    blurIntensity='lg'
                    borderRadius='24px'
                    glowIntensity='md'
                    draggable={false}
                    expandable={false}
                    className={cn("p-6 border relative", cardAccents[rowIndex % cardAccents.length])}
                >
                    <CardCopyButton contentToCopy={cardHtmlString} />
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 pr-10" dangerouslySetInnerHTML={{ __html: topSection.header.trim().replace(/:$/, '') }} />
                        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 prose-p:my-0 prose-ul:my-0 prose-li:my-1" dangerouslySetInnerHTML={{ __html: topSection.content }} />
                    </div>

                    {otherSections.length > 0 && (
                        <div className="mt-6 space-y-6">
                            {otherSections.map((pair, index) => (
                                <div key={`other-pair-${rowIndex}-${index}`}>
                                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1" dangerouslySetInnerHTML={{ __html: pair.header.trim().replace(/:$/, '') }} />
                                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 prose-p:my-0 prose-ul:my-0 prose-li:my-1" dangerouslySetInnerHTML={{ __html: pair.content }} />
                                </div>
                            ))}
                        </div>
                    )}
                </LiquidGlassCard>
            );
        }).filter(Boolean);

        if (documentSections.length === 0) {
            const fallbackSections = dataRows.map((row, rowIndex) => {
                const cells = Array.from(row.children) as HTMLElement[];
                if (cells.length === 2) {
                    const label = cells[0].innerHTML;
                    const value = cells[1].innerHTML;
                    if (cells[0].textContent?.trim() || cells[1].textContent?.trim()) {
                         const cardHtmlString = `<h3>${cells[0].textContent?.trim().replace(/:$/, '') || 'Section'}</h3><div>${value}</div>`;
                         const contentBlock = (
                             <div key={`fallback-pair-${rowIndex}`}>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 pr-10" dangerouslySetInnerHTML={{ __html: label.trim().replace(/:$/, '') }} />
                                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 prose-p:my-0 prose-ul:my-0 prose-li:my-1" dangerouslySetInnerHTML={{ __html: value }} />
                            </div>
                         );
                         return (
                            <LiquidGlassCard
                                key={`fallback-card-${rowIndex}`}
                                shadowIntensity='md'
                                blurIntensity='lg'
                                borderRadius='24px'
                                glowIntensity='md'
                                draggable={false}
                                expandable={false}
                                className={cn("p-6 border relative", cardAccents[rowIndex % cardAccents.length])}
                            >
                                <CardCopyButton contentToCopy={cardHtmlString} />
                                {contentBlock}
                            </LiquidGlassCard>
                         );
                    }
                }
                return null;
            }).filter(Boolean);
            
            if (fallbackSections.length > 0) {
                return <div className="space-y-6">{fallbackSections}</div>;
            }

            return <p className="text-gray-500 dark:text-gray-400">Could not parse table content into document view.</p>;
        }

        return <div className="space-y-6">{documentSections}</div>;

    }, [tableHtml, cardAccents]);

    return parsedContent;
};


const DocumentView = ({ htmlString }: { htmlString: string }) => {
    const documentParts = useMemo(() => {
        if (!htmlString) return [];
        const parts = htmlString.split(/(<table[\s\S]*?<\/table>)/i);

        return parts.map((part, index) => {
            if (part.trim().toLowerCase().startsWith('<table')) {
                return <ParsedTableToDocument key={`table-${index}`} tableHtml={part} />;
            } else if (part.trim()) {
                return (
                    <div
                        key={`other-${index}`}
                        className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: part }}
                    />
                );
            }
            return null;
        }).filter(Boolean);
    }, [htmlString]);

    return (
        <div className="space-y-8">{documentParts}</div>
    );
};


// --- Existing Table View (Unchanged) ---
const TableWithCopyButton = ({ tableHtml }: { tableHtml: string }) => {
    const [buttonText, setButtonText] = useState('Copy Table');

    const handleCopy = () => {
        // Create a temporary container to parse the HTML and add inline styles
        const container = document.createElement('div');
        container.innerHTML = tableHtml;

        // Add `vertical-align: top` to all table cells for better Word compatibility
        const cells = container.querySelectorAll('th, td');
        cells.forEach(cell => {
            (cell as HTMLElement).style.verticalAlign = 'top';
        });

        const styledHtml = container.innerHTML;
        const plainText = container.innerText;

        const listener = (e: ClipboardEvent) => {
            if (e.clipboardData) {
                e.clipboardData.setData('text/html', styledHtml);
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
                        'flex items-center justify-center gap-2 h-9 px-3 bg-gray-100 dark:bg-black/20 hover:bg-gray-200 dark:hover:bg-black/40 font-semibold rounded-lg transition-all text-gray-700 dark:text-gray-300 text-sm',
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
const PreviewSection = ({ carePlanHtml, identifier }: PreviewSectionProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>('table');

    if (!carePlanHtml?.trim()) {
        return null;
    }

    const handleDownloadWord = () => {
        if (!carePlanHtml) return;
        const generatedDate = new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
        
        // Prepare HTML for Word download with inline styles
        const container = document.createElement('div');
        container.innerHTML = carePlanHtml;
        const cells = container.querySelectorAll('th, td');
        cells.forEach(cell => {
            (cell as HTMLElement).style.verticalAlign = 'top';
        });
        const styledCarePlanHtml = container.innerHTML;

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
            ${styledCarePlanHtml}
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

    return (
        <motion.div 
            key={identifier}
            variants={sectionVariants} 
            className="border-t border-gray-200 dark:border-white/10 pt-8 mt-12"
        >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Generated Plan Preview</h3>
                <div className="flex items-center bg-gray-100 dark:bg-black/20 p-1 rounded-lg self-start sm:self-center">
                    <button
                        onClick={() => setViewMode('table')}
                        className={cn(
                            'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                            viewMode === 'table'
                                ? 'bg-white dark:bg-black text-black dark:text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
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
                                ? 'bg-white dark:bg-black text-black dark:text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
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
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={`${identifier}-${viewMode}`}
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
                    className="flex items-center justify-center gap-2 h-10 px-4 bg-gray-100 dark:bg-black/20 hover:bg-gray-200 dark:hover:bg-black/40 font-semibold rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                >
                    <FileText className="h-4 w-4" />
                    Download as Word
                </button>
            </div>
        </motion.div>
    );
};

export default PreviewSection;
