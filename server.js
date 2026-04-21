const express = require("express");
const app = express();

app.use(express.json());

// ✅ RULE-BASED CLASSIFIER (NO AI DEPENDENCE)
function classify(message) {
  const text = message.toLowerCase();

  // Teeth Cleaning
  if (
    text.includes("bleed") ||
    text.includes("gum") ||
    text.includes("bad breath") ||
    text.includes("yellow")
  ) {
    return {
      issue: "Gum inflammation (Gingivitis)",
      treatment: "Teeth Cleaning (Scaling & Polishing)",
      price: "2000-5000 KES"
    };
  }

  // Extraction
  if (
    text.includes("broken") ||
    text.includes("severe pain") ||
    text.includes("swelling") ||
    text.includes("tooth broke")
  ) {
    return {
      issue: "Tooth damage or infection",
      treatment: "Tooth Extraction",
      price: "3000-8000 KES"
    };
  }

  // Filling
  if (
    text.includes("cavity") ||
    text.includes("hole") ||
    text.includes("mild pain")
  ) {
    return {
      issue: "Tooth cavity",
      treatment: "Dental Filling",
      price: "2500-6000 KES"
    };
  }

  // Root Canal
  if (
    text.includes("deep pain") ||
    text.includes("sensitivity") ||
    text.includes("hot") ||
    text.includes("cold")
  ) {
    return {
      issue: "Tooth nerve damage",
      treatment: "Root Canal Treatment",
      price: "10000-25000 KES"
    };
  }

  // Braces
  if (
    text.includes("crooked") ||
    text.includes("alignment") ||
    text.includes("spacing")
  ) {
    return {
      issue: "Teeth alignment issue",
      treatment: "Braces",
      price: "80000-150000 KES"
    };
  }

  // Default fallback (rare)
  return {
    issue: "General dental issue",
    treatment: "Consultation",
    price: "Varies"
  };
}

// ✅ MAIN API
app.post("/analyze", (req, res) => {
  try {
    const message = req.body.message || "";

    const result = classify(message);

    const whatsapp = `https://wa.me/2547XXXXXXXXX?text=Hi, I have ${result.issue} and need ${result.treatment}`;

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
