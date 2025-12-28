"use client"

import { EmployeeDashboard } from "./employee-dashboard"
import { useEffect, useState } from "react"
import { DashboardHeader } from "../../components/header"
import { DeveloperCredit } from '../../components/devcredit';

export default function EmployeeDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentView, setCurrentView] = useState<"previous audit" | "latest audit">("latest audit")


  return (
    <div className="min-h-screen bg-black/5 flex flex-col">
      <DashboardHeader
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="flex-1 pt-16 md:pt-0">
        <div className="p-4 sm:p-6 md:p-8">
          <EmployeeDashboard
            currentView={currentView}
            onViewChange={setCurrentView}
            onUpload={() => setShowUploadModal(true)}
            onExport={() => console.log('Export data')}
          />
        </div>
      </main>
      {/* Developer Credit */}
      <DeveloperCredit />
    </div>
  );
}
