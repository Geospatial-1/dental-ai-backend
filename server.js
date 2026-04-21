const express = require("express");
const app = express();

app.use(express.json());

// ✅ SMART CLASSIFIER ENGINE
function classify(message) {
  const text = message.toLowerCase();

  // Cleaning / Gum issues
  if (/bleed|blood|gum|bad breath|smell|yellow|stain/.test(text)) {
    return {
      issue: "Gum Disease (Gingivitis)",
      treatment: "Teeth Cleaning (Scaling & Polishing)",
      price: "2000 - 5000 KES",
      urgency: "medium",
      confidence: 0.9
    };
  }

  // Extraction / Trauma
  if (/broken|crack|fell out|loose|severe pain|swelling|injury|accident/.test(text)) {
    return {
      issue: "Tooth Damage or Infection",
      treatment: "Tooth Extraction",
      price: "3000 - 8000 KES",
      urgency: "high",
      confidence: 0.9
    };
  }

  // Cavities
  if (/cavity|hole|decay|black spot|food stuck/.test(text)) {
    return {
      issue: "Tooth Decay (Cavity)",
      treatment: "Dental Filling",
      price: "2500 - 6000 KES",
      urgency: "low",
      confidence: 0.85
    };
  }

  // Root canal / nerve pain
  if (/deep pain|sharp pain|throbbing|sensitive|hot|cold|pain when drinking/.test(text)) {
    return {
      issue: "Tooth Nerve Damage",
      treatment: "Root Canal Treatment",
      price: "10000 - 25000 KES",
      urgency: "high",
      confidence: 0.9
    };
  }

  // Braces / alignment
  if (/crooked|alignment|spacing|not straight|overlap/.test(text)) {
    return {
      issue: "Teeth Misalignment",
      treatment: "Braces / Orthodontics",
      price: "80000 - 150000 KES",
      urgency: "low",
      confidence: 0.85
    };
  }

  // Whitening
  if (/whiten|white teeth|stains|discolor/.test(text)) {
    return {
      issue: "Teeth Discoloration",
      treatment: "Teeth Whitening",
      price: "5000 - 15000 KES",
      urgency: "low",
      confidence: 0.8
    };
  }

  // Dentures
  if (/missing teeth|lost teeth|no teeth/.test(text)) {
    return {
      issue: "Missing Teeth",
      treatment: "Dentures / Replacement",
      price: "15000 - 60000 KES",
      urgency: "medium",
      confidence: 0.85
    };
  }

  // Crown / cap
  if (/cap|crown|cover tooth/.test(text)) {
    return {
      issue: "Tooth Structural Damage",
      treatment: "Dental Crown",
      price: "15000 - 40000 KES",
      urgency: "medium",
      confidence: 0.8
    };
  }

  // Default fallback
  return {
    issue: "General Dental Consultation Needed",
    treatment: "Dental Consultation",
    price: "1000 - 3000 KES",
    urgency: "low",
    confidence: 0.5
  };
}

// ✅ MAIN API
app.post("/analyze", (req, res) => {
  try {
    const message = req.body.message || "";

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const result = classify(message);

    // 🔥 SMART WHATSAPP CONVERSION MESSAGE
    const whatsappMessage = encodeURIComponent(
      `Hello, I have been experiencing: ${result.issue}. 
I would like ${result.treatment}. 
My estimated budget is ${result.price}. 
How soon can I get assistance?`
    );

    const whatsapp = `https://wa.me/2547XXXXXXXXX?text=${whatsappMessage}`;

    res.json({
      ...result,
      whatsapp
    });

  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
