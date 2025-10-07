import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, X, AlertTriangle, Hospital, Heart } from "lucide-react";

export default function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    {
      name: "Women's Helpline",
      number: "1091",
      description: "24/7 women's emergency helpline",
      icon: Phone,
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      name: "Medical Emergency",
      number: "108",
      description: "Emergency medical services",
      icon: Hospital,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Mental Health Crisis",
      number: "9152987821",
      description: "24/7 mental health support",
      icon: Heart,
      color: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <>
      {/* Emergency Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
          size="icon"
        >
          <Phone className="h-6 w-6" />
        </Button>
      </div>

      {/* Emergency Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="bg-red-600 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`rounded-full w-12 h-12 flex items-center justify-center ${contact.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                        <p className="text-sm text-gray-600">{contact.description}</p>
                      </div>
                      <Button
                        onClick={() => handleCall(contact.number)}
                        className={`${contact.color} text-white`}
                        size="sm"
                      >
                        {contact.number}
                      </Button>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">
                      Important Notice
                    </h4>
                    <p className="text-sm text-yellow-700">
                      In case of immediate danger or life-threatening emergency, 
                      call your local emergency services (911, 112, or your local emergency number).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
