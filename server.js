const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

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

You must always match user symptoms to ONE service below.

SERVICES:
${SERVICES}

RULES:
- Always pick ONE service
- Never say "unable to classify"
- Return ONLY JSON

FORMAT:
{
  "issue": "",
  "treatment": "",
  "price": ""
}
            `
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    let result;

    try {
      result = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      result = {
        issue: "Unknown",
        treatment: "Consultation",
        price: "Varies"
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
