import ScrollReveal from '@/app/components/ui/ScrollReveal'

export default function SolutionSection() {
  return (
    <section className="py-40 px-6 max-w-[1280px] mx-auto">
      <div className="text-center mb-16">
        <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
          Solución Tecnológica
        </span>
        <h3 className="font-display text-4xl md:text-5xl font-black text-primary tracking-tight">
          Tecnología al servicio del campus
        </h3>
        <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <ScrollReveal className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-100 text-center card-premium">
          <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-4xl">photo_camera</span>
          </div>
          <h4 className="font-display text-2xl font-black text-primary mb-3">Tomar Fotografía</h4>
          <p className="text-on-surface-variant font-light">Captura la evidencia visual del área afectada en segundos.</p>
        </ScrollReveal>

        <ScrollReveal delay={150} className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-100 text-center card-premium">
          <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-4xl">location_on</span>
          </div>
          <h4 className="font-display text-2xl font-black text-primary mb-3">Geolocalización GPS</h4>
          <p className="text-on-surface-variant font-light">Permite acceso a la ubicación exacta para intervención quirúrgica.</p>
        </ScrollReveal>

        <ScrollReveal delay={300} className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-100 text-center card-premium">
          <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-4xl">send</span>
          </div>
          <h4 className="font-display text-2xl font-black text-primary mb-3">Envío Inmediato</h4>
          <p className="text-on-surface-variant font-light">El personal de mantenimiento recibe y atiende el reporte al instante.</p>
        </ScrollReveal>
      </div>
    </section>
  )
}