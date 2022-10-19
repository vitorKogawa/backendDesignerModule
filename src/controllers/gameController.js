import { Router } from "express";
import { resolve, extname } from "path";
import { Game } from '../models/game';
// const Game = require("../models/game");

// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: resolve(__dirname, "..", "assets", "img", "games"),
//     filename: function (req, file, cb) {
//         cb(null, "IMAGE-" + Date.now() + extname(file.originalname));
//     },
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 },
// }).fields([
//     { name: "background_image", maxCount: 1 },
//     { name: "gameImage", maxCount: 1 },
// ]);

class GameController {
  /**
   * Create the new game
   */
  create = async (request, response) => {
    const {
      title,
      description,
      default_node_color,
      default_text_color,
      template,
      background_color,
      background_image,
      userID,
    } = request.body;

    const image = request.file.originalname;

    try {
      const game = await Game.create({
        title,
        description,
        default_node_color,
        default_text_color,
        template,
        background_color,
        background_image,
        image,
        userID,
      });

      console.log(game);
      console.log(game.image);

      return response.send({ game });
    } catch (error) {
      console.log(error);
      return response.status(400).send({ error: "Registration failed." });
    }
  };

  /**
   * Find all games in database
   */
  findAll = async (request, response) => {
    try {
      const game = await Game.find();

      return response.send({ game });
    } catch (err) {
      console.log(err);
      return response.status(400).send({ error: err });
    }
  };

  /**
   * Find the game by ID
   */
  findByID = async (request, response) => {
    try {
      const game = await Game.findById(request.params.id).populate({
        path: 'nodes',
        model: 'gameNode',
        populate: {
          path: 'labels',
          model: "label",
        },
      });

      return response.status(200).json(game)
    } catch (err) {
      return response.status(400).send({ error: 'Failed to get game.' });
    }
  };

  /**
   * Find all games from same user ID
   */
  findUserGamesByID = async (request, response) => {
    try {
      const game = await Game.find({
        userID: request.params.id,
      }).populate({
        path: 'nodes',
        model: 'gameNode',
        populate: {
          path: 'labels',
          model: 'label',
        },
      });

      return response.send({ game });
    } catch (err) {
      return response.status(400).send({ error: 'Failed to get game.' });
    }
  };

  deleteByID = async (request, response) => {
    try {
        await Game.deleteOne({ _id: request.params.id })

        return response.status(200).json({ msg: "sucess" })
    } catch (error) {
        return response.status(400).json({ msg: error })
    }
  }
}

export default new GameController();

// router.post('/create', upload, async (req, res) => {
//     const {
//         title,
//         description,
//         default_node_color,
//         default_text_color,
//         template,
//         background_color,
//         background_image,
//         image,
//         userID
//     } = request.body;

//     try {
//         var logoImage = "default.jpg";
//         var bgImage = "default.jpg";
//         if (typeof request.files.gameImage !== "undefined") {
//             logoImage = request.files.gameImage[0].filename;
//         }
//         if (typeof request.files.background_image !== "undefined") {
//             bgImage = request.files.background_image[0].filename;
//         }
//         const game = await Game.create({
//             title,
//             description,
//             default_node_color,
//             default_text_color,
//             template,
//             background_color,
//             background_image: bgImage,
//             image: logoImage,
//             userID
//         });

//         return response.send({ game });
//     } catch (err) {
//         return response.status(400).send({ error: 'Registration failed.' });
//     }
// });

// router.get('/', async (req, res) => {
//     try {
//         const game = await Game.find();

//         return response.send({ game });
//     } catch (err) {
//         return response.status(400).send({ error: 'Failed to get games.' });
//     }
// })

// /**
//  * Returns the data of some game
//  */
// router.get('/:id', async (req, res) => {
//     try {
//         const game = await Game.findById(request.params.id).populate({
//             path: 'nodes',
//             model: 'gameNode',
//             populate: {
//                 path: 'labels',
//                 model: 'label'
//             }
//         });

//         return response.send({ game });
//     } catch (err) {
//         return response.status(400).send({ error: 'Failed to get game.' });
//     }
// })

// //retorna todos os jogos referentes ao id do usuário passado.
// router.get('/userGames/:id', async (req, res) => {
//     try {
//         const game = await Game.find({ userID: request.params.id }).populate({
//             path: 'nodes',
//             model: 'gameNode',
//             populate: {
//                 path: 'labels',
//                 model: 'label'
//             }
//         });

//         return response.send({ game });
//     } catch (err) {
//         return response.status(400).send({ error: 'Failed to get game.' });
//     }
// })

// module.exports = app => app.use('/game', router);
