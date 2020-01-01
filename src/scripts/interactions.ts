export const generateRoomCode = (roomCodes: string[]) => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let roomCode = ""
  while (!(roomCode.length === 5 && roomCodes.includes(roomCode))) {
    roomCode = ""
    while (roomCode.length < 5) {
      const nextCodeLetter =
        alphabets[Math.floor(Math.random() * alphabets.length)]
      roomCode = roomCode + nextCodeLetter
    }
  }

  return roomCode
}
