import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';


import authRoutes from './routes/authRoutes.js';
import contactRoutes from "./routes/contactRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
// import jobRoutes from './routes/jobRoutes';
// import employmentRoutes from './routes/employmentRoutes';
// import financeRoutes from './routes/financeRoutes';
// import bankRoutes from './routes/bankRoutes';
// import leadRoutes from './routes/leadRoutes';
// import userRoutes from './routes/userRoutes';
// import employeeRoutes from './routes/employeeRoutes';
// import unemployedRoutes from './routes/unemployedRoutes';



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session( { secret: process.env.SESSION_SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const URI = process.env.MONGODB_URI;

// Database Connection
mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/clients", clientRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/employments", employmentRoutes);
// app.use("/api/finance", financeRoutes);
// app.use("/banks", bankRoutes);
// app.use("/api/leads", leadRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/employees", employeeRoutes);
// app.use("/api/unemployed", unemployedRoutes);


// Basic route
app.get('/', (req, res) => {
    res.send('Remote Integrity server is running...');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;




