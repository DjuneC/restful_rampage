import User from "../models/User.js";

const addNewUser = async (req, res) => {
    const { name, last_name, username, password } = req.body;

    try {
        const user = new User({username, password});
        await user.save();
        res.status(201).json({message: "Data save successfully", id: user._id});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An error has happened!!!"});
    }
}

export { addNewUser }