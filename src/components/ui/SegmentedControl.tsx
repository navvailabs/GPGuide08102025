import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

export interface SegmentedControlOption {
  label: string;
  value: string;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value?: string;
  onChange?: (value: string) => void;
  'data-id'?: string;
  className?: string;
}

export const SegmentedControl = ({
  options,
  value: controlledValue,
  onChange,
  'data-id': dataId,
  className,
}: SegmentedControlProps) => {
  const { theme } = useTheme();
  const [internalValue, setInternalValue] = useState(options[0]?.value ?? '');

  const value = controlledValue ?? internalValue;

  const handleClick = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div
      data-id={dataId}
      className={cn(
        'relative inline-flex items-center p-1 rounded-lg w-full',
        theme === 'light'
          ? 'bg-gray-200/60'
          : 'bg-black/20',
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={cn(
            'relative flex-1 px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 dark:focus-visible:ring-blue-400/70',
            value === option.value
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          )}
        >
          <span className="relative z-10">{option.label}</span>
          {value === option.value && (
            <motion.div
              layoutId="segmented-control-active-indicator"
              className={cn(
                'absolute inset-0 rounded-md',
                theme === 'light'
                  ? 'bg-white shadow-sm'
                  : 'bg-gray-700'
              )}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};
