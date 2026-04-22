const express = require("express");
const cors = require("cors");
const app = express();

// ✅ CORS Configuration for GitHub Pages
const corsOptions = {
  origin: [
    'https://*.github.io',
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'https://supreme-smiles-avenue.netlify.app' // Add your custom domain if any
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Pre-flight requests handling
app.options('*', cors(corsOptions));

// ✅ Enhanced Services Catalog
const SERVICES = {
  // Emergency Services
  EMERGENCY_EXTRACTION: {
    issue: "Emergency Tooth Extraction",
    treatment: "Emergency Extraction",
    priceRange: { min: 4000, max: 10000 },
    priceDisplay: "4,000 - 10,000 KES",
    urgency: "critical",
    requiresImmediate: true
  },
  
  ROOT_CANAL: {
    issue: "Root Canal Treatment",
    treatment: "Root Canal Therapy",
    priceRange: { min: 12000, max: 35000 },
    priceDisplay: "12,000 - 35,000 KES",
    urgency: "high",
    sessions: "2-3 visits"
  },
  
  DENTAL_IMPLANT: {
    issue: "Missing Tooth Replacement",
    treatment: "Dental Implant",
    priceRange: { min: 45000, max: 120000 },
    priceDisplay: "45,000 - 120,000 KES",
    urgency: "medium",
    duration: "3-6 months"
  },
  
  FILLING: {
    issue: "Tooth Filling",
    treatment: "Composite Filling",
    priceRange: { min: 2500, max: 8000 },
    priceDisplay: "2,500 - 8,000 KES",
    urgency: "low"
  },
  
  CROWN: {
    issue: "Dental Crown",
    treatment: "Porcelain Crown",
    priceRange: { min: 18000, max: 45000 },
    priceDisplay: "18,000 - 45,000 KES",
    urgency: "medium"
  },
  
  BRIDGE: {
    issue: "Dental Bridge",
    treatment: "Fixed Bridge",
    priceRange: { min: 35000, max: 85000 },
    priceDisplay: "35,000 - 85,000 KES",
    urgency: "medium"
  },
  
  VENEERS: {
    issue: "Cosmetic Veneers",
    treatment: "Porcelain Veneers",
    priceRange: { min: 15000, max: 35000 },
    priceDisplay: "15,000 - 35,000 KES per tooth",
    urgency: "low"
  },
  
  WHITENING: {
    issue: "Teeth Whitening",
    treatment: "Professional Whitening",
    priceRange: { min: 8000, max: 25000 },
    priceDisplay: "8,000 - 25,000 KES",
    urgency: "low"
  },
  
  CLEANING: {
    issue: "Professional Cleaning",
    treatment: "Scaling & Polishing",
    priceRange: { min: 2000, max: 6000 },
    priceDisplay: "2,000 - 6,000 KES",
    urgency: "low"
  },
  
  BRACES_METAL: {
    issue: "Orthodontic Treatment",
    treatment: "Metal Braces",
    priceRange: { min: 80000, max: 180000 },
    priceDisplay: "80,000 - 180,000 KES",
    urgency: "low",
    duration: "18-24 months"
  },
  
  INVISALIGN: {
    issue: "Orthodontic Treatment",
    treatment: "Invisalign Clear Aligners",
    priceRange: { min: 180000, max: 350000 },
    priceDisplay: "180,000 - 350,000 KES",
    urgency: "low",
    duration: "12-18 months"
  },
  
  WISDOM_TOOTH: {
    issue: "Wisdom Tooth Extraction",
    treatment: "Surgical Extraction",
    priceRange: { min: 8000, max: 25000 },
    priceDisplay: "8,000 - 25,000 KES",
    urgency: "high"
  },
  
  CONSULTATION: {
    issue: "General Consultation",
    treatment: "Dental Examination",
    priceRange: { min: 1000, max: 3000 },
    priceDisplay: "1,000 - 3,000 KES",
    urgency: "low"
  }
};

// ✅ Insurance Providers
const INSURANCE_PROVIDERS = {
  "jubilee": { name: "Jubilee Insurance", coverage: "comprehensive" },
  "britam": { name: "Britam", coverage: "comprehensive" },
  "cigna": { name: "Cigna", coverage: "comprehensive" },
  "resolution": { name: "Resolution Health", coverage: "comprehensive" },
  "nhif": { name: "NHIF", coverage: "basic" },
  "apa": { name: "APA Insurance", coverage: "comprehensive" },
  "madison": { name: "Madison Insurance", coverage: "comprehensive" },
  "none": { name: "No Insurance/Cash", coverage: "none" }
};

// ✅ Enhanced Classifier
function classify(message) {
  const text = message.toLowerCase();
  
  // Emergency
  if (/severe pain|can'?t sleep|crying|emergency|immediate|right now|urgent|extreme pain|swollen face|fever/.test(text)) {
    return { ...SERVICES.EMERGENCY_EXTRACTION, confidence: 0.95 };
  }
  
  // Wisdom Tooth
  if (/wisdom|third molar|back tooth pain|jaw pain/.test(text)) {
    return { ...SERVICES.WISDOM_TOOTH, confidence: 0.9 };
  }
  
  // Root Canal
  if (/deep pain|sharp pain|throbbing|sensitive|cold|abscess|swollen/.test(text)) {
    return { ...SERVICES.ROOT_CANAL, confidence: 0.9 };
  }
  
  // Implant
  if (/implant|missing tooth|replace tooth|permanent/.test(text)) {
    return { ...SERVICES.DENTAL_IMPLANT, confidence: 0.88 };
  }
  
  // Crown/Bridge
  if (/crown|cap|cover|bridge/.test(text)) {
    return /bridge/.test(text) ? { ...SERVICES.BRIDGE, confidence: 0.85 } : { ...SERVICES.CROWN, confidence: 0.85 };
  }
  
  // Veneers
  if (/veneer|cosmetic|smile|hollywood/.test(text)) {
    return { ...SERVICES.VENEERS, confidence: 0.82 };
  }
  
  // Whitening
  if (/whiten|white|yellow|stain|discolor/.test(text)) {
    return { ...SERVICES.WHITENING, confidence: 0.8 };
  }
  
  // Cleaning/Gum Disease
  if (/bleed|gum|bad breath|tartar|plaque/.test(text)) {
    return { ...SERVICES.CLEANING, confidence: 0.87 };
  }
  
  // Filling
  if (/cavity|hole|decay|black|filling/.test(text)) {
    return { ...SERVICES.FILLING, confidence: 0.85 };
  }
  
  // Braces
  if (/brace|invisalign|crooked|straighten|gap/.test(text)) {
    return /invisalign/.test(text) ? { ...SERVICES.INVISALIGN, confidence: 0.88 } : { ...SERVICES.BRACES_METAL, confidence: 0.88 };
  }
  
  return { ...SERVICES.CONSULTATION, confidence: 0.6 };
}

// ✅ Client Qualification Scoring
function calculateClientScore(message, result, insurance, budget) {
  let score = 0;
  const text = message.toLowerCase();
  
  // Message detail (10 points)
  if (message.length > 50) score += 5;
  if (message.length > 100) score += 5;
  
  // Symptoms count (20 points max)
  const symptomCount = (message.match(/pain|hurt|ache|bleed|swollen|broken|crack/g) || []).length;
  score += Math.min(symptomCount * 5, 20);
  
  // Duration mentioned (10 points)
  if (/days|weeks|months|years|since/.test(text)) score += 10;
  
  // Previous treatment (15 points)
  if (/tried|took|used|before|previous/.test(text)) score += 15;
  
  // Urgency (20 points)
  if (/urgent|emergency|immediate|asap|today/.test(text)) score += 20;
  else if (/next week|this week|soon/.test(text)) score += 10;
  
  // Insurance (15 points)
  if (insurance && insurance !== "none") score += 15;
  
  // Budget (10 points)
  if (budget || /cost|price|how much|budget/.test(text)) score += 10;
  
  // High-value procedure (15 points)
  if (/implant|brace|invisalign|veneer|crown/.test(text)) score += 15;
  
  // Urgency from classification
  if (result.urgency === "critical") score += 30;
  else if (result.urgency === "high") score += 20;
  else if (result.urgency === "medium") score += 10;
  
  return {
    score,
    maxScore: 150,
    percentage: (score / 150) * 100,
    isQualified: score >= 40
  };
}

// ✅ Extract Insurance
function extractInsurance(message) {
  const text = message.toLowerCase();
  for (const [key, provider] of Object.entries(INSURANCE_PROVIDERS)) {
    if (text.includes(key.toLowerCase()) || text.includes(provider.name.toLowerCase())) {
      return provider.name;
    }
  }
  return /insurance|cover|nhif/.test(text) ? "Insurance mentioned" : "No insurance mentioned";
}

// ✅ Extract Budget
function extractBudget(message) {
  const text = message.toLowerCase();
  const match = text.match(/(\d+)[k]?\s*(?:kes|shilling|ksh|sh)/i);
  if (match) {
    let amount = parseInt(match[1]);
    if (text.includes('k')) amount *= 1000;
    return amount;
  }
  return null;
}

// ✅ Generate WhatsApp Message
function generateWhatsAppMessage(message, result, insurance, budget, score) {
  const text = `🦷 *SUPREME SMILES AVENUE - APPOINTMENT REQUEST*\n\n` +
    `*Patient Concern:*\n${message}\n\n` +
    `*Assessment:*\n` +
    `• Issue: ${result.issue}\n` +
    `• Treatment: ${result.treatment}\n` +
    `• Price Range: ${result.priceDisplay}\n` +
    `• Urgency: ${result.urgency.toUpperCase()}\n\n` +
    `*Insurance:* ${insurance}\n` +
    (budget ? `*Budget:* ${budget.toLocaleString()} KES\n\n` : '\n') +
    `*Preferred Contact Time:*\n` +
    `☀️ Morning (8AM-12PM)\n` +
    `🌤️ Afternoon (12PM-4PM)\n` +
    `🌙 Evening (4PM-7PM)`;
  
  return encodeURIComponent(text);
}

// ✅ Main Analysis Endpoint
app.post("/analyze", (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim().length < 3) {
      return res.status(400).json({
        error: "Please provide more details about your dental concern"
      });
    }
    
    const result = classify(message);
    const insurance = extractInsurance(message);
    const budget = extractBudget(message);
    const clientScore = calculateClientScore(message, result, insurance, budget);
    
    let whatsapp = null;
    if (clientScore.isQualified) {
      const whatsappMessage = generateWhatsAppMessage(message, result, insurance, budget, clientScore);
      // Replace with your actual WhatsApp number
      whatsapp = `https://wa.me/254712345678?text=${whatsappMessage}`;
    }
    
    res.json({
      ...result,
      insurance,
      budget,
      clientScore: {
        score: clientScore.score,
        percentage: Math.round(clientScore.percentage),
        isQualified: clientScore.isQualified
      },
      whatsapp,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      error: "Unable to process request",
      message: "Please try again"
    });
  }
});

// ✅ Health Check Endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    clinic: "Supreme Smiles Avenue Dental Centre",
    version: "2.0.0",
    timestamp: new Date().toISOString()
  });
});

// ✅ Get Services Endpoint
app.get("/services", (req, res) => {
  res.json({
    clinic: "Supreme Smiles Avenue Dental Centre",
    services: Object.values(SERVICES)
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🦷 Supreme Smiles Avenue Server running on port ${PORT}`);
  console.log(`✅ CORS enabled for GitHub Pages and local development`);
});
