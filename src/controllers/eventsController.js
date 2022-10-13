import { Router } from 'express';
import { Events } from '../models/events';

class EventsController {
    create = async (request, response) => {
        try {
            const {
                name,
                source_type,
                source_id,
                operator,
                value,
                target_type,
                target_id,
                modifier,
            } = request.body;

            const newEvent = await Events.create({
                name,
                source_type,
                source_id,
                operator,
                value,
                target_type,
                target_id,
                modifier,
            })

            return response.status(200).json({ newEvent });
        } catch (error) {
            return response.status(400).json({ message_error: error });
        }
    };

    findAll = async (request, response) => {
        try {
            const events = await Events.find()

            return response.status(200).json({ events })
        } catch (error) {
            return response.status(400).json({ error })
        }
    }

    find = async (request, response) => {
        try {
            // code ...
        } catch (error) {
            return response.status(400).json({ message_error: error });
        }
    };

    update = async (request, response) => {
        try {
            // code ...
        } catch (error) {
            return response.status(400).json({ message_error: error });
        }
    };

    remove = async (request, response) => {
        try {
            // code ...
        } catch (error) {
            return response.status(400).json({ message_error: error });
        }
    };
}

export default new EventsController();
