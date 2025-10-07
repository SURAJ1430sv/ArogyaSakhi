import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, X, Check } from "lucide-react";

interface Myth {
  id: number;
  title: string;
  content: string;
  type: string;
  category: string;
}

interface MythBusterProps {
  myths: Myth[];
}

export default function MythBuster({ myths }: MythBusterProps) {
  // Default myths if none provided
  const defaultMyths = [
    {
      id: 1,
      title: "You can't exercise during periods",
      content: "Light exercise can actually help reduce period pain and improve mood.",
      type: "myth_buster",
      category: "menstrual_health"
    },
    {
      id: 2,
      title: "PCOS means you can't get pregnant",
      content: "With proper treatment, many women with PCOS can conceive naturally.",
      type: "myth_buster",
      category: "pcod_pcos"
    },
    {
      id: 3,
      title: "Breast cancer only affects older women",
      content: "While risk increases with age, breast cancer can affect women of all ages.",
      type: "myth_buster",
      category: "breast_cancer"
    },
    {
      id: 4,
      title: "Irregular periods are always normal",
      content: "Persistent irregularities should be evaluated by a healthcare provider.",
      type: "myth_buster",
      category: "menstrual_health"
    }
  ];

  const mythsToShow = myths.length > 0 ? myths : defaultMyths;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "menstrual_health":
        return "bg-pink-100 text-pink-800";
      case "pcod_pcos":
        return "bg-purple-100 text-purple-800";
      case "breast_cancer":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-center text-red-800 flex items-center justify-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Myth Busters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-red-700 text-sm mb-6">
            Separating fact from fiction in women's health
          </p>
          
          <div className="space-y-4">
            {mythsToShow.map((myth) => (
              <div key={myth.id} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={getCategoryColor(myth.category)}>
                    {myth.category.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {/* Myth */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <X className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-800 mb-1">
                        Myth: "{myth.title}"
                      </h4>
                    </div>
                  </div>
                  
                  {/* Fact */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-green-800">
                        <span className="font-semibold">Fact:</span> {myth.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Educational Note */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">
                Why Myth-Busting Matters
              </h4>
              <p className="text-blue-700 text-sm">
                Misinformation about women's health can lead to unnecessary anxiety, 
                delayed medical care, and poor health decisions. Always consult with 
                healthcare professionals for personalized advice and trust evidence-based 
                information from reliable sources.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
