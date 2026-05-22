import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "VETVAULT - Sistema de Gestion Veterinaria",
  description: "Sistema profesional para clinicas veterinarias. Administra pacientes, citas, historial medico y mas.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="bg-background">
      <body className="antialiased">{children}</body>
    </html>
  )
}
