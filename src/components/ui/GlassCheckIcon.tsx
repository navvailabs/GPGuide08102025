import React from 'react';

export const GlassCheckIcon = () => (
  <div className="relative w-4 h-4 flex items-center justify-center">
    {/* Base shape with gradient */}
    <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-green-500/40 to-green-700/60" />
    
    {/* Glass layer */}
    <div className="absolute inset-0 rounded-full bg-black/20 backdrop-blur-sm border border-white/10" />
    
    {/* Icon shape */}
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="relative z-10 text-green-300"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    
    {/* Inner shadow for depth */}
    <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
    
    {/* Subtle glow */}
    <div className="absolute -inset-0.5 rounded-full bg-green-500/30 blur-sm opacity-70" />
  </div>
);
