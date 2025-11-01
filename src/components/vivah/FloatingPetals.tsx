'use client';
import { useState, useEffect } from 'react';

type Blessing = {
  id: number;
  message: string;
};

type Petal = {
  id: number;
  message: string;
  style: React.CSSProperties;
};

const PetalShape = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full text-primary/60" fill="currentColor">
        <path d="M50 100C10 75 10 25 50 0C90 25 90 75 50 100Z" />
    </svg>
);


export default function FloatingPetals({ blessings }: { blessings: Blessing[] }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (blessings.length > 0) {
      const newBlessing = blessings[blessings.length - 1];
      const newPetals: Petal[] = Array.from({ length: 5 }).map((_, i) => ({
        id: newBlessing.id + i,
        message: i === 2 ? newBlessing.message : '', // Show message on one petal
        style: {
          left: `${Math.random() * 90}%`,
          animationDuration: `${Math.random() * 5 + 10}s`,
          animationDelay: `${Math.random() * 2}s`,
          width: `${Math.random() * 40 + (i === 2 ? 180 : 40)}px`,
          opacity: 0.7
        },
      }));
      setPetals(prev => [...prev, ...newPetals]);

      // Clean up old petals
      setTimeout(() => {
          setPetals(currentPetals => currentPetals.filter(p => p.id >= newBlessing.id));
      }, 15000);
    }
  }, [blessings]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute bottom-0 animate-float-up"
          style={petal.style}
        >
          <div className="relative">
            <PetalShape />
            {petal.message && (
              <p className="absolute inset-0 flex items-center justify-center text-center p-2 text-xs text-primary-foreground font-body font-semibold">
                {petal.message}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
