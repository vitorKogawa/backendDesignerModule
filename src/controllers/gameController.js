const express = require('express');
const path = require("path");
const multer = require("multer");

const Game = require('../models/game');

const router = express.Router();

const storage = multer.diskStorage({
    destination: path.resolve( __dirname, '..', 'assets', 'img', 'games'),
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("background_image");


router.post('/create', upload, async (req, res) => {
    const { title, description, default_node_color, default_text_color, template, background_color, background_image, userID } = req.body;
    try{
        const game = await Game.create({title, 
            description, 
            default_node_color, 
            default_text_color, 
            template, 
            background_color,
            background_image: req.file.originalname, 
            userID
        });

        return res.send({ game });
    }catch(err){
        return res.status(400).send({error: 'Registration failed.'});
    }
});

router.get('/', async (req, res) => {
    try{
        const game = await Game.find();

        return res.send({ game });
    }catch(err){
        return res.status(400).send({ error: 'Failed to get games.' });
    }
})

router.get('/:id', async (req, res) => {
    try{
        const game = await Game.findById(req.params.id).populate({
            path: 'nodes',
            model: 'gameNode',
            populate: {
                path: 'labels',
                model: 'label'           
            }
        });

        return res.send({ game });
    }catch(err){
        return res.status(400).send({ error: 'Failed to get game.' });
    }
})

router.get('/userGames/:id', async (req, res) => {
    try{
        const game = await Game.find({userID: req.params.id}).populate({
            path: 'nodes',
            model: 'gameNode',
            populate: {
                path: 'labels',
                model: 'label'           
            }
        });

        return res.send({ game });
    }catch(err){
        return res.status(400).send({ error: 'Failed to get game.' });
    }
})

module.exports = app => app.use('/game', router);