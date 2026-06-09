import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Campus Limpio UAGRM - Sostenibilidad Universitaria Premium',
  description: 'Plataforma tecnológica para el cuidado y limpieza del campus universitario. Reporta incidentes en tiempo real.',
  keywords: 'UAGRM, campus limpio, sostenibilidad, reporte de limpieza',
  authors: [{ name: 'Universidad Gabriel René Moreno' }],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  openGraph: {
    title: 'Campus Limpio UAGRM',
    description: 'Juntos construimos un campus más limpio',
    type: 'website',
    locale: 'es_BO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700;800;900&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0,1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className=''>{children}
                <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '12px',
              background: '#fff',
              color: '#111827',
            },
          }}
        />
      </body>
    </html>
  )
}