"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Shield,
  Phone,
  Siren,
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  Radio,
  Megaphone,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

// Mock emergency data
const activeIncidents = [
  {
    id: 1,
    type: "medical",
    severity: "high",
    title: "Medical Emergency - Heart Attack",
    location: "Somnath Temple - Main Hall",
    description: "Elderly visitor collapsed, ambulance dispatched",
    reportedAt: "2 minutes ago",
    status: "responding",
    responders: ["Ambulance Unit 1", "Temple Security", "Local Police"],
    estimatedResponse: "3 minutes",
  },
  {
    id: 2,
    type: "crowd",
    severity: "medium",
    title: "Crowd Stampede Risk",
    location: "Dwarka Temple - North Gate",
    description: "High crowd density detected, potential stampede risk",
    reportedAt: "5 minutes ago",
    status: "monitoring",
    responders: ["Security Team", "Crowd Control"],
    estimatedResponse: "Ongoing",
  },
  {
    id: 3,
    type: "fire",
    severity: "low",
    title: "Smoke Detection",
    location: "Ambaji Temple - Kitchen Area",
    description: "Smoke detected in temple kitchen, investigating",
    reportedAt: "8 minutes ago",
    status: "investigating",
    responders: ["Fire Safety Team"],
    estimatedResponse: "5 minutes",
  },
]

const emergencyContacts = [
  { name: "Police Control Room", number: "100", type: "police", status: "active" },
  { name: "Fire Department", number: "101", type: "fire", status: "active" },
  { name: "Ambulance Service", number: "108", type: "medical", status: "active" },
  { name: "Disaster Management", number: "1077", type: "disaster", status: "active" },
  { name: "Temple Security", number: "+91-9876543210", type: "security", status: "active" },
  { name: "Local Hospital", number: "+91-9876543211", type: "medical", status: "active" },
]

const alertSystems = [
  {
    id: 1,
    name: "Public Address System",
    location: "All Temples",
    status: "online",
    lastTest: "2 hours ago",
    coverage: "100%",
    type: "audio",
  },
  {
    id: 2,
    name: "SMS Alert System",
    location: "Mobile Network",
    status: "online",
    lastTest: "1 hour ago",
    coverage: "95%",
    type: "sms",
  },
  {
    id: 3,
    name: "Digital Display Boards",
    location: "All Entrances",
    status: "online",
    lastTest: "30 minutes ago",
    coverage: "90%",
    type: "visual",
  },
  {
    id: 4,
    name: "Mobile App Notifications",
    location: "User Devices",
    status: "online",
    lastTest: "15 minutes ago",
    coverage: "78%",
    type: "push",
  },
]

const responseTeams = [
  {
    id: 1,
    name: "Medical Response Team",
    members: 8,
    status: "available",
    location: "Somnath Base",
    equipment: ["Ambulance", "First Aid", "Defibrillator"],
    responseTime: "3-5 min",
  },
  {
    id: 2,
    name: "Fire Safety Team",
    members: 12,
    status: "available",
    location: "Central Station",
    equipment: ["Fire Truck", "Extinguishers", "Rescue Gear"],
    responseTime: "5-8 min",
  },
  {
    id: 3,
    name: "Security & Crowd Control",
    members: 24,
    status: "deployed",
    location: "All Temples",
    equipment: ["Barriers", "Communication", "First Aid"],
    responseTime: "1-2 min",
  },
  {
    id: 4,
    name: "Technical Support",
    members: 6,
    status: "available",
    location: "Control Center",
    equipment: ["Generators", "Communication", "Tools"],
    responseTime: "10-15 min",
  },
]

