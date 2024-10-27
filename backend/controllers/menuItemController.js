import expressAsyncHandler from "express-async-handler";
import MenuItem from "../models/menuItemModel.js";

// @desc    Get all menu items
// @route   GET api/menu
// @access  Public
export const getMenuItems = expressAsyncHandler(async (req, res) => {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
});

// @desc    Get single menu item
// @route   GET api/menu/:id
// @access  Public
export const getSingleMenuItem = expressAsyncHandler(async (req, res) => {
    const menuItem = await MenuItem.findOne({ _id: req.params.id })
    if (menuItem) {
        res.status(201).json({
            _id: menuItem._id,
            name: menuItem.name,
            description: menuItem.description,
            price: menuItem.price,
            salePrice: menuItem.salePrice,
            category: menuItem.category,
            ingredients: menuItem.ingredients,
            imageUrl: menuItem.imageUrl,
            availability: menuItem.availability,
            prepTime: menuItem.prepTime,
            featured: menuItem.featured
        });
    } else {
        res.status(404);
        throw new Error(`Menu item with id '${req.params.id}' not found.`)
    }
});

// @desc    Create menu item
// @route   POST api/menu
// @access  Public
export const createMenuItem = expressAsyncHandler(async (req, res) => {
    const {
        name,
        description,
        price,
        salePrice,
        category,
        ingredients,
        imageUrl,
        availability,
        prepTime,
        featured
    } = req.body;

    const menuItem = await MenuItem.create({
        name,
        description,
        price,
        salePrice,
        category,
        ingredients,
        imageUrl,
        availability,
        prepTime,
        featured
    });
    if (menuItem) {
        res.status(201).json({
            _id: menuItem._id,
            name: menuItem.name,
            description: menuItem.description,
            price: menuItem.price,
            salePrice: menuItem.salePrice,
            category: menuItem.category,
            ingredients: menuItem.ingredients,
            imageUrl: menuItem.imageUrl,
            availability: menuItem.availability,
            prepTime: menuItem.prepTime,
            featured: menuItem.featured
        });
    } else {
        res.status(400);
        throw new Error('Invalid menu data');
    }
});

// @desc    Update menu item
// @route   PUT api/menu/:id
// @access  Public
export const updateMenuItem = expressAsyncHandler(async (req, res) => {
    const menuItem = await MenuItem.findById(req.params.id);
    if (menuItem) {
        menuItem.name = req.body.name || menuItem.name;
        menuItem.description = req.body.description || menuItem.description;
        menuItem.price = req.body.price || menuItem.price;
        menuItem.salePrice = req.body.salePrice || menuItem.salePrice;
        menuItem.category = req.body.category || menuItem.category;
        menuItem.ingredients = req.body.ingredients || menuItem.ingredients;
        menuItem.imageUrl = req.body.imageUrl || menuItem.imageUrl;
        menuItem.availability = req.body.availability || menuItem.availability;
        menuItem.prepTime = req.body.prepTime || menuItem.prepTime;
        menuItem.featured = req.body.featured || menuItem.featured;

        const updatedMenuItem = await menuItem.save();

        res.status(200).json({
            _id: updatedMenuItem._id,
            name: updatedMenuItem.name,
            description: updatedMenuItem.description,
            price: updatedMenuItem.price,
            salePrice: updatedMenuItem.salePrice,
            category: updatedMenuItem.category,
            ingredients: updatedMenuItem.ingredients,
            imageUrl: updatedMenuItem.imageUrl,
            availability: updatedMenuItem.availability,
            prepTime: updatedMenuItem.prepTime,
            featured: updatedMenuItem.featured
        });
    } else {
        res.status(404);
        throw new Error(`Menu item with id '${req.params.id}' not found.`)
    }
});

// @desc    Delete menu item
// @route   DELETE api/menu/:id
// @access  Public
export const deleteMenuItem = expressAsyncHandler(async (req, res) => {
    const menuItem = await MenuItem.findById(req.params.id);
    if (menuItem) {
        await menuItem.deleteOne();
        res.status(200).json({
            message: 'Deleted menu item',
            _id: menuItem._id,
            name: menuItem.name
        });
    } else {
        res.status(404);
        throw new Error(`Menu item with id '${req.params.id}' not found.`)
    }
});