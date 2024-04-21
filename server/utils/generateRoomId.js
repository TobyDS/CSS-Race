const charSet = require('../data/charSet.js');

function generateRoomId () {
  let roomId = '';
  const charSetLength = charSet.length;

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charSetLength);
    roomId += charSet[randomIndex];
  }

  return roomId;
}

module.exports = generateRoomId;
