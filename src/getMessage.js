const mongoose = require("mongoose");
const MessagesModel = require("../models/MessagesModel");
async function getMessage(room) {
    room = room ? room : "general";

    try {
        const messageArray = await MessagesModel.find({ room: room })
            // .sort({ updatedAt: -1 })
            .limit(1000)
            .exec();

        if (messageArray) {
            return {
                status: true,
                data: messageArray,
                message: "Message found!",
            };
        } else {
            return {
                status: false,
                data: [],
                message: "No Message found!",
            };
        }
    } catch (err) {
        return {
            status: false,
            data: [],
            message: "No Message found",
            error: err,
        };
    }
}

module.exports = getMessage;
