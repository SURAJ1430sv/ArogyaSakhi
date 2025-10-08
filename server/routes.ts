import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertPeriodEntrySchema, 
  insertHealthAssessmentSchema,
  insertHealthTipSchema,
  insertHealthResourceSchema,
  insertEducationalContentSchema
} from "@shared/schema";

// Health assessment scoring algorithm
function calculateHealthScore(type: string, responses: Record<string, any>): { score: number; recommendations: string[] } {
  switch (type) {
    case "menstrual":
      return calculateMenstrualScore(responses);
    case "hygiene":
      return calculateHygieneScore(responses);
    case "nutrition":
      return calculateNutritionScore(responses);
    case "mental":
      return calculateMentalScore(responses);
    default:
      return { score: 50, recommendations: ["Please complete a comprehensive health assessment for personalized recommendations."] };
  }
}

function calculateMenstrualScore(responses: Record<string, any>): { score: number; recommendations: string[] } {
  let score = 100;
  let recommendations: string[] = [];
  
  // Cycle regularity (30 points)
  if (responses.cycleRegularity === "very-irregular") {
    score -= 25;
    recommendations.push("Irregular cycles may indicate hormonal imbalances. Consider consulting a gynecologist.");
  } else if (responses.cycleRegularity === "somewhat-irregular") {
    score -= 15;
    recommendations.push("Track your cycle for 3 months to identify patterns and discuss with your healthcare provider.");
  }
  
  // Flow intensity (20 points)
  if (responses.flowIntensity === "very-heavy") {
    score -= 20;
    recommendations.push("Very heavy periods may indicate conditions like fibroids or endometriosis. Seek medical evaluation.");
  } else if (responses.flowIntensity === "heavy") {
    score -= 10;
    recommendations.push("Heavy periods can be managed with proper nutrition and medical guidance if needed.");
  }
  
  // Pain level (25 points)
  if (responses.painLevel === "severe") {
    score -= 25;
    recommendations.push("Severe menstrual pain is not normal. Consider evaluation for endometriosis or other conditions.");
  } else if (responses.painLevel === "moderate") {
    score -= 15;
    recommendations.push("Moderate pain can be managed with heat therapy, exercise, and anti-inflammatory medications.");
  }
  
  score = Math.max(0, score);
  
  if (score >= 80) {
    recommendations.unshift("Excellent menstrual health! Continue your healthy practices.");
  } else if (score >= 60) {
    recommendations.unshift("Good menstrual health with room for improvement.");
  } else {
    recommendations.unshift("Your menstrual health needs attention. Consider lifestyle changes and medical consultation.");
  }
  
  return { score, recommendations };
}

function calculateHygieneScore(responses: Record<string, any>): { score: number; recommendations: string[] } {
  let score = 100;
  let recommendations: string[] = [];
  
  if (responses.changeFrequency === "rarely") {
    score -= 40;
    recommendations.push("Change menstrual products every 4-6 hours to prevent infections.");
  }
  
  const practices = responses.hygienePractices || [];
  if (!practices.includes("wash-hands")) {
    score -= 15;
    recommendations.push("Always wash hands before and after changing menstrual products.");
  }
  
  score = Math.max(0, score);
  
  if (score >= 80) {
    recommendations.unshift("Excellent hygiene practices!");
  } else {
    recommendations.unshift("Your hygiene practices need improvement.");
  }
  
  return { score, recommendations };
}

function calculateNutritionScore(responses: Record<string, any>): { score: number; recommendations: string[] } {
  let score = 100;
  let recommendations: string[] = [];
  
  if (responses.ironIntake === "low") {
    score -= 25;
    recommendations.push("Increase iron-rich foods like leafy greens, beans, and lean meats.");
  }
  
  if (responses.waterIntake === "low") {
    score -= 20;
    recommendations.push("Aim for 8-10 glasses of water daily to reduce bloating.");
  }
  
  score = Math.max(0, score);
  
  if (score >= 80) {
    recommendations.unshift("Excellent nutritional habits!");
  } else {
    recommendations.unshift("Your nutrition needs attention to support better menstrual health.");
  }
  
  return { score, recommendations };
}

