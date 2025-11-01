
'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Button } from '@/components/ui/button';
import { Music, Pause } from 'lucide-react';

export type MusicPlayerHandle = {
  play: () => void;
};

const MusicPlayer = forwardRef<MusicPlayerHandle, {}>((props, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.3; // Set volume to 50%
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      
      audio.addEventListener('error', (e) => {
        console.error("Audio playback failed:", audio.error);
      });
      
      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        audio.removeEventListener('error', () => {});
      };
    }
  }, []);

  const playMusic = () => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.play().catch(error => {
        // Autoplay was prevented.
        console.log("Music autoplay prevented by browser. User interaction is required.");
      });
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play().catch(error => console.error("Audio playback failed:", error));
      } else {
        audio.pause();
      }
    }
  };
  
  useImperativeHandle(ref, () => ({
    play: playMusic,
  }));

  return (
    <div className="fixed bottom-4 right-4 z-50">
       <audio ref={audioRef} src="/music.mp3" preload="auto" />
       <Button 
        onClick={togglePlayPause}
        variant="outline"
        size="icon"
        className="bg-background/50 border-primary/50 hover:bg-primary text-primary hover:text-primary-foreground rounded-full shadow-lg backdrop-blur-sm"
        aria-label={isPlaying ? "Pause music" : "Play music"}
       >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
       </Button>
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;
