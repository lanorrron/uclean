'use client'

import { ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  icon?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20',
    secondary:
      'bg-secondary text-white hover:bg-secondary-dark shadow-lg shadow-secondary/20',
    outline:
      'border-2 border-primary text-primary hover:bg-primary/10',
    glass:
      'glass text-primary hover:bg-white/80',
  }

  const sizes = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-10 py-5 text-base',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-2xl font-bold transition-all duration-300
        flex items-center justify-center gap-2
        ${className}
      `}
      {...props}
    >
      {icon && (
        <span className="material-symbols-outlined text-current">
          {icon}
        </span>
      )}
      {children}
    </motion.button>
  )
}