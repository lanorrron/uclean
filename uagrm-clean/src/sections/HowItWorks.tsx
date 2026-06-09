

export default function HowItWorks() {
  const steps = [
    { number: 1, title: 'Detecta', description: 'Identifica suciedad o acumulación', icon: 'visibility' },
    { number: 2, title: 'Fotografía', description: 'Captura evidencia clara', icon: 'photo_camera' },
    { number: 3, title: 'Ubicación + Descripción', description: 'Comparte datos exactos', icon: 'edit_note' },
    { number: 4, title: 'Mantenimiento Actúa', description: 'Respuesta y solución inmediata', icon: 'construction' },
  ]

  return (
    <section className="py-40 px-6 text-white relative overflow-hidden bg-radar-bg">
 <div className="particle-container"  id="particle-container">
{Array.from({ length: 30 }).map((_, i) => (
  <div
    key={i}
    className="particle"
    style={{
      width: `${(i % 5) + 2}px`,
      height: `${(i % 4) + 2}px`,
      left: `${(i * 13) % 100}%`,
      top: `${(i * 17) % 100}%`,
      animationDelay: `${i * 0.5}s`,
      animationDuration: `${10 + (i % 10)}s`,
    }}
  />
))}
</div>
        
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24 reveal active">
          <h3 className="font-display text-4xl md:text-6xl font-black mb-6 italic tracking-tight">Ciclo de Renovación</h3>
          <p className="text-white/40 text-xl font-light">Un proceso transparente que garantiza la excelencia operativa.</p>
        </div>
        <div className="relative px-4 md:px-0 space-y-24 md:space-y-32 py-12">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/10 via-primary to-primary/10 md:-translate-x-1/2 opacity-100 shadow-[0_0_8px_rgba(0,51,153,0.5)]"></div>
          <div className="relative space-y-24 md:space-y-32 py-12">

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-16 reveal active">
              <div className="md:w-1/2 md:text-right pl-20 md:pl-0 order-2 md:order-1">
                <h5 className="text-2xl font-black text-white mb-2">Identificación</h5>
                <p className="text-white/40 text-sm font-medium leading-relaxed">La comunidad universitaria reporta una incidencia dentro del campus mediante fotografía y ubicación en tiempo real.</p>
              </div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-16 h-16 glass-dark rounded-2xl z-10 text-white border-white/20 shadow-2xl order-1 md:order-2">
                <span className="material-symbols-outlined !text-[32px] fill-icon">biotech</span>
              </div>
              <div className="md:w-1/2 order-3 hidden md:block space-y-24 md:space-y-32 py-12"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-16 reveal active">
              <div className="md:w-1/2 order-3 hidden md:block"></div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-16 h-16 glass-dark rounded-2xl z-10 text-secondary border-secondary/20 shadow-2xl order-1 md:order-2">
                <span className="material-symbols-outlined !text-[32px] fill-icon">cloud_sync</span>
              </div>
              <div className="md:w-1/2 text-left pl-20 md:pl-0 order-2 md:order-3 space-y-24 md:space-y-32 py-12">
                <h5 className="text-2xl font-black text-secondary mb-2">Reporte y Notificación</h5>
                <p className="text-white/40 text-sm font-medium leading-relaxed">El sistema recibe el reporte y lo envía automáticamente al personal encargado para una atención inmediata..</p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-16 reveal active">
              <div className="md:w-1/2 md:text-right pl-20 md:pl-0 order-2 md:order-1">
                <h5 className="text-2xl font-black text-white mb-2">Acción en Terreno</h5>
                <p className="text-white/40 text-sm font-medium leading-relaxed">Movilización de equipos especializados con la logística necesaria para resolver el incidente.</p>
              </div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-16 h-16 glass-dark rounded-2xl z-10 text-white border-white/20 shadow-2xl order-1 md:order-2">
                <span className="material-symbols-outlined !text-[32px] fill-icon">precision_manufacturing</span>
              </div>
              <div className="md:w-1/2 order-3 hidden md:block space-y-24 md:space-y-32 py-12"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-16 reveal active space-y-24 md:space-y-32 py-12">
              <div className="md:w-1/2 order-3 hidden md:block"></div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl z-10 text-white shadow-2xl order-1 md:order-2">
                <span className="material-symbols-outlined !text-[32px] fill-icon">verified</span>
              </div>
              <div className="md:w-1/2 text-left pl-20 md:pl-0 order-2 md:order-3 space-y-24 md:space-y-32 py-12">
                <h5 className="text-2xl font-black text-white mb-2">Verificación y Cierre</h5>
                <p className="text-white/40 text-sm font-medium leading-relaxed">Se confirma que el área fue atendida correctamente y el reporte queda marcado como resuelto.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
