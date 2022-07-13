import multer, { DiskStorageOptions } from "multer";
import crypto from "crypto";
import { extname, resolve } from "path";

import * as multer from "multer";
import { resolve } from "path";

const gameStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, resolve(__dirname, "..", "assets", "img", "games"));
    },
    filename: (request, file, callback) => callback(null, file.originalname)
});

const attributesStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, resolve(__dirname, "..", "assets", "img", "attributes"));
    },
    filename: (request, file, callback) => callback(null, file.originalname)
});

const games_img_upload = multer({ storage: gameStorage });
const attributes_img_upload = multer({ storage: attributesStorage });

export { games_img_upload, attributes_img_upload }
