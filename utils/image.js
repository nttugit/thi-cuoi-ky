import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import fs from 'fs';
import Model from '../models/image.model.js';
const model = new Model();

const IMAGE_SIZE = {
    WIDTH: 450,
    HEIGHT: 450,
};

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit in this example
});

/**
 * Resize, lưu vào folder 'uploads' và database
 *
 */
export async function resizeAndSaveImages(req, res, next) {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }
    const fileNames = [];

    Promise.all(
        req.files.map((file) => {
            return sharp(file.buffer)
                .resize({
                    width: IMAGE_SIZE.WIDTH,
                    height: IMAGE_SIZE.HEIGHT,
                })
                .toBuffer()
                .then((data) => {
                    // Lưu ảnh vào uploads folder
                    const fileName = uuidv4();
                    const filePath = `./uploads/${fileName}.jpg`; // Lưu ý: đưa về jpg

                    fs.writeFileSync(filePath, data);

                    // Lưu vào database
                    const fileData = {
                        file_name: fileName,
                        path: filePath,
                        extension: 'jpg',
                        original_name: file.originalname,
                        original_size: file.size,
                        original_mime_type: file.mimetype,
                    };
                    model.create(fileData);

                    // Trả về để update field images cho những table chứa nó
                    // fileNames.push(fileName);

                    // req.locals.fileNames = fileNames;
                    return fileName;
                });
        }),
    )
        .then((fileNames) => {
            req.fileNames = fileNames;
            next();
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error processing the images');
        });
}
