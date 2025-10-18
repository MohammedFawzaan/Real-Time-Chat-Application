import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const sample = mongoose.model('sample', sampleSchema);

export default sample;