const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

// Initialize dotenv at the top
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Health check route to verify server status
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

/**
 * AI Chat Route
 * This is where the magic happens.
 */
app.post('/chat', async (req, res) => {
  // TODO: Implement the AI chat route
  const {messages} = req.body
  // 1. Extract `messages` from req.body
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
  // 2. Read API key from process.env.OPENROUTER_API_KEY
  try{
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions',{
      method: 'POST',
      headers:{
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },body: JSON.stringify({
        model: "openrouter/auto",
        messages: messages
      })
    })
    const data = await response.json();
    res.status(200).json({
      reply: data.choices[0].message.content
    })
  }catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
  // 3. POST to https://openrouter.ai/api/v1/chat/completions
  //    with Authorization: Bearer <key> and the messages array
  // 4. Return the AI reply as { reply: "..." }
  
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
