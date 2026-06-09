'use client'

import Button from '@/app/components/ui/Button'

export default function FinalCTA() {
  const scrollToForm = () => {
    document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-40 px-6 text-center">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="w-24 h-24 bg-primary rounded-[2.5rem] mx-auto flex items-center justify-center text-white shadow-[0_20px_40px_-10px_rgba(0,51,153,0.5)] hover:rotate-[360deg] transition-transform duration-1000">
          <span className="material-symbols-outlined text-[48px] fill-icon">volunteer_activism</span>
        </div>
        <h3 className="font-display text-5xl md:text-7xl font-black text-primary tracking-tight">
          Tu legado es hoy
        </h3>
        <p className="text-2xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-light">
          Un entorno de excelencia académica comienza con el respeto por nuestro espacio común.
        </p>
        <Button variant="primary" size="lg" onClick={scrollToForm}  className='inline-flex items-center hover:cursor-pointer  group' >
          Empoderar mi Campus
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-secondary transition-colors">
            <span className="material-symbols-outlined">north_east</span>
          </div>
        </Button>
      </div>
    </section>
  )
}