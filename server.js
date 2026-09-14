const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Message required"
            });
        }

        // REAL AI CONNECTION NEXT STEP MEIN AAYEGA

        const reply =
            "Thinkora received your question:\n\n" +
            message +
            "\n\n" +
            "Thinkora ka real AI brain abhi connect hona baaki hai.";

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Thinkora AI running on port ${PORT}`
    );
});
