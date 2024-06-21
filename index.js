import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';

const app = express();
const API_KEY  =  "AIzaSyCt4QGnM8GpCKqBm55tsbaJw0gB54zMVWU"

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/chat", async (req, res) => {
    const prompt = req.body.message;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ response: text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ response: 'Sorry, there was an error processing your request.' });
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
