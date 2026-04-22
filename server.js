const express = require("express");
const app = express();

app.use(express.json());

// ✅ ENHANCED PRICING CATALOG
const SERVICES = {
  // Emergency Services (High Priority)
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
    duration: "3-6 months process"
  },
  
  // Restorative Services
  FILLING: {
    issue: "Tooth Filling",
    treatment: "Composite/Amalgam Filling",
    priceRange: { min: 2500, max: 8000 },
    priceDisplay: "2,500 - 8,000 KES",
    urgency: "low",
    perTooth: true
  },
  
  CROWN: {
    issue: "Dental Crown",
    treatment: "Porcelain/Zirconia Crown",
    priceRange: { min: 18000, max: 45000 },
    priceDisplay: "18,000 - 45,000 KES",
    urgency: "medium",
    material: ["Porcelain", "Zirconia", "PFM"]
  },
  
  BRIDGE: {
    issue: "Dental Bridge",
    treatment: "Fixed Bridge",
    priceRange: { min: 35000, max: 85000 },
    priceDisplay: "35,000 - 85,000 KES",
    urgency: "medium",
    perUnit: true
  },
  
  // Cosmetic Services
  VENEERS: {
    issue: "Cosmetic Veneers",
    treatment: "Porcelain Veneers",
    priceRange: { min: 15000, max: 35000 },
    priceDisplay: "15,000 - 35,000 KES per tooth",
    urgency: "low",
    material: ["Porcelain", "Composite"]
  },
  
  WHITENING: {
    issue: "Teeth Whitening",
    treatment: "Professional Whitening",
    priceRange: { min: 8000, max: 25000 },
    priceDisplay: "8,000 - 25,000 KES",
    urgency: "low",
    types: ["In-Office", "Take-Home Kit"]
  },
  
  // Preventive Services
  CLEANING: {
    issue: "Professional Cleaning",
    treatment: "Scaling & Polishing",
    priceRange: { min: 2000, max: 6000 },
    priceDisplay: "2,000 - 6,000 KES",
    urgency: "low",
    frequency: "Every 6 months recommended"
  },
  
  FLUORIDE: {
    issue: "Fluoride Treatment",
    treatment: "Professional Fluoride Application",
    priceRange: { min: 1000, max: 3000 },
    priceDisplay: "1,000 - 3,000 KES",
    urgency: "low"
  },
  
  SEALANTS: {
    issue: "Dental Sealants",
    treatment: "Pit & Fissure Sealants",
    priceRange: { min: 1500, max: 4000 },
    priceDisplay: "1,500 - 4,000 KES per tooth",
    urgency: "low"
  },
  
  // Orthodontics
  BRACES_METAL: {
    issue: "Orthodontic Treatment",
    treatment: "Metal Braces",
    priceRange: { min: 80000, max: 180000 },
    priceDisplay: "80,000 - 180,000 KES",
    urgency: "low",
    duration: "18-24 months"
  },
  
  BRACES_CERAMIC: {
    issue: "Orthodontic Treatment",
    treatment: "Ceramic Braces",
    priceRange: { min: 120000, max: 250000 },
    priceDisplay: "120,000 - 250,000 KES",
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
  
  // Surgical Procedures
  WISDOM_TOOTH: {
    issue: "Wisdom Tooth Extraction",
    treatment: "Surgical Extraction",
    priceRange: { min: 8000, max: 25000 },
    priceDisplay: "8,000 - 25,000 KES",
    urgency: "high",
    complexity: "Surgical procedure"
  },
  
  BONE_GRAFT: {
    issue: "Bone Grafting",
    treatment: "Dental Bone Graft",
    priceRange: { min: 25000, max: 65000 },
    priceDisplay: "25,000 - 65,000 KES",
    urgency: "medium"
  },
  
  // Pediatric Services
  PEDO_EXTRACTION: {
    issue: "Baby Tooth Extraction",
    treatment: "Pediatric Extraction",
    priceRange: { min: 2000, max: 5000 },
    priceDisplay: "2,000 - 5,000 KES",
    urgency: "medium"
  },
  
  PULPOTOMY: {
    issue: "Baby Tooth Nerve Treatment",
    treatment: "Pulpotomy",
    priceRange: { min: 4000, max: 10000 },
    priceDisplay: "4,000 - 10,000 KES",
    urgency: "medium"
  },
  
  // Diagnostic Services
  XRAY_PANO: {
    issue: "Panoramic X-Ray",
    treatment: "OPG X-Ray",
    priceRange: { min: 1500, max: 3000 },
    priceDisplay: "1,500 - 3,000 KES",
    urgency: "low"
  },
  
  XRAY_PERIAPICAL: {
    issue: "Single Tooth X-Ray",
    treatment: "Periapical X-Ray",
    priceRange: { min: 500, max: 1000 },
    priceDisplay: "500 - 1,000 KES",
    urgency: "low"
  },
  
  CBCT_SCAN: {
    issue: "3D Dental Scan",
    treatment: "CBCT Scan",
    priceRange: { min: 5000, max: 12000 },
    priceDisplay: "5,000 - 12,000 KES",
    urgency: "medium"
  },
  
  CONSULTATION: {
    issue: "General Consultation",
    treatment: "Dental Examination",
    priceRange: { min: 1000, max: 3000 },
    priceDisplay: "1,000 - 3,000 KES",
    urgency: "low"
  }
};

