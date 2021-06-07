const express = require('express');
const Label = require('../models/label');

const router = express.Router();

router.post('/create', async (req, res) => {
    try{
        const label = await Label.create(req.body);

        return res.send({label});
    }catch(err){
        return res.status(400).send({error: 'Registration failed.'});
    }
});

router.get('/', async (req, res) => {
    try{
        const label = await Label.find();

        return res.send({ label });
    }catch(err){
        return res.status(400).send({ error: 'Failed to get labels.' });
    }
})

module.exports = app => app.use('/label', router);