export default function ProblemSection() {
  return (
    <section className="py-40 px-6 relative overflow-hidden bg-slate-100/30">
      <div className="max-w-container-max mx-auto relative z-10">

        <div className="text-center mb-24 reveal active">
          <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">
            Análisis del Contexto
          </span>

          <h3 className="font-display text-4xl md:text-5xl font-black text-primary tracking-tight">
            Un campus sucio afecta a toda la comunidad.
          </h3>

          <div className="w-24 h-1.5 bg-gradient-uagrm mx-auto mt-8 rounded-full"></div>

          <p className="text-on-surface-variant text-xl mt-8 font-light max-w-2xl mx-auto">
            La falta de herramientas de comunicación hace que los problemas
            de limpieza persistan más de lo necesario.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white border border-slate-100 p-10 rounded-3xl reveal card-premium shadow-sm hover:shadow-xl transition-all border-l-4 border-l-secondary active">
            <div className="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-secondary !text-3xl">
                crisis_alert
              </span>
            </div>

            <h4 className="font-display text-xl font-black text-primary mb-4">
              Puntos de Riesgo
            </h4>

            <p className="text-on-surface-variant leading-relaxed text-sm font-medium">
              La acumulación de residuos compromete la salud y seguridad de miles
              de estudiantes diariamente.
            </p>
          </div>

          <div
            className="bg-white border border-slate-100 p-10 rounded-3xl reveal card-premium shadow-sm hover:shadow-xl transition-all border-l-4 border-l-primary active"
            style={{ transitionDelay: "150ms" }}
          >
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-primary !text-3xl">
                history_toggle_off
              </span>
            </div>

            <h4 className="font-display text-xl font-black text-primary mb-4">
              Sistemas Obsoletos
            </h4>

            <p className="text-on-surface-variant leading-relaxed text-sm font-medium">
              Los métodos tradicionales son lentos. El campus digital exige
              inmediatez y transparencia absoluta.
            </p>
          </div>

          <div
            className="bg-white border border-slate-100 p-10 rounded-3xl reveal card-premium shadow-sm hover:shadow-xl transition-all border-l-4 border-l-primary active"
            style={{ transitionDelay: "300ms" }}
          >
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-primary !text-3xl">
                hub
              </span>
            </div>

            <h4 className="font-display text-xl font-black text-primary mb-4">
              Falta de Conexión
            </h4>

            <p className="text-on-surface-variant leading-relaxed text-sm font-medium">
              Somos el puente tecnológico entre el ciudadano consciente y el
              brazo operativo de la universidad.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}