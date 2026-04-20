const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

// Simple service reference (kept clean, no duplication)
const SERVICES = `
Teeth Cleaning: bleeding gums, bad breath, yellow teeth, gum inflammation (2000-5000 KES)
Tooth Extraction: broken tooth, severe pain, swelling, tooth decay (3000-8000 KES)
Filling: cavities, small holes, mild pain when eating (2500-6000 KES)
Root Canal: deep pain, hot/cold sensitivity, severe tooth ache (10000-25000 KES)
Braces: crooked teeth, alignment issues (80000-150000 KES)
`;

app.post("/analyze", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a dental triage classifier for Smile Avenue Dental Centre in Nairobi.

You are NOT allowed to say "unable to classify" unless the message has absolutely no dental meaning.

You MUST ALWAYS choose ONE of the services below.

SERVICES (STRICT CLASSIFICATION):

1. TEETH_CLEANING
- bleeding gums
- bad breath
- yellow teeth
- gum inflammation

2. TOOTH_EXTRACTION
- broken tooth
- severe pain
- swelling
- tooth decay
- tooth knocked out

3. FILLING
- cavities
- small holes in teeth
- mild pain when chewing

4. ROOT_CANAL
- deep tooth pain
- hot/cold sensitivity
- severe tooth ache
- nerve pain

5. BRACES
- crooked teeth
- alignment issues
- spacing problems

RULES:
- Always select ONE category above
- If multiple match, choose the strongest pain-related one
- NEVER return "unable to classify"
- NEVER return free text explanations
- Output must be strict JSON:

{
  "issue": "ONE_SERVICE_NAME",
  "treatment": "SERVICE_NAME",
  "price": ""
}
      };
    }

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

app.listen(PORT, () => console.log("Server running on port " + PORT));
