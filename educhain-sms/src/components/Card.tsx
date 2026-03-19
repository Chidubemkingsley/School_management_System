import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' }}
      className={`bg-neutral-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
};
