import ScrollReveal from '@/app/components/ui/ScrollReveal'

export default function BenefitsSection() {
  const benefits = [
    { icon: 'forest', title: 'Campus más limpio', description: 'Mayor bienestar para todos' },
    { icon: 'group', title: 'Participación estudiantil', description: 'Comunidad activa y colaborativa' },
    { icon: 'bolt', title: 'Atención rápida', description: 'Respuesta en menos de 4 horas' },
    { icon: 'sentiment_satisfied', title: 'Mejor experiencia', description: 'Ambiente agradable y ordenado' },
    { icon: 'analytics', title: 'Gestión eficiente', description: 'Optimización de recursos' },
  ]

  return (
    <section className="py-40 px-6 max-w-[1280px] mx-auto">
      <div className="text-center mb-16">
        <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
          Beneficios
        </span>
        <h3 className="font-display text-4xl md:text-5xl font-black text-primary tracking-tight">
          Ventajas de usar Campus Limpio
        </h3>
        <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <ScrollReveal key={benefit.title} delay={index * 100} className="flex gap-4 items-start p-6 bg-white rounded-2xl card-premium">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">{benefit.icon}</span>
            </div>
            <div>
              <h4 className="font-display font-black text-primary">{benefit.title}</h4>
              <p className="text-on-surface-variant text-sm">{benefit.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}