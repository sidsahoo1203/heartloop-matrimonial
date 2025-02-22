import multer from 'multer';
import fs from 'fs';

export const upload = multer({
    dest: 'uploads/',
})

export const deleteLocalFile = (path) => {
    fs.unlinkSync(path);
}