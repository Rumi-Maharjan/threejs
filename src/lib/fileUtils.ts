import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const supportedFormats = ['jpg', 'jpeg', 'png', 'gif'];
export const imagePath = path.join(__dirname, '..', '..','..','..','..', 'public', 'uploads');
export async function saveFile(file: File, uploadDir: string): Promise<string | null> {
    const ext = path.extname(file.name).toLowerCase().substring(1);
    
    if (!supportedFormats.includes(ext)) {
        throw new Error(`Unsupported file format: ${ext}`);
    }

    const filename = `${uuidv4()}.${ext}`;
    const imagePath = path.join(uploadDir, filename);
    const imageUrl = `/uploads/${filename}`;

    try {
        const buffer = await file.arrayBuffer();
        await fs.promises.writeFile(imagePath, Buffer.from(buffer));
        return imageUrl;
    } catch (error) {
        console.error('Error saving image:', error);
        throw new Error('Failed to save image');
    }
}
