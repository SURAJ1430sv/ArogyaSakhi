// This file contains mock data for development and testing purposes
// In a production environment, this would be replaced with real API calls

export const mockHealthTips = [
  {
    id: 1,
    category: "nutrition",
    title: "Stay Hydrated",
    content: "💧 Drink at least 8 glasses of water daily to stay hydrated and reduce bloating during periods.",
    isDaily: true,
    createdAt: new Date()
  },
  {
    id: 2,
    category: "nutrition",
    title: "Iron-Rich Foods",
    content: "🥬 Include iron-rich foods like spinach, lentils, and lean meat to prevent anemia.",
    isDaily: false,
    createdAt: new Date()
  },
  {
    id: 3,
    category: "nutrition",
    title: "Calcium Intake",
    content: "🥛 Consume calcium-rich foods like dairy products to strengthen bones and reduce PMS symptoms.",
    isDaily: false,
    createdAt: new Date()
  },
  {
    id: 4,
    category: "exercise",
    title: "Daily Walk",
    content: "🚶‍♀️ Take a 30-minute walk daily to boost mood and reduce period pain naturally.",
    isDaily: true,
    createdAt: new Date()
  },
  {
    id: 5,
    category: "exercise",
    title: "Yoga Practice",
    content: "🧘‍♀️ Practice yoga poses like child's pose and cat-cow to relieve menstrual cramps.",
    isDaily: false,
    createdAt: new Date()
  },
  {
    id: 6,
    category: "exercise",
    title: "Strength Training",
    content: "💪 Include strength training 2-3 times weekly to improve bone density and muscle strength.",
    isDaily: false,
    createdAt: new Date()
  },
  {
    id: 7,
    category: "mental",
    title: "Deep Breathing",
    content: "😌 Practice deep breathing exercises to manage stress and anxiety during hormonal changes.",
    isDaily: true,
    createdAt: new Date()
  },
  {
    id: 8,
    category: "mental",
    title: "Mood Journal",
    content: "📝 Keep a mood journal to track emotional patterns and identify triggers.",
    isDaily: false,
    createdAt: new Date()
  },
  {
    id: 9,
    category: "mental",
    title: "Quality Sleep",
    content: "🛌 Maintain 7-9 hours of quality sleep to support hormonal balance and mental health.",
    isDaily: true,
    createdAt: new Date()
  }
];

export const mockHealthResources = [
  {
    id: 1,
    name: "City Women's Health Center",
    type: "government",
    description: "Comprehensive women's health services including gynecology, family planning, and maternal care.",
    address: "123 Health Street, City Center",
    phone: "+1-555-0123",
    hours: "Mon-Fri: 9 AM - 5 PM | Sat: 9 AM - 1 PM",
    distance: "2.5 km",
    createdAt: new Date()
  },
  {
    id: 2,
    name: "Mahila Swasthya NGO",
    type: "ngo",
    description: "Free health checkups, awareness programs, and support for women's health issues.",
    address: "456 Community Hall, West District",
    phone: "+1-555-0124",
    hours: "Mon-Sat: 10 AM - 4 PM | Free consultations",
    distance: "3.2 km",
    createdAt: new Date()
  },
  {
    id: 3,
    name: "Monthly Health Camp",
    type: "health_camp",
    description: "Monthly health screening camp for women with focus on reproductive health and cancer screening.",
    address: "789 School Ground, East Area",
    phone: "+1-555-0125",
    hours: "Next camp: 25th December | 9 AM - 3 PM",
    distance: "4.1 km",
    createdAt: new Date()
  },
  {
    id: 4,
    name: "Women's Wellness Clinic",
    type: "government",
    description: "Specialized clinic for women's health issues including PCOS, reproductive health, and wellness programs.",
    address: "321 Medical Square, North Zone",
    phone: "+1-555-0126",
    hours: "Mon-Fri: 8 AM - 6 PM | Sat: 9 AM - 2 PM",
    distance: "1.8 km",
    createdAt: new Date()
  },
  {
    id: 5,
    name: "Shakti Women's Support",
    type: "ngo",
    description: "Counseling services, support groups, and health education programs for women.",
    address: "654 Community Center, South Area",
    phone: "+1-555-0127",
    hours: "Mon-Fri: 10 AM - 5 PM | Evening sessions available",
    distance: "5.2 km",
    createdAt: new Date()
  }
];

