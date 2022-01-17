import { GameNode } from "./../models/gameNode";
import { Label } from "./../models/label";
import { Game } from "./../models/game";
import { NodeConnectionSchema } from "./../models/nodeConnection";

class GameNodeController {
    create = async (request, response) => {
        try {
            const {
                id,
                name,
                position,
                startNode,
                endNode,
                nodeColor,
                textColor,
                backgroundColor,
                duration,
                markdownContent,
                labels,
                nextNodes,
                nodeType,
            } = request.body;
            const gameNode = await GameNode.create({
                name,
                position,
                nodeColor,
                startNode,
                endNode,
                textColor,
                backgroundColor,
                duration,
                markdownContent,
                nextNodes,
                nodeType,
            });

            await Promise.all(
                labels.map(async (element) => {
                    const nodeLabel = await Label.find({ label: element.name });
                    nodeLabel.forEach((item) => {
                        gameNode.labels.push(item);
                    });
                })
            );

            await gameNode.save();

            await Game.findByIdAndUpdate(
                id,
                { $addToSet: { nodes: gameNode } },
                { safe: true }
            );

            return response.send({ gameNode });
        } catch (err) {
            return response.status(400).send({ error: "Registration failed." });
        }
    };

    findAll = async (request, response) => {
        try {
            const gameNode = await GameNode.find();

            return response.send({ gameNode });
        } catch (err) {
            return response.status(400).send({ error: "Failed to get nodes." });
        }
    };

    findByID = async (request, response) => {
        try {
            const gameNode = await GameNode.findById(
                request.params.id
            ).populate("labels");

            return response.send({ gameNode });
        } catch (err) {
            return response.status(400).send({ error: "Failed to get node." });
        }
    };

    editNextNodesByID = async (request, response) => {
        const { nextNodes } = request.body;
        try {
            const gameNode = await GameNode.findById(request.params.id);
            nextNodes.forEach((item) => {
                gameNode.nextNodes.push(item);
            });

            await gameNode.save();

            return response.send({ gameNode });
        } catch (err) {
            return response
                .status(400)
                .send({ error: "Failed to update node." });
        }
    };

    editPositionByID = async (request, response) => {
        const { position } = request.body;
        try {
            const gameNode = await GameNode.findById(request.params.id);
            gameNode.position = position;

            await gameNode.save();

            return response.send({ gameNode });
        } catch (err) {
            return response
                .status(400)
                .send({ error: "Failed to update node." });
        }
    };

    editLabelsByID = async (request, response) => {
        const { labels } = request.body;
        try {
            const gameNode = await GameNode.findById(request.params.id);
            gameNode.labels = [];

            await gameNode.save();

            await Promise.all(
                labels.map(async (element) => {
                    const nodeLabel = await Label.find({
                        label: element.label,
                    });
                    nodeLabel.forEach((item) => {
                        gameNode.labels.push(item);
                    });
                })
            );

            await gameNode.save();

            return response.send({ gameNode });
        } catch (err) {
            return response
                .status(400)
                .send({ error: "Failed to update labels." });
        }
    };

    editColorsByID = async (request, response) => {
        const { backgroundColor, textColor, nodeColor } = request.body;
        try {
            const gameNode = await GameNode.findById(request.params.id);
            gameNode.nodeColor = nodeColor;
            gameNode.textColor = textColor;
            gameNode.backgroundColor = backgroundColor;

            await gameNode.save();

            return response.send({ gameNode });
        } catch (err) {
            return response
                .status(400)
                .send({ error: "Failed to update node." });
        }
    };

    editEndByID = async (request, response) => {
        const { endNode } = request.body;
        try {
            const gameNode = await GameNode.findById(request.params.id);
            gameNode.endNode = endNode;

            await gameNode.save();

            return response.send({ gameNode });
        } catch (err) {
            return response
                .status(400)
                .send({ error: "Failed to update node." });
        }
    };

    editStartByID = async (request, response) => {
        const { startNode } = request.body;
        try {
            const gameNode = await GameNode.findById(request.params.id);
            gameNode.startNode = startNode;

            await gameNode.save();

            return response.send({ gameNode });
        } catch (err) {
            return response
                .status(400)
                .send({ error: "Failed to update node." });
        }
    };

    editImageByID = async (request, response) => {
        try {
            const gameNode = await GameNode.findById(request.params.id);
            if (request.file !== null)
                gameNode.nodeImage = request.file.filename;

            await gameNode.save();

            return response.send({ gameNode });
        } catch (err) {
            return response
                .status(400)
                .send({ error: "Failed to update node." });
        }
    };

    editCompiledContentByID = async (request, response) => {
        const { compiled_content } = request.body;
        try {
            const gameNode = await GameNode.findById(request.params.id);

            gameNode.compiled_content = compiled_content;

            await gameNode.save();

            return response.send({ gameNode });
        } catch (err) {
            return response
                .status(400)
                .send({ error: "Failed to update node." });
        }
    };

    editByID = async (request, response) => {
        const { name, duration, markdownContent, theme, compiled_content } =
            request.body;
        try {
            const gameNode = await GameNode.findById(request.params.id);

            gameNode.name = name;
            gameNode.duration = duration;
            gameNode.markdownContent = markdownContent;
            gameNode.theme = theme;

            await gameNode.save();

            return response.send({ gameNode });
        } catch (err) {
            return response
                .status(400)
                .send({ error: "Failed to update node." });
        }
    };

    editFormByID = async (request, response) => {
        const { form } = request.body;
        try {
            const gameNode = await GameNode.findById(request.params.id);
            gameNode.form = form;

            await gameNode.save();

            return response.send({ gameNode });
        } catch (err) {
            return response
                .status(400)
                .send({ error: "Failed to update node." });
        }
    };

    deleteByID = async (request, response) => {
        const nodeID = request.params.id;
        const { elements, game } = request.body;
        try {
            elements.forEach(async (item) => {
                if (item.id.toString().search("react") === -1) {
                    const currentGame = await Game.findById(game).populate(
                        "nodes"
                    );
                    currentGame.nodes.forEach(async (elem, index) => {
                        if (elem._id == item.id) {
                            currentGame.nodes.pull({
                                _id: currentGame.nodes[index]._id,
                            });
                            await currentGame.save();
                        }
                    });
                    await GameNode.findByIdAndDelete(item.id);
                } else {
                    if (item.source !== nodeID) {
                        const node = await GameNode.findById(item.source);
                        if (node !== null) {
                            node.nextNodes.forEach(async (elem, index) => {
                                if (elem.id === nodeID) {
                                    node.nextNodes.pull({
                                        _id: node.nextNodes[index]._id,
                                    });
                                    await node.save();
                                }
                            });
                        }
                    } else if (item.target !== nodeID) {
                        const node = await GameNode.findById(item.target);
                        if (node !== null) {
                            node.nextNodes.forEach(async (elem, index) => {
                                if (elem.id === nodeID) {
                                    node.nextNodes.pull({
                                        _id: node.nextNodes[index]._id,
                                    });
                                    await node.save();
                                }
                            });
                        }
                    }
                    await NodeConnectionSchema.findByIdAndDelete(item.id);
                }
            });
            return response
                .status(200)
                .send({ success: "Node has been deleted." });
        } catch (err) {
            return response
                .status(400)
                .send({ error: "Failed to delete node.", err });
        }
    };
}

export default new GameNodeController();
