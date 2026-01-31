import { DashboardLayout } from "@/components/dashboard-layout"
import { CrowdPredictionDashboard } from "@/components/crowd-prediction-dashboard"

export default function CrowdPredictionPage() {
  return (
    <DashboardLayout>
      <CrowdPredictionDashboard />
    </DashboardLayout>
  )
}
