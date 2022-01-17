import { Label } from "./../models/label";

class LabelController {
    create = async (request, response) => {
        try {
            const label = await Label.create(request.body);

            return response.send({ label });
        } catch (error) {
            return response.status(400).send({ error: "Registration failed." });
        }
    };

    findAll = async (request, response) => {
        try {
            const label = await Label.find();

            return response.send({ label });
        } catch (error) {
            return response
                .status(400)
                .send({ error: "Failed to get labels." });
        }
    };
}

export default new LabelController();
