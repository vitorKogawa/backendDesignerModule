import { NodeConnectionSchema } from "./../models/nodeConnection";

class NodeConnectionController {
    create = async (request, response) => {
        try {
            const nodeConnection = await NodeConnectionSchema.create(
                request.body
            );

            return response.send({ nodeConnection });
        } catch (error) {
            return response.status(400).send({ error: "Registration failed." });
        }
    };

    findAll = async (request, response) => {
        try {
            const nodeConnection = await NodeConnectionSchema.find();

            return response.send({ nodeConnection });
        } catch (error) {
            return response
                .status(400)
                .send({ error: "Failed to get connections." });
        }
    };

    findByID = async (request, response) => {
        try {
            const nodeConnection = await NodeConnectionSchema.find({
                gameId: request.params.id,
            });

            return response.send({ nodeConnection });
        } catch (error) {
            return response
                .status(400)
                .send({ error: "Failed to get connections." });
        }
    };

    findCurrentByID = async (request, response) => {
        try {
            let id = request.params.id;
            const nodeLastConnection = await NodeConnectionSchema.find({
                source: id,
            });

            return response.send({ nodeLastConnection });
        } catch (error) {
            return response
                .status(400)
                .send({ error: "Failed to get connections." });
        }
    };
}

export default new NodeConnectionController();
