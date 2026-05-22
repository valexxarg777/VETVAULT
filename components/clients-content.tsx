"use client"

import { useState } from "react"
import { Plus, Search, MoreVertical, Mail, Phone, MapPin } from "lucide-react"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  pets: number
  totalVisits: number
  lastVisit: string
}

const clients: Client[] = [
  { id: "1", name: "Juan Perez", email: "juan.perez@email.com", phone: "+52 555 123 4567", address: "Calle Principal 123, CDMX", pets: 2, totalVisits: 15, lastVisit: "15 May 2024" },
  { id: "2", name: "Maria Garcia", email: "maria.garcia@email.com", phone: "+52 555 234 5678", address: "Av. Reforma 456, CDMX", pets: 1, totalVisits: 8, lastVisit: "12 May 2024" },
  { id: "3", name: "Carlos Lopez", email: "carlos.lopez@email.com", phone: "+52 555 345 6789", address: "Blvd. Centro 789, CDMX", pets: 3, totalVisits: 22, lastVisit: "10 May 2024" },
  { id: "4", name: "Ana Martinez", email: "ana.martinez@email.com", phone: "+52 555 456 7890", address: "Calle Norte 321, CDMX", pets: 1, totalVisits: 5, lastVisit: "08 May 2024" },
  { id: "5", name: "Pedro Sanchez", email: "pedro.sanchez@email.com", phone: "+52 555 567 8901", address: "Av. Sur 654, CDMX", pets: 2, totalVisits: 12, lastVisit: "05 May 2024" },
  { id: "6", name: "Laura Diaz", email: "laura.diaz@email.com", phone: "+52 555 678 9012", address: "Calle Este 987, CDMX", pets: 1, totalVisits: 3, lastVisit: "02 May 2024" },
]

export function ClientsContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full sm:w-80 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Nuevo Cliente
        </button>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] font-semibold text-lg">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-[var(--foreground)]">{client.name}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">{client.pets} mascota{client.pets !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button className="p-1 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-all">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{client.address}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between text-sm">
              <div>
                <p className="text-[var(--muted-foreground)]">Visitas totales</p>
                <p className="font-semibold text-[var(--foreground)]">{client.totalVisits}</p>
              </div>
              <div className="text-right">
                <p className="text-[var(--muted-foreground)]">Ultima visita</p>
                <p className="font-semibold text-[var(--foreground)]">{client.lastVisit}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
