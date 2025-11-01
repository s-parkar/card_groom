
'use client';

import { useState, useEffect } from 'react';

const calculateTimeLeft = (targetDate: Date) => {
  const difference = +targetDate - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
};

const TimeValue = ({ value, unit }: { value: number, unit: string }) => (
    <div className="flex flex-col items-center p-2 rounded-lg bg-background/20">
        <span className="font-mono text-4xl sm:text-5xl md:text-6xl text-primary">{value.toString().padStart(2, '0')}</span>
        <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">{unit}</span>
    </div>
)

export default function Countdown() {
  const weddingDate = new Date('2025-11-30T18:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    // Render placeholders on the server
    return (
        <section id="countdown">
          <div className="text-center">
            <h2 className="font-headline text-7xl sm:text-8xl text-center mb-8 text-primary text-shadow-gold">
              The Celebration Begins
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                  <TimeValue value={0} unit="Days" />
                  <TimeValue value={0} unit="Hours" />
                  <TimeValue value={0} unit="Minutes" />
                  <TimeValue value={0} unit="Seconds" />
              </div>
            </div>
          </div>
        </section>
      );
  }

  return (
    <section id="countdown" className="animate-fade-in-scroll">
      <div className="text-center">
        <h2 className="font-headline text-7xl sm:text-8xl text-center mb-8 text-primary text-shadow-gold">
          The Celebration Begins
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              <TimeValue value={timeLeft.days} unit="Days" />
              <TimeValue value={timeLeft.hours} unit="Hours" />
              <TimeValue value={timeLeft.minutes} unit="Minutes" />
              <TimeValue value={timeLeft.seconds} unit="Seconds" />
          </div>
        </div>
      </div>
    </section>
  );
}
