import { Router } from 'express'
import { Events } from './../models/events'

class EventsController {
    create = async (request, response) => {
        try {
            //code ...
        } catch (error) {
            return response.status(400).json({ message_error: error })
        }
    }

    find = async (request, response) => {
        try {
            //code ...
        } catch (error) {
            return response.status(400).json({ message_error: error })
        }
    }

    update = async (request, response) => {
        try {
            //code ...
        } catch (error) {
            return response.status(400).json({ message_error: error })
        }
    }

    remove = async (request, response) => {
        try {
            //code ...
        } catch (error) {
            return response.status(400).json({ message_error: error })
        }
    }
}

export default new EventsController()