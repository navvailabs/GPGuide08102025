import React from 'react';

const random = (min: number, max: number): number => Math.random() * (max - min) + min;

export const LivingOrigamiBackground = () => {
    return (
        <div className="hero-section fixed top-0 left-0 -z-10">
            {[...Array(15)].map((_, i) => {
                const duration = random(20, 40);
                const delay = random(-40, 0);
                const scale = random(0.2, 0.8);
                
                return (
                    <div 
                        key={i} 
                        className="drifter-container" 
                        style={{
                            '--y-start': `${random(-30, 30)}vh`,
                            '--y-end': `${random(-30, 30)}vh`,
                            '--r-start': `${random(-30, 30)}deg`,
                            '--r-end': `${random(-30, 30)}deg`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                        } as React.CSSProperties}
                    >
                        <div 
                            className="origami-crane" 
                            style={{
                                transform: `scale(${scale})`,
                                animationDelay: `${random(-4, 0)}s`,
                            }}
                        >
                            <div className="crane-part body"></div>
                            <div className="crane-part wing-left"></div>
                            <div className="crane-part wing-right"></div>
                            <div className="crane-part tail"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
