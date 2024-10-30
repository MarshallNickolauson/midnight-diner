import expressAsyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';
import MenuItem from '../models/menuItemModel.js';

// @desc    GET cart
// @route   GET /api/cart
// @access  Private
export const getCart = expressAsyncHandler(async (req, res) => {
    console.log(`User ID: ${req.user._id}`);

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
        return res.status(201).json(cart);
    }

    res.status(200).json(cart);
});

// @desc    Update cart
// @route   PUT /api/cart
// @access  Private
export const updateCart = expressAsyncHandler(async (req, res) => {
    const { menuItemId, action } = req.body;

    console.log("Received request to update cart with:", req.body);

    if (!menuItemId || !action) {
        return res.status(400).json({ message: 'Menu item ID and action are required' });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
    }

    if (action === 'add') {
        const existingItemIndex = cart.items.findIndex(item => item.menuItem._id.toString() === menuItemId);

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity++;
        } else {
            cart.items.push({
                menuItem: {
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
                },
                quantity: 1
            });
        }

    }

    if (action === 'remove') {
        const existingItemIndex = cart.items.findIndex(item => item.menuItem._id.toString() === menuItemId);

        if (existingItemIndex > -1) {
            if (cart.items[existingItemIndex].quantity === 1) {
                cart.items.splice(existingItemIndex, 1);
            } else {
                cart.items[existingItemIndex].quantity--;
            }
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    }

    cart.totalPrice = cart.items.reduce((total, item) => {
        const price = item.menuItem.salePrice > 0 ? item.menuItem.salePrice : item.menuItem.price;
        return total + price * item.quantity;
    }, 0);

    await cart.save();
    res.status(200).json(cart);
});

// @desc    Delete all quantities of a specific item from the cart
// @route   DELETE /api/cart/item/:menuItemId
// @access  Private
export const deleteCartItem = expressAsyncHandler(async (req, res) => {
    const { menuItemId } = req.params;

    console.log(`Received request to delete item from cart: ${menuItemId}`);

    if (!menuItemId) {
        return res.status(400).json({ message: 'Menu item ID is required' });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    const existingItemIndex = cart.items.findIndex(item => item.menuItem._id.toString() === menuItemId);

    if (existingItemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(existingItemIndex, 1);

    cart.totalPrice = cart.items.reduce((total, item) => {
        const price = item.menuItem.salePrice > 0 ? item.menuItem.salePrice : item.menuItem.price;
        return total + price * item.quantity;
    }, 0);

    await cart.save();
    res.status(200).json(cart);
});