import express from 'express';

import Routes from './routes'

const App = express();

App.use('/api', Routes);

export default App;