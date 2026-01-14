const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Replace with your AI service endpoint and API key (e.g., OpenAI, Google Dialogflow)
const AI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = 'YOUR_API_KEY';

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            AI_API_URL,
            {
                model: "gpt-3.5-turbo", // Replace with appropriate model
                messages: [{ role: "user", content: userMessage }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiResponse = response.data.choices[0].message.content;
        res.json({ reply: aiResponse });
    } catch (error) {
        console.error('Error communicating with AI service:', error);
        res.status(500).json({ reply: 'Sorry, I am unable to respond right now.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
