const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static("."));

const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HF_TOKEN
});

app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const response = await client.chat.completions.create({

            model: "openai/gpt-oss-120b:fastest",

            messages: [
                {
                    role: "system",
                    content: `
You are Thinkora AI, a powerful and friendly AI study assistant.

Developer: INNOCENT VINUU.

Help users with:
- Study
- Mathematics
- Science
- Programming
- Notes
- Summaries
- Quizzes
- Explanations
- General questions

Answer clearly and intelligently.

If the user speaks Hindi, answer in Hindi/Hinglish.
If the user speaks Gujarati, answer in Gujarati.
If the user speaks English, answer in English.

Be helpful, accurate and easy to understand.
`
                },
                {
                    role: "user",
                    content: message
                }
            ]

        });

        const reply = response.choices[0].message.content;

        res.json({
            reply: reply
        });

    } catch (error) {

        console.error("Thinkora AI Error:", error);

        res.status(500).json({
            error: "Thinkora AI could not generate a response."
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Thinkora AI running on port ${PORT}`);
});
