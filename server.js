const express = require("express");
const cors = require("cors");
const app = express();

// ✅ COMPREHENSIVE CORS CONFIGURATION
app.use((req, res, next) => {
  // Allow all origins for testing (you can restrict this later)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Also use the cors middleware as backup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ✅ ROOT ENDPOINT - Test if server is reachable
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Supreme Smiles Avenue Dental API is running",
    endpoints: {
      health: "/health",
      analyze: "/analyze (POST)",
      services: "/services"
    },
    timestamp: new Date().toISOString()
  });
});

// ✅ Enhanced Services Catalog
const SERVICES = {
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
  
  BRACES: {
    issue: "Orthodontic Treatment",
    treatment: "Metal Braces",
    priceRange: { min: 80000, max: 180000 },
    priceDisplay: "80,000 - 180,000 KES",
    urgency: "low"
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
  
  // Crown
  if (/crown|cap|cover/.test(text)) {
    return { ...SERVICES.CROWN, confidence: 0.85 };
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
  if (/brace|crooked|straighten|gap/.test(text)) {
    return { ...SERVICES.BRACES, confidence: 0.88 };
  }
  
  return { ...SERVICES.CONSULTATION, confidence: 0.6 };
}

// ✅ Client Qualification Scoring
function calculateClientScore(message, result, insurance, budget) {
  let score = 0;
  const text = message.toLowerCase();
  
  // Message detail
  if (message.length > 50) score += 5;
  if (message.length > 100) score += 5;
  
  // Symptoms count
  const symptomCount = (message.match(/pain|hurt|ache|bleed|swollen|broken|crack/g) || []).length;
  score += Math.min(symptomCount * 5, 20);
  
  // Duration mentioned
  if (/days|weeks|months|years|since/.test(text)) score += 10;
  
  // Previous treatment
  if (/tried|took|used|before|previous/.test(text)) score += 15;
  
  // Urgency
  if (/urgent|emergency|immediate|asap|today/.test(text)) score += 20;
  else if (/next week|this week|soon/.test(text)) score += 10;
  
  // Insurance
  if (insurance && insurance !== "No insurance mentioned") score += 15;
  
  // Budget
  if (budget || /cost|price|how much|budget/.test(text)) score += 10;
  
  // High-value procedure
  if (/implant|brace|invisalign|veneer|crown/.test(text)) score += 15;
  
  // Urgency from classification
  if (result.urgency === "critical") score += 30;
  else if (result.urgency === "high") score += 20;
  else if (result.urgency === "medium") score += 10;
  
  return {
    score,
    maxScore: 150,
    percentage: Math.round((score / 150) * 100),
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

// ✅ MAIN ANALYSIS ENDPOINT
app.post("/analyze", (req, res) => {
  try {
    console.log("Received analysis request:", req.body);
    
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
    
    // Generate WhatsApp link with YOUR ACTUAL NUMBER
    let whatsapp = null;
    if (clientScore.isQualified) {
      const whatsappMessage = generateWhatsAppMessage(message, result, insurance, budget, clientScore);
      // REPLACE WITH YOUR ACTUAL WHATSAPP NUMBER (include country code, no + or spaces)
      const WHATSAPP_NUMBER = "254712345678"; // CHANGE THIS!
      whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
    }
    
    const response = {
      ...result,
      insurance,
      budget,
      clientScore: {
        score: clientScore.score,
        percentage: clientScore.percentage,
        isQualified: clientScore.isQualified
      },
      whatsapp,
      timestamp: new Date().toISOString()
    };
    
    console.log("Sending response:", response);
    res.json(response);
    
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      error: "Unable to process request",
      message: "Please try again",
      issue: "General Consultation",
      treatment: "Dental Examination",
      priceDisplay: "1,000 - 3,000 KES",
      urgency: "low",
      insurance: "Not specified",
      clientScore: { percentage: 50, isQualified: false },
      whatsapp: null
    });
  }
});

// ✅ HEALTH CHECK ENDPOINT
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    clinic: "Supreme Smiles Avenue Dental Centre",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
    cors: "enabled"
  });
});

// ✅ GET SERVICES ENDPOINT
app.get("/services", (req, res) => {
  res.json({
    clinic: "Supreme Smiles Avenue Dental Centre",
    services: Object.values(SERVICES)
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🦷 Supreme Smiles Avenue Server running on port ${PORT}`);
  console.log(`✅ CORS enabled for all origins`);
  console.log(`📍 Test the API at: http://localhost:${PORT}/health`);
});
