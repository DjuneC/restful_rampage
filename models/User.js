import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: String,
    last_name: String,
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(this.password, salt);
    this.password = passwordHashed;
    next();
});

const User = mongoose.model("User", userSchema)

export default User;