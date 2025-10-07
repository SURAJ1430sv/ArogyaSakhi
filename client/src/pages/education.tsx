import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MythBuster from "@/components/education/myth-buster";
import { BookOpen, Shield, Heart, Search } from "lucide-react";

export default function Education() {
  const { data: educationalContent } = useQuery({
    queryKey: ["/api/educational-content"],
  });

  const categories = [
    {
      id: "pcod_pcos",
      title: "PCOD & PCOS Awareness",
      description: "Understanding polycystic ovary syndrome, symptoms, and management strategies.",
      icon: Heart,
      color: "bg-pink-50 text-pink-600",
      buttonColor: "bg-pink-500 hover:bg-pink-600"
    },
    {
      id: "breast_cancer",
      title: "Breast Cancer Prevention",
      description: "Early detection techniques and prevention strategies for breast health.",
      icon: Shield,
      color: "bg-red-50 text-red-600",
      buttonColor: "bg-red-500 hover:bg-red-600"
    },
    {
      id: "menstrual_health",
      title: "Menstrual Health & Hygiene",
      description: "Complete guide to menstrual cycle, hygiene practices, and pain management.",
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
      buttonColor: "bg-blue-500 hover:bg-blue-600"
    }
  ];

  const getContentByCategory = (category: string) => {
    return educationalContent?.filter(content => content.category === category) || [];
  };

  const getArticles = (category: string) => {
    return getContentByCategory(category).filter(content => content.type === "article");
  };

  const getMythBusters = (category: string) => {
    return getContentByCategory(category).filter(content => content.type === "myth_buster");
  };

  return (
    <div className="bg-neutral min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Health Education Hub</h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Comprehensive information to break myths and build awareness about women's health
            </p>
          </div>
        </div>
      </section>

      {/* Education Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {categories.map((category) => {
              const articles = getArticles(category.id);
              const Icon = category.icon;
              
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${category.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="space-y-2 mb-4">
                      {articles.slice(0, 3).map((article, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                          <span>{article.title}</span>
                        </div>
                      ))}
                    </div>
                    <Button className={`w-full text-white ${category.buttonColor}`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed Content Tabs */}
          <Tabs defaultValue="pcod_pcos" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pcod_pcos">PCOD & PCOS</TabsTrigger>
              <TabsTrigger value="breast_cancer">Breast Cancer</TabsTrigger>
              <TabsTrigger value="menstrual_health">Menstrual Health</TabsTrigger>
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Articles */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      Articles & Guides
                    </h3>
                    <div className="space-y-6">
                      {getArticles(category.id).map((article) => (
                        <Card key={article.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <h4 className="text-lg font-semibold text-gray-800">{article.title}</h4>
                              <Badge variant="outline">Article</Badge>
                            </div>
                            <p className="text-gray-600 mb-4">{article.content}</p>
                            <Button variant="outline" size="sm">
                              Read Full Article
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Myth Busters */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      Myth Busters
                    </h3>
                    <MythBuster myths={getMythBusters(category.id)} />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about women's health
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What is the difference between PCOD and PCOS?",
                  answer: "PCOD (Polycystic Ovarian Disease) is a condition where ovaries produce many immature eggs. PCOS (Polycystic Ovary Syndrome) is a metabolic disorder with hormonal imbalances."
                },
                {
                  question: "How often should I do breast self-examinations?",
                  answer: "It's recommended to perform breast self-examinations monthly, preferably a few days after your period ends when breasts are less tender."
                },
                {
                  question: "Is it normal to have irregular periods?",
                  answer: "Occasional irregularities are normal, but persistent irregularities lasting more than 3 months should be evaluated by a healthcare provider."
                },
                {
                  question: "Can I exercise during my period?",
                  answer: "Yes, light to moderate exercise can actually help reduce period pain and improve mood. Listen to your body and adjust intensity as needed."
                }
              ].map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
