
'use client';

import { motion } from 'framer-motion';
import Tassel from './Tassel';
import { cn } from '@/lib/utils';

export default function Hero({ onPull, isUnveiled }: { onPull: () => void, isUnveiled: boolean }) {
  return (
    <motion.div
      className={cn(
        "relative h-screen bg-cover bg-center bg-background z-20 flex flex-col items-center justify-center text-center",
        !isUnveiled && "formal-border"
      )}
      style={{
        position: isUnveiled ? 'absolute' : 'relative',
        width: '100%',
        top: 0,
        left: 0,
      }}
      animate={{ y: isUnveiled ? '-100vh' : 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      <div className="font-headline text-primary text-shadow-gold">
        <motion.h1 
          className="text-8xl sm:text-9xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Akash
        </motion.h1>
        <motion.p 
          className="text-5xl sm:text-6xl my-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >&</motion.p>
        <motion.h1 
          className="text-8xl sm:text-9xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Chetna
        </motion.h1>
      </div>

      {!isUnveiled && (
         <Tassel onPull={onPull} />
      )}

    </motion.div>
  );
}
