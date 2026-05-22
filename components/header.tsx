"use client"

import type { ActiveSection } from "@/app/page"
import { Bell, Search, Menu, User } from "lucide-react"

interface HeaderProps {
  activeSection: ActiveSection
  toggleSidebar: () => void
}

const sectionTitles: Record<ActiveSection, string> = {
  dashboard: "Dashboard",
  patients: "Pacientes",
  appointments: "Citas",
  clients: "Clientes",
  inventory: "Inventario",
  settings: "Configuracion",
}

export function Header({ activeSection, toggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--card)]">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-all md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold text-[var(--foreground)]">
          {sectionTitles[activeSection]}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--secondary)] border border-[var(--border)]">
          <Search className="w-4 h-4 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none w-48"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--primary)] rounded-full"></span>
        </button>

        {/* User */}
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--secondary)] transition-all">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center">
            <User className="w-4 h-4 text-[var(--primary-foreground)]" />
          </div>
          <span className="hidden md:block text-sm font-medium text-[var(--foreground)]">Dr. Martinez</span>
        </button>
      </div>
    </header>
  )
}
