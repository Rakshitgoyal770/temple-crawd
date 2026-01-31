"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Car,
  Bus,
  MapPin,
  Clock,
  Navigation,
  Settings,
  Route,
  ParkingCircle,
  TrafficCone as Traffic,
  Zap,
} from "lucide-react"

// Mock traffic data
const trafficRoutes = [
  {
    id: 1,
    name: "NH-8A to Somnath",
    distance: "12.5 km",
    currentTraffic: 78,
    avgSpeed: 25,
    estimatedTime: "35 min",
    status: "congested",
    incidents: 2,
    alternativeRoutes: 3,
    lastUpdate: "1 minute ago",
  },
  {
    id: 2,
    name: "SH-25 to Dwarka",
    distance: "8.2 km",
    currentTraffic: 45,
    avgSpeed: 42,
    estimatedTime: "18 min",
    status: "moderate",
    incidents: 0,
    alternativeRoutes: 2,
    lastUpdate: "2 minutes ago",
  },
  {
    id: 3,
    name: "NH-27 to Ambaji",
    distance: "15.8 km",
    currentTraffic: 32,
    avgSpeed: 55,
    estimatedTime: "22 min",
    status: "clear",
    incidents: 0,
    alternativeRoutes: 1,
    lastUpdate: "30 seconds ago",
  },
  {
    id: 4,
    name: "SH-4 to Pavagadh",
    distance: "6.7 km",
    currentTraffic: 89,
    avgSpeed: 18,
    estimatedTime: "28 min",
    status: "heavy",
    incidents: 1,
    alternativeRoutes: 4,
    lastUpdate: "45 seconds ago",
  },
]

const parkingData = [
  {
    id: 1,
    name: "Somnath Main Parking",
    totalSpaces: 500,
    occupiedSpaces: 387,
    reservedSpaces: 45,
    status: "near_full",
    pricing: "₹20/hour",
    features: ["CCTV", "Security", "EV Charging"],
  },
  {
    id: 2,
    name: "Dwarka North Parking",
    totalSpaces: 750,
    occupiedSpaces: 623,
    reservedSpaces: 67,
    status: "busy",
    pricing: "₹15/hour",
    features: ["CCTV", "Security", "Shuttle Service"],
  },
  {
    id: 3,
    name: "Ambaji Temple Parking",
    totalSpaces: 300,
    occupiedSpaces: 156,
    reservedSpaces: 23,
    status: "available",
    pricing: "₹10/hour",
    features: ["CCTV", "Security"],
  },
  {
    id: 4,
    name: "Pavagadh Base Parking",
    totalSpaces: 400,
    occupiedSpaces: 378,
    reservedSpaces: 15,
    status: "full",
    pricing: "₹25/hour",
    features: ["CCTV", "Security", "Cable Car Access"],
  },
]

const shuttleServices = [
  {
    id: 1,
    route: "Somnath Station - Temple",
    frequency: "Every 10 min",
    capacity: 45,
    currentLoad: 32,
    status: "running",
    nextArrival: "3 min",
  },
  {
    id: 2,
    route: "Dwarka Bus Stand - Temple",
    frequency: "Every 15 min",
    capacity: 60,
    currentLoad: 48,
    status: "running",
    nextArrival: "7 min",
  },
  {
    id: 3,
    route: "Ambaji Parking - Temple",
    frequency: "Every 8 min",
    capacity: 35,
    currentLoad: 12,
    status: "running",
    nextArrival: "2 min",
  },
  {
    id: 4,
    route: "Pavagadh Parking - Cable Car",
    frequency: "Every 12 min",
    capacity: 50,
    currentLoad: 45,
    status: "delayed",
    nextArrival: "15 min",
  },
]

const trafficFlowData = [
  { time: "06:00", inbound: 120, outbound: 80 },
  { time: "08:00", inbound: 280, outbound: 150 },
  { time: "10:00", inbound: 450, outbound: 200 },
  { time: "12:00", inbound: 380, outbound: 320 },
  { time: "14:00", inbound: 320, outbound: 280 },
  { time: "16:00", inbound: 280, outbound: 420 },
  { time: "18:00", inbound: 200, outbound: 380 },
  { time: "20:00", inbound: 150, outbound: 250 },
]

const incidents = [
  {
    id: 1,
    type: "accident",
    location: "NH-8A, 5km from Somnath",
    description: "Minor vehicle breakdown blocking right lane",
    reportedAt: "8 minutes ago",
    status: "clearing",
    estimatedClearance: "15 minutes",
  },
  {
    id: 2,
    type: "construction",
    location: "SH-4 near Pavagadh base",
    description: "Road maintenance work causing delays",
    reportedAt: "2 hours ago",
    status: "ongoing",
    estimatedClearance: "4 hours",
  },
]

