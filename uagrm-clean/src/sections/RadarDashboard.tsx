'use client'

import ScrollReveal from '@/app/components/ui/ScrollReveal'

const radarPoints = [
  {
    top: '30%',
    left: '65%',
    color: 'bg-secondary',
    glow: 'shadow-[0_0_15px_rgba(227,30,36,0.8)]',
    label: 'Bloque A',
    status: 'URGENTE'
  },
  {
    top: '75%',
    left: '30%',
    color: 'bg-radar-success',
    glow: 'shadow-[0_0_15px_rgba(125,211,252,0.8)]',
    label: 'Lab Redes',
    status: 'ACTIVO'
  },
  {
    top: '42%',
    left: '22%',
    color: 'bg-yellow-400',
    glow: 'shadow-[0_0_15px_rgba(250,204,21,0.7)]',
    label: 'Biblioteca',
    status: 'PENDIENTE'
  },
  {
    top: '18%',
    left: '48%',
    color: 'bg-cyan-400',
    glow: 'shadow-[0_0_15px_rgba(34,211,238,0.7)]',
    label: 'Módulo C',
    status: 'ONLINE'
  },
  {
    top: '60%',
    left: '78%',
    color: 'bg-purple-400',
    glow: 'shadow-[0_0_15px_rgba(192,132,252,0.7)]',
    label: 'Auditorio',
    status: 'CHECK'
  },
  {
    top: '52%',
    left: '50%',
    color: 'bg-orange-400',
    glow: 'shadow-[0_0_15px_rgba(251,146,60,0.7)]',
    label: 'Pasillo Norte',
    status: 'ALERTA'
  }
]

export default function RadarDashboard() {
  return (
    <section className="py-24 px-6 bg-radar-bg text-white relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Control Panel */}
          <div className="lg:col-span-4 space-y-8">
            <ScrollReveal>
              <div className="pt-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/15 border border-secondary/20 rounded-full font-bold text-[10px] text-secondary tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(227,30,36,0.6)]" />
                  Terminal Operativo
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-black mb-4 leading-tight tracking-tight">
                  Panel de Control
                </h3>

                <p className="text-white/40 text-sm font-light leading-relaxed">
                  Monitoreo estratégico del ecosistema universitario.
                  Gestión táctica de incidencias sanitarias.
                </p>
              </div>
            </ScrollReveal>

            {/* System Status */}
            <div className="grid grid-cols-3 gap-6 py-8 border-y border-white/10">
              <div className="space-y-2">
                <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.25em]">
                  Uptime
                </div>

                <div className="text-lg font-bold text-radar-success tracking-tighter font-mono">
                  99.4%
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.25em]">
                  Nodos
                </div>

                <div className="text-lg font-bold text-white tracking-tighter font-mono">
                  4,252
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.25em]">
                  Saturación
                </div>

                <div className="text-lg font-bold text-secondary tracking-tighter font-mono">
                  18%
                </div>
              </div>
            </div>

            {/* Alert Cards */}
            <div className="space-y-3">
              <div className="radar-glass-card rounded-xl p-4 flex items-center justify-between group border-l-2 border-l-secondary">
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-white text-sm tracking-tight group-hover:text-secondary transition-colors">
                    Bloque A - Entrada
                  </h4>

                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.1em]">
                      Basura • 8m
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary text-[8px] font-black tracking-widest border border-secondary/30">
                  URGENTE
                </span>
              </div>

              <div className="radar-glass-card rounded-xl p-4 flex items-center justify-between group border-l-2 border-l-radar-success">
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-white text-sm tracking-tight group-hover:text-radar-success transition-colors">
                    Lab de Redes - P2
                  </h4>

                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.1em]">
                      Limpieza • 24m
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-radar-success/20 text-radar-success text-[8px] font-black tracking-widest border border-radar-success/30">
                  ACTIVO
                </span>
              </div>
            </div>
          </div>

          {/* Radar Visualization */}
          <div className="lg:col-span-8">
            <div className="w-full flex items-center justify-center p-4">
              <div className="aspect-square w-full max-w-[320px] sm:max-w-[450px] lg:max-w-[600px] bg-[#0c1633] rounded-full border border-white/5 relative overflow-hidden shadow-[0_0_60px_rgba(0,51,153,0.15)]">
                
                {/* Grid */}
                <div
                  className="absolute inset-0 bg-radar-grid opacity-20"
                  style={{ backgroundSize: '40px 40px' }}
                />

                {/* Scanner */}
                <div className="radar-scanner" />

                {/* Rings */}
                <div className="w-[95%] aspect-square border border-white/5 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                <div className="w-[75%] aspect-square border border-white/10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                <div className="w-[50%] aspect-square border border-white/5 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                <div className="w-[25%] aspect-square border border-white/10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                {/* Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <div className="h-full w-px bg-white" />
                  <div className="w-full h-px bg-white absolute" />
                </div>

                {/* Dynamic Radar Points */}
                {radarPoints.map((point, index) => (
                  <div
                    key={index}
                    className="absolute group"
                    style={{
                      top: point.top,
                      left: point.left
                    }}
                  >
                    {/* Point */}
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${point.color} ${point.glow} animate-pulse`}
                    />

                    {/* Label */}
                    <div className="absolute top-4 left-4 sm:left-5 whitespace-nowrap pointer-events-none z-10">
                      <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-2 py-1">
                        <p className="text-[8px] sm:text-[9px] font-bold text-white tracking-wide max-w-[70px] sm:max-w-[100px] truncate">
                          {point.label}
                        </p>

                        <p className="text-[7px] text-white/40 uppercase tracking-widest">
                          {point.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                </div>

                {/* Bottom Legend */}
                <div className="absolute bottom-6 left-6 sm:bottom-14 sm:left-14 flex flex-wrap items-center gap-4 sm:gap-6 font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />

                    <span className="text-[7px] font-bold text-white/50 uppercase tracking-widest">
                      ALERTA
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-radar-success" />

                    <span className="text-[7px] font-bold text-white/50 uppercase tracking-widest">
                      ACTIVO
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />

                    <span className="text-[7px] font-bold text-white/50 uppercase tracking-widest">
                      PENDIENTE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}