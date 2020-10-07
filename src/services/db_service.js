const LivianoRoomsActions = require("../db/actions/livino_rooms_actions");

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
