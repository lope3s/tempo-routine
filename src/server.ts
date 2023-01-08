import { config } from 'dotenv';

config()

import { setUpDb } from './database/db';
import app from './app';

app.listen(process.env.APP_PORT, async () => {
    await setUpDb();

    console.log(`Server running on http://localhost:${process.env.APP_PORT}`)
})