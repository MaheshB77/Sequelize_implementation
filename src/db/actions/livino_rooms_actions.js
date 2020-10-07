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
