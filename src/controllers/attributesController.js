import { response, Router } from "express";
import { Attributes } from "./../models/attributes";

class AttributesController {
    create = async (request, response) => {
        //implementar validações
        try {
            const {
                _id,
                name,
                type,
                max_value,
                default_value,
                player_attr,
                icon,
            } = request.body;

            const newAttribute = await Attributes.create({
                _id,
                name,
                type,
                max_value,
                default_value,
                player_attr,
                icon,
            });

            return response.status(200).json({ newAttribute });
        } catch (error) {
            return response.status(400).json({ error });
        }
    };

    findByID = async (request, response) => {
        try {
            const attribute = await Attributes.findById(request.params.id);

            if (attribute) {
                return response.status(200).json(attribute);
            } else {
                return response
                    .status(400)
                    .json({ message: "Attribute not found." });
            }
        } catch (error) {
            return response.status(400).json({ error });
        }
    };

    update = async (request, response) => {
        try {
            //verificando se o atributo a ser modificado existe
            const IsAttribute = await Attributes.findById(request.params.id);

            if (IsAttribute) {
                const newAttributeData = {
                    name: request.body.name,
                    type: request.body.type,
                    max_value: request.body.max_value,
                    default_value: request.body.default_value,
                    player_attr: request.body.player_attr,
                    icon: request.body.icon,
                };

                await Attributes.updateOne(newAttributeData, null, { overwrite: false });

                return response.status(200).json({ message: "sucess." });
            } else {
                return response
                    .status(400)
                    .json({ message: "attribute not found." });
            }
        } catch (error) {
            return response.status(400).json({ error });
        }
    };

    remove = async (request, response) => {
        try {
            //verificando se o atributo a ser removido existe.
            const IsAtribute = await Attributes.find({
                _id: request.params.id,
            });

            if (IsAtribute) {
                await Attributes.deleteOne(IsAtribute);

                return response.status(200).json({ message: "sucess." });
            } else {
                return response
                    .status(400)
                    .json({ message: "attribute not found" });
            }
        } catch (error) {
            return response.status(400).json({ error });
        }
    };
}

export default new AttributesController();