export function TrafficManagementDashboard() {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null)

  const getTrafficBadge = (status: string) => {
    switch (status) {
      case "clear":
        return <Badge className="bg-green-100 text-green-800">Clear</Badge>
      case "moderate":
        return <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>
      case "congested":
        return <Badge className="bg-orange-100 text-orange-800">Congested</Badge>
      case "heavy":
        return <Badge className="bg-red-100 text-red-800">Heavy</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getParkingBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>
      case "busy":
        return <Badge className="bg-yellow-100 text-yellow-800">Busy</Badge>
      case "near_full":
        return <Badge className="bg-orange-100 text-orange-800">Near Full</Badge>
      case "full":
        return <Badge className="bg-red-100 text-red-800">Full</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getServiceBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-green-100 text-green-800">Running</Badge>
      case "delayed":
        return <Badge className="bg-yellow-100 text-yellow-800">Delayed</Badge>
      case "stopped":
        return <Badge className="bg-red-100 text-red-800">Stopped</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleRouteAction = (routeId: number, action: string) => {
    console.log(`[v0] Route action: ${action} for route ${routeId}`)
    // Mock action - in real app would update traffic management
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Traffic & Mobility Management</h1>
          <p className="text-muted-foreground">
            Intelligent parking guidance, shuttle coordination, and dynamic traffic flow systems
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Navigation className="h-4 w-4 mr-2" />
            Route Optimizer
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Traffic Settings
          </Button>
        </div>
      </div>

      {/* Traffic Routes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {trafficRoutes.map((route) => (
          <Card key={route.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{route.name}</CardTitle>
                {getTrafficBadge(route.status)}
              </div>
              <CardDescription className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Route className="h-3 w-3" />
                  {route.distance}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {route.estimatedTime}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Traffic Density */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Traffic Density</span>
                  <span className="font-medium">{route.currentTraffic}%</span>
                </div>
                <Progress value={route.currentTraffic} className="h-2" />
              </div>

              {/* Route Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Avg Speed</span>
                  <p className="text-lg font-bold">{route.avgSpeed} km/h</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Incidents</span>
                  <p className="text-lg font-bold">{route.incidents}</p>
                </div>
              </div>

              {/* Alternative Routes */}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  <span className="text-sm">Alternative Routes</span>
                </div>
                <span className="text-sm font-medium">{route.alternativeRoutes} available</span>
              </div>

              {/* Last Update */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Updated: {route.lastUpdate}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex-1">
                      <Route className="h-4 w-4 mr-1" />
                      View Route
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{route.name} - Route Details</DialogTitle>
                      <DialogDescription>Live traffic information and alternative routes</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-lg font-medium">Interactive Route Map</p>
                          <p className="text-sm text-muted-foreground">Real-time traffic visualization</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Speed</p>
                          <p className="text-lg font-bold">{route.avgSpeed} km/h</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Traffic Level</p>
                          <p className="text-lg font-bold">{route.currentTraffic}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ETA</p>
                          <p className="text-lg font-bold">{route.estimatedTime}</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleRouteAction(route.id, "optimize")}
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Optimize
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for detailed views */}
      <Tabs defaultValue="parking" className="space-y-4">
        <TabsList>
          <TabsTrigger value="parking">Parking Management</TabsTrigger>
          <TabsTrigger value="shuttle">Shuttle Services</TabsTrigger>
          <TabsTrigger value="analytics">Traffic Analytics</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
        </TabsList>

        <TabsContent value="parking" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {parkingData.map((parking) => (
              <Card key={parking.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{parking.name}</CardTitle>
                    {getParkingBadge(parking.status)}
                  </div>
                  <CardDescription>{parking.pricing}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Occupancy */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Occupancy</span>
                      <span className="font-medium">
                        {parking.occupiedSpaces} / {parking.totalSpaces}
                      </span>
                    </div>
                    <Progress value={(parking.occupiedSpaces / parking.totalSpaces) * 100} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Available</span>
                      <p className="text-lg font-bold text-green-600">
                        {parking.totalSpaces - parking.occupiedSpaces - parking.reservedSpaces}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Reserved</span>
                      <p className="text-lg font-bold text-blue-600">{parking.reservedSpaces}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Features</span>
                    <div className="flex flex-wrap gap-1">
                      {parking.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <ParkingCircle className="h-4 w-4 mr-1" />
                      Manage
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Navigation className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shuttle" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {shuttleServices.map((shuttle) => (
              <Card key={shuttle.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{shuttle.route}</CardTitle>
                    {getServiceBadge(shuttle.status)}
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {shuttle.frequency}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bus className="h-3 w-3" />
                      Next: {shuttle.nextArrival}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Capacity */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Load</span>
                      <span className="font-medium">
                        {shuttle.currentLoad} / {shuttle.capacity}
                      </span>
                    </div>
                    <Progress value={(shuttle.currentLoad / shuttle.capacity) * 100} className="h-2" />
                  </div>

                  {/* Service Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Capacity</span>
                      <p className="text-lg font-bold">{shuttle.capacity}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Available Seats</span>
                      <p className="text-lg font-bold text-green-600">{shuttle.capacity - shuttle.currentLoad}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Bus className="h-4 w-4 mr-1" />
                      Track Live
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Settings className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Flow Analysis</CardTitle>
              <CardDescription>Inbound and outbound vehicle patterns throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trafficFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="inbound" stroke="#3b82f6" strokeWidth={2} name="Inbound" />
                    <Line type="monotone" dataKey="outbound" stroke="#10b981" strokeWidth={2} name="Outbound" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Peak Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Morning Rush</span>
                    <span className="font-medium">8:00 - 10:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Evening Rush</span>
                    <span className="font-medium">16:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Off-Peak</span>
                    <span className="font-medium">12:00 - 14:00</span>
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
                    <span className="text-sm">Avg Response Time</span>
                    <span className="font-medium">2.3 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Route Optimization</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">System Uptime</span>
                    <span className="font-medium">99.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">CO2 Reduction</span>
                    <span className="font-medium">15.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Fuel Savings</span>
                    <span className="font-medium">12.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Time Savings</span>
                    <span className="font-medium">18.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Traffic Incidents</CardTitle>
              <CardDescription>Current incidents affecting traffic flow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div key={incident.id} className="flex items-start gap-4 p-4 rounded-lg border">
                    <div className="p-2 rounded-lg bg-muted">
                      {incident.type === "accident" && <Car className="h-4 w-4" />}
                      {incident.type === "construction" && <Traffic className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            incident.status === "clearing" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                          }
                        >
                          {incident.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {incident.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{incident.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {incident.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {incident.reportedAt}
                        </span>
                        <span>ETC: {incident.estimatedClearance}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Update
                      </Button>
                      <Button size="sm">Resolve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
