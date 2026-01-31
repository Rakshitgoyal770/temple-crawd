"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Camera,
  Eye,
  AlertTriangle,
  Activity,
  Wifi,
  WifiOff,
  Play,
  Pause,
  RotateCcw,
  Settings,
  MapPin,
  Clock,
  Shield,
  Bone as Drone,
} from "lucide-react"

// Mock surveillance data
const cameraData = [
  {
    id: 1,
    name: "Main Entrance - Somnath",
    location: "Somnath Temple - Gate 1",
    status: "online",
    crowdDensity: 78,
    aiAnalysis: "High density detected",
    lastUpdate: "2 seconds ago",
    resolution: "4K",
    nightVision: true,
    aiEnabled: true,
    alerts: 3,
  },
  {
    id: 2,
    name: "Darshan Hall - Dwarka",
    location: "Dwarka Temple - Main Hall",
    status: "online",
    crowdDensity: 92,
    aiAnalysis: "Overcrowding alert",
    lastUpdate: "1 second ago",
    resolution: "4K",
    nightVision: true,
    aiEnabled: true,
    alerts: 7,
  },
  {
    id: 3,
    name: "Parking Area - Ambaji",
    location: "Ambaji Temple - Parking",
    status: "offline",
    crowdDensity: 0,
    aiAnalysis: "Camera offline",
    lastUpdate: "5 minutes ago",
    resolution: "1080p",
    nightVision: false,
    aiEnabled: false,
    alerts: 1,
  },
  {
    id: 4,
    name: "Cable Car Station - Pavagadh",
    location: "Pavagadh Temple - Station",
    status: "online",
    crowdDensity: 45,
    aiAnalysis: "Normal crowd levels",
    lastUpdate: "3 seconds ago",
    resolution: "4K",
    nightVision: true,
    aiEnabled: true,
    alerts: 0,
  },
]

const droneData = [
  {
    id: 1,
    name: "Aerial Unit 1",
    location: "Somnath Temple Perimeter",
    status: "active",
    batteryLevel: 78,
    altitude: "150m",
    coverage: "North Sector",
    flightTime: "45 min",
  },
  {
    id: 2,
    name: "Aerial Unit 2",
    location: "Dwarka Temple Area",
    status: "charging",
    batteryLevel: 100,
    altitude: "0m",
    coverage: "Standby",
    flightTime: "0 min",
  },
]

const aiAlerts = [
  {
    id: 1,
    type: "crowd",
    severity: "high",
    message: "Overcrowding detected at Dwarka main entrance",
    location: "Dwarka Temple - Gate 1",
    time: "30 seconds ago",
    camera: "CAM-DWK-001",
    confidence: 94,
  },
  {
    id: 2,
    type: "security",
    severity: "medium",
    message: "Unattended bag detected in waiting area",
    location: "Somnath Temple - Waiting Hall",
    time: "2 minutes ago",
    camera: "CAM-SOM-003",
    confidence: 87,
  },
  {
    id: 3,
    type: "safety",
    severity: "low",
    message: "Person fell in queue area - assistance may be needed",
    location: "Ambaji Temple - Queue Zone",
    time: "5 minutes ago",
    camera: "CAM-AMB-002",
    confidence: 76,
  },
]

const systemMetrics = [
  { name: "Active Cameras", value: "247", status: "online", icon: Camera },
  { name: "AI Detections", value: "1,247", status: "processing", icon: Eye },
  { name: "Drone Units", value: "8", status: "operational", icon: Drone },
  { name: "Alert Response", value: "98.2%", status: "optimal", icon: Shield },
]

