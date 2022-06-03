
const express = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express.Router();



app.get(`/`, async (req, res) => {
    const userList = await User.find().select('-password');

    if (!userList) {
        res.status(500), json({ success: false })
    }
    res.send(userList);
})

app.get("/users", async (request, response) => {
    const users = await User.find({});

    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
        res.status(500), json({ message: 'The user with the given ID was not found .' })
    }
    res.status(200).send(user);
})


app.post("/add_user", async (request, req) => {
    const user = new User(request.body);
    try {
        await user.save();
        req.send(user);
    } catch (error) {
        req.status(500).send(error);
    }
});

app.post('/login', async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            res.status(200).json({
                message: "get" });
        } else {
                res.status(400).json({ error: "Invalid Password" });
            }
    } else {
            res.status(401).json({ error: "User does not exist" });
        }
    })

app.post('/singup', async (req, res) => {
    const body = req.body;

    if (!(body.email && body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }

    // creating a new mongoose doc from user data
    const user = new User(body);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
});




app.get(`/get/count`, async (req, res) => {
    const userCount = await User.countDocuments((count) => count)

    if (!userCount) {
        res.status(500), json({ success: false })
    }
    res.send({
        userCount: userCount
    });
})

app.delete('/:id', async (req, res) => {
    User.findByIdAndRemove(req.params.id).then(users => {
        if (users) {
            return res.status(200).json({ success: true, message: 'the users is deleted' })
        } else {
            return res.status(404).json({ success: false, message: 'users cannot deleted' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})

module.exports = app;