export function EmergencyDashboard() {
  const [alertMessage, setAlertMessage] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [alertType, setAlertType] = useState("")

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "responding":
        return <Badge className="bg-orange-100 text-orange-800">Responding</Badge>
      case "monitoring":
        return <Badge className="bg-blue-100 text-blue-800">Monitoring</Badge>
      case "investigating":
        return <Badge className="bg-purple-100 text-purple-800">Investigating</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "medical":
        return <Heart className="h-4 w-4" />
      case "fire":
        return <Zap className="h-4 w-4" />
      case "crowd":
        return <Users className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const handleEmergencyAlert = () => {
    console.log(`[v0] Emergency alert sent: ${alertType} - ${alertMessage} to ${selectedLocation}`)
    // Mock alert - in real app would trigger emergency systems
    setAlertMessage("")
    setSelectedLocation("")
    setAlertType("")
  }

  const handleIncidentAction = (incidentId: number, action: string) => {
    console.log(`[v0] Incident action: ${action} for incident ${incidentId}`)
    // Mock action - in real app would update incident status
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Emergency Alert System</h1>
          <p className="text-muted-foreground">
            Real-time panic detection, smart barricade systems, and AI-enabled first responder alerts
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Siren className="h-4 w-4 mr-2" />
                Emergency Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Emergency Alert</DialogTitle>
                <DialogDescription>Broadcast emergency message to all systems and personnel</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Alert Type</Label>
                  <Select value={alertType} onValueChange={setAlertType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical Emergency</SelectItem>
                      <SelectItem value="fire">Fire Emergency</SelectItem>
                      <SelectItem value="security">Security Threat</SelectItem>
                      <SelectItem value="crowd">Crowd Control</SelectItem>
                      <SelectItem value="evacuation">Evacuation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Temples</SelectItem>
                      <SelectItem value="somnath">Somnath Temple</SelectItem>
                      <SelectItem value="dwarka">Dwarka Temple</SelectItem>
                      <SelectItem value="ambaji">Ambaji Temple</SelectItem>
                      <SelectItem value="pavagadh">Pavagadh Temple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Alert Message</Label>
                  <Textarea
                    placeholder="Enter emergency message..."
                    value={alertMessage}
                    onChange={(e) => setAlertMessage(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button onClick={handleEmergencyAlert} className="w-full bg-red-600 hover:bg-red-700">
                  <Megaphone className="h-4 w-4 mr-2" />
                  Send Alert
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="bg-transparent">
            <Phone className="h-4 w-4 mr-2" />
            Emergency Contacts
          </Button>
        </div>
      </div>

      {/* Active Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Active Incidents
          </CardTitle>
          <CardDescription>Current emergency situations requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeIncidents.map((incident) => (
              <div key={incident.id} className="flex items-start gap-4 p-4 rounded-lg border">
                <div className="flex items-center gap-2">
                  {getTypeIcon(incident.type)}
                  {getSeverityBadge(incident.severity)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{incident.title}</h3>
                    {getStatusBadge(incident.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{incident.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {incident.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {incident.reportedAt}
                    </span>
                    <span>ETA: {incident.estimatedResponse}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {incident.responders.map((responder, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {responder}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => handleIncidentAction(incident.id, "update")}
                  >
                    Update
                  </Button>
                  <Button size="sm" onClick={() => handleIncidentAction(incident.id, "resolve")}>
                    Resolve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs for detailed views */}
      <Tabs defaultValue="systems" className="space-y-4">
        <TabsList>
          <TabsTrigger value="systems">Alert Systems</TabsTrigger>
          <TabsTrigger value="teams">Response Teams</TabsTrigger>
          <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="systems" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {alertSystems.map((system) => (
              <Card key={system.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{system.name}</CardTitle>
                    <Badge
                      className={system.status === "online" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {system.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {system.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Coverage</span>
                      <div className="flex items-center gap-2">
                        <Progress value={Number.parseInt(system.coverage)} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{system.coverage}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Last Test</span>
                      <p className="text-sm font-medium">{system.lastTest}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      {system.type === "audio" && <Radio className="h-4 w-4" />}
                      {system.type === "sms" && <Phone className="h-4 w-4" />}
                      {system.type === "visual" && <AlertCircle className="h-4 w-4" />}
                      {system.type === "push" && <Megaphone className="h-4 w-4" />}
                      <span className="text-sm capitalize">{system.type} System</span>
                    </div>
                    <Switch checked={system.status === "online"} />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Test System
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {responseTeams.map((team) => (
              <Card key={team.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <Badge
                      className={
                        team.status === "available"
                          ? "bg-green-100 text-green-800"
                          : team.status === "deployed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {team.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {team.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Team Members</span>
                      <p className="text-lg font-bold">{team.members}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Response Time</span>
                      <p className="text-lg font-bold">{team.responseTime}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Equipment</span>
                    <div className="flex flex-wrap gap-1">
                      {team.equipment.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Contact Team
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {emergencyContacts.map((contact, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        {contact.type === "police" && <Shield className="h-4 w-4" />}
                        {contact.type === "fire" && <Zap className="h-4 w-4" />}
                        {contact.type === "medical" && <Heart className="h-4 w-4" />}
                        {contact.type === "security" && <Shield className="h-4 w-4" />}
                        {contact.type === "disaster" && <AlertTriangle className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.number}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {contact.status === "active" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <Button size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
