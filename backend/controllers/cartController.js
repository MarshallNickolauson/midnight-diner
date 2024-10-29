import expressAsyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';
import MenuItem from '../models/menuItemModel.js';

// @desc    GET cart
// @route   GET /api/cart
// @access  Private
export const getCart = expressAsyncHandler(async (req, res) => {
    console.log(`User ID: ${req.user._id}`); // Log the user ID to check if the middleware is working
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    
    res.status(200).json(cart);
});

// @desc    Update cart (add/remove items)
// @route   PUT /api/cart
// @access  Private
export const updateCart = expressAsyncHandler(async (req, res) => {
    const { menuItemId, action } = req.body;

    if (!menuItemId || !action) return res.status(400).json({ message: 'Menu item ID and action is required' });

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(500).json({ message: `Cart not found for user '${req.user._id}'` });

    const menuItems = await MenuItem.find({ _id: { $in: cart.items.map(item => item.menuItemId) } });
    const priceMap = {};
    menuItems.forEach(item => {
        priceMap[item._id] = item.salePrice > 0 ? item.salePrice : item.price;
    });

    if (action === 'add') {
        
        const existingItemIndex = cart.items.findIndex(item => item.menuItemId.toString() === menuItemId);

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity++;
        } else {
            const newItem = await MenuItem.findById(menuItemId);
            if (!newItem) return res.status(404).json({ message: 'Menu item not found' });
            cart.items.push({ menuItemId, quantity: 1 });
            priceMap[newItem._id] = newItem.salePrice > 0 ? newItem.salePrice : newItem.price;
        }

    } else if (action === 'remove') {
        
        const existingItemIndex = cart.items.findIndex(item => item.menuItemId.toString() === menuItemId);
        
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity--;
            if (cart.items[existingItemIndex].quantity === 0) cart.items.splice(existingItemIndex, 1);
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

    } else {
        return res.status(400).json({ message: 'Invalid action. Use "add" or "remove".' });
    }

    cart.totalPrice = cart.items.reduce((total, item) => {
        const price = priceMap[item.menuItemId];
        return total + (price ? price * item.quantity : 0);
    }, 0);

    await cart.save();
    res.status(200).json(cart);
})