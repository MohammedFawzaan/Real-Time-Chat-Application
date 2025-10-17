import express from 'express';
import cors from 'cors';
import sampleRoutes from './routes/sample.routes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/api', sampleRoutes);

app.get('/', (req, res) => {
    console.log('Start');
    res.send('Start');
});

app.listen(port, () => {
    console.log(`Server Listening at ${port}`);
});