// ✅ INSURANCE PROVIDERS (Kenya)
const INSURANCE_PROVIDERS = {
  "jubilee": { name: "Jubilee Insurance", coverage: "comprehensive" },
  "britam": { name: "Britam", coverage: "comprehensive" },
  "cigna": { name: "Cigna", coverage: "comprehensive" },
  "resolution": { name: "Resolution Health", coverage: "comprehensive" },
  "aetna": { name: "Aetna", coverage: "comprehensive" },
  "nhif": { name: "NHIF", coverage: "basic" },
  "madison": { name: "Madison Insurance", coverage: "comprehensive" },
  "apa": { name: "APA Insurance", coverage: "comprehensive" },
  "uat": { name: "UAP Old Mutual", coverage: "comprehensive" },
  "ga": { name: "GA Insurance", coverage: "comprehensive" },
  "first_assurance": { name: "First Assurance", coverage: "comprehensive" },
  "icea_lion": { name: "ICEA Lion", coverage: "comprehensive" },
  "sanlam": { name: "Sanlam", coverage: "comprehensive" },
  "liaison": { name: "Liaison Group", coverage: "comprehensive" },
  "none": { name: "No Insurance/Cash", coverage: "none" }
};

// ✅ ENHANCED SMART CLASSIFIER ENGINE
function classify(message) {
  const text = message.toLowerCase();
  
  // Emergency/Critical Conditions
  if (/severe pain|can'?t sleep|crying|emergency|immediate|right now|urgent|extreme pain|unbearable|swollen face|fever|infection/.test(text)) {
    const result = SERVICES.EMERGENCY_EXTRACTION;
    return {
      ...result,
      confidence: 0.95,
      matchedTerms: extractMatchedTerms(text, /severe pain|can'?t sleep|crying|emergency|immediate|right now|urgent|extreme pain|unbearable|swollen face|fever|infection/)
    };
  }

  // Wisdom Tooth Specific
  if (/wisdom|third molar|back tooth pain|jaw pain|can'?t open mouth/.test(text)) {
    const result = SERVICES.WISDOM_TOOTH;
    return {
      ...result,
      confidence: 0.9,
      matchedTerms: extractMatchedTerms(text, /wisdom|third molar|back tooth pain|jaw pain|can'?t open mouth/)
    };
  }

  // Root Canal Symptoms
  if (/deep pain|sharp pain|throbbing|sensitive to hot|cold sensitivity|pain when biting|abscess|pus|swollen gum|pimple on gum/.test(text)) {
    const result = SERVICES.ROOT_CANAL;
    return {
      ...result,
      confidence: 0.9,
      matchedTerms: extractMatchedTerms(text, /deep pain|sharp pain|throbbing|sensitive|cold|abscess|pus|swollen/)
    };
  }

  // Implant Related
  if (/implant|missing tooth|replace tooth|permanent tooth|titanium|screw/.test(text)) {
    const result = SERVICES.DENTAL_IMPLANT;
    return {
      ...result,
      confidence: 0.88,
      matchedTerms: extractMatchedTerms(text, /implant|missing|replace|permanent|titanium|screw/)
    };
  }

  // Crown/Bridge
  if (/crown|cap|cover tooth|broken tooth|chipped|bridge|replace missing/.test(text)) {
    const result = /bridge|replace missing/.test(text) ? SERVICES.BRIDGE : SERVICES.CROWN;
    return {
      ...result,
      confidence: 0.85,
      matchedTerms: extractMatchedTerms(text, /crown|cap|cover|broken|chipped|bridge/)
    };
  }

  // Veneers/Cosmetic
  if (/veneer|cosmetic|smile makeover|celebrity teeth|hollywood smile|perfect teeth|front teeth/.test(text)) {
    const result = SERVICES.VENEERS;
    return {
      ...result,
      confidence: 0.82,
      matchedTerms: extractMatchedTerms(text, /veneer|cosmetic|smile|hollywood|perfect/)
    };
  }

  // Whitening
  if (/whiten|white teeth|yellow teeth|stain|discolor|bright|bleach/.test(text)) {
    const result = SERVICES.WHITENING;
    return {
      ...result,
      confidence: 0.8,
      matchedTerms: extractMatchedTerms(text, /whiten|white|yellow|stain|discolor|bright|bleach/)
    };
  }

  // Gum Disease
  if (/bleed|gum bleed|bad breath|halitosis|smell|tartar|plaque|calculus/.test(text)) {
    const result = SERVICES.CLEANING;
    return {
      ...result,
      confidence: 0.87,
      matchedTerms: extractMatchedTerms(text, /bleed|gum|bad breath|halitosis|smell|tartar|plaque/)
    };
  }

  // Cavity/Filling
  if (/cavity|hole|decay|black spot|brown spot|food stuck|filling|restoration/.test(text)) {
    const result = SERVICES.FILLING;
    return {
      ...result,
      confidence: 0.85,
      matchedTerms: extractMatchedTerms(text, /cavity|hole|decay|black|brown|food stuck|filling/)
    };
  }

  // Braces/Orthodontics
  if (/brace|invisalign|aligner|crooked|straighten|gap|spacing|overcrowd|overbite|underbite/.test(text)) {
    let result;
    if (/invisalign|clear aligner/.test(text)) {
      result = SERVICES.INVISALIGN;
    } else if (/ceramic|clear brace/.test(text)) {
      result = SERVICES.BRACES_CERAMIC;
    } else {
      result = SERVICES.BRACES_METAL;
    }
    return {
      ...result,
      confidence: 0.88,
      matchedTerms: extractMatchedTerms(text, /brace|invisalign|aligner|crooked|straighten|gap|spacing/)
    };
  }

  // Pediatric
  if (/child|kid|baby tooth|milk tooth|pediatric|toddler/.test(text)) {
    const result = SERVICES.PEDO_EXTRACTION;
    return {
      ...result,
      confidence: 0.85,
      matchedTerms: extractMatchedTerms(text, /child|kid|baby|milk|pediatric|toddler/)
    };
  }

  // Bone Graft
  if (/bone graft|bone loss|jaw bone|ridge|sinus lift/.test(text)) {
    const result = SERVICES.BONE_GRAFT;
    return {
      ...result,
      confidence: 0.85,
      matchedTerms: extractMatchedTerms(text, /bone graft|bone loss|jaw bone|ridge|sinus/)
    };
  }

  // Default Consultation
  const result = SERVICES.CONSULTATION;
  return {
    ...result,
    confidence: 0.6,
    matchedTerms: ["general inquiry"],
    note: "Specific condition not clearly identified - consultation recommended"
  };
}

// ✅ Helper function to extract matched terms
function extractMatchedTerms(text, pattern) {
  const matches = text.match(pattern);
  return matches ? matches : [];
}

// ✅ ENHANCED SERIOUS CLIENT DETERMINATION
function determineSeriousClientScore(message, result, insurance = null, budget = null) {
  let score = 0;
  const text = message.toLowerCase();
  
  // 1. Message length and detail (5-15 points)
  if (message.length > 50) score += 5;
  if (message.length > 100) score += 5;
  if (message.length > 200) score += 5;
  
  // 2. Specific symptoms mentioned (10 points each)
  const symptomCount = (message.match(/pain|hurt|ache|bleed|swollen|broken|crack|sensitive|infection/g) || []).length;
  score += Math.min(symptomCount * 5, 20);
  
  // 3. Duration mentioned (10 points)
  if (/days|weeks|months|years|since|for a while|long time/.test(text)) {
    score += 10;
  }
  
  // 4. Previous treatment attempts (15 points)
  if (/tried|took|used|bought|already|before|previous|other dentist/.test(text)) {
    score += 15;
  }
  
  // 5. Urgency indicators (10-20 points)
  if (/urgent|emergency|immediate|asap|right away|today|tomorrow|soon/.test(text)) {
    score += 20;
  } else if (/next week|this week|soon|coming days/.test(text)) {
    score += 10;
  }
  
  // 6. Insurance provided (15 points)
  if (insurance && insurance !== "none" && insurance !== "unknown") {
    score += 15;
  }
  
  // 7. Budget mentioned (10 points)
  if (budget || /shilling|kes|kSh|cost|price|how much|budget|afford/.test(text)) {
    score += 10;
  }
  
  // 8. Location proximity indicators (5 points)
  if (/nairobi|westlands|kilimani|karen|lavington|area|location|nearby|close/.test(text)) {
    score += 5;
  }
  
  // 9. Referral source (10 points)
  if (/referred|recommended|friend|family|colleague|someone|heard about/.test(text)) {
    score += 10;
  }
  
  // 10. Condition severity from classification
  if (result.urgency === "critical") score += 30;
  else if (result.urgency === "high") score += 20;
  else if (result.urgency === "medium") score += 10;
  
  // 11. High-value procedures (15 points)
  const highValueKeywords = /implant|brace|invisalign|veneer|crown|bridge|root canal/;
  if (highValueKeywords.test(text)) {
    score += 15;
  }
  
  return {
    score,
    maxScore: 160,
    percentage: (score / 160) * 100,
    isSeriousClient: score >= 45 // Threshold for serious client
  };
}

// ✅ Extract insurance from message
function extractInsurance(message) {
  const text = message.toLowerCase();
  
  for (const [key, provider] of Object.entries(INSURANCE_PROVIDERS)) {
    if (text.includes(key.toLowerCase()) || text.includes(provider.name.toLowerCase())) {
      return {
        provider: provider.name,
        coverage: provider.coverage,
        detected: key
      };
    }
  }
  
  if (/insurance|cover|nhif|medical aid/.test(text)) {
    return {
      provider: "Unknown - Please specify",
      coverage: "unknown",
      detected: "unspecified"
    };
  }
  
  return {
    provider: "No insurance mentioned",
    coverage: "none",
    detected: "none"
  };
}

// ✅ Extract budget from message
function extractBudget(message) {
  const text = message.toLowerCase();
  const budgetMatch = text.match(/(\d+)[k]?\s*(?:kes|shilling|ksh|sh)/i);
  
  if (budgetMatch) {
    let amount = parseInt(budgetMatch[1]);
    if (text.includes('k')) amount *= 1000;
    return amount;
  }
  
  return null;
}

// ✅ Generate follow-up questions based on missing information
function generateFollowUpQuestions(message, insurance, budget, result) {
  const questions = [];
  
  if (insurance.detected === "none") {
    questions.push("Do you have any dental insurance coverage (NHIF, Jubilee, Britam, etc.)?");
  } else if (insurance.detected === "unspecified") {
    questions.push("Which insurance provider do you use?");
  }
  
  if (!budget) {
    questions.push("Do you have a budget range in mind for this treatment?");
  }
  
  if (!message.includes("pain") && result.urgency !== "low") {
    questions.push("On a scale of 1-10, how would you rate your discomfort?");
  }
  
  if (!message.match(/days|weeks|months/)) {
    questions.push("How long have you been experiencing this issue?");
  }
  
  return questions;
}

// ✅ Generate personalized WhatsApp message
function generateWhatsAppMessage(message, result, insurance, budget, clientScore) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-GB');
  const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  let whatsappText = `🦷 *NEW DENTAL APPOINTMENT REQUEST*\n`;
  whatsappText += `📅 ${formattedDate} at ${formattedTime}\n`;
  whatsappText += `⭐ *Client Score: ${clientScore.percentage.toFixed(0)}%* (${clientScore.isSeriousClient ? 'SERIOUS' : 'STANDARD'})\n\n`;
  
  whatsappText += `*Patient Concern:*\n${message}\n\n`;
  
  whatsappText += `*Assessment:*\n`;
  whatsappText += `• Issue: ${result.issue}\n`;
  whatsappText += `• Treatment: ${result.treatment}\n`;
  whatsappText += `• Price Range: ${result.priceDisplay}\n`;
  if (result.duration) whatsappText += `• Duration: ${result.duration}\n`;
  if (result.sessions) whatsappText += `• Sessions: ${result.sessions}\n`;
  whatsappText += `• Urgency: ${result.urgency.toUpperCase()}\n\n`;
  
  if (insurance.provider !== "No insurance mentioned") {
    whatsappText += `*Insurance:* ${insurance.provider}\n`;
    if (insurance.coverage !== "none") whatsappText += `• Coverage: ${insurance.coverage}\n`;
    whatsappText += `\n`;
  }
  
  if (budget) {
    whatsappText += `*Budget:* ${budget.toLocaleString()} KES\n\n`;
  }
  
  whatsappText += `*Preferred Contact Time:*\n`;
  whatsappText += `☀️ Morning (8AM-12PM)\n`;
  whatsappText += `🌤️ Afternoon (12PM-4PM)\n`;
  whatsappText += `🌙 Evening (4PM-7PM)\n\n`;
  
  whatsappText += `*Additional Notes:*\n`;
  whatsappText += `Please bring your insurance card (if applicable) and any recent X-rays.\n`;
  
  return encodeURIComponent(whatsappText);
}

// ✅ MAIN API ENDPOINT
app.post("/analyze", (req, res) => {
  try {
    const { message, insurance: providedInsurance, budget: providedBudget } = req.body;
    
    if (!message || message.trim().length < 3) {
      return res.status(400).json({
        error: "Please provide a detailed description of your dental concern",
        required: "Message must be at least 3 characters"
      });
    }

    // Classify the dental issue
    const result = classify(message);
    
    // Extract insurance information
    const insurance = providedInsurance 
      ? { provider: providedInsurance, coverage: "provided", detected: "provided" }
      : extractInsurance(message);
    
    // Extract budget
    const budget = providedBudget || extractBudget(message);
    
    // Determine client seriousness
    const clientScore = determineSeriousClientScore(message, result, insurance.detected, budget);
    
    // Generate follow-up questions for non-serious clients
    const followUpQuestions = !clientScore.isSeriousClient 
      ? generateFollowUpQuestions(message, insurance, budget, result)
      : [];
    
    // Generate WhatsApp link ONLY for serious clients
    let whatsapp = null;
    if (clientScore.isSeriousClient) {
      const whatsappMessage = generateWhatsAppMessage(message, result, insurance, budget, clientScore);
      // Replace with your actual WhatsApp number
      whatsapp = `https://wa.me/2547XXXXXXXXX?text=${whatsappMessage}`;
    }

    // Prepare response
    const response = {
      diagnosis: {
        issue: result.issue,
        treatment: result.treatment,
        priceRange: result.priceDisplay,
        urgency: result.urgency,
        confidence: result.confidence,
        matchedTerms: result.matchedTerms || []
      },
      
      clientQualification: {
        score: clientScore.score,
        maxScore: clientScore.maxScore,
        percentage: clientScore.percentage,
        isQualified: clientScore.isSeriousClient,
        tier: clientScore.percentage >= 70 ? "PREMIUM" : 
              clientScore.percentage >= 45 ? "STANDARD" : "NEEDS_QUALIFICATION"
      },
      
      insurance: {
        detected: insurance.provider,
        coverage: insurance.coverage,
        verified: !!providedInsurance
      },
      
      budget: budget ? {
        amount: budget,
        withinRange: budget >= result.priceRange?.min,
        difference: budget - (result.priceRange?.min || 0)
      } : null,
      
      actions: {
        whatsapp: whatsapp,
        canBook: clientScore.isSeriousClient,
        followUpQuestions: followUpQuestions,
        nextSteps: clientScore.isSeriousClient 
          ? "✅ You qualify for direct booking. Click the WhatsApp link to schedule your appointment."
          : "📋 Please provide additional information to help us serve you better.",
        estimatedResponse: "Within 2 hours during business hours (Mon-Sat, 8AM-7PM)"
      },
      
      services: {
        recommended: result.treatment,
        alternatives: getAlternativeTreatments(result.treatment),
        additionalInfo: getServiceDetails(result.treatment)
      }
    };

    res.json(response);

  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      error: "Unable to process your request",
      message: "Please try again with a clearer description of your dental concern",
      support: "For immediate assistance, please call our clinic directly"
    });
  }
});