function calculateMentalScore(responses: Record<string, any>): { score: number; recommendations: string[] } {
  let score = 100;
  let recommendations: string[] = [];
  
  if (responses.stressLevel === "high") {
    score -= 30;
    recommendations.push("High stress can worsen menstrual symptoms. Consider stress management techniques.");
  }
  
  if (responses.sleepQuality === "poor") {
    score -= 25;
    recommendations.push("Poor sleep affects hormones. Aim for 7-9 hours of quality sleep nightly.");
  }
  
  score = Math.max(0, score);
  
  if (score >= 80) {
    recommendations.unshift("Excellent mental wellness!");
  } else {
    recommendations.unshift("Your mental wellness needs attention. Consider seeking professional support.");
  }
  
  return { score, recommendations };
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.json({ user: { id: user.id, email: user.email, username: user.username } });
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      res.json({ user: { id: user.id, email: user.email, username: user.username } });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Period tracking routes
  app.get("/api/period-entries/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const entries = await storage.getPeriodEntries(userId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch period entries" });
    }
  });

  app.post("/api/period-entries", async (req, res) => {
    try {
      const entryData = insertPeriodEntrySchema.parse(req.body);
      const entry = await storage.createPeriodEntry(entryData);
      res.json(entry);
    } catch (error) {
      res.status(400).json({ error: "Invalid period entry data" });
    }
  });

  app.put("/api/period-entries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const entry = await storage.updatePeriodEntry(id, updates);
      if (!entry) {
        return res.status(404).json({ error: "Period entry not found" });
      }
      res.json(entry);
    } catch (error) {
      res.status(500).json({ error: "Failed to update period entry" });
    }
  });

  app.delete("/api/period-entries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePeriodEntry(id);
      if (!deleted) {
        return res.status(404).json({ error: "Period entry not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete period entry" });
    }
  });

  // Health assessment routes
  app.get("/api/health-assessments/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const assessments = await storage.getHealthAssessments(userId);
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch health assessments" });
    }
  });

  app.post("/api/health-assessments", async (req, res) => {
    try {
      const assessmentData = insertHealthAssessmentSchema.parse(req.body);
      
      // Calculate proper score based on assessment type and responses
      const analysisResult = calculateHealthScore(assessmentData.type, assessmentData.responses || {});
      
      const fullAssessmentData = {
        ...assessmentData,
        score: analysisResult.score,
        recommendations: analysisResult.recommendations
      };
      
      const assessment = await storage.createHealthAssessment(fullAssessmentData);
      res.json(assessment);
    } catch (error) {
      res.status(400).json({ error: "Invalid health assessment data" });
    }
  });

  // Health tips routes
  app.get("/api/health-tips", async (req, res) => {
    try {
      const category = req.query.category as string;
      const tips = await storage.getHealthTips(category);
      res.json(tips);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch health tips" });
    }
  });

  app.post("/api/health-tips", async (req, res) => {
    try {
      const tipData = insertHealthTipSchema.parse(req.body);
      const tip = await storage.createHealthTip(tipData);
      res.json(tip);
    } catch (error) {
      res.status(400).json({ error: "Invalid health tip data" });
    }
  });

  // Health resources routes
  app.get("/api/health-resources", async (req, res) => {
    try {
      const type = req.query.type as string;
      const resources = await storage.getHealthResources(type);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch health resources" });
    }
  });

  app.post("/api/health-resources", async (req, res) => {
    try {
      const resourceData = insertHealthResourceSchema.parse(req.body);
      const resource = await storage.createHealthResource(resourceData);
      res.json(resource);
    } catch (error) {
      res.status(400).json({ error: "Invalid health resource data" });
    }
  });

  // Educational content routes
  app.get("/api/educational-content", async (req, res) => {
    try {
      const category = req.query.category as string;
      let content = await storage.getEducationalContent(category);
      if (!content || content.length === 0) {
        // Seed a minimal set of educational articles if the store is empty (useful for new DBs)
        const seedItems = [
          {
            category: "pcod_pcos",
            title: "Understanding PCOD & PCOS",
            content:
              "PCOS is a hormonal disorder affecting 1 in 10 women. Learn symptoms, diagnosis and management strategies.",
            type: "article" as const,
          },
          {
            category: "pcod_pcos",
            title: "Managing PCOS Naturally",
            content:
              "Lifestyle changes like regular exercise, balanced diet, and stress management can improve PCOS symptoms.",
            type: "article" as const,
          },
          {
            category: "breast_cancer",
            title: "Breast Cancer Prevention & Early Detection",
            content:
              "Perform monthly self-exams and follow screening guidelines. Early detection significantly improves outcomes.",
            type: "article" as const,
          },
          {
            category: "menstrual_health",
            title: "Complete Menstrual Health Guide",
            content:
              "Understand your cycle, track symptoms, practice good hygiene, and know when to seek medical advice.",
            type: "article" as const,
          },
          {
            category: "menstrual_health",
            title: "You can't exercise during periods",
            content:
              "Myth: Light to moderate exercise can reduce cramps and improve mood during menstruation.",
            type: "myth_buster" as const,
          },
        ];

        for (const item of seedItems) {
          try {
            await storage.createEducationalContent(item as any);
          } catch {}
        }
        content = await storage.getEducationalContent(category);
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch educational content" });
    }
  });

  app.post("/api/educational-content", async (req, res) => {
    try {
      const contentData = insertEducationalContentSchema.parse(req.body);
      const content = await storage.createEducationalContent(contentData);
      res.json(content);
    } catch (error) {
      res.status(400).json({ error: "Invalid educational content data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
