const express = require('express');
const GameNodeConnection = require('../models/nodeConnection');

const router = express.Router();

router.post('/create', async (req, res) => {
    try{
        const nodeConnection = await GameNodeConnection.create(req.body);

        return res.send({nodeConnection});
    }catch(err){
        return res.status(400).send({error: 'Registration failed.'});
    }
});

router.get('/', async (req, res) => {
    try{
        const nodeConnection = await GameNodeConnection.find();

        return res.send({ nodeConnection });
    }catch(err){
        return res.status(400).send({ error: 'Failed to get connections.' });
    }
})

router.get('/:id', async (req, res) => {
    try{
        const nodeConnection = await GameNodeConnection.find({gameId: req.params.id});

        return res.send({ nodeConnection });
    }catch(err){
        return res.status(400).send({ error: 'Failed to get connections.' });
    }
})

module.exports = app => app.use('/connection', router);