import { config } from 'dotenv';

config()

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { setUpDb } from './database/db';

const server = express()

server.use(express.json())

server.use(cors())

server.use(morgan("combined"))

server.use(routes)

server.listen(process.env.APP_PORT, async () => {
    await setUpDb();

    console.log(`Server running on http://localhost:${process.env.APP_PORT}`)
})