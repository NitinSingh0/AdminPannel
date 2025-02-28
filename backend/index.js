require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const authRoutes = require("./routes/authRoutes");
const pollRoutes = require("./routes/pollRoutes");
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");

const connectDB = require("./config/db");
const app = express();

// Allow requests from your frontend
const corsOptions = {
  origin: 'https://admin-pannel-8gnc.vercel.app', // Allow only your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies/auth headers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('CORS fixed!');
});

app.use(express.json());
connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/poll", pollRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reports", reportRoutes);

//serve upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
