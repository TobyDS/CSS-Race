import generateRoomId from '../utils/generateRoomId';
import Image, { type ImageDoc } from '../models/image';

interface User {
  id: string;
  isReady: boolean;
  score: number;
}

class Room {
  #id;
  #users: { [userId: string]: User } = {};
  #targetImage: ImageDoc | null;

  constructor() {
    this.#id = generateRoomId();
    this.#users = {};
    this.#targetImage = null;
  }

  static async create() {
    const room = new Room();
    try {
      room.#targetImage = await Image.random();
      if (!room.#targetImage) {
        throw new Error('Could not get random image');
      }
    } catch (error) {
      throw new Error('Could not get random image');
    }
    return room;
  }

  get id() {
    return this.#id;
  }

  get users() {
    return this.#users;
  }

  get targetImage() {
    return this.#targetImage;
  }

  containsUser(userId: string) {
    return Object.prototype.hasOwnProperty.call(this.#users, userId);
  }

  checkForWinner() {
    return Object.values(this.users).some((user) => user.score === 100);
  }

  highestScorer() {
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

  addUser(userId: string) {
    this.#users[userId] = { id: userId, isReady: false, score: 0 };
  }

  removeUser(userId: string) {
    const updatedUsers: { [userId: string]: User } = {};
    Object.entries(this.#users).forEach(([id, value]) => {
      if (id !== userId) {
        updatedUsers[id] = value;
      }
    });
    this.#users = updatedUsers;
  }
}

export default Room;
