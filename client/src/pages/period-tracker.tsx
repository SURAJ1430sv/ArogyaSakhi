import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import PeriodCalendar from "@/components/period-tracker/calendar";
import { useAuth } from "@/context/AuthContext";
import { 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Heart, 
  Droplets, 
  Plus, 
  Bell,
  Activity,
  Zap,
  AlertTriangle
} from "lucide-react";

export default function PeriodTracker() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const { user } = useAuth();
  
  const userId = user?.id;

  const { data: periodEntries, isLoading } = useQuery({
    queryKey: ["/api/period-entries", userId],
    enabled: !!userId,
  });

  const createPeriodEntry = useMutation({
    mutationFn: async (entryData: any) => {
      return await apiRequest("POST", "/api/period-entries", entryData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/period-entries", userId] });
      toast({
        title: "Success",
        description: "Period entry saved successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save period entry",
        variant: "destructive",
      });
    },
  });

  const updatePeriodEntry = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: any }) => {
      return await apiRequest("PUT", `/api/period-entries/${id}`, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/period-entries", userId] });
      toast({
        title: "Updated",
        description: "Entry updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update entry",
        variant: "destructive",
      });
    },
  });

  const handleLogPeriodStart = () => {
    if (!selectedDate) return;
    
    const entryData = {
      userId: userId!,
      date: selectedDate.toISOString().split('T')[0],
      flow: "medium",
      symptoms: ["cramps"],
      notes: "Period started"
    };
    
    createPeriodEntry.mutate(entryData);
  };

  const getEntryForISODate = (isoDate: string) => {
    return (periodEntries || []).find((e: any) => e.date === isoDate);
  };

  const {
    averageCycle,
    periodLength,
    daysUntilPeriod,
    regularityScore,
    nextPeriodDate,
  } = useMemo(() => {
    const entries = (periodEntries || []) as Array<{ date: string }>;
    if (!entries.length) {
      return {
        averageCycle: 28,
        periodLength: 5,
        daysUntilPeriod: 28,
        regularityScore: 50,
        nextPeriodDate: null as Date | null,
      };
    }

    const sorted = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const gaps: number[] = [];
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1].date);
      const curr = new Date(sorted[i].date);
      const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 10 && diffDays < 60) gaps.push(diffDays);
    }
    const avgCycle = gaps.length ? Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) : 28;
    const last = new Date(sorted[sorted.length - 1].date);
    const predicted = new Date(last);
    predicted.setDate(predicted.getDate() + avgCycle);
    const today = new Date();
    const daysUntil = Math.max(0, Math.round((predicted.getTime() - new Date(today.toDateString()).getTime()) / (1000 * 60 * 60 * 24)));
    const variability = gaps.length ? Math.round((Math.max(...gaps) - Math.min(...gaps)) / (avgCycle || 1) * 100) : 50;
    const regScore = Math.max(0, 100 - Math.min(100, variability));

    return {
      averageCycle: avgCycle,
      periodLength: 5,
      daysUntilPeriod: daysUntil,
      regularityScore: regScore,
      nextPeriodDate: predicted,
    };
  }, [periodEntries]);

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (symptomName: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomName)
        ? prev.filter((s) => s !== symptomName)
        : [...prev, symptomName]
    );
  };

  const saveSymptomsForSelectedDate = () => {
    if (!selectedDate) return;
    const isoDate = selectedDate.toISOString().split('T')[0];
    const existing = getEntryForISODate(isoDate);
    if (existing) {
      updatePeriodEntry.mutate({ id: existing.id, updates: { symptoms: selectedSymptoms } });
    } else {
      createPeriodEntry.mutate({ userId, date: isoDate, symptoms: selectedSymptoms, notes: "Symptoms logged" });
    }
  };

  const symptoms = [
    { name: "Mood", icon: Heart, color: "text-yellow-500" },
    { name: "Energy", icon: Zap, color: "text-orange-500" },
    { name: "Pain", icon: AlertTriangle, color: "text-red-500" },
    { name: "Flow", icon: Droplets, color: "text-blue-500" },
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to access period tracking</h2>
          <p className="text-gray-600">You need to be logged in to track your periods and view your data.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your period tracker...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Period Tracker</h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Track your cycle, symptoms, and get personalized insights
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calendar View */}
            <Card className="bg-gradient-to-br from-pink-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  <CalendarIcon className="inline mr-2 text-primary" />
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PeriodCalendar 
                  entries={periodEntries || []} 
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
                <div className="flex justify-center space-x-6 mt-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-300 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Period</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-300 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Fertile Window</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Dashboard */}
            <div className="space-y-6">
              {/* Cycle Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 text-primary" />
                    Cycle Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{averageCycle}</div>
                      <div className="text-sm text-gray-600">Average Cycle</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-500">{periodLength}</div>
                      <div className="text-sm text-gray-600">Period Length</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">{daysUntilPeriod}</div>
                      <div className="text-sm text-gray-600">Days Until Period</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">{regularityScore}%</div>
                      <div className="text-sm text-gray-600">Regularity Score</div>
                    </div>
                    {nextPeriodDate && (
                      <div className="col-span-2 text-center text-sm">
                        <span className="text-gray-600">Next expected start: </span>
                        <span className="font-semibold text-primary">
                          {new Date(nextPeriodDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Symptoms Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 text-primary" />
                    Log Symptoms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {symptoms.map((symptom) => {
                      const isActive = selectedSymptoms.includes(symptom.name);
                      return (
                        <Button
                          key={symptom.name}
                          variant={isActive ? "default" : "outline"}
                          className="h-16 flex flex-col items-center justify-center hover:border-primary"
                          onClick={() => toggleSymptom(symptom.name)}
                        {
                          ...(isActive ? { disabled: false } : {})
                        }
                        >
                          <symptom.icon className={`h-5 w-5 ${symptom.color} mb-1`} />
                          <span className="text-sm">{symptom.name}</span>
                        </Button>
                      );
                    })}
                  </div>
                  <Button onClick={saveSymptomsForSelectedDate} className="mt-4 w-full" disabled={createPeriodEntry.isPending || updatePeriodEntry.isPending}>
                    {createPeriodEntry.isPending || updatePeriodEntry.isPending ? "Saving..." : "Save Symptoms for Selected Date"}
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      onClick={handleLogPeriodStart}
                      disabled={createPeriodEntry.isPending}
                      className="w-full bg-primary text-white hover:bg-blue-600"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {createPeriodEntry.isPending ? "Saving..." : "Log Period Start"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Bell className="mr-2 h-4 w-4" />
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Your Period Patterns
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Understand your cycle trends and patterns over time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">28</div>
                <div className="text-gray-600 mb-4">Average Cycle Length</div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Regular
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-red-500 mb-2">5</div>
                <div className="text-gray-600 mb-4">Average Period Length</div>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  Normal
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
                <div className="text-gray-600 mb-4">Months Tracked</div>
                <Badge variant="outline" className="text-purple-600 border-purple-600">
                  Excellent
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
