"use client"

import { useState } from "react"
import { Building2, User, Bell, Shield, Database, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const settingsSections = [
  {
    id: "clinic",
    title: "Informacion de la Clinica",
    icon: Building2,
    fields: [
      { label: "Nombre de la Clinica", value: "VetVault Clinica Veterinaria", type: "text" },
      { label: "Direccion", value: "Av. Principal 123, Col. Centro, CDMX", type: "text" },
      { label: "Telefono", value: "+52 555 123 4567", type: "text" },
      { label: "Email", value: "contacto@vetvault.com", type: "email" },
    ]
  },
  {
    id: "user",
    title: "Perfil de Usuario",
    icon: User,
    fields: [
      { label: "Nombre Completo", value: "Dr. Roberto Martinez", type: "text" },
      { label: "Email", value: "dr.martinez@vetvault.com", type: "email" },
      { label: "Especialidad", value: "Medicina General", type: "text" },
      { label: "Cedula Profesional", value: "12345678", type: "text" },
    ]
  },
]

export function SettingsContent() {
  const [showDbModal, setShowDbModal] = useState(false)
  const [dbConfig, setDbConfig] = useState({
    host: "",
    database: "",
    user: "",
    password: "",
  })
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleTestConnection = async () => {
    setConnectionStatus("testing")
    setStatusMessage("Probando conexion...")
    
    // Simular prueba de conexion
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (dbConfig.host && dbConfig.database && dbConfig.user && dbConfig.password) {
      setConnectionStatus("success")
      setStatusMessage("Conexion exitosa! La base de datos esta accesible.")
    } else {
      setConnectionStatus("error")
      setStatusMessage("Error: Por favor completa todos los campos de configuracion.")
    }
  }

  const handleSaveConnection = () => {
    // Aqui se guardaria la configuracion
    alert("Para guardar la configuracion de SQL Server, agrega las variables de entorno en v0:\n\n1. Haz clic en el icono de configuracion (engranaje) arriba a la derecha\n2. Selecciona 'Vars'\n3. Agrega:\n   - MSSQL_HOST: " + dbConfig.host + "\n   - MSSQL_DATABASE: " + dbConfig.database + "\n   - MSSQL_USER: " + dbConfig.user + "\n   - MSSQL_PASSWORD: [tu contrasena]")
    setShowDbModal(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Settings Sections */}
      {settingsSections.map((section) => (
        <div
          key={section.id}
          className="rounded-xl bg-[var(--card)] border border-[var(--border)] overflow-hidden"
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
            <div className="p-2 rounded-lg bg-[color-mix(in_srgb,var(--primary)_20%,transparent)]">
              <section.icon className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <h2 className="font-semibold text-[var(--foreground)]">{section.title}</h2>
          </div>
          <div className="p-5 space-y-4">
            {section.fields.map((field, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <label className="text-sm font-medium text-[var(--muted-foreground)]">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="col-span-2 px-4 py-2 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Notifications Settings */}
      <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
          <div className="p-2 rounded-lg bg-[color-mix(in_srgb,var(--primary)_20%,transparent)]">
            <Bell className="w-5 h-5 text-[var(--primary)]" />
          </div>
          <h2 className="font-semibold text-[var(--foreground)]">Notificaciones</h2>
        </div>
        <div className="p-5 space-y-4">
          {[
            { label: "Recordatorios de citas", description: "Recibir alertas antes de las citas programadas" },
            { label: "Stock bajo", description: "Notificar cuando el inventario este por debajo del minimo" },
            { label: "Vacunas pendientes", description: "Alertas de vacunas proximas a vencer" },
            { label: "Resumen diario", description: "Recibir un resumen de actividades al final del dia" },
          ].map((notification, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--foreground)]">{notification.label}</p>
                <p className="text-sm text-[var(--muted-foreground)]">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-[var(--secondary)] peer-focus:ring-2 peer-focus:ring-[var(--primary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[color-mix(in_srgb,var(--info)_20%,transparent)]">
              <Database className="w-5 h-5 text-[var(--info)]" />
            </div>
            <h3 className="font-semibold text-[var(--foreground)]">Base de Datos</h3>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">
            Gestiona la conexion a tu base de datos SQL Server.
          </p>
          <button 
            onClick={() => setShowDbModal(true)}
            className="w-full px-4 py-2 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)] transition-colors">
            Configurar Conexion
          </button>
        </div>

        <div className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[color-mix(in_srgb,var(--warning)_20%,transparent)]">
              <Shield className="w-5 h-5 text-[var(--warning)]" />
            </div>
            <h3 className="font-semibold text-[var(--foreground)]">Seguridad</h3>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">
            Configura la seguridad y permisos de usuarios.
          </p>
          <button className="w-full px-4 py-2 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)] transition-colors">
            Gestionar Permisos
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:opacity-90 transition-opacity">
          Guardar Cambios
        </button>
      </div>

      {/* Database Connection Modal */}
      {showDbModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[color-mix(in_srgb,var(--info)_20%,transparent)]">
                  <Database className="w-5 h-5 text-[var(--info)]" />
                </div>
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Configurar SQL Server</h2>
              </div>
              <button 
                onClick={() => {
                  setShowDbModal(false)
                  setConnectionStatus("idle")
                  setStatusMessage("")
                }}
                className="p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
              >
                <X className="w-5 h-5 text-[var(--muted-foreground)]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
                  Servidor / Host
                </label>
                <input
                  type="text"
                  placeholder="localhost o tu-servidor.database.windows.net"
                  value={dbConfig.host}
                  onChange={(e) => setDbConfig({...dbConfig, host: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
                  Nombre de la Base de Datos
                </label>
                <input
                  type="text"
                  placeholder="vetvault_db"
                  value={dbConfig.database}
                  onChange={(e) => setDbConfig({...dbConfig, database: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
                  Usuario
                </label>
                <input
                  type="text"
                  placeholder="sa o tu_usuario"
                  value={dbConfig.user}
                  onChange={(e) => setDbConfig({...dbConfig, user: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
                  Contrasena
                </label>
                <input
                  type="password"
                  placeholder="Tu contrasena de SQL Server"
                  value={dbConfig.password}
                  onChange={(e) => setDbConfig({...dbConfig, password: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>

              {/* Connection Status */}
              {connectionStatus !== "idle" && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  connectionStatus === "testing" ? "bg-[var(--info)]/10 text-[var(--info)]" :
                  connectionStatus === "success" ? "bg-[var(--primary)]/10 text-[var(--primary)]" :
                  "bg-[var(--destructive)]/10 text-[var(--destructive)]"
                }`}>
                  {connectionStatus === "testing" && <Loader2 className="w-4 h-4 animate-spin" />}
                  {connectionStatus === "success" && <CheckCircle className="w-4 h-4" />}
                  {connectionStatus === "error" && <AlertCircle className="w-4 h-4" />}
                  <span className="text-sm">{statusMessage}</span>
                </div>
              )}

              <div className="p-3 rounded-lg bg-[var(--warning)]/10 border border-[var(--warning)]/20">
                <p className="text-sm text-[var(--warning)]">
                  <strong>Nota:</strong> Si tu SQL Server esta en localhost, deberas exponerlo a internet o usar una base de datos en la nube para que funcione en produccion.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-[var(--border)] bg-[var(--secondary)]/30">
              <button
                onClick={handleTestConnection}
                disabled={connectionStatus === "testing"}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)] transition-colors disabled:opacity-50"
              >
                {connectionStatus === "testing" ? "Probando..." : "Probar Conexion"}
              </button>
              <button
                onClick={handleSaveConnection}
                disabled={connectionStatus !== "success"}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
