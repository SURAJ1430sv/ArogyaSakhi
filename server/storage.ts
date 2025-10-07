import { 
  users, 
  periodEntries, 
  healthAssessments, 
  healthTips, 
  healthResources, 
  educationalContent,
  type User, 
  type InsertUser,
  type PeriodEntry,
  type InsertPeriodEntry,
  type HealthAssessment,
  type InsertHealthAssessment,
  type HealthTip,
  type InsertHealthTip,
  type HealthResource,
  type InsertHealthResource,
  type EducationalContent,
  type InsertEducationalContent
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Period tracking methods
  getPeriodEntries(userId: number): Promise<PeriodEntry[]>;
  createPeriodEntry(entry: InsertPeriodEntry): Promise<PeriodEntry>;
  updatePeriodEntry(id: number, entry: Partial<PeriodEntry>): Promise<PeriodEntry | undefined>;
  deletePeriodEntry(id: number): Promise<boolean>;
  
  // Health assessment methods
  getHealthAssessments(userId: number): Promise<HealthAssessment[]>;
  createHealthAssessment(assessment: InsertHealthAssessment): Promise<HealthAssessment>;
  
  // Health tips methods
  getHealthTips(category?: string): Promise<HealthTip[]>;
  createHealthTip(tip: InsertHealthTip): Promise<HealthTip>;
  
  // Health resources methods
  getHealthResources(type?: string): Promise<HealthResource[]>;
  createHealthResource(resource: InsertHealthResource): Promise<HealthResource>;
  
  // Educational content methods
  getEducationalContent(category?: string): Promise<EducationalContent[]>;
  createEducationalContent(content: InsertEducationalContent): Promise<EducationalContent>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private periodEntries: Map<number, PeriodEntry> = new Map();
  private healthAssessments: Map<number, HealthAssessment> = new Map();
  private healthTips: Map<number, HealthTip> = new Map();
  private healthResources: Map<number, HealthResource> = new Map();
  private educationalContent: Map<number, EducationalContent> = new Map();
  
  private currentUserId = 1;
  private currentPeriodEntryId = 1;
  private currentHealthAssessmentId = 1;
  private currentHealthTipId = 1;
  private currentHealthResourceId = 1;
  private currentEducationalContentId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize health tips
    const healthTipsData = [
      {
        id: this.currentHealthTipId++,
        category: "nutrition",
        title: "Stay Hydrated",
        content: "Drink at least 8 glasses of water daily to stay hydrated and reduce bloating during periods.",
        isDaily: true,
        createdAt: new Date()
      },
      {
        id: this.currentHealthTipId++,
        category: "nutrition",
        title: "Iron-Rich Foods",
        content: "Include iron-rich foods like spinach, lentils, and lean meat to prevent anemia.",
        isDaily: false,
        createdAt: new Date()
      },
      {
        id: this.currentHealthTipId++,
        category: "exercise",
        title: "Daily Walk",
        content: "Take a 30-minute walk daily to boost mood and reduce period pain naturally.",
        isDaily: true,
        createdAt: new Date()
      },
      {
        id: this.currentHealthTipId++,
        category: "mental",
        title: "Deep Breathing",
        content: "Practice deep breathing exercises to manage stress and anxiety during hormonal changes.",
        isDaily: true,
        createdAt: new Date()
      }
    ];

    healthTipsData.forEach(tip => this.healthTips.set(tip.id, tip));

    // Initialize health resources
    const healthResourcesData = [
      {
        id: this.currentHealthResourceId++,
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
        id: this.currentHealthResourceId++,
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
        id: this.currentHealthResourceId++,
        name: "Monthly Health Camp",
        type: "health_camp",
        description: "Monthly health screening camp for women with focus on reproductive health and cancer screening.",
        address: "789 School Ground, East Area",
        phone: "+1-555-0125",
        hours: "Next camp: 25th December | 9 AM - 3 PM",
        distance: "4.1 km",
        createdAt: new Date()
      }
    ];

    healthResourcesData.forEach(resource => this.healthResources.set(resource.id, resource));

    // Initialize educational content
    const educationalContentData = [
      {
        id: this.currentEducationalContentId++,
        category: "pcod_pcos",
        title: "Understanding PCOD & PCOS",
        content: "Polycystic ovary syndrome (PCOS) is a hormonal disorder affecting 1 in 10 women of reproductive age. It's characterized by irregular periods, excess hair growth, acne, and weight gain. PCOS can be managed through lifestyle changes including regular exercise, healthy diet, and stress management. Early diagnosis and treatment are crucial for managing symptoms and preventing long-term complications like diabetes and heart disease.",
        type: "article",
        createdAt: new Date()
      },
      {
        id: this.currentEducationalContentId++,
        category: "pcod_pcos",
        title: "Managing PCOS Naturally",
        content: "While PCOS cannot be cured, it can be effectively managed through lifestyle modifications. Regular exercise helps improve insulin sensitivity and hormone balance. A balanced diet rich in whole foods, lean proteins, and complex carbohydrates can help regulate blood sugar levels. Stress management techniques like yoga and meditation can also improve symptoms. Weight management is crucial as even a 5-10% weight loss can significantly improve symptoms.",
        type: "article",
        createdAt: new Date()
      },
      {
        id: this.currentEducationalContentId++,
        category: "breast_cancer",
        title: "Breast Cancer Prevention & Early Detection",
        content: "Breast cancer is the second most common cancer in women, but early detection significantly improves outcomes. Perform monthly breast self-examinations 3-5 days after your period ends. Look for changes in breast size, shape, skin texture, or nipple discharge. Clinical breast exams should be done annually after age 20, and mammograms are recommended starting at age 40. Risk factors include family history, age, and lifestyle factors. Maintaining a healthy weight, limiting alcohol, and staying physically active can reduce risk.",
        type: "article",
        createdAt: new Date()
      },
      {
        id: this.currentEducationalContentId++,
        category: "breast_cancer",
        title: "Breast Self-Examination Guide",
        content: "Regular breast self-examinations are crucial for early detection. Best time is 3-5 days after your period ends when breasts are least tender. Look in the mirror with arms at your sides, then raised overhead. Check for changes in size, shape, or skin. Use your fingertips to feel for lumps in circular motions, covering the entire breast and armpit area. Check nipples for discharge. If you find any changes, consult your healthcare provider immediately. Remember, most breast changes are not cancer, but early detection saves lives.",
        type: "article",
        createdAt: new Date()
      },
      {
        id: this.currentEducationalContentId++,
        category: "menstrual_health",
        title: "Complete Menstrual Health Guide",
        content: "A normal menstrual cycle ranges from 21-35 days, with periods lasting 3-7 days. Understanding your cycle helps identify irregularities. Track your flow, symptoms, and mood changes. Use proper hygiene products and change them regularly. Menstrual pain is common but severe pain may indicate underlying conditions like endometriosis. Natural pain management includes heat therapy, exercise, and anti-inflammatory foods. Consult a healthcare provider if you experience sudden changes in cycle length, extremely heavy bleeding, or severe pain.",
        type: "article",
        createdAt: new Date()
      },
      {
        id: this.currentEducationalContentId++,
        category: "menstrual_health",
        title: "Menstrual Hygiene Best Practices",
        content: "Proper menstrual hygiene prevents infections and ensures comfort. Choose appropriate products: pads for heavy flow, tampons for active days, menstrual cups for eco-friendly options. Change products every 4-6 hours, never leave tampons in for more than 8 hours. Wash hands before and after changing products. Maintain intimate hygiene with gentle, fragrance-free products. Wear breathable cotton underwear and avoid tight clothing. Dispose of products properly and maintain personal cleanliness throughout your cycle.",
        type: "article",
        createdAt: new Date()
      },
      {
        id: this.currentEducationalContentId++,
        category: "menstrual_health",
        title: "You can't exercise during periods",
        content: "Light to moderate exercise can actually help reduce period pain and improve mood. Activities like walking, yoga, and swimming are beneficial during menstruation. Exercise releases endorphins which are natural pain relievers. Avoid high-intensity workouts if you experience severe cramps. Listen to your body and adjust intensity as needed.",
        type: "myth_buster",
        createdAt: new Date()
      },
      {
        id: this.currentEducationalContentId++,
        category: "pcod_pcos",
        title: "PCOS means you can't get pregnant",
        content: "With proper treatment and lifestyle changes, many women with PCOS can conceive naturally. While PCOS can affect ovulation, medical treatments like fertility medications can help regulate cycles. Maintaining a healthy weight and managing insulin resistance improves fertility outcomes. Consult a fertility specialist for personalized treatment options.",
        type: "myth_buster",
        createdAt: new Date()
      },
      {
        id: this.currentEducationalContentId++,
        category: "breast_cancer",
        title: "Breast cancer only affects older women",
        content: "While breast cancer risk increases with age, it can affect women of all ages. About 5% of breast cancers occur in women under 40. Young women should also be aware of breast changes and perform regular self-examinations. Family history and genetic factors can increase risk at any age. Early awareness and detection are key regardless of age.",
        type: "myth_buster",
        createdAt: new Date()
      },
      {
        id: this.currentEducationalContentId++,
        category: "menstrual_health",
        title: "Irregular periods are always normal",
        content: "While some irregularity is normal, persistent changes in menstrual patterns should be evaluated. Factors like stress, weight changes, and hormonal imbalances can cause irregularities. Consult a healthcare provider if periods are consistently irregular for more than 3 months, extremely heavy or light, or if you miss periods.",
        type: "myth_buster",
        createdAt: new Date()
      }
    ];

    educationalContentData.forEach(content => this.educationalContent.set(content.id, content));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      age: insertUser.age || null,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Period tracking methods
  async getPeriodEntries(userId: number): Promise<PeriodEntry[]> {
    return Array.from(this.periodEntries.values()).filter(entry => entry.userId === userId);
  }

  async createPeriodEntry(insertEntry: InsertPeriodEntry): Promise<PeriodEntry> {
    const id = this.currentPeriodEntryId++;
    const entry: PeriodEntry = {
      ...insertEntry,
      id,
      flow: insertEntry.flow || null,
      symptoms: insertEntry.symptoms ? [...insertEntry.symptoms] : null,
      notes: insertEntry.notes || null,
      createdAt: new Date()
    };
    this.periodEntries.set(id, entry);
    return entry;
  }

  async updatePeriodEntry(id: number, updates: Partial<PeriodEntry>): Promise<PeriodEntry | undefined> {
    const entry = this.periodEntries.get(id);
    if (!entry) return undefined;
    
    const updatedEntry = { ...entry, ...updates };
    this.periodEntries.set(id, updatedEntry);
    return updatedEntry;
  }

  async deletePeriodEntry(id: number): Promise<boolean> {
    return this.periodEntries.delete(id);
  }

  // Health assessment methods
  async getHealthAssessments(userId: number): Promise<HealthAssessment[]> {
    return Array.from(this.healthAssessments.values()).filter(assessment => assessment.userId === userId);
  }

  async createHealthAssessment(insertAssessment: InsertHealthAssessment): Promise<HealthAssessment> {
    const id = this.currentHealthAssessmentId++;
    const assessment: HealthAssessment = {
      ...insertAssessment,
      id,
      responses: insertAssessment.responses || null,
      score: insertAssessment.score || null,
      recommendations: insertAssessment.recommendations ? [...insertAssessment.recommendations] : null,
      createdAt: new Date()
    };
    this.healthAssessments.set(id, assessment);
    return assessment;
  }

  // Health tips methods
  async getHealthTips(category?: string): Promise<HealthTip[]> {
    const tips = Array.from(this.healthTips.values());
    return category ? tips.filter(tip => tip.category === category) : tips;
  }

  async createHealthTip(insertTip: InsertHealthTip): Promise<HealthTip> {
    const id = this.currentHealthTipId++;
    const tip: HealthTip = {
      ...insertTip,
      id,
      isDaily: insertTip.isDaily || null,
      createdAt: new Date()
    };
    this.healthTips.set(id, tip);
    return tip;
  }

  // Health resources methods
  async getHealthResources(type?: string): Promise<HealthResource[]> {
    const resources = Array.from(this.healthResources.values());
    return type ? resources.filter(resource => resource.type === type) : resources;
  }

  async createHealthResource(insertResource: InsertHealthResource): Promise<HealthResource> {
    const id = this.currentHealthResourceId++;
    const resource: HealthResource = {
      ...insertResource,
      id,
      phone: insertResource.phone || null,
      hours: insertResource.hours || null,
      distance: insertResource.distance || null,
      createdAt: new Date()
    };
    this.healthResources.set(id, resource);
    return resource;
  }

  // Educational content methods
  async getEducationalContent(category?: string): Promise<EducationalContent[]> {
    const content = Array.from(this.educationalContent.values());
    return category ? content.filter(item => item.category === category) : content;
  }

  async createEducationalContent(insertContent: InsertEducationalContent): Promise<EducationalContent> {
    const id = this.currentEducationalContentId++;
    const content: EducationalContent = {
      ...insertContent,
      id,
      createdAt: new Date()
    };
    this.educationalContent.set(id, content);
    return content;
  }
}

