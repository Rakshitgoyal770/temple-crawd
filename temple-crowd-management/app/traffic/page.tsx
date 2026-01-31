import { DashboardLayout } from "@/components/dashboard-layout"
import { TrafficManagementDashboard } from "@/components/traffic-management-dashboard"

export default function TrafficPage() {
  return (
    <DashboardLayout>
      <TrafficManagementDashboard />
    </DashboardLayout>
  )
}
