import express from 'express';

const Routes = express.Router();

Routes.get('/', (req, res) => {
    res.json({
        message: 'working'
    })
})

export default Routes;