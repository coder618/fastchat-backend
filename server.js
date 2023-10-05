const mongoose = require("mongoose");

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();

const addMessage = require("./src/addMessage");
const getMessage = require("./src/getMessage");
const config = require("./config");
const db = require("./db");

const server = http.createServer(app);
app.use(
    cors({
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.get("/", (req, res, next) => {
    res.send("API Working");
});

io.on("connection", (socket) => {
    /**
     * When received message from Front-end
     * 1. Saved the message to database
     * 2. trigger 'message-saved'
     */

    socket.on("send-message", async (messageObj) => {
        // add message to data base
        const saveStatus = await addMessage(messageObj);

        if (saveStatus.status == true) {
            const finalResponse = {
                messageObj: saveStatus.savedItem,
                clientId: messageObj.clientId,
            };

            io.emit("message-saved", finalResponse); // Broadcast the message to all connected clients
        } else {
            io.emit("message-saved-failed", messageObj); // Broadcast the message to all connected clients
        }
    });

    /**
     * When switch room event trigger
     */
    socket.on("switch-room", async (obj) => {
        const currentRoom = obj.currentRoom;
        const clientId = obj.clientId;

        const savedMessageArray = await getMessage(currentRoom);

        if (savedMessageArray.status) {
            io.to(clientId).emit("switch-room-success", savedMessageArray);
        } else {
            io.to(clientId).emit("switch-room-failed", []);
        }
    });
});

// ---- Connect the database and start the server
db.connect(config.DB_URL)
    .then(() => {
        console.log("Connected to mongodb");
        server.listen(6900, () => {
            console.log("Server listening on port 6900");
        });
    })
    .catch((err) => console.log(err));
