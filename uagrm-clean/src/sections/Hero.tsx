'use client'

import Button from '@/app/components/ui/Button'
import ScrollReveal from '@/app/components/ui/ScrollReveal'
import { motion } from 'framer-motion'

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative px-6 max-w-[1280px] mx-auto overflow-visible mb-40">
      <div className="hero-blob -top-40 -right-20" />
      <div className="hero-blob -bottom-20 -left-40 opacity-40" />
      
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <ScrollReveal className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm text-primary rounded-full font-bold text-xs tracking-wide uppercase">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            Compromiso con el Futuro
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-black text-primary leading-[1.05] tracking-tight">
            Juntos construimos un <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              campus más limpio
            </span>
          </h1>
          
          <p className="text-xl text-on-surface-variant font-light leading-relaxed max-w-xl">
            Reporta áreas que necesiten limpieza y ayuda a mantener la Universidad Gabriel René Moreno 
            ordenada y agradable para todos. Sin iniciar sesión. En segundos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <Button variant="primary" size="lg" onClick={scrollToForm} icon="add_circle">
              Realizar Reporte
            </Button>
          </div>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-4xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,51,153,0.2)] border-[12px] border-white transform hover:scale-[1.02] transition-transform duration-700">
    <img alt="Estudiantes UAGRM" className="w-full h-auto object-cover aspect-[4/5] lg:aspect-square" 
    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ7V0-O-blBwBBlrpBob83rR6OaJGv4vAZGV29t0LtIJiqvOZm04ixAuXOo4mI5EOBnEnADVGWxftmvC6fbY2qfodPjvUD3uRmkYynCFHhrPRxY95eSwjwjkFM9udASaCJQHzua1xgdpS-LfJJUbnNBPdBalwDM7Xg8tWQChTXDL3oTHjVRwLyq7MfcK5OCTmrSbkhSkfW7VIwjTwVq8GoiT6bc0oBiJ8dIxrVVvBHEiFp-dDsGB_eoHKRNkUhA-pyRLHKz1-Ytv4"></img>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>

<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="absolute -bottom-10 -left-10 glass p-8 rounded-4xl shadow-2xl max-w-[280px] border-white/60"
>
  <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-3xl fill-icon animate-pulse">speed</span>
              </div>

    <div>
      <span className="block font-black text-primary text-lg">
        Reportes en Tiempo Real
      </span>

      <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">
        Comunidad UAGRM
      </span>
    </div>
  </div>

  <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
    Cada reporte ayuda a mantener espacios más limpios, seguros y agradables para todos.
  </p>
</motion.div>
        </motion.div>
      </div>
    </section>
  )
}