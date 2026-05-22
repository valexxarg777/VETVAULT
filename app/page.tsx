"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { DashboardContent } from "@/components/dashboard-content"
import { PatientsContent } from "@/components/patients-content"
import { AppointmentsContent } from "@/components/appointments-content"
import { ClientsContent } from "@/components/clients-content"
import { InventoryContent } from "@/components/inventory-content"
import { SettingsContent } from "@/components/settings-content"

export type ActiveSection = "dashboard" | "patients" | "appointments" | "clients" | "inventory" | "settings"

export default function Home() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />
      case "patients":
        return <PatientsContent />
      case "appointments":
        return <AppointmentsContent />
      case "clients":
        return <ClientsContent />
      case "inventory":
        return <InventoryContent />
      case "settings":
        return <SettingsContent />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeSection={activeSection}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
