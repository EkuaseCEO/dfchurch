import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import path from 'path'
import cors from 'cors'

dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log('MongoDb is connected')
}).catch((err) => {
    console.log(err)
})

const __dirname = path.resolve();


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",           // local dev
    "https://dfchurch-304a0.web.app", // Firebase hosting
    "https://your-project-id.firebaseapp.com"
  ],
  credentials: true
}));



//Creating Routes

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
// });

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});