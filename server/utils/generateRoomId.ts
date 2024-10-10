import charSet from '../data/charSet';

function generateRoomId () {
  let roomId = '';
  const charSetLength = charSet.length;

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charSetLength);
    roomId += charSet[randomIndex];
  }

  return roomId;
}

export default generateRoomId;
