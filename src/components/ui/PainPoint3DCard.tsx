import React from 'react';
import { X, Check } from 'lucide-react';

interface PainPoint3DCardProps {
  icon: React.ElementType;
  title: string;
  pain: string;
  gain: string;
}

export const PainPoint3DCard: React.FC<PainPoint3DCardProps> = ({ icon: Icon, title, pain, gain }) => {
  return (
    <div
      className="flex flex-col gap-6 w-full h-full bg-black/30 backdrop-blur-lg border border-white/10 rounded-[20px] p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.4),0_2px_4px_-2px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Icon */}
      <div
        className="w-[51px] h-[50px] flex items-center justify-center rounded-[10px] p-2 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.6)]"
        style={{
          background: 'linear-gradient(rgb(10, 37, 64) 0%, rgb(15, 110, 110) 170%)',
        }}
      >
        <div className="w-[31px] h-[34px]">
          <Icon className="text-white w-full h-full" strokeWidth={1.5} />
        </div>
      </div>
      {/* Text Content */}
      <div className="flex flex-col gap-4">
        <h3
          className="text-[20px] font-medium leading-6 tracking-[-0.2px] text-white"
          style={{
            fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif',
          }}
        >
          {title}
        </h3>
        <ul className="space-y-3">
            <li className="flex items-start">
                <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" strokeWidth={2.5} />
                <p
                  className="text-base font-normal leading-6 text-gray-400"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {pain}
                </p>
            </li>
            <li className="flex items-start">
                <Check className="h-5 w-5 text-success-green mr-3 flex-shrink-0" strokeWidth={2.5} />
                <p
                  className="text-base font-semibold leading-6 text-gray-300"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {gain}
                </p>
            </li>
        </ul>
      </div>
    </div>
  );
};
