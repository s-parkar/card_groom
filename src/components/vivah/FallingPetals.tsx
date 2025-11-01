
'use client';

import { useState, useEffect } from 'react';

const PetalShape = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full text-primary/60" fill="currentColor">
        <path d="M50 100C10 75 10 25 50 0C90 25 90 75 50 100Z" />
    </svg>
);

type Petal = {
  id: number;
  style: React.CSSProperties;
}

export default function FallingPetals({ startFalling }: { startFalling: boolean }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (startFalling) {
      const newPetals: Petal[] = Array.from({ length: 30 }).map((_, i) => ({
        id: Date.now() + i,
        style: {
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 5 + 5}s`, // 5-10 seconds
          animationDelay: `${Math.random() * 2}s`,
          transform: `scale(${Math.random() * 0.5 + 0.5})`,
        },
      }));
      setPetals(newPetals);

      setTimeout(() => setPetals([]), 12000); // Clear petals after animation
    }
  }, [startFalling]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute top-[-10%] animate-fall"
          style={petal.style}
        >
          <div className="w-6 h-6">
             <PetalShape />
          </div>
        </div>
      ))}
    </div>
  );
}
