"use client"

import { useState } from "react"
import { Plus, Search, Clock, Calendar, User, PawPrint } from "lucide-react"

interface Appointment {
  id: string
  pet: string
  owner: string
  date: string
  time: string
  type: string
  status: "scheduled" | "completed" | "cancelled"
  notes: string
}

const appointments: Appointment[] = [
  { id: "1", pet: "Max", owner: "Juan Perez", date: "22 May 2024", time: "09:00", type: "Consulta General", status: "scheduled", notes: "Revision rutinaria" },
  { id: "2", pet: "Luna", owner: "Maria Garcia", date: "22 May 2024", time: "10:30", type: "Vacunacion", status: "scheduled", notes: "Vacuna antirabica" },
  { id: "3", pet: "Rocky", owner: "Carlos Lopez", date: "22 May 2024", time: "11:45", type: "Cirugia Menor", status: "scheduled", notes: "Limpieza dental" },
  { id: "4", pet: "Bella", owner: "Ana Martinez", date: "21 May 2024", time: "14:00", type: "Revision", status: "completed", notes: "Control post-operatorio" },
  { id: "5", pet: "Coco", owner: "Pedro Sanchez", date: "21 May 2024", time: "15:30", type: "Desparasitacion", status: "completed", notes: "Desparasitacion interna" },
  { id: "6", pet: "Milo", owner: "Laura Diaz", date: "20 May 2024", time: "10:00", type: "Emergencia", status: "cancelled", notes: "Propietario cancelo" },
]

const statusStyles = {
  scheduled: { bg: "bg-[color-mix(in_srgb,var(--info)_20%,transparent)]", text: "text-[var(--info)]", label: "Programada" },
  completed: { bg: "bg-[color-mix(in_srgb,var(--success)_20%,transparent)]", text: "text-[var(--success)]", label: "Completada" },
  cancelled: { bg: "bg-[color-mix(in_srgb,var(--destructive)_20%,transparent)]", text: "text-[var(--destructive)]", label: "Cancelada" },
}

export function AppointmentsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.pet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.owner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || appointment.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Buscar cita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          >
            <option value="all">Todas las citas</option>
            <option value="scheduled">Programadas</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Nueva Cita
        </button>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[color-mix(in_srgb,var(--primary)_20%,transparent)] flex items-center justify-center">
                  <PawPrint className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--foreground)]">{appointment.pet}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">{appointment.type}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[appointment.status].bg} ${statusStyles[appointment.status].text}`}>
                {statusStyles[appointment.status].label}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                <User className="w-4 h-4" />
                <span>{appointment.owner}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                <Calendar className="w-4 h-4" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                <Clock className="w-4 h-4" />
                <span>{appointment.time}</span>
              </div>
            </div>

            <p className="mt-3 pt-3 border-t border-[var(--border)] text-sm text-[var(--muted-foreground)]">
              {appointment.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
