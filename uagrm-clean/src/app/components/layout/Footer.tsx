export default function Footer() {
  return (
    <footer className="bg-white px-6 py-20 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-4 gap-16 border-b border-slate-100 pb-20 mb-12">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-primary/10">
                <span className="material-symbols-outlined text-3xl">account_balance</span>
              </div>
              <div>
                <div className="font-display font-black text-primary text-2xl tracking-tighter">UAGRM</div>
                <div className="text-[10px] font-black text-secondary uppercase tracking-[0.4em]">División Sostenible</div>
              </div>
            </div>
            <p className="text-slate-400 text-lg max-w-sm font-light leading-relaxed">
              Liderando la transformación digital para una gestión de recursos eficiente y centrada en el bienestar estudiantil.
            </p>
          </div>
          <div className="space-y-6">
            <h6 className="font-black text-primary uppercase text-xs tracking-widest">Plataforma</h6>
            <nav className="flex flex-col gap-4 text-slate-500 font-semibold text-sm">
              <a href="#" className="hover:text-primary transition-colors">Impacto Global</a>
              <a href="#" className="hover:text-primary transition-colors">Mapa de Calor</a>
              <a href="#" className="hover:text-primary transition-colors">Protocolos</a>
            </nav>
          </div>
          <div className="space-y-6">
            <h6 className="font-black text-primary uppercase text-xs tracking-widest">Soporte</h6>
            <nav className="flex flex-col gap-4 text-slate-500 font-semibold text-sm">
              <a href="#" className="hover:text-primary transition-colors">Centro de Ayuda</a>
              <a href="#" className="hover:text-primary transition-colors">Privacidad de Datos</a>
              <a href="#" className="hover:text-primary transition-colors">Contacto Directo</a>
            </nav>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-bold text-slate-400 tracking-wider uppercase">
          <p>© 2025 CAMPUS LIMPIO UAGRM. TODOS LOS DERECHOS RESERVADOS.</p>
          <div className="flex gap-6">
            <a href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-primary  transition-all">
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
            <a href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-primary  transition-all">
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}