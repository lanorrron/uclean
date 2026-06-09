export default function ImpactDashboard() {
  return (
    <section className="py-32 bg-gradient-to-b from-radar-bg to-[#0d1b3e] relative overflow-hidden border border-t-3">

      <div className="max-w-container-max mx-auto px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 reveal active">

          {/* Card 1 */}
          <div className="p-8 md:p-12 rounded-[3rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 text-center hover:bg-white/[0.06] transition-all group shadow-2xl">

            <div className="text-4xl md:text-6xl font-black mb-4 text-white tracking-tighter group-hover:scale-105 transition-transform">
              1,250+
            </div>

            <div className="text-[10px] md:text-xs font-bold text-white/50 tracking-[0.25em] uppercase">
              Misiones Completadas
            </div>

          </div>

          {/* Card 2 */}
          <div className="p-8 md:p-12 rounded-[3rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 text-center hover:bg-white/[0.06] transition-all group shadow-2xl">

            <div className="text-4xl md:text-6xl font-black mb-4 text-secondary tracking-tighter group-hover:scale-105 transition-transform">
              98%
            </div>

            <div className="text-[10px] md:text-xs font-bold text-white/50 tracking-[0.25em] uppercase">
              Tasa de Eficiencia
            </div>

          </div>

          {/* Card 3 */}
          <div className="p-8 md:p-12 rounded-[3rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 text-center hover:bg-white/[0.06] transition-all group shadow-2xl">

            <div className="text-4xl md:text-6xl font-black mb-4 text-white tracking-tighter group-hover:scale-105 transition-transform">
              1.8h
            </div>

            <div className="text-[10px] md:text-xs font-bold text-white/50 tracking-[0.25em] uppercase">
              Tiempo Promedio
            </div>

          </div>

          {/* Card 4 */}
          <div className="p-8 md:p-12 rounded-[3rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 text-center hover:bg-white/[0.06] transition-all group shadow-2xl">

            <div className="text-4xl md:text-6xl font-black mb-4 text-secondary tracking-tighter group-hover:scale-105 transition-transform">
              15k
            </div>

            <div className="text-[10px] md:text-xs font-bold text-white/50 tracking-[0.25em] uppercase">
              Líderes de Cambio
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}