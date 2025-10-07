import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import AssessmentForm from "@/components/health-assessment/assessment-form";
import { useAuth } from "@/context/AuthContext";
import { 
  Heart, 
  Droplets, 
  Apple, 
  Brain, 
  ClipboardCheck, 
  TrendingUp,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export default function HealthAssessment() {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const userId = user?.id;

  const { data: assessments, isLoading } = useQuery({
    queryKey: ["/api/health-assessments", userId],
    enabled: !!userId,
  });

  const createAssessment = useMutation({
    mutationFn: async (assessmentData: any) => {
      return await apiRequest("POST", "/api/health-assessments", assessmentData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/health-assessments", userId] });
      toast({
        title: "Assessment Completed",
        description: "Your health assessment has been saved successfully",
      });
      setActiveAssessment(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save assessment",
        variant: "destructive",
      });
    },
  });

  const assessmentTypes = [
    {
      id: "menstrual",
      title: "Menstrual Health",
      description: "Track irregularities, pain levels, and cycle patterns",
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
      buttonColor: "bg-pink-500 hover:bg-pink-600"
    },
    {
      id: "hygiene",
      title: "Hygiene Check",
      description: "Personal hygiene practices and recommendations",
      icon: Droplets,
      color: "bg-blue-100 text-blue-600",
      buttonColor: "bg-blue-500 hover:bg-blue-600"
    },
    {
      id: "nutrition",
      title: "Nutrition",
      description: "Dietary habits and nutritional needs assessment",
      icon: Apple,
      color: "bg-green-100 text-green-600",
      buttonColor: "bg-green-500 hover:bg-green-600"
    },
    {
      id: "mental",
      title: "Mental Health",
      description: "Stress levels, mood patterns, and emotional wellbeing",
      icon: Brain,
      color: "bg-purple-100 text-purple-600",
      buttonColor: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  const getAssessmentsByType = (type: string) => {
    return assessments?.filter(assessment => assessment.type === type) || [];
  };

  const getLatestAssessment = (type: string) => {
    const typeAssessments = getAssessmentsByType(type);
    return typeAssessments.length > 0 ? typeAssessments[typeAssessments.length - 1] : null;
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to access health assessments</h2>
          <p className="text-gray-600">You need to be logged in to take health assessments and view your results.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading health assessments...</p>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Health Assessment Forms</h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Confidential health check-ups with personalized recommendations
            </p>
          </div>
        </div>
      </section>

      {/* Assessment Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {assessmentTypes.map((type) => {
              const latestAssessment = getLatestAssessment(type.id);
              const Icon = type.icon;
              
              return (
                <Card key={type.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${type.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center mb-4">{type.description}</p>
                    
                    {latestAssessment ? (
                      <div className="mb-4">
                        <div className="flex items-center justify-center mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-gray-600">Last completed</span>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{latestAssessment.score || 'N/A'}</div>
                          <div className="text-xs text-gray-500">Health Score</div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4 text-center">
                        <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-500">No assessment yet</span>
                      </div>
                    )}
                    
                    <Button
                      onClick={() => setActiveAssessment(type.id)}
                      className={`w-full text-white ${type.buttonColor}`}
                    >
                      Start Assessment
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Assessment Form Modal */}
          {activeAssessment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                      {assessmentTypes.find(t => t.id === activeAssessment)?.title} Assessment
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => setActiveAssessment(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <AssessmentForm
                    type={activeAssessment}
                    onSubmit={(data) => {
                      createAssessment.mutate({
                        userId,
                        type: activeAssessment,
                        responses: data,
                        score: Math.floor(Math.random() * 40) + 60, // Mock score
                        recommendations: ["Stay hydrated", "Get regular exercise", "Maintain healthy diet"]
                      });
                    }}
                    isLoading={createAssessment.isPending}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Assessment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardCheck className="mr-2 text-primary" />
                Assessment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {assessments && assessments.length > 0 ? (
                <div className="space-y-4">
                  {assessments.slice().reverse().map((assessment) => (
                    <div key={assessment.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            {assessment.type}
                          </Badge>
                          <span className="font-medium">
                            {assessmentTypes.find(t => t.id === assessment.type)?.title}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(assessment.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-primary mr-2" />
                          <span className="text-sm text-gray-600">Score: {assessment.score || 'N/A'}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ClipboardCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No assessments completed yet</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Complete your first assessment to start tracking your health
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
