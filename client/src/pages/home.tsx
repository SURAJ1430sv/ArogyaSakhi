import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Users, 
  BookOpen, 
  MapPin, 
  Award, 
  Calendar,
  HeartHandshake,
  Apple,
  Dumbbell,
  Heart
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const { data: healthTips } = useQuery({
    queryKey: ["/api/health-tips"],
  });

  const quickStats = [
    { icon: Users, label: "Women Empowered", value: "50K+", color: "bg-blue-50 text-blue-600" },
    { icon: BookOpen, label: "Health Articles", value: "100+", color: "bg-green-50 text-green-600" },
    { icon: MapPin, label: "Health Centers", value: "500+", color: "bg-orange-50 text-orange-600" },
    { icon: Award, label: "Support Available", value: "24/7", color: "bg-purple-50 text-purple-600" },
  ];

  const tipCategories = [
    { category: "nutrition", icon: Apple, color: "text-green-600", borderColor: "border-green-400" },
    { category: "exercise", icon: Dumbbell, color: "text-blue-600", borderColor: "border-blue-400" },
    { category: "mental", icon: Heart, color: "text-purple-600", borderColor: "border-purple-400" },
  ];

  return (
    <div className="bg-neutral">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome back, {user?.username}!
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-pink-100">
              Your trusted companion for menstrual health, PCOD/PCOS awareness, and overall wellness
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/period-tracker">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Calendar className="mr-2 h-5 w-5" />
                  Track Your Period
                </Button>
              </Link>
              <Link href="/education">
                <Button size="lg" className="bg-secondary text-white hover:bg-green-600">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Learn About Health
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Health Tips */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Daily Health Tips
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Personalized wellness advice for your healthy lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tipCategories.map((category, index) => {
              const categoryTips = healthTips?.filter(tip => tip.category === category.category) || [];
              
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 ${category.color} bg-opacity-10`}>
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center capitalize">
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {categoryTips.slice(0, 3).map((tip, tipIndex) => (
                        <div key={tipIndex} className={`border-l-4 ${category.borderColor} pl-3`}>
                          <p className="text-sm text-gray-600">{tip.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Start Your Health Journey Today
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take control of your health with our comprehensive tools and resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/period-tracker">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Period Tracker</h3>
                  <p className="text-gray-600">Monitor your cycle and symptoms</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/health-assessment">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <HeartHandshake className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Health Assessment</h3>
                  <p className="text-gray-600">Complete personalized health forms</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/education">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Education Hub</h3>
                  <p className="text-gray-600">Learn about women's health</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/resources">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Find Resources</h3>
                  <p className="text-gray-600">Locate nearby health services</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
