import { useBrightness } from '@/contexts/BrightnessContext';

const SoftMedicalGradientBackground = () => {
    const { brightness } = useBrightness();
    return (
        <div
            className="fixed inset-0 -z-20 overflow-hidden"
            style={{ filter: `brightness(${brightness})`, transition: 'filter 0.3s ease-in-out' }}
        >
            {/* Base Gradient Layer: soft blue -> lavender/pink -> peach/apricot */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#5f7b97] via-[#9c899f] to-[#b98e6e]" />

            {/* Faint Bluish Overlay Tint */}
            <div className="absolute inset-0 bg-blue-950/50" />

            {/* Soft Glow Effects */}
            <div 
                className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-sky-400/05 blur-3xl animate-pulse" 
                style={{ animationDuration: '12s' }}
            />
            <div 
                className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-amber-300/05 blur-3xl animate-pulse" 
                style={{ animationDuration: '10s', animationDelay: '3s' }}
            />

            {/* Slight blur for overall softness */}
            <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>
    );
};

export default SoftMedicalGradientBackground;
