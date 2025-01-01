import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import colors from 'colors';
import FormData from 'form-data';

import MenuItem from './menuItemModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const UPLOAD_URL = 'http://backend:5000/upload';
const COLLECTION_NAME = 'menu-items';
const IMAGE_DIR = path.resolve(__dirname, 'images');
const MENU_JSON_FILE = path.resolve(__dirname, 'menu-seeds.json');

const waitForMongo = async (timeout = 30000) => {
    const start = Date.now();
    let conn = null;
    while (Date.now() - start < timeout) {
        try {
            conn = await mongoose.connect(process.env.MONGO_URI);
            console.log('[Menu Seeder] MongoDB is ready!'.cyan);
            break;
        } catch (err) {
            console.log('[Menu Seeder] Waiting for MongoDB to be ready...');
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }
    if (!conn) {
        throw new Error('[Menu Seeder] MongoDB did not become ready within the timeout period.');
    }
};

const waitForBackend = async (timeout = 300000) => {
    const start = Date.now();
    let backendReady = false;
    while (Date.now() - start < timeout) {
        try {
            await axios.get('http://backend:5000');
            backendReady = true;
            console.log('[Menu Seeder] Backend is ready!');
            break;
        } catch (err) {
            console.log('[Menu Seeder] Waiting for backend to be ready...');
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }
    if (!backendReady) {
        throw new Error('[Menu Seeder] Backend did not become ready within the timeout period.');
    }
};

const uploadImage = async (imagePath) => {
    try {
        if (!fs.existsSync(imagePath)) {
            console.error(`[Menu Seeder] Image file not found at path: ${imagePath}`);
            return null;
        }

        const imageData = fs.createReadStream(imagePath);

        const formData = new FormData();
        formData.append('image', imageData);

        const response = await axios.post(UPLOAD_URL, formData, {
            headers: formData.getHeaders(),
        });

        console.log('[Menu Seeder] Image uploaded successfully.');

        return response.data.file.path;
    } catch (err) {
        // Log the error in detail
        console.error(`[Menu Seeder] Failed to upload ${imagePath}: ${err.message}`);
        if (err.response) {
            console.error('[Menu Seeder] Response error:', err.response.data);
        } else if (err.request) {
            console.error('[Menu Seeder] No response received:', err.request);
        } else {
            console.error('[Menu Seeder] Error in setting up request:', err.message);
        }
        return null;
    }
};

const populateMenu = async () => {
    await waitForMongo();
    await waitForBackend();

    const menuData = JSON.parse(fs.readFileSync(MENU_JSON_FILE, "utf8"));

    for (const item of menuData) {
        const imagePath = path.join(IMAGE_DIR, item.image_file);

        if (!fs.existsSync(imagePath)) {
            console.error(`[Menu Seeder] Image file not found: ${imagePath}`);
            continue;
        }

        console.log(`[Menu Seeder] Uploading image: ${item.image_file}`);
        const imageUrl = await uploadImage(imagePath);

        if (!imageUrl) {
            console.error(`[Menu Seeder] Failed to upload image for ${item.name}`);
            continue;
        }

        console.log(`[Menu Seeder] Image URL: ${imageUrl}`);

        const menuItem = new MenuItem({
            name: item.name,
            description: item.description,
            price: item.price,
            salePrice: item.salePrice,
            category: item.category,
            ingredients: item.ingredients,
            availability: item.availability,
            prepTime: item.prepTime,
            featured: item.featured,
            imageUrl,
        });

        await menuItem.save();
        console.log(`[Menu Seeder] Inserted: ${item.name}`);
    }

    console.log("[Menu Seeder] Menu population complete.");
    mongoose.disconnect();
    console.log("[Menu Seeder] Disconnected seeder to MongoDB");
}

populateMenu().catch((err) => {
    console.error("Error populating menu:", err.message);
});