import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useBrightness } from '@/contexts/BrightnessContext';
import { Slider } from '@/components/ui/slider';

const BrightnessControl = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { brightness, setBrightness } = useBrightness();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close the slider when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="relative z-[100]" ref={wrapperRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -10, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full mt-3 right-1/2 translate-x-1/2 w-auto bg-black/30 backdrop-blur-md border border-white/10 rounded-full p-2 flex flex-col items-center gap-2"
          >
              <Sun className="w-4 h-4 text-white/70" />
              <Slider
                  defaultValue={[brightness]}
                  value={[brightness]}
                  onValueChange={(value) => setBrightness(value[0])}
                  max={1}
                  min={0.2}
                  step={0.01}
                  orientation="vertical"
                  className="w-1.5 h-24"
              />
              <Moon className="w-4 h-4 text-white/70" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Sun className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default BrightnessControl;
