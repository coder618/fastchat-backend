const mongoose = require("mongoose");
const MessagesModel = require("../models/MessagesModel");
async function addMessage(dataObj) {
    try {
        const newMessage = new MessagesModel(dataObj);
        const savedFeedback = await newMessage.save();

        if (savedFeedback) {
            console.log("saved");
            return true;
        } else {
            console.log("Something is wrong while saving the data");
            return false;
        }
    } catch (err) {
        console.log(err);
        return {
            status: false,
        };
    }
}

module.exports = addMessage;
