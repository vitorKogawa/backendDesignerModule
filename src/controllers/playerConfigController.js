import { Router } from 'express'
import { playerConfig } from './../models/playerConfig'

class PlayerConfigController {
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

export default new PlayerConfigController()