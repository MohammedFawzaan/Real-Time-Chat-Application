import userModel from "../models/user.model.js";
import messageModel from '../models/message.model.js';

const getAllChats = async (req, res) => {
    try {
        const allUser = await userModel.find().select('username email');
        res.status(200).json({ allUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Some error fetching users" });
    }
}

const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const message = await messageModel.create({
            text: text,
            image: image,
            senderId: senderId,
            receiverId: receiverId
        });
        message.save();
        res.status(201).json({ notify: "New Message Sent", message: message });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Maybe Some Error" });
    }
}

const getMessages = async (req, res) => {
    try {
        const myId = req.user._id;
        const userToChatId = req.params.id;
        const allMessages = await messageModel.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        }).populate('senderId', 'email avatar status')
        .populate('receiverId', 'email avatar status')
        .sort({ createdAt: 1 });
        res.status(200).json({ allMessages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Maybe Some Error" });
    }
}

export { getAllChats, sendMessages, getMessages };