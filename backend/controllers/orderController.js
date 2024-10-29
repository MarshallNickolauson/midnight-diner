import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';

const checkOwnership = (order, userId) => {
    if (!req.user) throw new Error('User not found');
    if (order.user.toString() !== userId) throw new Error('User not authorized');
}

// @desc    Get orders
// @route   GET /api/orders
// @access  Private
export const getOrders = expressAsyncHandler(async (req, res) => {
    if (req.user) {
        const orders = await Order.find({ email: req.user.email });
        res.status(200).json(orders);
    } else {
        const orders = await Order.find({ email: req.body.email });
        res.status(200).json(orders);
    }
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getSingleOrder = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get order by req.params.id' });
});

const createOrderFromUser = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(500).json({ message: `User ${req.user._id} does not have a cart!` });

    if (cart.items.length === 0) return res.status(400).json({ message: 'Cannot create order. Cart is empty' });

    const order = new Order({
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        items: cart.items.map(item => ({
            menuItemId: item.menuItemId._id,
            quantity: item.quantity
        })),
        totalPrice: cart.totalPrice,
        status: 'pending'
    });

    try {
        await order.save();
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();
        res.status(200).json(order);
    } catch (error) {
        throw new Error(error);
    }
}

const createOrderWithoutUser = async (req, res) => {
    const { name, email, phone, items, totalPrice } = req.body;

    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'Items must be a non-empty array.' });

    const order = new Order({
        name,
        email,
        phone,
        items: items.map(item => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity
        })),
        totalPrice,
        status: 'pending'
    });

    try {
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
}

// @desc    POST orders
// @route   POST /api/orders
// @access  Private
export const createOrder = expressAsyncHandler(async (req, res) => {
    if (req.user) {
        createOrderFromUser(req, res);
    } else {
        createOrderWithoutUser(req, res);
    }
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private
export const deleteOrder = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        await order.deleteOne();
        res.status(200).json({ message: `Deleted order ${req.params.id}` });
    } else {
        res.status(404);
        throw new Error(`Order with id ${req.params.id}`);
    }
});