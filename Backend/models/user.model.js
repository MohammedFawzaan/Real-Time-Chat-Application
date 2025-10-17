import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    status: {
        type: String,
        enum: ["online", "offline"],
        default: "offline"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: ""
    }
});

const user = mongoose.model('user', userSchema);

export default user;