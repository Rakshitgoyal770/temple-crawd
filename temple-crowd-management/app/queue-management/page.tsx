import { DashboardLayout } from "@/components/dashboard-layout"
import { QueueManagementDashboard } from "@/components/queue-management-dashboard"

export default function QueueManagementPage() {
  return (
    <DashboardLayout>
      <QueueManagementDashboard />
    </DashboardLayout>
  )
}
