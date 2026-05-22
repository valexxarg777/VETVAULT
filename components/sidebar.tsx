"use client"

import { cn } from "@/lib/utils"
import type { ActiveSection } from "@/app/page"
import {
  LayoutDashboard,
  PawPrint,
  Calendar,
  Users,
  Package,
  Settings,
  ChevronLeft,
  Shield,
} from "lucide-react"

interface SidebarProps {
  activeSection: ActiveSection
  setActiveSection: (section: ActiveSection) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const menuItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "patients" as const, label: "Pacientes", icon: PawPrint },
  { id: "appointments" as const, label: "Citas", icon: Calendar },
  { id: "clients" as const, label: "Clientes", icon: Users },
  { id: "inventory" as const, label: "Inventario", icon: Package },
  { id: "settings" as const, label: "Configuracion", icon: Settings },
]

export function Sidebar({ activeSection, setActiveSection, isOpen, setIsOpen }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-[var(--border)] bg-[var(--card)] transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[var(--border)]">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--primary)]">
          <Shield className="w-6 h-6 text-[var(--primary-foreground)]" />
        </div>
        {isOpen && (
          <div className="flex flex-col">
            <span className="font-bold text-lg text-[var(--foreground)]">VETVAULT</span>
            <span className="text-xs text-[var(--muted-foreground)]">Sistema Veterinario</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all",
                  "hover:bg-[var(--secondary)]",
                  activeSection === item.id
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="p-2 border-t border-[var(--border)]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-full py-2 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-all"
        >
          <ChevronLeft className={cn("w-5 h-5 transition-transform", !isOpen && "rotate-180")} />
        </button>
      </div>
    </aside>
  )
}
