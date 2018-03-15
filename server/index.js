import dotenv from 'dotenv';

import App from './app'

dotenv.config();
const port = process.env.PORT || 3000;

App.listen(port, () => {
    console.log(`listenin on port ${port}...`);
})