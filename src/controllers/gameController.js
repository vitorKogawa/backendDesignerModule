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
 }).fields([
     {name: "background_image", maxCount: 1},
     {name: "gameImage", maxCount: 1}
    ]) 


router.post('/create', upload, async (req, res) => {
    const { title, description, default_node_color, default_text_color, template, background_color, background_image, image, userID } = req.body;
    try{
        var logoImage = "default.jpg";
        var bgImage = "default.jpg";
        if (typeof req.files.gameImage !== "undefined") {
            logoImage = req.files.gameImage[0].filename;  
        }   
        if (typeof req.files.background_image !== "undefined") {
            bgImage = req.files.background_image[0].filename;   
        }        
        const game = await Game.create({title, 
            description, 
            default_node_color, 
            default_text_color, 
            template, 
            background_color,
            background_image: bgImage, 
            image: logoImage,
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