// ✅ Helper function to get alternative treatments
function getAlternativeTreatments(treatment) {
  const alternatives = {
    "Emergency Extraction": ["Root Canal Treatment", "Dental Crown"],
    "Root Canal Therapy": ["Extraction", "Dental Implant"],
    "Dental Implant": ["Dental Bridge", "Partial Denture"],
    "Composite/Amalgam Filling": ["Inlay/Onlay", "Dental Crown"],
    "Porcelain/Zirconia Crown": ["Veneer", "Bonding"],
    "Metal Braces": ["Ceramic Braces", "Invisalign"],
    "Scaling & Polishing": ["Deep Cleaning", "Periodontal Treatment"]
  };
  
  return alternatives[treatment] || ["Consultation for other options"];
}

// ✅ Helper function to get service details
function getServiceDetails(treatment) {
  const details = {
    "Emergency Extraction": "Immediate pain relief. May require antibiotics before procedure.",
    "Root Canal Therapy": "Saves natural tooth. Usually requires crown after treatment.",
    "Dental Implant": "Permanent solution. Requires good bone density.",
    "Composite/Amalgam Filling": "Same-day procedure. Tooth-colored or silver options.",
    "Porcelain/Zirconia Crown": "Protects weakened tooth. 2 visits required.",
    "Metal Braces": "Most affordable orthodontic option. Visible but effective.",
    "Scaling & Polishing": "Preventive care. Recommended every 6 months."
  };
  
  return details[treatment] || "Consultation will provide personalized treatment plan.";
}

