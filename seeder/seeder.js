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
import User from './userModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const UPLOAD_URL = 'http://backend:5000/upload';
const BACKEND_URL = 'http://backend:5000';
const IMAGE_DIR = path.resolve(__dirname, 'images');
const MENU_JSON_FILE = path.resolve(__dirname, 'menu-seeds.json');

const waitForMongo = async (timeout = 30000) => {
    const start = Date.now();
    let conn = null;
    while (Date.now() - start < timeout) {
        try {
            conn = await mongoose.connect(process.env.MONGO_URI);
            console.log('[Seeder] MongoDB is ready!'.cyan);
            break;
        } catch (err) {
            console.log('[Seeder] Waiting for MongoDB to be ready...');
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }
    if (!conn) {
        throw new Error('[Seeder] MongoDB did not become ready within the timeout period.');
    }
};

const waitForBackend = async (timeout = 300000) => {
    const start = Date.now();
    let backendReady = false;
    while (Date.now() - start < timeout) {
        try {
            await axios.get(BACKEND_URL);
            backendReady = true;
            console.log('[Seeder] Backend is ready!');
            break;
        } catch (err) {
            console.log('[Seeder] Waiting for backend to be ready...');
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }
    if (!backendReady) {
        throw new Error('[Seeder] Backend did not become ready within the timeout period.');
    }
};

const uploadImage = async (imagePath) => {
    try {
        if (!fs.existsSync(imagePath)) {
            console.error(`[Seeder] Image file not found at path: ${imagePath}`);
            return null;
        }

        const imageData = fs.createReadStream(imagePath);

        const formData = new FormData();
        formData.append('image', imageData);

        const response = await axios.post(UPLOAD_URL, formData, {
            headers: formData.getHeaders(),
        });

        console.log('[Seeder] Image uploaded successfully.');

        return response.data.file.path;
    } catch (err) {
        // Log the error in detail
        console.error(`[Seeder] Failed to upload ${imagePath}: ${err.message}`);
        if (err.response) {
            console.error('[Seeder] Response error:', err.response.data);
        } else if (err.request) {
            console.error('[Seeder] No response received:', err.request);
        } else {
            console.error('[Seeder] Error in setting up request:', err.message);
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
            console.error(`[Seeder] Image file not found: ${imagePath}`);
            continue;
        }

        console.log(`[Seeder] Uploading image: ${item.image_file}`);
        const imageUrl = await uploadImage(imagePath);

        if (!imageUrl) {
            console.error(`[Seeder] Failed to upload image for ${item.name}`);
            continue;
        }

        console.log(`[Seeder] Image URL: ${imageUrl}`);

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
        console.log(`[Seeder] Inserted: ${item.name}`);
    }

    console.log("[Seeder] Menu population complete.");

    mongoose.disconnect();
    console.log("[Seeder] Disconnected seeder to MongoDB");
}

const populateAdminUser = async () => {
    console.log("[Seeder] Populating database with default admin user...");
    await waitForMongo();
    await waitForBackend();

    const formData = {
        name: 'admin',
        email: 'admin@email.com',
        password: 'password',
        phone: '1234567890'
    };

    const adminUserExists = await User.findOne({ email: 'admin@email.com'});

    if (!adminUserExists) {
        await axios.post(`${BACKEND_URL}/api/users/register`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const adminUser = await User.findOne({ email: 'admin@email.com'});

    if (adminUser) {
        adminUser.isAdmin = true
        
        const updatedUser = await adminUser.save();

        setTimeout(() => {
            console.log(updatedUser);
        }, 3000);
    }

    console.log("[Seeder] Disconnected seeder to MongoDB");
}

populateMenu().catch((err) => {
    console.error("Error populating menu:", err.message);
});

populateAdminUser().catch((err) => {
    console.error("Error populating admin user:", err.message);
});

