'use client'

import { useEffect } from 'react'
import Navbar from '@/app/components/layout/Navbar'
import Footer from '@/app/components/layout/Footer'
import Hero from '@/sections/Hero'
import RadarDashboard from '@/sections/RadarDashboard'
import ProblemSection from '@/sections/ProblemSection'
import BenefitsSection from '@/sections/BenefitsSection'
import EngineeringBento from '@/sections/EngineeringBento'
import FinalCTA from '@/sections/FinalCTA'
import HowItWorks from '@/sections/HowItWorks'
import ImpactDashboard from '@/sections/impactDashboard'
import SolutionSection from '@/sections/SolutionSection'
import ReportForm from '@/modules/report/components/ReportForm'


export default function Home() {
  useEffect(() => {
    // Inicializar animaciones de scroll reveal
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="relative overflow-hidden bg-mesh pt-32">
      <Navbar />
      <Hero />
      <RadarDashboard />
      <ProblemSection />
      <EngineeringBento />
      <HowItWorks />
      <ImpactDashboard />
      <ReportForm />
      <FinalCTA />
      <Footer />
    </main>
  )
}