# Sequelize ORM implementation

## Step 1 :- (Create npm project)

-   Create a project using `npm init`
-   We have to install **sequelize-cli, sequelize, sequelize-auto, pg, pg-hstore, cors, express, body-parser** globally using following commands

`npm install -g sequelize-cli sequelize sequelize-auto pg pg-hstore cors express body-parser`

-   Folder structure

```javascipt
Sequelize_demo
    - node_modules
    - src
        - actions
            liviano_rooms_actions.js
        - config
            config.js
        - models
            liviano_db.js
            liviano_rooms.js
            sequelize_init.js
            students.js
        - services
            db_service.js
        app.js
    package.json
```

-   **package.json** should look like this

```json
{
    "name": "sequelize_demo",
    "version": "1.0.0",
    "description": "Implementing sequelize project according to Liviano",
    "main": "app.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "Mahesh",
    "license": "MIT",
    "dependencies": {
        "body-parser": "^1.19.0",
        "cors": "^2.8.5",
        "express": "^4.17.1",
        "pg": "^8.4.0",
        "pg-hstore": "^2.3.3",
        "sequelize": "^6.3.5"
    }
}
```

## Step 2 (Create Database Configuration)

-   Create a **config.js** file which consist the configuration details of the database (_In this case we are using PostgreSQL_)

```javascript
/*
 src/config/config.js
*/
const Config = {
    host: "localhost",
    dialect: "postgres",
    define: {
        timestamps: false
    }
};

module.exports = Config;
```

## Step 3 (Create DB models)

-   Create a DB model using `sequelize-auto`

-   To create the model of table that is already present in the database we have to use below command

`sequelize-auto -h localhost -d Sequelize_reference -u postgres -x pass -s public -p 5432 -o ./src/models -t liviano_rooms -e postgres`

-   To know more about `sequelize-auto` visit
    [sequelize-auto documentation](https://www.npmjs.com/package/sequelize-auto)

-   We should see the the file created in `/src/models/liviano_rooms.js` which contains following code which is nothing but a Model\*\*

```javascript
/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "liviano_rooms",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true
            },
            salary: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            createdat: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            updatedat: {
                type: DataTypes.DATEONLY,
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: "liviano_rooms",
            schema: "public"
        }
    );
};
```

## Step 4 (Initialize Sequelize and create ORM models)

-   Initialize Sequelize and create ORM models inside `/src/models/sequelize_init.js`

```javascript
/*
 /src/models/sequelize_init.js
*/
const Sequelize = require("sequelize");
const Config = require("../config/config");

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
```

## Step 5 :- (Create action class)

-   Create action classes inside `/src/actions/` folder.
-   These actions will directly interact with ORM models that we have created.
-   Inside actions we can create all the CRUD operations using ORM models.
-   Let's create one action class for liviano rooms.

```javascript
/*
 /src/actions/liviano_rooms_actions.js
*/
const { LivianoRooms, SequelizeDB } = require("../models/sequelize_init");

class LivianoRoomsActions {
    constructor() {
        this.SequelizeDB = SequelizeDB;
        this.auditData = {
            createdOn: SequelizeDB.fn("NOW"),
            lastModifiedOn: SequelizeDB.fn("Now")
        };
        this.modifiedAuditData = {
            lastModifiedOn: SequelizeDB.fn("NOW")
        };
        this.livianoRoomsAttributes = {
            attributes: [
                "id",
                "name",
                "address",
                "salary",
                "createdAt",
                "updatedAt"
            ]
        };
    }
    // Get all Liviano rooms
    async getAllLivianoRooms(additionalOpts = {}) {
        let actionResult = {};
        await this.SequelizeDB.transaction(async (t) => {
            let opts = Object.assign(additionalOpts, {});
            actionResult = await LivianoRooms.findAll(opts)
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    console.log(err);
                });
        });
        return actionResult;
    }
    // Add one Liviano room
    async addLivianoRoom(livianoRoomData) {
        let actionResult = {};
        await this.SequelizeDB.transaction(async (t) => {
            let dataToAdd = {
                ...livianoRoomData
            };
            actionResult = await LivianoRooms.create(dataToAdd)
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    console.log(err);
                });
        });
        return actionResult;
    }

    // Delete one Liviano room
    async deleteLivianoRoom(livianoRoomId) {
        let actionResult = {};
        await this.SequelizeDB.transaction(async (t) => {
            actionResult = await LivianoRooms.destroy({
                where: {
                    id: livianoRoomId
                }
            })
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    // Update Liviano room
    async updateLivianoRoom(updateLivianoRoomData) {
        let actionResult = {};
        await this.SequelizeDB.transaction(async (t) => {
            let dataToUpdate = {
                ...updateLivianoRoomData
            };
            actionResult = await LivianoRooms.update(dataToUpdate, {
                where: {
                    id: dataToUpdate.id
                }
            })
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    console.log(err);
                });
        });
        return actionResult;
    }
}
module.exports = LivianoRoomsActions;
```

## Step 6 :- (Create Services)

-   Create services inside `/src/services/` folder.
-   Services will be interacting with the actions that we have created.
-   Services will be used in the routes.
-   Let's create one service class inside `/src/services/`

```javascript
/*
 /src/services/db_service.js
*/
const LivianoRoomsActions = require("../actions/livino_rooms_actions");

class DBService {
    constructor() {
        this.livianoRoomsActions = new LivianoRoomsActions();
    }
    async getLivianoRooms() {
        try {
            return await this.livianoRoomsActions.getAllLivianoRooms();
        } catch (exception) {
            console.log(exception);
        }
    }
    async addLivianoRoom(livianoRoomData) {
        try {
            return await this.livianoRoomsActions.addLivianoRoom(
                livianoRoomData
            );
        } catch (exception) {
            console.log(exception);
        }
    }
    async deleteLivianoRoom(livianoRoomId) {
        try {
            return await this.livianoRoomsActions.deleteLivianoRoom(
                livianoRoomId
            );
        } catch (exception) {
            console.log(exception);
        }
    }
    async updateLivianoRoom(updatedLivianoRoomData) {
        try {
            return await this.livianoRoomsActions.updateLivianoRoom(
                updatedLivianoRoomData
            );
        } catch (exception) {
            console.log(exception);
        }
    }
}
module.exports = DBService;
```

## Step 7 :- (Create routes)

-   Let's create routes to handle the incoming requests.

```javascript
/*
 app.js
*/

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
    let addLivianoRoomResponse = await dbService.addLivianoRoom(req.body);
    res.send(addLivianoRoomResponse);
});

// Delete liviano room
app.get("/deleteLivianoRoom/:id", async (req, res) => {
    const dbService = new DBService();
    let deleteLivianoRoomResponse = await dbService.deleteLivianoRoom(
        req.params.id
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
```
