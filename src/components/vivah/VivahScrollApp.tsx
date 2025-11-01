
'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Hero from '@/components/vivah/Hero';
import InvitationScroll from '@/components/vivah/InvitationScroll';
import Countdown from '@/components/vivah/Countdown';
import VenueMap from '@/components/vivah/VenueMap';
import Rsvp from '@/components/vivah/Rsvp';
import MusicPlayer, { type MusicPlayerHandle } from '@/components/vivah/MusicPlayer';
import FloatingPetals from '@/components/vivah/FloatingPetals';
import FallingPetals from '@/components/vivah/FallingPetals';
import { Separator } from '@/components/ui/separator';
import { Gem } from 'lucide-react';

type Blessing = {
  id: number;
  message: string;
};

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card/50 border border-primary/20 rounded-lg shadow-lg backdrop-blur-sm p-6 sm:p-8">
    {children}
  </div>
);

const DecorativeSeparator = () => (
    <div className="flex items-center justify-center my-12">
      <Separator className="w-1/3" />
      <Gem className="w-6 h-6 text-primary/70 mx-4" />
      <Separator className="w-1/3" />
    </div>
);


export default function VivahScrollApp() {
  const [isUnveiled, setIsUnveiled] = useState(false);
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [startPetals, setStartPetals] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  const handleUnveil = () => {
    if (!isUnveiled) {
      setIsUnveiled(true);
      setTimeout(() => setShowContent(true), 500); // Sync with animation
      musicPlayerRef.current?.play();
    }
  };

  useEffect(() => {
    // This effect ensures that on reload, the state is reset.
    setIsUnveiled(false);
    setShowContent(false);
    
    // Start falling petals animation shortly after component mounts
    const timer = setTimeout(() => setStartPetals(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const addBlessing = useCallback((message: string) => {
    if (message.trim()) {
      setBlessings(prev => [...prev, { id: Date.now(), message }]);
    }
  }, []);

  return (
    <div className={`relative ${!isUnveiled ? 'overflow-hidden h-screen' : 'overflow-y-auto'}`}>
      <FallingPetals startFalling={startPetals} />
      
      <Hero onPull={handleUnveil} isUnveiled={isUnveiled} />
      
      <MusicPlayer ref={musicPlayerRef} />
      <FloatingPetals blessings={blessings} />

      {showContent && (
        <main className="animate-unroll relative">
            <div id="invitation-content" className="relative formal-border bg-invitation-scroll pb-4">
                
                <div className="container mx-auto px-4 pt-2 sm:pt-8 space-y-8">
                  <SectionWrapper>
                    <InvitationScroll />
                  </SectionWrapper>
                  
                  <DecorativeSeparator />

                  <SectionWrapper>
                    <Countdown />
                  </SectionWrapper>

                  <DecorativeSeparator />

                  <SectionWrapper>
                    <VenueMap />
                  </SectionWrapper>
                  
                  <DecorativeSeparator />

                  <SectionWrapper>
                    <Rsvp addBlessing={addBlessing} />
                  </SectionWrapper>
                </div>
                <footer className="text-center text-2xl md:text-8xl text-muted-foreground font-headline text-primary text-shadow-gold pt-8 pb-4">
                <p>Hope to see you there </p>
                <p> Akash & Chetna </p>
                </footer>
            </div>
        </main>
      )}
    </div>
  );
}
