const express = require("express");

const app = express();

app.use(express.json());

/*
  Thinkora website
  index.html root folder mein hai.
*/
app.use(express.static("."));


/*
  Thinkora AI API
  Real AI brain hum next step mein connect karenge.
*/
app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const reply =
`I received your question:

"${message}"

🧠 Thinkora AI is thinking...

The real AI brain will be connected next.

Thinkora will then be able to:
• Understand complex questions
• Solve problems
• Explain topics
• Create notes
• Generate quizzes
• Understand images
• Read PDFs
• Remember conversations
• Give fast responses`;

        res.json({
            reply: reply
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Thinkora server error"
        });

    }

});


const PORT =
    process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        `Thinkora AI running on port ${PORT}`
    );

});
