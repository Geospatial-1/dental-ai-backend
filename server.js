const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const SERVICES = `
Teeth Cleaning: bleeding gums, bad breath (2000-5000 KES)
Extraction: broken tooth, severe pain (3000-8000 KES)
Filling: cavities, mild pain (2500-6000 KES)
Root Canal: deep pain, sensitivity (10000-25000 KES)
Braces: crooked teeth (80000-150000 KES)
`;

app.post("/analyze", async (req, res) => {
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
          content: `You are a dental triage assistant for Smile Avenue Dental Centre in Nairobi.

Your job is to analyze patient symptoms and match them to the closest dental service.

You MUST follow these rules:
- Always match the user's symptoms to ONE service below
- Only say "Consult dentist" if absolutely no match exists
- Always return valid JSON only (no extra text)

SERVICES:

Teeth Cleaning (Scaling):
- symptoms: bleeding gums, bad breath, yellow teeth, gum inflammation
- price: 2000–5000 KES

Tooth Extraction:
- symptoms: broken tooth, severe pain, swelling, tooth decay
- price: 3000–8000 KES

Filling:
- symptoms: cavities, small holes, mild pain when eating
- price: 2500–6000 KES

Root Canal:
- symptoms: deep pain, hot/cold sensitivity, severe tooth ache
- price: 10000–25000 KES

Braces:
- symptoms: crooked teeth, alignment issues
- price: 80000–150000 KES

OUTPUT FORMAT (STRICT):
Return ONLY this JSON:

{
  "issue": "",
  "treatment": "",
  "price": ""
  
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
  } catch {
    result = {
      issue: "Consult dentist",
      treatment: "Consultation",
      price: "Varies"
    };
  }

  const whatsapp = `https://wa.me/2547XXXXXXXXX?text=Hi, I have ${result.issue} and need ${result.treatment}`;

  res.json({
    ...result,
    whatsapp
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server running on port " + PORT));
