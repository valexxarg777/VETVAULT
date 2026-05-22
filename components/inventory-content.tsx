"use client"

import { useState } from "react"
import { Plus, Search, Package, AlertTriangle, MoreVertical } from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  category: string
  stock: number
  minStock: number
  price: string
  unit: string
  lastUpdated: string
}

const inventory: InventoryItem[] = [
  { id: "1", name: "Amoxicilina 500mg", category: "Medicamentos", stock: 45, minStock: 20, price: "$150.00", unit: "caja", lastUpdated: "20 May 2024" },
  { id: "2", name: "Vacuna Antirabica", category: "Vacunas", stock: 12, minStock: 15, price: "$280.00", unit: "dosis", lastUpdated: "18 May 2024" },
  { id: "3", name: "Jeringas 5ml", category: "Insumos", stock: 200, minStock: 50, price: "$5.00", unit: "pieza", lastUpdated: "15 May 2024" },
  { id: "4", name: "Vendaje Elastico", category: "Insumos", stock: 35, minStock: 20, price: "$45.00", unit: "rollo", lastUpdated: "14 May 2024" },
  { id: "5", name: "Desparasitante Oral", category: "Medicamentos", stock: 8, minStock: 15, price: "$120.00", unit: "frasco", lastUpdated: "12 May 2024" },
  { id: "6", name: "Alimento Premium Perros", category: "Alimentos", stock: 25, minStock: 10, price: "$850.00", unit: "bulto", lastUpdated: "10 May 2024" },
  { id: "7", name: "Collar Isabelino", category: "Accesorios", stock: 18, minStock: 10, price: "$95.00", unit: "pieza", lastUpdated: "08 May 2024" },
  { id: "8", name: "Suero Fisiologico 500ml", category: "Insumos", stock: 30, minStock: 20, price: "$65.00", unit: "bolsa", lastUpdated: "05 May 2024" },
]

const categories = ["Todos", "Medicamentos", "Vacunas", "Insumos", "Alimentos", "Accesorios"]

export function InventoryContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const lowStockItems = inventory.filter(item => item.stock < item.minStock).length

  return (
    <div className="space-y-6">
      {/* Low Stock Alert */}
      {lowStockItems > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] border border-[var(--warning)]">
          <AlertTriangle className="w-5 h-5 text-[var(--warning)] flex-shrink-0" />
          <p className="text-sm text-[var(--foreground)]">
            <span className="font-semibold">{lowStockItems} producto{lowStockItems !== 1 ? 's' : ''}</span> con stock bajo. Considera reabastecer pronto.
          </p>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Agregar Producto
        </button>
      </div>

      {/* Inventory Table */}
      <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Producto</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Categoria</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Stock</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Precio</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Actualizado</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--secondary)] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[color-mix(in_srgb,var(--accent)_20%,transparent)] flex items-center justify-center">
                        <Package className="w-5 h-5 text-[var(--accent)]" />
                      </div>
                      <span className="font-medium text-[var(--foreground)]">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--secondary)] text-[var(--muted-foreground)]">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {item.stock < item.minStock && (
                        <AlertTriangle className="w-4 h-4 text-[var(--warning)]" />
                      )}
                      <span className={`font-medium ${item.stock < item.minStock ? 'text-[var(--warning)]' : 'text-[var(--foreground)]'}`}>
                        {item.stock} {item.unit}{item.stock !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[var(--foreground)]">{item.price}</td>
                  <td className="px-5 py-4 text-[var(--muted-foreground)]">{item.lastUpdated}</td>
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
