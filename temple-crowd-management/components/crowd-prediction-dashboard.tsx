"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Brain, AlertCircle } from "lucide-react"

// Mock prediction data
const hourlyPredictions = [
  { time: "6:00", somnath: 1200, dwarka: 1800, ambaji: 800, pavagadh: 1400 },
  { time: "8:00", somnath: 2100, dwarka: 2800, ambaji: 1200, pavagadh: 2100 },
  { time: "10:00", somnath: 3200, dwarka: 3900, ambaji: 1800, pavagadh: 2800 },
  { time: "12:00", somnath: 4100, dwarka: 4800, ambaji: 2400, pavagadh: 3600 },
  { time: "14:00", somnath: 3800, dwarka: 4500, ambaji: 2200, pavagadh: 3400 },
  { time: "16:00", somnath: 4500, dwarka: 5200, ambaji: 2800, pavagadh: 4000 },
  { time: "18:00", somnath: 3900, dwarka: 4600, ambaji: 2300, pavagadh: 3500 },
  { time: "20:00", somnath: 2800, dwarka: 3400, ambaji: 1600, pavagadh: 2600 },
]

const weeklyTrends = [
  { day: "Mon", visitors: 12000, predicted: 11800 },
  { day: "Tue", visitors: 9500, predicted: 9200 },
  { day: "Wed", visitors: 8200, predicted: 8500 },
  { day: "Thu", visitors: 11000, predicted: 10800 },
  { day: "Fri", visitors: 15000, predicted: 14500 },
  { day: "Sat", visitors: 18500, predicted: 18200 },
  { day: "Sun", visitors: 22000, predicted: 21800 },
]

const factorInfluence = [
  { name: "Weather", value: 35, color: "#3b82f6" },
  { name: "Festivals", value: 28, color: "#10b981" },
  { name: "Holidays", value: 20, color: "#f59e0b" },
  { name: "Historical", value: 17, color: "#ef4444" },
]

const predictions = [
  {
    temple: "Somnath Temple",
    current: 2847,
    predicted1h: 3200,
    predicted2h: 3800,
    predicted4h: 4100,
    confidence: 94,
    factors: ["Clear weather", "Weekend", "No major festival"],
    risk: "moderate",
  },
  {
    temple: "Dwarka Temple",
    current: 4231,
    predicted1h: 4600,
    predicted2h: 5100,
    predicted4h: 4800,
    confidence: 91,
    factors: ["Cloudy weather", "Tourist season", "Local festival nearby"],
    risk: "high",
  },
  {
    temple: "Ambaji Temple",
    current: 1654,
    predicted1h: 1900,
    predicted2h: 2400,
    predicted4h: 2800,
    confidence: 96,
    factors: ["Good weather", "School holiday", "Regular pilgrimage"],
    risk: "low",
  },
  {
    temple: "Pavagadh Temple",
    current: 3421,
    predicted1h: 3800,
    predicted2h: 4200,
    predicted4h: 3900,
    confidence: 89,
    factors: ["Mild weather", "Weekend rush", "Cable car operational"],
    risk: "moderate",
  },
]

export function CrowdPredictionDashboard() {
  const [selectedTemple, setSelectedTemple] = useState("all")
  const [timeRange, setTimeRange] = useState("today")

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
      case "moderate":
        return <Badge className="bg-yellow-100 text-yellow-800">Moderate Risk</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Crowd Prediction</h1>
          <p className="text-muted-foreground">
            Machine learning models forecasting visitor patterns based on historical data, weather, and events
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTemple} onValueChange={setSelectedTemple}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Temples</SelectItem>
              <SelectItem value="somnath">Somnath</SelectItem>
              <SelectItem value="dwarka">Dwarka</SelectItem>
              <SelectItem value="ambaji">Ambaji</SelectItem>
              <SelectItem value="pavagadh">Pavagadh</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {predictions.map((prediction) => (
          <Card key={prediction.temple}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{prediction.temple}</CardTitle>
                {getRiskBadge(prediction.risk)}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="h-4 w-4" />
                <span>AI Confidence: {prediction.confidence}%</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Current</p>
                  <p className="text-lg font-bold">{prediction.current.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">+1h</p>
                  <p className="text-lg font-bold text-blue-600">{prediction.predicted1h.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">+2h</p>
                  <p className="text-lg font-bold text-blue-600">{prediction.predicted2h.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">+4h</p>
                  <p className="text-lg font-bold text-blue-600">{prediction.predicted4h.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Influencing Factors:</p>
                <div className="flex flex-wrap gap-1">
                  {prediction.factors.map((factor, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                View Detailed Analysis
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="hourly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hourly">Hourly Predictions</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Trends</TabsTrigger>
          <TabsTrigger value="factors">Influence Factors</TabsTrigger>
        </TabsList>

        <TabsContent value="hourly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Hourly Crowd Predictions</CardTitle>
              <CardDescription>AI-powered forecasts for all temple locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyPredictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="somnath" stroke="#3b82f6" strokeWidth={2} name="Somnath" />
                    <Line type="monotone" dataKey="dwarka" stroke="#10b981" strokeWidth={2} name="Dwarka" />
                    <Line type="monotone" dataKey="ambaji" stroke="#f59e0b" strokeWidth={2} name="Ambaji" />
                    <Line type="monotone" dataKey="pavagadh" stroke="#ef4444" strokeWidth={2} name="Pavagadh" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Prediction Accuracy</CardTitle>
              <CardDescription>Comparison between actual and predicted visitor counts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visitors" fill="#3b82f6" name="Actual Visitors" />
                    <Bar dataKey="predicted" fill="#10b981" name="Predicted" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factors" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Prediction Factor Influence</CardTitle>
                <CardDescription>Weight of different factors in AI model predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={factorInfluence}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {factorInfluence.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
                <CardDescription>AI prediction accuracy metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Overall Accuracy</span>
                    <span className="text-sm font-medium">94.2%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "94.2%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">1-Hour Predictions</span>
                    <span className="text-sm font-medium">97.8%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "97.8%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">4-Hour Predictions</span>
                    <span className="text-sm font-medium">89.1%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "89.1%" }}></div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>Last model update: 2 hours ago</span>
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
