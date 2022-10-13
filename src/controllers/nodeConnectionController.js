import { NodeConnectionSchema } from '../models/nodeConnection';

class NodeConnectionController {
  create = async (request, response) => {
    try {
      console.log(request.body)
      const nodeConnection = await NodeConnectionSchema.create(request.body);

      return response.send({ nodeConnection });
    } catch (error) {
      return response.status(400).send({ error: 'Registration failed.' });
    }
  };

  findAll = async (request, response) => {
    try {
      const nodeConnection = await NodeConnectionSchema.find();

      return response.send({ nodeConnection });
    } catch (error) {
      return response.status(400).send({ error: "Failed to get connections." });
    }
  };

  findByID = async (request, response) => {
    try {
      const nodeConnection = await NodeConnectionSchema.find({
        gameId: request.params.id,
      });

      return response.send({ nodeConnection });
    } catch (error) {
      return response.status(400).send({ error: 'Failed to get connections.' });
    }
  };

  findCurrentByID = async (request, response) => {
    try {
      const { id } = request.params;
      const nodeLastConnection = await NodeConnectionSchema.find({
        source: id,
      });

      return response.send({ nodeLastConnection });
    } catch (error) {
      return response.status(400).send({ error: 'Failed to get connections.' });
    }
  };
}

export default new NodeConnectionController();
