const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve chatbot.html

// 🌊 Custom chatbot instructions using your beach list and aliases
const systemPrompt = `
You are a beach tourism chatbot for the project "Exploring Bharath: Heritage and Culture".
Only give beach information based on the project data listed below.
Do not include beaches outside this list, even if the user asks.
Use official names, but recognize and match common alternate spellings or names.

Beaches by state:
- Tamil Nadu: Marina Beach, Pondicherry Beach, Rameswaram Beach
- Kerala: Kovalam Beach, Varkala Beach, Alleppey Beach
- Karnataka: Gokarna Beach, Om Beach, Malpe Beach
- Maharashtra: Juhu Beach, Kashid Beach, Tarkarli Beach
- Goa: Palolem Beach, Calangute Beach, Anjuna Beach
- Andhra Pradesh: Rushikonda Beach, Bheemunipatnam Beach, Rama Krishna Beach
- Odisha: Puri Beach, Chandrabhaga Beach, Gopalpur Beach
- West Bengal: Digha Beach, Mandarmani Beach, Tajpur Beach
-Gujarat: Mandvi Beach, Madhavpur Beach, Diu Beach
Alias mapping:
- Alappuzha Beach = Alleppey Beach
- Alappuzha = Alleppey
- Puducherry Beach = Pondicherry Beach
- Rameshwaram = Rameswaram
- RK Beach = Rama Krishna Beach

If a user uses an alias (like "Alappuzha Beach"), respond with the official beach name from the list (e.g., "Alleppey Beach") and its description.
Always follow this project data and format.
`;

app.post("/ask", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Beach Tour Chatbot"
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error("OpenRouter API error:", error.message);

    if (error.response?.data) {
      console.error("Details:", error.response.data);
    }

    res.status(500).json({
      reply: "❌ Could not reach OpenRouter model. Please try again later.",
    });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});

//Database

const mysql = require('mysql2');


const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const path = require('path');

dotenv.config();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// User registration
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  db.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password],
    (err) => {
      if (err) {
        console.error("❌ Registration error:", err);
        return res.status(500).send('Registration failed');
      }
      res.send('User registered');
    }
  );
});

// User login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).send('Login failed');
      }
      res.json({ id: results[0].id, email: results[0].email });
    });
});

// Save feedback
app.post('/feedback', (req, res) => {
  const { user_email, rating, category, message } = req.body;
  const submitted_at = new Date();

  // Save feedback to the database
  db.query(
    'INSERT INTO feedback (user_email, rating, category, message, submitted_at) VALUES (?, ?, ?, ?, ?)',
    [user_email, rating, category, message, submitted_at],
    (err) => {
      if (err) {
        console.error('❌ Failed to submit feedback:', err);
        return res.status(500).send('Failed to submit feedback');
      }

      // Send a confirmation email
      const mailOptions = {
        from: `Beach Feedback <${process.env.EMAIL_USER}>`,
        to: user_email,
        subject: '🌊 Thank you for your feedback!',
        text: `Hi,

Thank you for sharing your feedback with us on the Bharath Beach Explorer platform.

We value your input:
- Rating: ${rating}
- Category: ${category}
- Message: ${message}

Stay tuned for more exciting features and experiences!

Regards,  
Bharath Beach Explorer Team`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('❌ Error sending confirmation email:', error);
        } else {
          console.log('✅ Feedback confirmation email sent to:', user_email);
        }
      });

      res.send('Feedback submitted and confirmation sent.');
    }
  );
});



// Save planner data
app.post('/plan', (req, res) => {
  const { user_email, beaches, start_date, end_date } = req.body;
  db.query('INSERT INTO plans (user_email, beaches, start_date, end_date) VALUES (?, ?, ?, ?)',
    [user_email, beaches, start_date, end_date],
    (err) => {
      if (err) return res.status(500).send('Failed to save plan');
      res.send('Plan saved');
    });
});

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Daily job to check for reminders (8 AM every day)
// Old (runs at 8 AM daily):
//schedule.scheduleJob('*/1 * * * *', () => {
schedule.scheduleJob('0 8 * * *', () => {

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDate = tomorrow.toISOString().split('T')[0];

  db.query('SELECT * FROM plans WHERE start_date = ?', [formattedDate], (err, results) => {
    if (err) {
      console.error('❌ Reminder query error:', err);
      return;
    }

    results.forEach(plan => {
      const mailOptions = {
        from: `Beach Reminder <${process.env.EMAIL_USER}>`,
        to: plan.user_email,
        subject: '🌊 Travel Reminder: Your beach trip is tomorrow!',
        text: `Hello,

This is a friendly reminder that your beach plan to ${plan.beaches} starts tomorrow (${plan.start_date}).

Enjoy your trip!
- Bharath Beach Explorer`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("❌ Error sending reminder:", error);
        } else {
          console.log("✅ Reminder sent to:", plan.user_email);
        }
      });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
