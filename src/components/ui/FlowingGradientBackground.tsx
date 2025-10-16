import { useBrightness } from '@/contexts/BrightnessContext';

const FlowingGradientBackground = () => {
    const { brightness } = useBrightness();
    return (
      <div 
        className="fixed inset-0 -z-10 overflow-hidden bg-slate-900"
        style={{ 
            filter: `brightness(${brightness})`, 
            transition: 'filter 0.3s ease-in-out',
            transform: 'translateZ(0)'
        }}
      >
        {/* First Animated Gradient (Blue Glow) */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(76, 128, 201, 0.3) 0%, rgba(10, 37, 64, 0) 70%)',
            animation: 'flow 40s linear infinite',
            transformOrigin: 'center center',
          }}
        />
        {/* Second Animated Gradient (Purple Glow) */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(168, 120, 228, 0.2) 0%, rgba(10, 37, 64, 0) 60%)',
            animation: 'flow-reverse 35s linear infinite',
            transformOrigin: 'center center',
          }}
        />

        {/* Noise Overlay */}
        <div
            className="absolute inset-0 opacity-[0.02] mix-blend-soft-light pointer-events-none"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '400px 400px',
            }}
        />
      </div>
    );
  };
  
  export default FlowingGradientBackground;
