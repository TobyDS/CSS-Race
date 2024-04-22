const generateRoomId = require('../utils/generateRoomId');
const Image = require('../models/image');

class Room {
  #id;
  #users = {};
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

  containsUser (userId) {
    return Object.prototype.hasOwnProperty.call(this.#users, userId);
  }

  checkForWinner () {
    return Object.values(this.users).some((user) => user.score === 100);
  }

  highestScorer () {
    let highestScore = 0;
    let highestScorer = null;
    Object.values(this.#users).forEach((user) => {
      if (user.score > highestScore) {
        highestScore = user.score;
        highestScorer = user;
      }
    });
    return highestScorer;
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
