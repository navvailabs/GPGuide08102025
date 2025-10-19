import React, { useState, useMemo, useRef } from 'react';
import { FileText, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LiquidGlassCard } from '@/components/ui/liquid-notification';

// --- Card-Specific Copy Button ---
const CardCopyButton = ({ contentToCopy }: { contentToCopy: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contentToCopy;
        const plainText = tempDiv.innerText;

        try {
            const htmlBlob = new Blob([contentToCopy], { type: 'text/html' });
            const textBlob = new Blob([plainText], { type: 'text/plain' });
            const item = new ClipboardItem({
                'text/html': htmlBlob,
                'text/plain': textBlob,
            });
            await navigator.clipboard.write([item]);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            try {
                await navigator.clipboard.writeText(plainText);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err2) {
                console.error('Failed to copy text.', err2);
            }
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

// --- Document View Logic ---

const findCoreData = (data: any): object | null => {
    if (typeof data !== 'object' || data === null) {
        return null;
    }

    const contentKeys = ['clinical_details', 'management_goals', 'presenting_complaint', 'conditions', 'mse', 'mental_state_examination'];
    const dataKeys = Object.keys(data);
    
    if (dataKeys.filter(k => contentKeys.includes(k.toLowerCase().replace(/[\s_-]/g, ''))).length > 1) {
        return data;
    }

    if (Array.isArray(data) && data.length > 0) {
        return findCoreData(data[0]);
    }
    if (data.body) return findCoreData(data.body);
    if (data.json) return findCoreData(data.json);
    if (data.data) return findCoreData(data.data);

    if (Object.keys(data).length > 0 && !Array.isArray(data)) {
        return data;
    }
    
    return null;
};

const formatHeading = (key: string): string => {
    return key
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
};

const ParsedContentToDocument = ({ contentString }: { contentString: string }) => {
    const cardAccents = useMemo(() => [
        'border-sky-500/50 dark:border-sky-400/50',
        'border-rose-500/50 dark:border-rose-400/50',
        'border-amber-500/50 dark:border-amber-400/50',
        'border-emerald-500/50 dark:border-emerald-400/50',
        'border-violet-500/50 dark:border-violet-400/50',
    ], []);

    const parsedContent = useMemo(() => {
        const processString = (str: string) => {
            return str
                .replace(/\*\*(.*?)\*\*/g, '<h4 class="font-bold text-gray-900 dark:text-white mt-4 mb-2">$1</h4>')
                .replace(/\n/g, '<br />');
        };

        let initialData;
        try {
            initialData = JSON.parse(contentString);
        } catch (e) {
            // If it's not JSON, treat it as a single block of text/html and process it.
            const processedContent = processString(contentString);
            return <div className="care-plan-content" dangerouslySetInnerHTML={{ __html: processedContent }} />;
        }

        const coreData = findCoreData(initialData);

        if (!coreData || Object.keys(coreData).length === 0) {
            return <p className="text-gray-500 dark:text-gray-400">Could not find relevant sections in the generated plan.</p>;
        }

        const documentSections = Object.entries(coreData)
            .map(([key, value], index) => {
                if (!value || (typeof value === 'string' && !value.trim())) {
                    return null;
                }

                const heading = formatHeading(key);
                const contentHtml = typeof value === 'string' 
                    ? processString(value)
                    : `<pre class="whitespace-pre-wrap">${JSON.stringify(value, null, 2)}</pre>`;

                return (
                    <LiquidGlassCard
                        key={key}
                        shadowIntensity='md'
                        blurIntensity='lg'
                        borderRadius='24px'
                        glowIntensity='md'
                        draggable={false}
                        expandable={false}
                        className={cn("p-6 border relative", cardAccents[index % cardAccents.length])}
                    >
                        <CardCopyButton contentToCopy={`<h3>${heading}</h3><div>${contentHtml}</div>`} />
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pr-10">{heading}</h3>
                            <div className="care-plan-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
                        </div>
                    </LiquidGlassCard>
                );
            })
            .filter(Boolean);

        return documentSections.length > 0 
            ? <div className="space-y-6">{documentSections}</div> 
            : <p className="text-gray-500 dark:text-gray-400">The generated plan appears to be empty.</p>;

    }, [contentString, cardAccents]);

    return parsedContent;
};


// --- Main Component ---
interface PreviewSectionProps {
    carePlanHtml: string | null;
}

const PreviewSection = ({ carePlanHtml }: PreviewSectionProps) => {
    const contentRef = useRef<HTMLDivElement>(null);

    if (!carePlanHtml?.trim()) {
        return null;
    }

    const handleDownloadWord = () => {
        if (!contentRef.current) return;
        const generatedDate = new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
        
        const styles = `
            body { font-family: Calibri, sans-serif; font-size: 11pt; color: #333; }
            h1, h2, h3, h4 { font-family: Cambria, serif; color: #2F5496; margin-bottom: 8px; }
            h1 { font-size: 16pt; }
            h2 { font-size: 14pt; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin-top: 20px; }
            h3 { font-size: 12pt; font-weight: bold; }
            h4 { font-size: 11pt; font-weight: bold; margin-top: 12px; }
            p { margin-bottom: 12px; line-height: 1.5; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 16px; }
            th, td { border: 1px solid #BFBFBF; padding: 8px; text-align: left; }
            th { background-color: #F2F2F2; }
            ul { margin-top: 0; padding-left: 20px; }
            br { display: block; margin-bottom: 0.5em; content: ""; }
        `;
        
        const contentToDownload = contentRef.current.innerHTML;

        const fullHtml = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset='utf-8'>
                    <title>Care Plan</title>
                    <style>${styles}</style>
                </head>
                <body>
                    <h1>Care Plan - ${generatedDate}</h1>
                    ${contentToDownload}
                </body>
            </html>
        `;
        
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(fullHtml);
        const fileDownloadLink = document.createElement("a");
        document.body.appendChild(fileDownloadLink);
        fileDownloadLink.href = source;
        fileDownloadLink.download = 'Care-Plan.doc';
        fileDownloadLink.click();
        document.body.removeChild(fileDownloadLink);
    };

    return (
        <motion.div className="border-t border-gray-200 dark:border-white/10 pt-8 mt-12">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Care Plan Draft</h3>
            </div>

            <motion.div
                layout
                ref={contentRef}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="care-plan-container"
            >
                <ParsedContentToDocument contentString={carePlanHtml} />
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
