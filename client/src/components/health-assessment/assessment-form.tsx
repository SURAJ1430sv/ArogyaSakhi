import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface AssessmentFormProps {
  type: string;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export default function AssessmentForm({ type, onSubmit, isLoading }: AssessmentFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const getFormQuestions = () => {
    switch (type) {
      case "menstrual":
        return [
          {
            step: 0,
            title: "Basic Information",
            questions: [
              {
                id: "age_group",
                label: "Age Group",
                type: "select",
                options: [
                  { value: "13-18", label: "13-18 years" },
                  { value: "19-25", label: "19-25 years" },
                  { value: "26-35", label: "26-35 years" },
                  { value: "36-45", label: "36-45 years" },
                  { value: "46+", label: "46+ years" }
                ]
              },
              {
                id: "cycle_length",
                label: "Average Cycle Length (days)",
                type: "number",
                placeholder: "28"
              }
            ]
          },
          {
            step: 1,
            title: "Symptoms & Experience",
            questions: [
              {
                id: "symptoms",
                label: "Common Symptoms (Select all that apply)",
                type: "checkbox",
                options: [
                  { value: "cramps", label: "Cramps" },
                  { value: "mood_swings", label: "Mood swings" },
                  { value: "bloating", label: "Bloating" },
                  { value: "headaches", label: "Headaches" },
                  { value: "fatigue", label: "Fatigue" },
                  { value: "irregular_periods", label: "Irregular periods" }
                ]
              },
              {
                id: "painLevel",
                label: "Pain Level",
                type: "radio",
                options: [
                  { value: "none", label: "No pain" },
                  { value: "mild", label: "Mild discomfort" },
                  { value: "moderate", label: "Moderate pain" },
                  { value: "severe", label: "Severe pain" }
                ]
              },
              {
                id: "cycleRegularity",
                label: "How regular is your cycle?",
                type: "radio",
                options: [
                  { value: "regular", label: "Very regular (same time each month)" },
                  { value: "somewhat-irregular", label: "Somewhat irregular (varies by a few days)" },
                  { value: "very-irregular", label: "Very irregular (varies significantly)" }
                ]
              },
              {
                id: "flowIntensity",
                label: "How would you describe your flow?",
                type: "radio",
                options: [
                  { value: "very-light", label: "Very light" },
                  { value: "light", label: "Light" },
                  { value: "normal", label: "Normal" },
                  { value: "heavy", label: "Heavy" },
                  { value: "very-heavy", label: "Very heavy" }
                ]
              }
            ]
          },
          {
            step: 2,
            title: "Additional Information",
            questions: [
              {
                id: "period_regularity",
                label: "How regular are your periods?",
                type: "radio",
                options: [
                  { value: "very_regular", label: "Very regular (within 1-2 days)" },
                  { value: "mostly_regular", label: "Mostly regular (within 3-4 days)" },
                  { value: "somewhat_irregular", label: "Somewhat irregular (within 5-7 days)" },
                  { value: "very_irregular", label: "Very irregular (more than 7 days)" }
                ]
              },
              {
                id: "additional_notes",
                label: "Additional Notes",
                type: "textarea",
                placeholder: "Any other concerns or observations..."
              }
            ]
          }
        ];

      case "hygiene":
        return [
          {
            step: 0,
            title: "Personal Hygiene Practices",
            questions: [
              {
                id: "bathing_frequency",
                label: "How often do you bathe/shower?",
                type: "select",
                options: [
                  { value: "daily", label: "Daily" },
                  { value: "every_other_day", label: "Every other day" },
                  { value: "2-3_times_week", label: "2-3 times per week" },
                  { value: "weekly", label: "Weekly" }
                ]
              },
              {
                id: "feminine_products",
                label: "What feminine hygiene products do you use?",
                type: "checkbox",
                options: [
                  { value: "sanitary_pads", label: "Sanitary pads" },
                  { value: "tampons", label: "Tampons" },
                  { value: "menstrual_cups", label: "Menstrual cups" },
                  { value: "cloth_pads", label: "Cloth pads" }
                ]
              }
            ]
          },
          {
            step: 1,
            title: "Hygiene Concerns",
            questions: [
              {
                id: "hygiene_concerns",
                label: "Do you have any hygiene-related concerns?",
                type: "checkbox",
                options: [
                  { value: "infections", label: "Frequent infections" },
                  { value: "odor", label: "Unusual odor" },
                  { value: "irritation", label: "Skin irritation" },
                  { value: "dryness", label: "Vaginal dryness" }
                ]
              },
              {
                id: "product_change_frequency",
                label: "How often do you change feminine hygiene products?",
                type: "select",
                options: [
                  { value: "2-3_hours", label: "Every 2-3 hours" },
                  { value: "4-6_hours", label: "Every 4-6 hours" },
                  { value: "6-8_hours", label: "Every 6-8 hours" },
                  { value: "longer", label: "Longer than 8 hours" }
                ]
              }
            ]
          }
        ];

      case "nutrition":
        return [
          {
            step: 0,
            title: "Dietary Habits",
            questions: [
              {
                id: "diet_type",
                label: "What type of diet do you follow?",
                type: "select",
                options: [
                  { value: "balanced", label: "Balanced diet" },
                  { value: "vegetarian", label: "Vegetarian" },
                  { value: "vegan", label: "Vegan" },
                  { value: "keto", label: "Keto" },
                  { value: "other", label: "Other" }
                ]
              },
              {
                id: "meals_per_day",
                label: "How many meals do you eat per day?",
                type: "select",
                options: [
                  { value: "1-2", label: "1-2 meals" },
                  { value: "3", label: "3 meals" },
                  { value: "4-5", label: "4-5 meals" },
                  { value: "6+", label: "6+ meals" }
                ]
              }
            ]
          },
          {
            step: 1,
            title: "Nutrition Concerns",
            questions: [
              {
                id: "nutrition_concerns",
                label: "Do you have any nutrition-related concerns?",
                type: "checkbox",
                options: [
                  { value: "anemia", label: "Anemia/Iron deficiency" },
                  { value: "weight_gain", label: "Weight gain" },
                  { value: "weight_loss", label: "Weight loss" },
                  { value: "digestive_issues", label: "Digestive issues" },
                  { value: "food_allergies", label: "Food allergies" }
                ]
              },
              {
                id: "waterIntake",
                label: "How much water do you drink daily?",
                type: "radio",
                options: [
                  { value: "high", label: "8+ glasses daily" },
                  { value: "moderate", label: "5-7 glasses daily" },
                  { value: "low", label: "Less than 5 glasses daily" }
                ]
              },
              {
                id: "ironIntake",
                label: "How often do you eat iron-rich foods (spinach, beans, meat)?",
                type: "radio",
                options: [
                  { value: "high", label: "Daily" },
                  { value: "moderate", label: "3-4 times per week" },
                  { value: "low", label: "Rarely or never" }
                ]
              },
              {
                id: "calciumIntake",
                label: "How often do you consume calcium-rich foods (dairy, leafy greens)?",
                type: "radio",
                options: [
                  { value: "high", label: "Daily" },
                  { value: "moderate", label: "3-4 times per week" },
                  { value: "low", label: "Rarely or never" }
                ]
              },
              {
                id: "exerciseHabits",
                label: "How often do you exercise?",
                type: "radio",
                options: [
                  { value: "regular", label: "5+ times per week" },
                  { value: "moderate", label: "3-4 times per week" },
                  { value: "light", label: "1-2 times per week" },
                  { value: "none", label: "Rarely or never" }
                ]
              },
              {
                id: "processedFood",
                label: "How often do you eat processed foods?",
                type: "radio",
                options: [
                  { value: "low", label: "Rarely" },
                  { value: "moderate", label: "Sometimes" },
                  { value: "high", label: "Daily" }
                ]
              }
            ]
          }
        ];

      case "mental":
        return [
          {
            step: 0,
            title: "Mental Health Assessment",
            questions: [
              {
                id: "stressLevel",
                label: "How would you rate your current stress level?",
                type: "radio",
                options: [
                  { value: "low", label: "Low stress" },
                  { value: "moderate", label: "Moderate stress" },
                  { value: "high", label: "High stress" }
                ]
              },
              {
                id: "sleepQuality",
                label: "How would you rate your sleep quality?",
                type: "radio",
                options: [
                  { value: "excellent", label: "Excellent (7-9 hours, restful)" },
                  { value: "good", label: "Good (6-8 hours, mostly restful)" },
                  { value: "fair", label: "Fair (5-7 hours, sometimes restless)" },
                  { value: "poor", label: "Poor (less than 5 hours or very restless)" }
                ]
              },
              {
                id: "moodChanges",
                label: "How severe are your mood changes during menstruation?",
                type: "radio",
                options: [
                  { value: "none", label: "No mood changes" },
                  { value: "mild", label: "Mild mood changes" },
                  { value: "moderate", label: "Moderate mood changes" },
                  { value: "severe", label: "Severe mood changes" }
                ]
              },
              {
                id: "anxietyLevel",
                label: "How would you rate your anxiety levels?",
                type: "radio",
                options: [
                  { value: "low", label: "Low anxiety" },
                  { value: "moderate", label: "Moderate anxiety" },
                  { value: "high", label: "High anxiety" }
                ]
              },
              {
                id: "socialSupport",
                label: "How much social support do you have?",
                type: "radio",
                options: [
                  { value: "strong", label: "Strong support network" },
                  { value: "moderate", label: "Moderate support" },
                  { value: "limited", label: "Limited support" },
                  { value: "none", label: "Little to no support" }
                ]
              }
            ]
          },
          {
            step: 1,
            title: "Emotional Wellbeing",
            questions: [
              {
                id: "mood_patterns",
                label: "How often do you experience mood swings?",
                type: "radio",
                options: [
                  { value: "rarely", label: "Rarely" },
                  { value: "sometimes", label: "Sometimes" },
                  { value: "often", label: "Often" },
                  { value: "always", label: "Always" }
                ]
              },
              {
                id: "mental_health_concerns",
                label: "Do you experience any of these?",
                type: "checkbox",
                options: [
                  { value: "anxiety", label: "Anxiety" },
                  { value: "depression", label: "Depression" },
                  { value: "panic_attacks", label: "Panic attacks" },
                  { value: "insomnia", label: "Insomnia" },
                  { value: "mood_swings", label: "Severe mood swings" }
                ]
              }
            ]
          }
        ];

      default:
        return [];
    }
  };

  const questions = getFormQuestions();
  const totalSteps = questions.length;
  const currentQuestions = questions[currentStep];

  const handleInputChange = (questionId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderQuestion = (question: any) => {
    switch (question.type) {
      case "select":
        return (
          <Select
            value={formData[question.id] || ""}
            onValueChange={(value) => handleInputChange(question.id, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${question.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {question.options.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={question.placeholder}
            value={formData[question.id] || ""}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
          />
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {question.options.map((option: any) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={formData[question.id]?.includes(option.value) || false}
                  onCheckedChange={(checked) => {
                    const currentValues = formData[question.id] || [];
                    if (checked) {
                      handleInputChange(question.id, [...currentValues, option.value]);
                    } else {
                      handleInputChange(question.id, currentValues.filter((v: string) => v !== option.value));
                    }
                  }}
                />
                <Label htmlFor={option.value} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            value={formData[question.id] || ""}
            onValueChange={(value) => handleInputChange(question.id, value)}
          >
            {question.options.map((option: any) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "slider":
        return (
          <div className="space-y-2">
            <Slider
              value={[formData[question.id] || question.min]}
              onValueChange={(value) => handleInputChange(question.id, value[0])}
              min={question.min}
              max={question.max}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>{question.min} - {question.min === 1 ? "Minimal" : "Low"}</span>
              <span>{question.max} - {question.max === 10 ? "Severe" : "High"}</span>
            </div>
            <div className="text-center text-sm font-medium">
              Current: {formData[question.id] || question.min}
            </div>
          </div>
        );

      case "textarea":
        return (
          <Textarea
            placeholder={question.placeholder}
            value={formData[question.id] || ""}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            rows={4}
          />
        );

      default:
        return null;
    }
  };

  if (!currentQuestions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
        </div>
        <Progress value={((currentStep + 1) / totalSteps) * 100} className="h-2" />
      </div>

      {/* Step Title */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          {currentQuestions.title}
        </h3>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {currentQuestions.questions.map((question: any) => (
          <div key={question.id} className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              {question.label}
            </Label>
            {renderQuestion(question)}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button onClick={handleNext} className="bg-primary text-white hover:bg-blue-600">
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary text-white hover:bg-blue-600"
          >
            {isLoading ? "Submitting..." : "Complete Assessment"}
          </Button>
        )}
      </div>
    </div>
  );
}
