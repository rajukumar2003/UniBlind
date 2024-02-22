const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { userValidation } = require('./types');
const mongoose = require("mongoose")

const app = express();
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://rajukumar:JRi01RKSdIRKe2nU@cluster0.n3dvs3d.mongodb.net/UniBlind");

const userSchema = mongoose.Schema({
    email: String,
    password: String
});
const user = mongoose.model('users', userSchema);


app.use(express.static('UniBlind'));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'landingpage/LandingPage.html'));
});

app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'login/login.html'))
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Signup/Signup.html'));
});

app.get('/signup2', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup_2/signup2.html'));
})


app.post("/s", async function (req, res) {
    
    const userPayload = req.body;
    const response = userValidation.safeParse(userPayload);
    console.log(response.error);
    if (!response.success) {
        res.status(411).send("input is invalid");
    }
    else {
        user.create({
            email: response.data.email,
            password: response.data.password
        });
        res.status(201).send('User saved successfully');
    }
});


app.listen(port=5000, () => {
    console.log(`Server is running on port ${port}`);
});
