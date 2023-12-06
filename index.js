// Các thư viện cơ bản, mọi người cứ giữ nguyên
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
// const corsOptions = {
//     origin: 'http://localhost:5173',
// };
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// notes: đổi port nểu muốn
const port = 3000; //Mặc định là port 3000

// XỬ LÝ ROUTES

// Biển quảng cáo
import spaceRouter from './routes/space.route.js';
import surfaceRouter from './routes/surface.route.js';
import reportRouter from './routes/report.route.js';

app.get('/', (req, res) => {
    res.status(200).json('Hello World!');
});

app.use('/spaces', spaceRouter);
app.use('/surfaces', surfaceRouter);
app.use('/reports', reportRouter);


// Xử lý lỗi 404
app.use((req, res) => {
    res.status(404).json('Endpoint not found');
});

// Xử lý lỗi 500
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json('Something went wrong');
});

// Chạy ứng dụng
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
