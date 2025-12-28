"use client"

import { OwnerDashboard } from "./owner-dashboard"
import { useState } from "react"
import { DashboardHeader } from "../../components/header"

export default function OwnerDashboardPage() {
  const [currentView, setCurrentView] = useState<"previous audit" | "latest audit">("latest audit")

  return (
    <div className="min-h-screen gradient-blue-bg flex flex-col">
      <DashboardHeader
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="flex-1 animate-fade-in">
        <div className="p-4 sm:p-6 md:p-8 pt-4">
          <OwnerDashboard />
        </div>
      </main>
    </div>
  );
}
