import { useBrightness } from '@/contexts/BrightnessContext';

const FlowingGradientBackground = () => {
    const { brightness } = useBrightness();
    return (
      <div 
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{ filter: `brightness(${brightness})`, transition: 'filter 0.3s ease-in-out' }}
      >
        <div className="absolute inset-0 bg-medical-blue" />
        <div 
          className="absolute top-[-50vh] left-[-50vw] w-[200vw] h-[200vh] bg-[radial-gradient(circle_at_center,_rgba(15,110,110,0.4)_0%,_rgba(10,37,64,0.4)_30%,_rgba(10,37,64,0)_70%)]"
          style={{
            animation: 'flow 25s linear infinite',
          }}
        />
        <div 
          className="absolute bottom-[-50vh] right-[-50vw] w-[200vw] h-[200vh] bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.2)_0%,_rgba(10,37,64,0)_60%)]"
          style={{
            animation: 'flow-reverse 20s linear infinite',
          }}
        />
        <style>
          {`
            @keyframes flow {
              0% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(10vw, -10vh) rotate(90deg); }
              50% { transform: translate(-10vw, 10vh) rotate(180deg); }
              75% { transform: translate(5vw, 5vh) rotate(270deg); }
              100% { transform: translate(0, 0) rotate(360deg); }
            }
            @keyframes flow-reverse {
              0% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(-8vw, 12vh) rotate(-90deg); }
              50% { transform: translate(12vw, -8vh) rotate(-180deg); }
              75% { transform: translate(-5vw, -5vh) rotate(-270deg); }
              100% { transform: translate(0, 0) rotate(-360deg); }
            }
          `}
        </style>
      </div>
    );
  };
  
  export default FlowingGradientBackground;
