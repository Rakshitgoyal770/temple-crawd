"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Users,
  Clock,
  QrCode,
  Smartphone,
  Settings,
  Play,
  Pause,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Timer,
  MapPin,
} from "lucide-react"

// Mock queue data
const queueData = [
  {
    id: 1,
    temple: "Somnath Temple",
    location: "Main Entrance",
    currentQueue: 247,
    maxCapacity: 500,
    avgWaitTime: 25,
    status: "active",
    digitalPasses: 189,
    walkIns: 58,
    estimatedCompletion: "14:30",
    qrCodeActive: true,
  },
  {
    id: 2,
    temple: "Dwarka Temple",
    location: "North Gate",
    currentQueue: 412,
    maxCapacity: 600,
    avgWaitTime: 45,
    status: "active",
    digitalPasses: 298,
    walkIns: 114,
    estimatedCompletion: "15:15",
    qrCodeActive: true,
  },
  {
    id: 3,
    temple: "Ambaji Temple",
    location: "Main Darshan",
    currentQueue: 156,
    maxCapacity: 400,
    avgWaitTime: 12,
    status: "active",
    digitalPasses: 134,
    walkIns: 22,
    estimatedCompletion: "13:45",
    qrCodeActive: true,
  },
  {
    id: 4,
    temple: "Pavagadh Temple",
    location: "Cable Car Station",
    currentQueue: 89,
    maxCapacity: 300,
    avgWaitTime: 8,
    status: "paused",
    digitalPasses: 67,
    walkIns: 22,
    estimatedCompletion: "13:20",
    qrCodeActive: false,
  },
]

const recentActivity = [
  {
    id: 1,
    action: "Queue activated",
    location: "Somnath - Main Entrance",
    time: "2 minutes ago",
    user: "System Auto",
  },
  {
    id: 2,
    action: "Digital pass issued",
    location: "Dwarka - North Gate",
    time: "3 minutes ago",
    user: "Mobile App",
  },
  {
    id: 3,
    action: "Queue capacity increased",
    location: "Ambaji - Main Darshan",
    time: "5 minutes ago",
    user: "Admin User",
  },
  {
    id: 4,
    action: "Emergency pause activated",
    location: "Pavagadh - Cable Car",
    time: "8 minutes ago",
    user: "Security Team",
  },
]

export function QueueManagementDashboard() {
  const [selectedQueue, setSelectedQueue] = useState<number | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>
      case "stopped":
        return <Badge className="bg-red-100 text-red-800">Stopped</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleQueueAction = (queueId: number, action: string) => {
    console.log(`[v0] Queue action: ${action} for queue ${queueId}`)
    // Mock action - in real app would call API
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Smart Queue Management</h1>
          <p className="text-muted-foreground">Digital queue systems with real-time updates and mobile integration</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Codes
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Queue QR Codes</DialogTitle>
                <DialogDescription>Create QR codes for visitors to join queues digitally</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Temple Location</Label>
                    <select className="w-full p-2 border rounded">
                      <option>Somnath Temple</option>
                      <option>Dwarka Temple</option>
                      <option>Ambaji Temple</option>
                      <option>Pavagadh Temple</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Queue Type</Label>
                    <select className="w-full p-2 border rounded">
                      <option>Regular Darshan</option>
                      <option>VIP Darshan</option>
                      <option>Special Events</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full">Generate QR Code</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Queue Status Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {queueData.map((queue) => (
          <Card key={queue.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{queue.temple}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {queue.location}
                  </CardDescription>
                </div>
                {getStatusBadge(queue.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Queue Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Queue Occupancy</span>
                  <span className="font-medium">
                    {queue.currentQueue} / {queue.maxCapacity}
                  </span>
                </div>
                <Progress value={(queue.currentQueue / queue.maxCapacity) * 100} className="h-2" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Avg Wait Time
                  </div>
                  <p className="text-lg font-bold">{queue.avgWaitTime} min</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    Est. Completion
                  </div>
                  <p className="text-lg font-bold">{queue.estimatedCompletion}</p>
                </div>
              </div>

              {/* Digital vs Walk-in */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Digital Passes
                  </span>
                  <span className="font-medium">{queue.digitalPasses}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Walk-ins
                  </span>
                  <span className="font-medium">{queue.walkIns}</span>
                </div>
              </div>

              {/* QR Code Status */}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  <span className="text-sm">QR Code System</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={queue.qrCodeActive} />
                  <span className="text-xs text-muted-foreground">{queue.qrCodeActive ? "Active" : "Inactive"}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {queue.status === "active" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleQueueAction(queue.id, "pause")}
                  >
                    <Pause className="h-4 w-4 mr-1" />
                    Pause
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleQueueAction(queue.id, "resume")}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Resume
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleQueueAction(queue.id, "reset")}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex-1">
                      Manage
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Manage Queue - {queue.temple}</DialogTitle>
                      <DialogDescription>{queue.location}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Max Capacity</Label>
                          <Input type="number" defaultValue={queue.maxCapacity} />
                        </div>
                        <div className="space-y-2">
                          <Label>Processing Rate (per min)</Label>
                          <Input type="number" defaultValue="15" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Queue Priority Settings</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Senior Citizens Priority</span>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Disabled Access Priority</span>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">VIP Pass Priority</span>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Save Changes</Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for detailed views */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="analytics">Queue Analytics</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Queue Activity</CardTitle>
              <CardDescription>Latest actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg border">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {activity.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </span>
                        <span>by {activity.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Processed</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Wait Time</span>
                    <span className="font-medium">22 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Digital Adoption</span>
                    <span className="font-medium">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Queue Systems</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mobile App</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Connected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">QR Scanners</span>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">1 Offline</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Peak Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Morning Peak</span>
                    <span className="font-medium">8:00 - 10:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Evening Peak</span>
                    <span className="font-medium">16:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Lowest Traffic</span>
                    <span className="font-medium">13:00 - 15:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Mobile App Integration</CardTitle>
                <CardDescription>Digital queue management through mobile application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">App Downloads Today</span>
                    <span className="font-bold text-lg">247</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">Active Digital Passes</span>
                    <span className="font-bold text-lg">1,089</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">QR Code Scans</span>
                    <span className="font-bold text-lg">2,341</span>
                  </div>
                </div>
                <Button className="w-full">
                  <Smartphone className="h-4 w-4 mr-2" />
                  View Mobile Analytics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Real-time updates sent to mobile users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Notification Settings</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Queue Position Updates</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Wait Time Alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Queue Status Changes</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  Send Test Notification
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
