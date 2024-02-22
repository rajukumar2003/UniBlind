// const express = require("express")
// const mongoose = require("mongoose")

// const app = express()
// app.use(express.json());

// mongoose.connect("mongodb+srv://rajukumar:JRi01RKSdIRKe2nU@cluster0.n3dvs3d.mongodb.net/userappnew");
// const db = mongoose.connection;
// const User = mongoose.model('Users', { email: String, password: String });

// // const UserSchema = new mongoose.Schema({
// //     email: String,
// //     password: String
// // });

// // const User = mongoose.model("Users", UserSchema);


// app.post("/signup", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = new User({ email, password });
//         await user.save();
//         res.send('User saved successfully');
//     }
//     catch(error) {
//         console.error(error);
//         res.status(500).send("Error saving user");
//     }
// });

// app.listen(port=3000, () => {
//     console.log(`app is listening at ${port}`)
// });

