const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static("."));

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const response = await client.responses.create({

            model: "gpt-5.6-sol",

            instructions: `
You are Thinkora AI, a powerful and friendly AI study assistant.

Your developer is INNOCENT VINUU.

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
Use simple language when the user asks for simple explanations.
If the user speaks Hindi, answer in Hindi/Hinglish.
If the user speaks Gujarati, answer in Gujarati.
Be helpful, accurate and concise.
`,

            input: message

        });

        res.json({
            reply: response.output_text
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
