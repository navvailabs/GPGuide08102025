import { useBrightness } from '@/contexts/BrightnessContext';
import { useTheme } from '@/contexts/ThemeContext';

const DarkBackground = () => {
    return (
        <>
            {/* Gradient Layer */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_bottom,#0b0f20_0%,#3c2f5d_40%,#8f6c91_80%,#b07d6f_100%)]"
            />

            {/* Noise Overlay */}
            <div
                className="absolute inset-0 opacity-[0.035] mix-blend-soft-light pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '400px 400px',
                }}
            />
        </>
    );
};

const LightBackground = () => {
    return (
        <>
            {/* Base light color */}
            <div className="absolute inset-0 bg-gray-50" />
            
            {/* Subtle radial gradient for a soft glow */}
            <div 
                className="absolute top-0 left-0 w-full h-full"
                style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(200, 210, 230, 0.4) 0%, transparent 70%)',
                }}
            />
            
            {/* Noise Overlay */}
            <div
                className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '400px 400px',
                }}
            />
        </>
    );
};


const ThemedBackground = () => {
    const { theme } = useTheme();
    return theme === 'light' ? <LightBackground /> : <DarkBackground />;
};


const RadialGradientBackground = () => {
    const { brightness } = useBrightness();

    return (
        <div
            className="fixed inset-0 -z-20 overflow-hidden"
            style={{ 
                filter: `brightness(${brightness})`, 
                transition: 'filter 0.3s ease-in-out',
                transform: 'translateZ(0)'
            }}
        >
            <ThemedBackground />
        </div>
    );
};

export default RadialGradientBackground;
