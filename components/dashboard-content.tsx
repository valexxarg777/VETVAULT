"use client"

import { 
  PawPrint, 
  Calendar, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2
} from "lucide-react"

const stats = [
  { 
    label: "Pacientes Totales", 
    value: "1,234", 
    change: "+12%", 
    trend: "up",
    icon: PawPrint,
    color: "var(--primary)"
  },
  { 
    label: "Citas Hoy", 
    value: "18", 
    change: "+3", 
    trend: "up",
    icon: Calendar,
    color: "var(--info)"
  },
  { 
    label: "Clientes Activos", 
    value: "856", 
    change: "+8%", 
    trend: "up",
    icon: Users,
    color: "var(--accent)"
  },
  { 
    label: "Ingresos del Mes", 
    value: "$45,230", 
    change: "+15%", 
    trend: "up",
    icon: DollarSign,
    color: "var(--success)"
  },
]

const recentAppointments = [
  { pet: "Max", owner: "Juan Perez", time: "09:00", type: "Consulta General", status: "completed" },
  { pet: "Luna", owner: "Maria Garcia", time: "10:30", type: "Vacunacion", status: "completed" },
  { pet: "Rocky", owner: "Carlos Lopez", time: "11:45", type: "Cirugia Menor", status: "in-progress" },
  { pet: "Bella", owner: "Ana Martinez", time: "14:00", type: "Revision", status: "pending" },
  { pet: "Coco", owner: "Pedro Sanchez", time: "15:30", type: "Desparasitacion", status: "pending" },
]

const alerts = [
  { message: "Vacuna pendiente para Max (Rabia)", type: "warning" },
  { message: "Revision programada para Luna manana", type: "info" },
  { message: "Stock bajo: Amoxicilina", type: "warning" },
]

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]"
          >
            <div className="flex items-center justify-between mb-3">
              <div 
                className="p-2 rounded-lg" 
                style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 20%, transparent)` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-[var(--success)]">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
            <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 rounded-xl bg-[var(--card)] border border-[var(--border)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border)]">
            <h2 className="font-semibold text-[var(--foreground)]">Citas de Hoy</h2>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {recentAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between px-5 py-3 hover:bg-[var(--secondary)] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <Clock className="w-4 h-4" />
                    {appointment.time}
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">{appointment.pet}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{appointment.owner}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[var(--muted-foreground)]">{appointment.type}</span>
                  <span 
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'completed' 
                        ? 'bg-[color-mix(in_srgb,var(--success)_20%,transparent)] text-[var(--success)]'
                        : appointment.status === 'in-progress'
                        ? 'bg-[color-mix(in_srgb,var(--info)_20%,transparent)] text-[var(--info)]'
                        : 'bg-[color-mix(in_srgb,var(--warning)_20%,transparent)] text-[var(--warning)]'
                    }`}
                  >
                    {appointment.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                    {appointment.status === 'in-progress' && <Clock className="w-3 h-3" />}
                    {appointment.status === 'pending' && <Clock className="w-3 h-3" />}
                    {appointment.status === 'completed' ? 'Completada' : appointment.status === 'in-progress' ? 'En Progreso' : 'Pendiente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border)]">
            <h2 className="font-semibold text-[var(--foreground)]">Alertas y Recordatorios</h2>
          </div>
          <div className="p-4 space-y-3">
            {alerts.map((alert, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  alert.type === 'warning' 
                    ? 'bg-[color-mix(in_srgb,var(--warning)_10%,transparent)]' 
                    : 'bg-[color-mix(in_srgb,var(--info)_10%,transparent)]'
                }`}
              >
                <AlertCircle 
                  className={`w-5 h-5 flex-shrink-0 ${
                    alert.type === 'warning' ? 'text-[var(--warning)]' : 'text-[var(--info)]'
                  }`} 
                />
                <p className="text-sm text-[var(--foreground)]">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