import { getDb } from "./db";
import { eq, and } from "drizzle-orm";

class DbStorage implements IStorage {
  private db = getDb();
  async getUser(id: number) {
    if (!this.db) throw new Error("DB not configured");
    const [row] = await this.db.select().from(users).where(eq(users.id, id));
    return row;
  }
  async getUserByEmail(email: string) {
    if (!this.db) throw new Error("DB not configured");
    const [row] = await this.db.select().from(users).where(eq(users.email, email));
    return row;
  }
  async createUser(insertUser: InsertUser) {
    if (!this.db) throw new Error("DB not configured");
    const [row] = await this.db.insert(users).values(insertUser).returning();
    return row as any;
  }

  async getPeriodEntries(userId: number) {
    if (!this.db) throw new Error("DB not configured");
    return await this.db.select().from(periodEntries).where(eq(periodEntries.userId, userId));
  }
  async createPeriodEntry(insertEntry: InsertPeriodEntry) {
    if (!this.db) throw new Error("DB not configured");
    const [row] = await this.db.insert(periodEntries).values(insertEntry).returning();
    return row as any;
  }
  async updatePeriodEntry(id: number, updates: Partial<PeriodEntry>) {
    if (!this.db) throw new Error("DB not configured");
    const [row] = await this.db.update(periodEntries).set(updates).where(eq(periodEntries.id, id)).returning();
    return row as any;
  }
  async deletePeriodEntry(id: number) {
    if (!this.db) throw new Error("DB not configured");
    const res = await this.db.delete(periodEntries).where(eq(periodEntries.id, id));
    return (res as unknown) as boolean;
  }

