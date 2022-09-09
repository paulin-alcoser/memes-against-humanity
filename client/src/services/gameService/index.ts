import { Socket } from "socket.io-client"
import socketService from "../socketService"

class GameService {
    public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
        return new Promise((rs, rj) => {
            socket.emit("join_game", { roomId });
            socket.on("room_joined", () => rs(true));
            socket.on("room_join_error", ({ error }) => rj(error));
        });
    }

    public async onPlayerJoining(socket: Socket, listener: (isRoomReady: boolean) => void) {
        socket.on("room_ready", () => { listener(true) })
    }
}

export default new GameService()
