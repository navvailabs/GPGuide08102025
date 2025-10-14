import React, { useEffect, useRef } from 'react';

const AnimatedCard = ({ children }: { children: React.ReactNode }) => {
  const topRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;
    const animateBorder = () => {
      const now = Date.now() / 1000;
      const speed = 0.4; // Slightly slower for a more elegant feel
      const topX = Math.sin(now * speed) * 100;
      const rightY = Math.cos(now * speed) * 100;
      const bottomX = Math.sin(now * speed + Math.PI) * 100;
      const leftY = Math.cos(now * speed + Math.PI) * 100;

      if (topRef.current) topRef.current.style.transform = `translateX(${topX}%)`;
      if (rightRef.current) rightRef.current.style.transform = `translateY(${rightY}%)`;
      if (bottomRef.current) bottomRef.current.style.transform = `translateX(${bottomX}%)`;
      if (leftRef.current) leftRef.current.style.transform = `translateY(${leftY}%)`;

      animationId = requestAnimationFrame(animateBorder);
    };

    animationId = requestAnimationFrame(animateBorder);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-full h-full bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-transform duration-300 hover:-translate-y-2">
      {/* Animated border elements */}
      <div className="absolute top-0 left-0 w-full h-0.5 overflow-hidden">
        <div
          ref={topRef}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        ></div>
      </div>
      <div className="absolute top-0 right-0 w-0.5 h-full overflow-hidden">
        <div
          ref={rightRef}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
        ></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden">
        <div
          ref={bottomRef}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent via-cyan-400/40 to-transparent"
        ></div>
      </div>
      <div className="absolute top-0 left-0 w-0.5 h-full overflow-hidden">
        <div
          ref={leftRef}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-cyan-400/40 to-transparent"
        ></div>
      </div>
      {/* Card Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default AnimatedCard;
