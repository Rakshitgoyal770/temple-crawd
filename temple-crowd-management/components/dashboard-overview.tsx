"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, AlertTriangle, Camera, Car, Clock, MapPin, Activity } from "lucide-react"

// Mock data for the dashboard
const templeStats = [
  {
    name: "Somnath Temple",
    currentCrowd: 2847,
    capacity: 5000,
    status: "moderate",
    prediction: "+15% in 2hrs",
    queueTime: "25 min",
  },
  {
    name: "Dwarka Temple",
    currentCrowd: 4231,
    capacity: 6000,
    status: "high",
    prediction: "+8% in 2hrs",
    queueTime: "45 min",
  },
  {
    name: "Ambaji Temple",
    currentCrowd: 1654,
    capacity: 4000,
    status: "low",
    prediction: "+25% in 2hrs",
    queueTime: "12 min",
  },
  {
    name: "Pavagadh Temple",
    currentCrowd: 3421,
    capacity: 4500,
    status: "high",
    prediction: "-5% in 2hrs",
    queueTime: "38 min",
  },
]

const alerts = [
  {
    id: 1,
    type: "warning",
    message: "High crowd density detected at Dwarka Temple main entrance",
    time: "2 minutes ago",
    location: "Dwarka Temple - Gate 1",
  },
  {
    id: 2,
    type: "info",
    message: "Traffic congestion building on Somnath approach road",
    time: "5 minutes ago",
    location: "Somnath - NH-8A",
  },
  {
    id: 3,
    type: "success",
    message: "Queue management system activated at Ambaji",
    time: "8 minutes ago",
    location: "Ambaji Temple",
  },
]

const systemMetrics = [
  { name: "Active Cameras", value: "247", change: "+2", icon: Camera },
  { name: "AI Predictions", value: "98.7%", change: "+0.3%", icon: Activity },
  { name: "Queue Systems", value: "12", change: "0", icon: Users },
  { name: "Traffic Sensors", value: "89", change: "+3", icon: Car },
]

export function DashboardOverview() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "low":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Low
          </Badge>
        )
      case "moderate":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Moderate
          </Badge>
        )
      case "high":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            High
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-8">
      {/* System Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {metric.change !== "0" && (
                      <span className={metric.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                        {metric.change}
                      </span>
                    )}
                    {metric.change === "0" && <span className="text-muted-foreground">No change</span>}
                  </p>
                </div>
                <metric.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Temple Status Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {templeStats.map((temple) => (
          <Card key={temple.name}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{temple.name}</CardTitle>
                {getStatusBadge(temple.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Crowd</span>
                  <span className="font-medium">
                    {temple.currentCrowd.toLocaleString()} / {temple.capacity.toLocaleString()}
                  </span>
                </div>
                <Progress value={(temple.currentCrowd / temple.capacity) * 100} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Prediction:</span>
                  <span className="font-medium">{temple.prediction}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Queue:</span>
                  <span className="font-medium">{temple.queueTime}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Manage Queue
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent Alerts
          </CardTitle>
          <CardDescription>Real-time notifications from AI monitoring systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg border">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === "warning" ? "bg-yellow-500" : alert.type === "info" ? "bg-blue-500" : "bg-green-500"
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {alert.location}
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
