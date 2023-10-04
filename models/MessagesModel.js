const mongoose = require("mongoose");

const MessagesScheme = mongoose.Schema(
    {
        room: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        textMessage: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
        },
        currentUserData: {
            type: Object,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Messages", MessagesScheme);
