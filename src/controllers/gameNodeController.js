const express = require('express');
const GameNode = require('../models/gameNode');
const Label = require('../models/label');
const Game = require('../models/game');
const GameNodeConnection = require('../models/nodeConnection');
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: path.resolve( __dirname, '..', 'assets', 'img', 'nodes'),
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("nodeImage");

const router = express.Router();

router.post('/create', async (req, res) => {
    try{
        const { id, name, position, startNode, endNode, nodeColor, textColor, backgroundColor, duration, markdownContent, labels, nextNodes } = req.body;
        const gameNode = await GameNode.create({name, position, nodeColor, startNode, endNode, textColor, backgroundColor, duration, markdownContent, nextNodes});
        
        await Promise.all(labels.map(async element => { 
            const nodeLabel = await Label.find({'label': element.name});
            nodeLabel.forEach(item => {
                gameNode.labels.push(item);
            });
        }));    

        await gameNode.save();

        await Game.findByIdAndUpdate(id,  
            {$addToSet: {'nodes': gameNode}},
            {safe: true});

        return res.send({ gameNode });
    }catch(err){
        return res.status(400).send({error: 'Registration failed.'});
    }
});

router.get('/', async (req, res) => {
    try{
        const gameNode = await GameNode.find();

        return res.send({ gameNode });
    }catch(err){
        return res.status(400).send({ error: 'Failed to get nodes.' });
    }
})

router.get('/:id', async (req, res) => {
    try{
        const gameNode = await GameNode.findById(req.params.id).populate('labels');

        return res.send({ gameNode });
    }catch(err){
        return res.status(400).send({ error: 'Failed to get node.' });
    }
})

router.put('/edit/nextnodes/:id', async (req, res) => {
    const { nextNodes } = req.body
    try{
        const gameNode = await GameNode.findById(req.params.id)
        nextNodes.forEach(item => {
            gameNode.nextNodes.push(item);
        });
        
        await gameNode.save();

        return res.send({ gameNode });
    }catch(err){
        return res.status(400).send({ error: 'Failed to update node.' });
    }
})

router.put('/edit/position/:id', async (req, res) => {
    const { position } = req.body
    try{
        const gameNode = await GameNode.findById(req.params.id);
        gameNode.position = position;
        
        await gameNode.save();

        return res.send({ gameNode });
    }catch(err){
        return res.status(400).send({ error: 'Failed to update node.' });
    }
})

router.put('/edit/labels/:id', async (req, res) => {
    const { labels } = req.body
    try{
        const gameNode = await GameNode.findById(req.params.id);
        gameNode.labels = [];

        await gameNode.save();

        await Promise.all(labels.map(async element => { 
            const nodeLabel = await Label.find({'label': element.label});
            nodeLabel.forEach(item => {
                gameNode.labels.push(item);
            });
        })); 
        
        await gameNode.save();

        return res.send({ gameNode });
    }catch(err){
        return res.status(400).send({ error: 'Failed to update labels.' });
    }
})

router.put('/edit/colors/:id', async (req, res) => {
    const { backgroundColor, textColor, nodeColor } = req.body
    try{
        const gameNode = await GameNode.findById(req.params.id);
        gameNode.nodeColor = nodeColor;
        gameNode.textColor = textColor;
        gameNode.backgroundColor = backgroundColor;
        
        await gameNode.save();

        return res.send({ gameNode });
    }catch(err){
        return res.status(400).send({ error: 'Failed to update node.' });
    }
})

router.put('/edit/end/:id', async (req, res) => {
    const { endNode } = req.body
    try{
        const gameNode = await GameNode.findById(req.params.id);
        gameNode.endNode = endNode;
        
        await gameNode.save();

        return res.send({ gameNode });
    }catch(err){
        return res.status(400).send({ error: 'Failed to update node.' });
    }
})

router.put('/edit/start/:id', async (req, res) => {
    const { startNode } = req.body
    try{
        const gameNode = await GameNode.findById(req.params.id);
        gameNode.startNode = startNode;
        
        await gameNode.save();

        return res.send({ gameNode });
    }catch(err){
        return res.status(400).send({ error: 'Failed to update node.' });
    }
})

router.put('/edit/image/:id', upload, async (req, res) => {
    try{
        const gameNode = await GameNode.findById(req.params.id)
        if(req.file !== null)
            gameNode.nodeImage = req.file.filename

        await gameNode.save();

        return res.send({ gameNode });
    }catch(err){
        return res.status(400).send({ error: 'Failed to update node.' });
    }
})

router.put('/edit/compiled_content/:id', async (req, res) => {
    const { compiled_content } = req.body
    try{
        const gameNode = await GameNode.findById(req.params.id)
        
        gameNode.compiled_content = compiled_content;
        
        await gameNode.save();

        return res.send({ gameNode });
    }catch(err){
        return res.status(400).send({ error: 'Failed to update node.' });
    }
})

router.put('/edit/:id', async (req, res) => {
    const { name, duration, markdownContent, theme, compiled_content} = req.body
    try{
        const gameNode = await GameNode.findById(req.params.id)

        gameNode.name = name;
        gameNode.duration = duration;
        gameNode.markdownContent = markdownContent;
        gameNode.theme = theme;

        await gameNode.save();

        return res.send({ gameNode });
    }catch(err){
        return res.status(400).send({ error: 'Failed to update node.' });
    }
})

router.delete('/delete/:id', async(req, res) => {
    const nodeID = req.params.id;
    const { elements, game } = req.body;   
    try{
        elements.forEach(async item => {
            if(item.id.toString().search('react') === -1){
                const currentGame = await Game.findById(game).populate('nodes');
                currentGame.nodes.forEach(async (elem, index) => {
                    if(elem._id == item.id){
                        currentGame.nodes.pull({_id: currentGame.nodes[index]._id}) 
                        await currentGame.save()
                    }
                })
                await GameNode.findByIdAndDelete(item.id);
            }    
            else{
                if(item.source !== nodeID){
                    const node = await GameNode.findById(item.source);
                    node.nextNodes.forEach(async (elem, index) => {
                        if(elem.id === nodeID){
                            node.nextNodes.pull({_id: node.nextNodes[index]._id}) 
                            await node.save()
                        }
                    })
                }
                else if(item.target !== nodeID){
                    const node = await GameNode.findById(item.target);
                    node.nextNodes.forEach(async (elem, index) => {
                        if(elem.id === nodeID){
                            node.nextNodes.pull({_id: node.nextNodes[index]._id}) 
                            await node.save()
                        }
                    })
                }
                await GameNodeConnection.findByIdAndDelete(item.id);
            } 
        })
        return res.status(200).send({success: 'Node has been deleted.'})
    }catch(err){
        return res.status(400).send({error: 'Failed to delete node.', err})
    }
})

module.exports = app => app.use('/node', router);