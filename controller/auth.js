import User from "../models/User.js";
import  jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const addNewUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({username, password});
        await user.save();
        res.status(201).json({message: "Data save successfully", id: user._id});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An error has happened!!!"});
    }
}

const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });
      
        else if(user === null){
            res.status(404).json({ message: "Username or password is invalid"})
        }

        const token = jwt.sign({ _id: user.id, username: user.username}, "not something secure for now", {expiresIn: "1h"})
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "No user found"})
    }
}

const testSome = (req, res) => {
    res.send("<h1>Welcome to our private section</h1>");
}

export { addNewUser, loginUser, testSome }