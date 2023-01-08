import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

const app = express()

app.use(express.json())

app.use(cors())

app.use(morgan("combined"))

app.use(routes)

export default app;