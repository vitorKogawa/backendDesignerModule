import multer from "multer";
import crypto from "crypto";
import { extname, resolve } from "path";

// const storage = multer.diskStorage({
//     destination: resolve(__dirname, '..', 'assets', 'img', 'games'),
//     filename: (request, file, callback) => {
//         crypto.randomBytes(16, (err, response) => {
//             if (err) return callback(err);

//             return callback(null, response.toString('hex') + extname(file.originalname));
//         })
//     },
// }),

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }
// }).fields([
//     { name: "background_image", maxCount: 1 },
//     { name: "gameImage", maxCount: 1 }
// ])

export default multer({
    storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "assets", "img", "games"),
        filename: (request, file, callback) => {
            crypto.randomBytes(16, (err, response) => {
                if (err) return callback(err);

                return callback(
                    null,
                    response.toString("hex") + extname(file.originalname)
                );
            });
        },
    }),
    limits: { fileSize: 1000000 },
}).fields([
    { name: "background_image", maxCount: 1 },
    { name: "gameImage", maxCount: 1 },
]);
