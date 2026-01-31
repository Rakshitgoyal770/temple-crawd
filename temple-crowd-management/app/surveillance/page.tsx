import { DashboardLayout } from "@/components/dashboard-layout"
import { SurveillanceDashboard } from "@/components/surveillance-dashboard"

export default function SurveillancePage() {
  return (
    <DashboardLayout>
      <SurveillanceDashboard />
    </DashboardLayout>
  )
}