export function SurveillanceDashboard() {
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-800">Online</Badge>
      case "offline":
        return <Badge className="bg-red-100 text-red-800">Offline</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleCameraAction = (cameraId: number, action: string) => {
    console.log(`[v0] Camera action: ${action} for camera ${cameraId}`)
    // Mock action - in real app would call API
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">IoT Surveillance & Monitoring</h1>
          <p className="text-muted-foreground">
            AI-powered CCTV analytics, drone surveillance, and automated crowd density monitoring
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Eye className="h-4 w-4 mr-2" />
            Live View
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-green-600 capitalize">{metric.status}</p>
                </div>
                <metric.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {cameraData.map((camera) => (
          <Card key={camera.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{camera.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {camera.location}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(camera.status)}
                  {camera.status === "online" ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Camera Feed Placeholder */}
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
                {camera.status === "online" ? (
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Live Feed Active</p>
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <WifiOff className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Camera Offline</p>
                  </div>
                )}
              </div>

              {/* Crowd Density */}
              {camera.status === "online" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Crowd Density</span>
                    <span className="font-medium">{camera.crowdDensity}%</span>
                  </div>
                  <Progress value={camera.crowdDensity} className="h-2" />
                  <p className="text-xs text-muted-foreground">{camera.aiAnalysis}</p>
                </div>
              )}

              {/* Camera Specs */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <span className="text-muted-foreground">Resolution</span>
                  <p className="font-medium">{camera.resolution}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground">Alerts</span>
                  <p className="font-medium">{camera.alerts}</p>
                </div>
              </div>

              {/* Features */}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">Night Vision</span>
                    <Switch checked={camera.nightVision} size="sm" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    <span className="text-sm">AI Analysis</span>
                    <Switch checked={camera.aiEnabled} size="sm" />
                  </div>
                </div>
              </div>

              {/* Last Update */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Last update: {camera.lastUpdate}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View Live
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{camera.name} - Live Feed</DialogTitle>
                      <DialogDescription>{camera.location}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-lg font-medium">Live Camera Feed</p>
                          <p className="text-sm text-muted-foreground">Real-time surveillance view</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Record
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Camera className="h-4 w-4 mr-1" />
                          Snapshot
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Settings className="h-4 w-4 mr-1" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleCameraAction(camera.id, "restart")}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Restart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for detailed views */}
      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">AI Alerts</TabsTrigger>
          <TabsTrigger value="drones">Drone Surveillance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Security Alerts</CardTitle>
              <CardDescription>Real-time alerts from computer vision analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg border">
                    <AlertTriangle
                      className={`h-5 w-5 mt-1 ${
                        alert.severity === "high"
                          ? "text-red-500"
                          : alert.severity === "medium"
                            ? "text-yellow-500"
                            : "text-blue-500"
                      }`}
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(alert.severity)}
                        <Badge variant="outline" className="text-xs">
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{alert.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Camera className="h-3 w-3" />
                          {alert.camera}
                        </span>
                        <span>Confidence: {alert.confidence}%</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        View
                      </Button>
                      <Button size="sm">Respond</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drones" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {droneData.map((drone) => (
              <Card key={drone.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{drone.name}</CardTitle>
                    <Badge
                      className={
                        drone.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {drone.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {drone.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Battery Level</span>
                      <div className="flex items-center gap-2">
                        <Progress value={drone.batteryLevel} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{drone.batteryLevel}%</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Altitude</span>
                      <p className="text-lg font-bold">{drone.altitude}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Coverage Area</span>
                      <p className="font-medium">{drone.coverage}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Flight Time</span>
                      <p className="font-medium">{drone.flightTime}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {drone.status === "active" ? (
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Pause className="h-4 w-4 mr-1" />
                        Land
                      </Button>
                    ) : (
                      <Button size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-1" />
                        Deploy
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-1" />
                      View Feed
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detection Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Crowd Detection</span>
                    <span className="font-medium">96.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Object Recognition</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Behavior Analysis</span>
                    <span className="font-medium">89.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Processing Speed</span>
                    <span className="font-medium">24 FPS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="font-medium">1.2s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Uptime</span>
                    <span className="font-medium">99.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Storage & Bandwidth</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Storage Used</span>
                    <span className="font-medium">2.4 TB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bandwidth Usage</span>
                    <span className="font-medium">847 Mbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Retention Period</span>
                    <span className="font-medium">30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
