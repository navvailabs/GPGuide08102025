import { useBrightness } from '@/contexts/BrightnessContext';

const RadialGradientBackground = () => {
    const { brightness } = useBrightness();
    return (
      <div 
        className="fixed inset-0 -z-20 bg-[radial-gradient(125%_125%_at_50%_101%,rgba(245,87,2,1)_10.5%,rgba(245,120,2,1)_16%,rgba(245,140,2,1)_17.5%,rgba(245,170,100,1)_25%,rgba(238,174,202,1)_40%,rgba(202,179,214,1)_65%,rgba(148,201,233,1)_100%)]"
        style={{ filter: `brightness(${brightness})`, transition: 'filter 0.3s ease-in-out' }}
      />
    );
  };
  
export default RadialGradientBackground;
