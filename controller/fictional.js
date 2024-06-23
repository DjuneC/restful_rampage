import Fictional from "../models/fictional.js";

const retrieveId = async (req, res, next, fictionalCreatureId) => {
    try {
        const fictionalCreature = await Fictional.findOne({ _id: fictionalCreatureId });
        if(fictionalCreature){
            req.fictional = fictionalCreature;
            next();
        }else if(fictionalCreature === null){
            res.status(404).json({ message: "No data associated to this id"})
        }
    } catch (error) {
        if(error.name === 'CastError') {
            return res.status(404).json({ message: "No data associated to this id"})
        }
        res.status(500).json({error});
    }
}

const showHomepage = (req, res) => {
    res.send('Got you mf!!!');
}

const addNewFictionalCreature = async (req, res) => {
    const {name, type, description} = req.body;

    try {
        const fictionalCreature = new Fictional({name, type, description})
        await fictionalCreature.save();
        res.status(201).json({message: "Data save successfully", id: fictionalCreature._id})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "An error has happened!!!"})
    }

    
}

const getAllFictionalCreature = async (req, res) => {
    try {
        const fictionalCreatures = await Fictional.find();
        if (fictionalCreatures.length > 0) {
            res.status(200).json({data: fictionalCreatures})
        } else {
            res.status(204).json({message: "No data registered yet"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

const getAFictionalCreature = (req, res) => {
    res.status(200).json({ data: req.fictional })
}

const updateFictionalCreature = async (req, res) => {
    const {name, type, description} = req.body;

    try {
        const hasBeenUpdated = await Fictional.updateOne(
            { _id: req.fictional._id },
            {$set:
                {name, type, description}
            }
        )

        if(hasBeenUpdated.acknowledged){
            res.status(200).json({ message: "Record has been modified successfully." })
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

const deleteFictionalCreature = async (req, res) => {
    try {
        const hasBeenDeleted = await Fictional.deleteOne({ _id: req.fictional._id });
console.log(hasBeenDeleted);
        if(hasBeenDeleted.acknowledged){
            res.status(200).json({ message: "Record has been deleted successfully." })
        }else{
            res.status(200).json({ message: "mhmm" })
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

export { showHomepage, addNewFictionalCreature, getAllFictionalCreature, retrieveId, getAFictionalCreature, updateFictionalCreature, deleteFictionalCreature }