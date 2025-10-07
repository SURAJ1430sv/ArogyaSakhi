import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Clock, 
  Phone, 
  ArrowDownRight,
  Hospital,
  Heart,
  Calendar,
  Building2
} from "lucide-react";

export default function Resources() {
  const [searchLocation, setSearchLocation] = useState("");
  const [serviceType, setServiceType] = useState("all");
  const [distance, setDistance] = useState("10");

  const { data: resources, isLoading } = useQuery({
    queryKey: ["/api/health-resources", serviceType === "all" ? undefined : serviceType],
  });

  const serviceTypes = [
    { value: "all", label: "All Services" },
    { value: "government", label: "Government Clinics" },
    { value: "ngo", label: "NGO Programs" },
    { value: "health_camp", label: "Health Camps" },
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "government":
        return Hospital;
      case "ngo":
        return Heart;
      case "health_camp":
        return Calendar;
      default:
        return Building2;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case "government":
        return "bg-green-100 text-green-800";
      case "ngo":
        return "bg-blue-100 text-blue-800";
      case "health_camp":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredResources = resources?.filter(resource => {
    if (serviceType !== "all" && resource.type !== serviceType) {
      return false;
    }
    if (searchLocation && !resource.address.toLowerCase().includes(searchLocation.toLowerCase())) {
      return false;
    }
    return true;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading health resources...</p>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Health Resources Near You</h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Find nearby healthcare facilities and support services
            </p>
          </div>
        </div>
      </section>

      {/* Search and Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="mr-2 text-primary" />
                  Find Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter your city or area"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="service-type">Service Type</Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="distance">Distance</Label>
                  <Select value={distance} onValueChange={setDistance}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Within 5 km</SelectItem>
                      <SelectItem value="10">Within 10 km</SelectItem>
                      <SelectItem value="25">Within 25 km</SelectItem>
                      <SelectItem value="50">Within 50 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-primary text-white hover:bg-blue-600">
                  <Search className="mr-2 h-4 w-4" />
                  Search Resources
                </Button>
              </CardContent>
            </Card>

            {/* Resource Listings */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Available Resources ({filteredResources.length})
                </h2>
                <p className="text-gray-600">
                  Healthcare facilities and services in your area
                </p>
              </div>

              <div className="space-y-4">
                {filteredResources.map((resource) => {
                  const Icon = getResourceIcon(resource.type);
                  
                  return (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <div className={`rounded-full w-8 h-8 flex items-center justify-center mr-3 ${getResourceColor(resource.type)}`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <h3 className="text-lg font-semibold text-gray-800">{resource.name}</h3>
                              <Badge className={`ml-2 ${getResourceColor(resource.type)}`}>
                                {resource.type.replace('_', ' ')}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-2">{resource.description}</p>
                            
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{resource.address} - {resource.distance} away</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{resource.hours}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <Button size="sm" className="bg-primary text-white hover:bg-blue-600">
                              <ArrowDownRight className="mr-1 h-4 w-4" />
                              ArrowDownRight
                            </Button>
                            {resource.phone && (
                              <Button size="sm" className="bg-secondary text-white hover:bg-green-600">
                                <Phone className="mr-1 h-4 w-4" />
                                Call
                              </Button>
                            )}
                            {resource.type === "health_camp" && (
                              <Button size="sm" className="bg-accent text-white hover:bg-orange-600">
                                <Calendar className="mr-1 h-4 w-4" />
                                Register
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredResources.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      No resources found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search criteria or location
                    </p>
                    <Button variant="outline">
                      Reset Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Quick Access
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Emergency contacts and important resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Emergency Helpline</h3>
                <p className="text-gray-600 mb-4">24/7 women's health emergency support</p>
                <Button className="bg-red-600 text-white hover:bg-red-700">
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Hospital className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Nearest Hospital</h3>
                <p className="text-gray-600 mb-4">Find the closest healthcare facility</p>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Locate
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Support Groups</h3>
                <p className="text-gray-600 mb-4">Connect with local women's support groups</p>
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  Join
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
