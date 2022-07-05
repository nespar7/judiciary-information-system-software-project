const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// CREATE USER
router.post('/create', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            designation: req.body.designation
        })

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(404).send("user not found");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).json("Wrong password " + req.body.password);
        }
        else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;