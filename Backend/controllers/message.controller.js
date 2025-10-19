import userModel from "../models/user.model.js";
import messageModel from '../models/message.model.js';

const getAllChats = async (req, res) => {
    const allUser = await userModel.find().select('username email');
    res.status(200).json({ allUser });
}

const sendMessages = async (req, res) => {

}

const getMessages = async (req, res) => {

}

export { getAllChats, sendMessages, getMessages };