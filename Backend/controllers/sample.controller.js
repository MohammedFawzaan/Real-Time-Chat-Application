import sample from "../models/sample.models.js";

const sampleGet = (req, res) => {
    res.send("Hi I'm Sample Route");
}

const samplePost = async (req, res) => {
    try {
        let { name } = req.body;
        const user = new sample({ name });
        await user.save();
        res.status(201).json({ message: "Created Successfully", data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message});
    }
}

export { sampleGet, samplePost };