  async getHealthAssessments(userId: number) {
    if (!this.db) throw new Error("DB not configured");
    return await this.db.select().from(healthAssessments).where(eq(healthAssessments.userId, userId));
  }
  async createHealthAssessment(insertAssessment: InsertHealthAssessment) {
    if (!this.db) throw new Error("DB not configured");
    const [row] = await this.db.insert(healthAssessments).values(insertAssessment).returning();
    return row as any;
  }

  async getHealthTips(category?: string) {
    if (!this.db) throw new Error("DB not configured");
    if (category) {
      return await this.db.select().from(healthTips).where(eq(healthTips.category, category));
    }
    return await this.db.select().from(healthTips);
  }
  async createHealthTip(insertTip: InsertHealthTip) {
    if (!this.db) throw new Error("DB not configured");
    const [row] = await this.db.insert(healthTips).values(insertTip).returning();
    return row as any;
  }

  async getHealthResources(type?: string) {
    if (!this.db) throw new Error("DB not configured");
    if (type) {
      return await this.db.select().from(healthResources).where(eq(healthResources.type, type));
    }
    return await this.db.select().from(healthResources);
  }
  async createHealthResource(insertResource: InsertHealthResource) {
    if (!this.db) throw new Error("DB not configured");
    const [row] = await this.db.insert(healthResources).values(insertResource).returning();
    return row as any;
  }

  async getEducationalContent(category?: string) {
    if (!this.db) throw new Error("DB not configured");
    if (category) {
      return await this.db.select().from(educationalContent).where(eq(educationalContent.category, category));
    }
    return await this.db.select().from(educationalContent);
  }
  async createEducationalContent(insertContent: InsertEducationalContent) {
    if (!this.db) throw new Error("DB not configured");
    const [row] = await this.db.insert(educationalContent).values(insertContent).returning();
    return row as any;
  }
}

export const storage: IStorage = process.env.DATABASE_URL ? new DbStorage() : new MemStorage();
