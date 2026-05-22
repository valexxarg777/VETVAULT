"use client"

import { useState } from "react"
import { Plus, Search, MoreVertical, PawPrint } from "lucide-react"

interface Patient {
  id: string
  name: string
  species: string
  breed: string
  age: string
  owner: string
  lastVisit: string
  status: "healthy" | "treatment" | "critical"
}

const patients: Patient[] = [
  { id: "1", name: "Max", species: "Perro", breed: "Golden Retriever", age: "5 anos", owner: "Juan Perez", lastVisit: "15 May 2024", status: "healthy" },
  { id: "2", name: "Luna", species: "Gato", breed: "Siames", age: "3 anos", owner: "Maria Garcia", lastVisit: "12 May 2024", status: "treatment" },
  { id: "3", name: "Rocky", species: "Perro", breed: "Bulldog Frances", age: "2 anos", owner: "Carlos Lopez", lastVisit: "10 May 2024", status: "healthy" },
  { id: "4", name: "Bella", species: "Gato", breed: "Persa", age: "4 anos", owner: "Ana Martinez", lastVisit: "08 May 2024", status: "critical" },
  { id: "5", name: "Coco", species: "Perro", breed: "Chihuahua", age: "6 anos", owner: "Pedro Sanchez", lastVisit: "05 May 2024", status: "healthy" },
  { id: "6", name: "Milo", species: "Perro", breed: "Labrador", age: "1 ano", owner: "Laura Diaz", lastVisit: "02 May 2024", status: "treatment" },
]

const statusStyles = {
  healthy: { bg: "bg-[color-mix(in_srgb,var(--success)_20%,transparent)]", text: "text-[var(--success)]", label: "Saludable" },
  treatment: { bg: "bg-[color-mix(in_srgb,var(--warning)_20%,transparent)]", text: "text-[var(--warning)]", label: "En Tratamiento" },
  critical: { bg: "bg-[color-mix(in_srgb,var(--destructive)_20%,transparent)]", text: "text-[var(--destructive)]", label: "Critico" },
}

export function PatientsContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.breed.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full sm:w-80 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Nuevo Paciente
        </button>
      </div>

      {/* Patients Table */}
      <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Paciente</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Especie / Raza</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Edad</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Propietario</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Ultima Visita</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Estado</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-[var(--secondary)] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[color-mix(in_srgb,var(--primary)_20%,transparent)] flex items-center justify-center">
                        <PawPrint className="w-5 h-5 text-[var(--primary)]" />
                      </div>
                      <span className="font-medium text-[var(--foreground)]">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-[var(--foreground)]">{patient.species}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">{patient.breed}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[var(--foreground)]">{patient.age}</td>
                  <td className="px-5 py-4 text-[var(--foreground)]">{patient.owner}</td>
                  <td className="px-5 py-4 text-[var(--muted-foreground)]">{patient.lastVisit}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[patient.status].bg} ${statusStyles[patient.status].text}`}>
                      {statusStyles[patient.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="p-1 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
