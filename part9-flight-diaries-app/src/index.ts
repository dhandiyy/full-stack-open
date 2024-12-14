import express from 'express';
import diaryRouter from './routes/diaryRoute';


const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, rest) => {
    console.log('someone pinged here');
    rest.send('pong');
    
});
app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});