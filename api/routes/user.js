const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// update user
router.put('/:id', async (req, res) => {

    if (req.body.userId === req.params.id || req.body.requesterDesig === "registrar") {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(7);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        return res.status(403).json("You can update only your account");
    }
})

// get user data
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;

    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, createdAt, ...other } = user._doc;
        return res.status(200).json(other);
    }
    catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;