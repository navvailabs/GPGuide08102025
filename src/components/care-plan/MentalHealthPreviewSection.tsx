import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, FileText, Table } from 'lucide-react';
import { cn } from '@/lib/utils';
import InspiredCard from '@/components/ui/InspiredCard';

interface MentalHealthPreviewSectionProps {
    carePlanHtml: string | null;
}

type ViewMode = 'document' | 'table';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const SectionCopyButton = ({ contentToCopy, className }: { contentToCopy: string, className?: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contentToCopy;
        const plainText = tempDiv.innerText;

        const listener = (event: ClipboardEvent) => {
            if (event.clipboardData) {
                event.clipboardData.setData('text/html', contentToCopy);
                event.clipboardData.setData('text/plain', plainText);
                event.preventDefault();
            }
        };

        try {
            document.addEventListener('copy', listener);
            document.execCommand('copy');
            setIsCopied(true);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        } finally {
            document.removeEventListener('copy', listener);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={cn(
                "flex items-center justify-center h-8 w-8 bg-gray-100/50 dark:bg-black/30 hover:bg-gray-200/70 dark:hover:bg-black/50 backdrop-blur-sm rounded-full transition-all text-gray-600 dark:text-gray-300 p-0",
                isCopied && "text-success-green bg-green-500/10 dark:bg-green-500/20",
                className
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

const MentalHealthPreviewSection = ({ carePlanHtml }: MentalHealthPreviewSectionProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>('document');

    const parsedSections = useMemo(() => {
        if (!carePlanHtml) return [];

        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${carePlanHtml}</div>`, 'text/html');
        const nodes = Array.from(doc.body.firstElementChild?.children || []);
        if (nodes.length === 0) return [];

        const sectionGroups: Element[][] = [];
        let currentGroup: Element[] = [];

        nodes.forEach(node => {
            if ((node.tagName === 'H2' || node.tagName === 'H3') && currentGroup.length > 0) {
                sectionGroups.push(currentGroup);
                currentGroup = [node];
            } else {
                currentGroup.push(node);
            }
        });
        if (currentGroup.length > 0) {
            sectionGroups.push(currentGroup);
        }

        return sectionGroups.map((group, index) => {
            const titleNode = group.find(n => n.tagName === 'H2' || n.tagName === 'H3');
            const title = titleNode?.textContent || `Section ${index + 1}`;
            
            const contentNodes = titleNode 
                ? group.filter(n => n !== titleNode) 
                : group;
            const contentHtml = contentNodes.map(n => n.outerHTML).join('');

            const fullHtml = group.map(n => n.outerHTML).join('');

            return {
                id: `${index}-${title.replace(/\s+/g, '-')}`,
                title,
                contentHtml,
                fullHtml,
            };
        });
    }, [carePlanHtml]);

    if (!carePlanHtml?.trim()) {
        return null;
    }

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

    const DocumentView = ({ sections }: { sections: typeof parsedSections }) => (
        <div className="space-y-6">
            {sections.map(section => (
                <InspiredCard key={section.id} className="relative prose dark:prose-invert max-w-none p-6 md:p-8">
                    <SectionCopyButton contentToCopy={section.fullHtml} className="absolute top-4 right-4 z-10" />
                    <div dangerouslySetInnerHTML={{ __html: section.fullHtml }} />
                </InspiredCard>
            ))}
        </div>
    );

    const TableView = ({ sections }: { sections: typeof parsedSections }) => (
        <InspiredCard className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-white/5">
                        <tr>
                            <th className="p-3 font-medium text-left text-gray-800 dark:text-white w-[25%]">Section</th>
                            <th className="p-3 font-medium text-left text-gray-800 dark:text-white w-[65%]">Content</th>
                            <th className="p-3 font-medium text-center text-gray-800 dark:text-white w-[10%]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections.map((section) => (
                            <tr key={section.id} className="border-t border-gray-200 dark:border-white/10">
                                <td className="p-3 font-semibold text-gray-900 dark:text-gray-100 align-top">{section.title}</td>
                                <td className="p-3 align-top">
                                    <div 
                                        className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                                        dangerouslySetInnerHTML={{ __html: section.contentHtml }} 
                                    />
                                </td>
                                <td className="p-3 align-top text-center">
                                    <SectionCopyButton contentToCopy={section.contentHtml} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </InspiredCard>
    );

    return (
        <motion.div 
            variants={sectionVariants} 
            className="border-t border-gray-200 dark:border-white/10 pt-8 mt-12"
        >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Generated Care Plan</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 dark:bg-black/20 p-1 rounded-lg self-start sm:self-center">
                        <button
                            onClick={() => setViewMode('document')}
                            className={cn('flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors', viewMode === 'document' ? 'bg-white dark:bg-black text-black dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10')}
                        >
                            <FileText className="h-4 w-4" />
                            <span>Document</span>
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={cn('flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors', viewMode === 'table' ? 'bg-white dark:bg-black text-black dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10')}
                        >
                            <Table className="h-4 w-4" />
                            <span>Table</span>
                        </button>
                    </div>
                    <button
                        onClick={handleDownloadWord}
                        className="flex items-center justify-center gap-2 h-9 px-4 bg-gray-100 dark:bg-black/20 hover:bg-gray-200 dark:hover:bg-black/40 font-semibold rounded-lg transition-colors text-gray-700 dark:text-gray-300 text-sm"
                    >
                        <FileText className="h-4 w-4" />
                        Download
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={viewMode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                >
                    {viewMode === 'document' ? (
                        <DocumentView sections={parsedSections} />
                    ) : (
                        <TableView sections={parsedSections} />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default MentalHealthPreviewSection;