// ✅ Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    clinic: "SmileCare Dental Clinic",
    hours: "Mon-Sat: 8AM-7PM",
    emergency: "Available 24/7 for registered patients",
    version: "2.0.0"
  });
});

// ✅ Get services catalog
app.get("/services", (req, res) => {
  const serviceList = Object.entries(SERVICES).map(([key, service]) => ({
    id: key,
    treatment: service.treatment,
    priceRange: service.priceDisplay,
    urgency: service.urgency,
    category: getCategoryFromId(key)
  }));
  
  res.json({
    clinic: "SmileCare Dental Clinic",
    totalServices: serviceList.length,
    services: serviceList
  });
});

// ✅ Helper to categorize services
function getCategoryFromId(id) {
  if (id.includes("EMERGENCY") || id.includes("WISDOM")) return "Emergency";
  if (id.includes("BRACE") || id.includes("INVISALIGN")) return "Orthodontics";
  if (id.includes("CROWN") || id.includes("BRIDGE") || id.includes("IMPLANT")) return "Restorative";
  if (id.includes("WHITENING") || id.includes("VENEERS")) return "Cosmetic";
  if (id.includes("CLEANING") || id.includes("FLUORIDE")) return "Preventive";
  if (id.includes("XRAY") || id.includes("CBCT")) return "Diagnostic";
  return "General";
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🦷 SmileCare Dental Triage System running on port ${PORT}`);
  console.log(`📊 Services catalog: ${Object.keys(SERVICES).length} procedures available`);
  console.log(`🏥 Ready to qualify dental patients`);
});
