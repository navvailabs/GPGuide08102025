import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useBrightness } from '@/contexts/BrightnessContext';
import { Slider } from '@/components/ui/slider';

const BrightnessControl = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { brightness, setBrightness } = useBrightness();

  return (
    <div className="fixed top-5 right-5 z-[100]">
      <div className="relative flex flex-col items-center">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 16 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-black/30 backdrop-blur-md border border-white/10 rounded-full p-2 flex flex-col items-center gap-2"
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
    </div>
  );
};

export default BrightnessControl;
