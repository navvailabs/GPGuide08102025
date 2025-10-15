import { useBrightness } from '@/contexts/BrightnessContext';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const SoftMedicalGradientBackground = () => {
    const { brightness } = useBrightness();
    
    const { scrollYProgress } = useScroll();

    // The `useSpring` hook smooths the scroll animation, making the parallax effect less jarring during normal scrolling.
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 50,
        restDelta: 0.001
    });

    // The key change to fix the overscroll issue is adding `{ clamp: true }` to `useTransform`.
    // This prevents the transform from extrapolating values when `scrollYProgress` goes
    // outside the [0, 1] range (which happens during over-scroll on some devices).
    // As a result, the background animation will stop precisely at the top and bottom of the page,
    // completely eliminating the jittery jump and ensuring a stable background during over-scroll.
    const y1 = useTransform(smoothScroll, [0, 1], [-150, 150], { clamp: true });
    const y2 = useTransform(smoothScroll, [0, 1], [50, -50], { clamp: true });
    const y3 = useTransform(smoothScroll, [0, 1], [-200, 200], { clamp: true });
    
    const x1 = useTransform(smoothScroll, [0, 1], [-50, 50], { clamp: true });
    const x3 = useTransform(smoothScroll, [0, 1], [100, -100], { clamp: true });


    return (
        <div
            className="fixed inset-0 -z-20 overflow-hidden"
            style={{ 
                filter: `brightness(${brightness})`, 
                transition: 'filter 0.3s ease-in-out',
                // This hints the browser to prepare for repaints, which can help with scroll performance.
                willChange: 'filter',
            }}
        >
            {/* Base dark purple color from the top-left of the image */}
            <div className="absolute inset-0 bg-[#240046]" />

            {/* 
              A collection of large, blurred, overlapping, and transparent radial gradients (blobs) 
              that move subtly on scroll to create a smooth, fluid parallax effect.
            */}
            
            {/* Magenta/Pink blob */}
            <motion.div 
                className="absolute top-[-20%] left-[0%] w-[80%] h-[80%] bg-[#b534a1] rounded-full opacity-50 blur-3xl" 
                style={{ 
                    y: y1, 
                    x: x1, 
                    // This is crucial for performance. It tells the browser to offload the animation to the GPU.
                    willChange: 'transform' 
                }}
            />
            
            {/* Red-pink blob */}
            <motion.div 
                className="absolute top-[20%] left-[30%] w-[70%] h-[70%] bg-[#e6517b] rounded-full opacity-40 blur-3xl"
                style={{ 
                    y: y2, 
                    willChange: 'transform' 
                }}
            />

            {/* Final orange touch */}
            <motion.div 
                className="absolute bottom-[-30%] right-[-20%] w-[80%] h-[80%] bg-[#fa9e5f] rounded-full opacity-40 blur-3xl"
                style={{ 
                    y: y3, 
                    x: x3, 
                    willChange: 'transform' 
                }}
            />
        </div>
    );
};

export default SoftMedicalGradientBackground;
