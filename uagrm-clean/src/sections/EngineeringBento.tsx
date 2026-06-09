export default function EngineeringBento() {
  return (
    <section className="py-40 px-6 max-w-container-max mx-auto">

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 reveal active">

        <div className="max-w-2xl">
          <h3 className="font-display text-4xl md:text-5xl font-black text-primary tracking-tight">
            Ingeniería para la Limpieza
          </h3>

          <p className="text-on-surface-variant text-xl mt-6 font-light">
            Una interfaz minimalista que esconde un potente motor de gestión
            logística.
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 reveal active">

        {/* Bento 1 */}
        <div className="md:col-span-7 bg-primary rounded-5xl p-12 text-white relative overflow-hidden group min-h-[420px] flex flex-col justify-end shadow-2xl shadow-primary/20">

          <div className="absolute -top-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
            <span className="material-symbols-outlined !text-[320px]">
              photo_camera
            </span>
          </div>

          <div className="relative z-10 space-y-6">

            <div className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center font-display font-black text-xl text-white shadow-xl">
              01
            </div>

            <h5 className="font-display font-black tracking-tight text-2xl">
              Captura de Alta Resolución
            </h5>

            <p className="text-white/60 text-lg font-light max-w-md leading-relaxed">
              Documentación visual precisa que permite evaluar recursos antes
              del despliegue.
            </p>

          </div>
        </div>

        {/* Bento 2 */}
        <div className="md:col-span-5 bg-gradient-premium rounded-5xl p-12 text-white relative overflow-hidden group min-h-[420px] flex flex-col justify-end shadow-2xl shadow-primary/20">

          <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
            <span className="material-symbols-outlined !text-[320px]">
              location_on
            </span>
          </div>

          <div className="relative z-10 space-y-6">

            <div className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center font-display font-black text-xl text-white shadow-xl">
              02
            </div>

            <h5 className="font-display font-black tracking-tight text-2xl">
              Geocerca Activa
            </h5>

            <p className="text-white/60 text-lg font-light leading-relaxed">
              Localización GPS quirúrgica para intervenciones en los 52 bloques
              del campus.
            </p>

          </div>
        </div>

        {/* Bento 3 */}
        <div className="md:col-span-5 premium-engineering-card rounded-5xl p-12 group min-h-[420px] flex flex-col justify-end">

          <div className="absolute top-12 right-12 transition-all duration-700">

            <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined !text-[56px] group-hover:scale-110 transition-transform">
                neurology
              </span>
            </div>

          </div>

          <div className="relative z-10 space-y-6">

            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-display font-black text-xl shadow-lg shadow-primary/20">
              03
            </div>

            <h5 className="font-display font-black text-primary tracking-tight text-2xl">
              Data Semántica
            </h5>

            <p className="text-on-surface-variant text-lg font-light leading-relaxed">
              Categorización inteligente mediante algoritmos para priorizar
              emergencias sanitarias de forma autónoma.
            </p>

          </div>
        </div>

        {/* Bento 4 */}
        <div className="md:col-span-7 premium-engineering-card rounded-5xl p-12 group min-h-[420px] flex flex-col justify-end">

          <div className="absolute top-12 right-12 transition-all duration-700">

            <div className="relative w-24 h-24 flex items-center justify-center rounded-3xl bg-secondary/10 text-secondary">
              <span className="material-symbols-outlined !text-[72px] group-hover:rotate-6 transition-transform">
                dynamic_feed
              </span>
            </div>

          </div>

          <div className="relative z-10 space-y-6">

            <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-white font-display font-black text-xl shadow-lg shadow-secondary/20">
              04
            </div>

            <h5 className="font-display font-black text-primary tracking-tight text-2xl">
              Despliegue Táctico
            </h5>

            <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-md">
              Sincronización en milisegundos con terminales móviles de cuadrillas
              operativas para una respuesta inmediata coordinada.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}