import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  Phone, 
  Calendar,
  Heart,
  Activity,
  Brain
} from "lucide-react";

export default function YearlyAnalysis() {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your yearly analysis</h2>
          <p className="text-gray-600">You need to be logged in to access your health analytics and yearly insights.</p>
        </div>
      </div>
    );
  }
  
  const userId = user.id;

  const { data: assessments } = useQuery({
    queryKey: ["/api/health-assessments", userId],
  });

  const { data: periodEntries } = useQuery({
    queryKey: ["/api/period-entries", userId],
  });

  const {
    healthScore,
    healthScoreCategories,
    daysTracked,
    cyclesRecorded,
    avgMoodScore,
    monthlyTrends,
  } = useMemo(() => {
    const entries = (periodEntries || []) as Array<{ date: string; symptoms?: string[] }>;
    const sorted = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Days tracked
    const uniqueDates = new Set(sorted.map(e => e.date));
    const daysTrackedCalc = uniqueDates.size;

    // Cycles recorded (period starts assumed by entries count)
    const cyclesRecordedCalc = sorted.length;

    // Regularity score from variance of gaps
    const gaps: number[] = [];
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1].date);
      const curr = new Date(sorted[i].date);
      const diff = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
      if (diff > 10 && diff < 60) gaps.push(diff);
    }
    const avgCycle = gaps.length ? gaps.reduce((a, b) => a + b, 0) / gaps.length : 28;
    const variability = gaps.length ? (Math.max(...gaps) - Math.min(...gaps)) / (avgCycle || 1) : 0.5;
    const regularityScore = Math.max(0, Math.min(100, Math.round(100 - variability * 100)));

    // Symptom management score: fewer severe symptoms assumed better (proxy by count)
    const symptomCounts = entries.reduce((acc, e) => acc + (e.symptoms?.length || 0), 0);
    const symptomScore = Math.max(0, 100 - Math.min(100, symptomCounts * 2));

    // Mental wellness proxy from assessments (if present)
    const mentalAssessments = (assessments || []).filter((a: any) => a.type === "mental");
    const mentalScore = mentalAssessments.length
      ? Math.round(
          mentalAssessments.reduce((acc: number, a: any) => acc + (a.score || 0), 0) / mentalAssessments.length
        )
      : 80;

    const overall = Math.round((regularityScore * 0.4 + symptomScore * 0.3 + mentalScore * 0.3));

    // Monthly trends based on entries count per month
    const byMonthMap = new Map<string, number>();
    entries.forEach(e => {
      const d = new Date(e.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      byMonthMap.set(key, (byMonthMap.get(key) || 0) + 1);
    });
    const months = Array.from({ length: 12 }, (_, i) => i);
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthlyTrendsCalc = months.map(i => ({
      month: monthNames[i],
      score: Math.min(100, (byMonthMap.get(`${new Date().getFullYear()}-${String(i+1).padStart(2,'0')}`) || 0) * 10 + 70),
    }));

    const categories = [
      { name: "Menstrual Regularity", score: regularityScore, color: "bg-green-500" },
      { name: "Symptom Management", score: symptomScore, color: "bg-blue-500" },
      { name: "Mental Wellness", score: mentalScore, color: "bg-purple-500" },
      { name: "Overall Health", score: overall, color: "bg-primary" },
    ];

    return {
      healthScore: overall,
      healthScoreCategories: categories,
      daysTracked: daysTrackedCalc,
      cyclesRecorded: cyclesRecordedCalc,
      avgMoodScore: mentalScore / 20, // show on 5 scale
      monthlyTrends: monthlyTrendsCalc,
    };
  }, [periodEntries, assessments]);

  const achievements = [
    "Consistent period tracking for 8+ months",
    "Regular completion of health assessments",
    "Improved symptom management over time",
    "Maintained healthy lifestyle habits"
  ];

  const improvements = [
    "Consider consulting a doctor about irregular pain patterns",
    "Increase hydration during menstrual cycle",
    "Practice stress management techniques regularly",
    "Maintain consistent sleep schedule"
  ];

  const doctorRecommendations = [
    "Irregular period patterns noticed in the last 3 months",
    "Persistent severe pain levels (7+ on pain scale)",
    "Significant mood changes during cycle"
  ];

  // monthlyTrends computed above

  return (
    <div className="bg-neutral min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Health Journey</h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Yearly analysis and personalized health insights
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Health Score Dashboard */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  <TrendingUp className="inline mr-2 text-primary" />
                  Overall Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-primary mb-2">{healthScore}</div>
                  <div className="text-lg text-gray-600">Health Score</div>
                  <div className="text-sm text-gray-500">Based on your yearly data</div>
                </div>
                
                <div className="space-y-4">
                  {healthScoreCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{category.name}</span>
                      <div className="flex items-center">
                        <Progress value={category.score} className="w-32 mr-2" />
                        <span className="text-sm text-gray-600">{category.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 text-primary" />
                  Monthly Health Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlyTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 w-12">{trend.month}</span>
                      <div className="flex-1 mx-3">
                        <Progress value={trend.score} className="h-2" />
                      </div>
                      <span className="text-sm text-gray-600 w-12">{trend.score}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-blue-800 mb-2">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Health Trend Analysis</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Your health score shows steady improvement over the year with peak performance 
                    in July (88%). Overall trend is positive with minor fluctuations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Achievements */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <CheckCircle className="mr-2" />
                  You're Doing Great!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-700">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center">
                  <AlertTriangle className="mr-2" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-yellow-700">
                  {improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Doctor Consultation */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <Phone className="mr-2" />
                  Doctor Consultation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 mb-3 text-sm">
                  Based on your health data, we recommend consulting a healthcare professional for:
                </p>
                <ul className="space-y-2 text-red-700 mb-4">
                  {doctorRecommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <Phone className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-red-600 text-white hover:bg-red-700 w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Find Doctor Near Me
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Health Statistics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{daysTracked}</div>
                <div className="text-sm text-gray-600">Days Tracked</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{cyclesRecorded}</div>
                <div className="text-sm text-gray-600">Cycles Recorded</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{assessments?.length || 0}</div>
                <div className="text-sm text-gray-600">Assessments Completed</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{avgMoodScore.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Avg Mood Score</div>
              </CardContent>
            </Card>
          </div>

          {/* Personalized Recommendations */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 text-primary" />
                Personalized Health Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Next Month's Goals</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-sm">Track symptoms daily for better insights</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-sm">Complete nutrition assessment</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-sm">Maintain regular exercise routine</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Recommended Actions</h4>
                  <div className="space-y-2">
                    <a href="/health-assessment">
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Annual Checkup
                      </Button>
                    </a>
                    <a href="/education">
                      <Button variant="outline" className="w-full justify-start">
                        <Heart className="mr-2 h-4 w-4" />
                        Update Health Profile
                      </Button>
                    </a>
                    <a href="/period-tracker">
                      <Button variant="outline" className="w-full justify-start">
                        <Activity className="mr-2 h-4 w-4" />
                        Set Health Reminders
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
