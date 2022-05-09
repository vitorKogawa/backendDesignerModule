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
        } catch (error) {
            return response.status(400).json({ error });
        }
    };

    update = async (request, response) => {
        try {
        } catch (error) {
            return response.status(400).json({ error });
        }
    };

    remove = async (request, response) => {
        try {
        } catch (error) {
            return response.status(400).json({ error });
        }
    };
}

export default new AttributesController();
