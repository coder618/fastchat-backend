const mongoose = require("mongoose");
const MessagesModel = require("../models/MessagesModel");
async function addMessage(dataObj) {
    try {
        const newMessage = new MessagesModel(dataObj);
        const savedFeedback = await newMessage.save();

        if (savedFeedback) {
            // console.log("saved");
            return {
                status: true,
                savedItem: savedFeedback,
                message: "Message saved",
            };
        } else {
            return {
                status: false,
                message: "Message saved failed",
            };
        }
    } catch (err) {
        console.log(err);
        return {
            status: false,
            message: "Something is wrong while saving the message",
        };
    }
}

module.exports = addMessage;
