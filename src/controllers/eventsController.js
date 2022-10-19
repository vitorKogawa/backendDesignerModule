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

    findByID = async (request, response) => {
        try {
            // code ...
        } catch (error) {
            return response.status(400).json({ message_error: error });
        }
    };

    update = async (request, response) => {
        try {
            const IsEvent = await Events.findById(request.params.id)

            if (IsEvent) {
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

                const newEventData = {
                    name,
                    source_type,
                    source_id,
                    operator,
                    value,
                    target_type,
                    target_id,
                    modifier,
                }

                await Events.updateOne(
                    { _id: request.params.id },
                    newEventData
                )

                return response.status(200).json({ message: 'event.' })
            }

            return response.status(400).json({ message: 'event not found.' });
        } catch (error) {
            return response.status(400).json({ message_error: error });
        }
    };

    remove = async (request, response) => {
        try {
            await Events.deleteOne({ _id: request.params.id })

            return response.status(200).json({ msg: "sucess." })
        } catch (error) {
            return response.status(400).json({ message_error: error });
        }
    };
}

export default new EventsController();
