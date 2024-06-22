import mongoose from "mongoose";

const fictionalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: String
},

{
    timestamps: true
})

const Fictional = mongoose.model("Fictional", fictionalSchema);

export default Fictional;