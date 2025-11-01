
'use client';

import { motion, useDragControls } from 'framer-motion';
import { Heart, Flower } from 'lucide-react';

const Tassel = ({ onPull }: { onPull: () => void }) => {
  const controls = useDragControls();

  return (
    <motion.div 
      className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
    >
      <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
      
      <motion.div
        drag="y"
        dragControls={controls}
        dragConstraints={{ top: 0, bottom: 200 }} 
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          if (info.offset.y > 50) { 
            onPull();
          }
        }}
        className="cursor-grab active:cursor-grabbing flex flex-col items-center gap-2"
        whileHover={{ scale: 1.1 }}
      >
        <div className="text-foreground animate-bounce text-sm text-shadow-gold">Pull to Unveil</div>
        <motion.div 
          className="relative"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
            <Heart className="w-8 h-8 text-primary/80" fill="currentColor" />
            <Flower className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/80" />
        </motion.div>
        <div className="w-1 h-4 bg-primary/80 rounded-b-full mx-auto" />
      </motion.div>
    </motion.div>
  );
};

export default Tassel;