export const mockEducationalContent = [
  {
    id: 1,
    category: "pcod_pcos",
    title: "Understanding PCOD & PCOS",
    content: "Polycystic ovary syndrome (PCOS) is a hormonal disorder common among women of reproductive age. It affects 1 in 10 women of childbearing age and can cause irregular periods, excess hair growth, acne, and obesity.",
    type: "article",
    createdAt: new Date()
  },
  {
    id: 2,
    category: "pcod_pcos",
    title: "Managing PCOS Naturally",
    content: "While PCOS cannot be cured, it can be managed through lifestyle changes including regular exercise, healthy diet, weight management, and stress reduction techniques.",
    type: "article",
    createdAt: new Date()
  },
  {
    id: 3,
    category: "breast_cancer",
    title: "Breast Cancer Prevention",
    content: "Early detection and prevention strategies for maintaining breast health include regular self-examinations, mammograms after age 40, maintaining a healthy weight, and limiting alcohol consumption.",
    type: "article",
    createdAt: new Date()
  },
  {
    id: 4,
    category: "breast_cancer",
    title: "Breast Self-Examination Guide",
    content: "Learn how to perform monthly breast self-examinations to detect any changes early. The best time is 3-5 days after your period ends when breasts are least tender.",
    type: "article",
    createdAt: new Date()
  },
  {
    id: 5,
    category: "menstrual_health",
    title: "Menstrual Health Guide",
    content: "Complete guide to understanding menstrual cycle, maintaining hygiene, and managing period pain naturally through diet, exercise, and proper self-care.",
    type: "article",
    createdAt: new Date()
  },
  {
    id: 6,
    category: "menstrual_health",
    title: "You can't exercise during periods",
    content: "Light exercise can actually help reduce period pain and improve mood. Activities like walking, yoga, and swimming are beneficial during menstruation.",
    type: "myth_buster",
    createdAt: new Date()
  },
  {
    id: 7,
    category: "pcod_pcos",
    title: "PCOS means you can't get pregnant",
    content: "With proper treatment and lifestyle changes, many women with PCOS can conceive naturally. Medical treatments can help regulate ovulation.",
    type: "myth_buster",
    createdAt: new Date()
  },
  {
    id: 8,
    category: "breast_cancer",
    title: "Breast cancer only affects older women",
    content: "While the risk increases with age, breast cancer can affect women of all ages. Young women should also be aware of changes in their breasts.",
    type: "myth_buster",
    createdAt: new Date()
  },
  {
    id: 9,
    category: "menstrual_health",
    title: "Irregular periods are always normal",
    content: "While some irregularity is normal, persistent changes in menstrual patterns should be evaluated by a healthcare provider to rule out underlying conditions.",
    type: "myth_buster",
    createdAt: new Date()
  }
];

export const mockFAQs = [
  {
    id: 1,
    question: "What is the difference between PCOD and PCOS?",
    answer: "PCOD (Polycystic Ovarian Disease) is a condition where ovaries produce many immature eggs. PCOS (Polycystic Ovary Syndrome) is a metabolic disorder with hormonal imbalances.",
    category: "pcod_pcos"
  },
  {
    id: 2,
    question: "How often should I do breast self-examinations?",
    answer: "It's recommended to perform breast self-examinations monthly, preferably a few days after your period ends when breasts are less tender.",
    category: "breast_cancer"
  },
  {
    id: 3,
    question: "Is it normal to have irregular periods?",
    answer: "Occasional irregularities are normal, but persistent irregularities lasting more than 3 months should be evaluated by a healthcare provider.",
    category: "menstrual_health"
  },
  {
    id: 4,
    question: "Can I exercise during my period?",
    answer: "Yes, light to moderate exercise can actually help reduce period pain and improve mood. Listen to your body and adjust intensity as needed.",
    category: "menstrual_health"
  },
  {
    id: 5,
    question: "What foods should I eat during my period?",
    answer: "Focus on iron-rich foods, calcium sources, complex carbohydrates, and plenty of water. Avoid excessive caffeine and processed foods.",
    category: "nutrition"
  }
];

export const mockAssessmentRecommendations = {
  menstrual: [
    "Track your cycle regularly to identify patterns",
    "Maintain a healthy diet rich in iron and calcium",
    "Stay hydrated throughout your cycle",
    "Practice stress management techniques",
    "Consult a healthcare provider if irregularities persist"
  ],
  hygiene: [
    "Change feminine products regularly (every 4-6 hours)",
    "Choose breathable, cotton underwear",
    "Maintain proper intimate hygiene",
    "Avoid douching or harsh soaps",
    "Seek medical advice for persistent infections"
  ],
  nutrition: [
    "Eat a balanced diet with plenty of fruits and vegetables",
    "Include iron-rich foods to prevent anemia",
    "Stay hydrated with at least 8 glasses of water daily",
    "Limit processed foods and excessive caffeine",
    "Consider nutritional supplements if needed"
  ],
  mental: [
    "Practice regular stress management techniques",
    "Maintain a consistent sleep schedule",
    "Stay physically active for mental wellness",
    "Consider talking to a mental health professional",
    "Build a strong support network"
  ]
};
