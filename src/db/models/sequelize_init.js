const Sequelize = require("sequelize");
const Config = require("../../config/config");

// Initiate Sequelize
const SequelizeDB = new Sequelize(
    "Sequelize_reference",
    "postgres",
    "pass",
    Config
);

// DB Models
const LivianoRoomsModel = require("./liviano_rooms");

// ORM Models
const LivianoRooms = LivianoRoomsModel(SequelizeDB, Sequelize);

module.exports = {
    SequelizeDB,
    LivianoRooms
};
