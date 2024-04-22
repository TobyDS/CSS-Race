const generateRoomId = require('../utils/generateRoomId');
const Image = require('../models/image');

class Room {
  #id;
  #users;
  #targetImage;

  constructor () {
    this.#id = generateRoomId();
    this.#users = {};
    this.#targetImage = null;
  }

  static async create () {
    const room = new Room();
    room.#targetImage = await new Promise((resolve, reject) => {
      Image.random((image) => {
        if (image) {
          resolve(image);
        } else {
          reject(new Error('Could not get random image'));
        }
      });
    });
    return room;
  }

  get id () {
    return this.#id;
  }

  get users () {
    return this.#users;
  }

  get targetImage () {
    return this.#targetImage;
  }

  addUser (userId) {
    this.#users[userId] = { id: userId, isReady: false };
  }

  removeUser (userId) {
    const updatedUsers = {};
    Object.entries(this.#users).forEach(([id, value]) => {
      if (id !== userId) {
        updatedUsers[id] = value;
      }
    });
    this.#users = updatedUsers;
  }
}

module.exports = Room;
