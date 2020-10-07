const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const DBService = require("./src/services/db_service");
const app = express();

// Setting the middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home route
app.get("/", async (req, res) => {
    res.send("Homepage");
});

// Get Liviano Rooms
app.get("/getLivianoRooms", async (req, res) => {
    const dbService = new DBService();
    const livianoRoomsResponse = await dbService.getLivianoRooms();
    res.send(livianoRoomsResponse);
});

// Add liviano room
app.post("/addLivianoRoom", async (req, res) => {
    const dbService = new DBService();
    let livianoRoomData = req.body;
    let addLivianoRoomResponse = await dbService.addLivianoRoom(livianoRoomData);
    res.send(addLivianoRoomResponse);
});

// Delete liviano room
app.get("/deleteLivianoRoom/:id", async (req, res) => {
    const dbService = new DBService();
    let livianoRoomId = req.params.id;
    let deleteLivianoRoomResponse = await dbService.deleteLivianoRoom(
        livianoRoomId
    );
    res.send(deleteLivianoRoomResponse);
});

// Update liviano room
app.post("/updateLivianoRoom", async (req, res) => {
    const dbService = new DBService();
    let updateLivianoRoomResponse = await dbService.updateLivianoRoom(req.body);
    res.send(updateLivianoRoomResponse);
});
// Listening on port 8085
app.listen(8085, () => console.log("Listening on 8085"));
