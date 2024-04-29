const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3001; // Or a different port if you prefer
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Get your Gemini API key from Google AI Studio (https://ai.google.dev)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Use the appropriate Gemini model (here, for text-only chat)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const geminiResponse = await model.generateContent(userMessage);
    const responseText = await geminiResponse.response.text();

    res.json({ message: responseText });
  } catch (error) {
    console.error("Error contacting Gemini API:", error);
    res
      .status(500)
      .json({ error: "Something went wrong contacting the Gemini API" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
