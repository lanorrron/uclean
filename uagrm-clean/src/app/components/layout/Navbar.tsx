'use client'

import { useState, useEffect } from 'react'
import Button from '../ui/Button'


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`fixed top-0 w-full z-50 px-6 pt-6 transition-all duration-300 ${scrolled ? 'pt-3' : ''}`}>
      <nav className="max-w-[1280px] mx-auto glass rounded-3xl h-20 px-8 flex items-center justify-between shadow-xl shadow-primary/5">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[28px] fill-icon">eco</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-display font-black text-primary tracking-tighter text-xl leading-none">
              Campus Limpio
            </h1>
            <span className="text-secondary font-bold text-[10px] tracking-[0.3em] uppercase">
              UAGRM Sostenible
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="primary" size="md" onClick={scrollToForm} icon="add_circle">
            Reportar Incidente
          </Button>
        </div>
      </nav>
    </header>
  )
}