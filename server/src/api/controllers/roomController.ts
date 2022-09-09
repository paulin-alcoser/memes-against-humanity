import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Socket, Server } from "socket.io";


@SocketController()
export class RoomController {
    @OnMessage("join_game")
    public async joinGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) { //message == roomId
        console.log("New user joining room: ", message);

        const connectedSockets: Set<string> = io.sockets.adapter.rooms.get(message.roomId)
        const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id);//How many rooms is this socket connected and filtering default room

        //Check if current socket is connected to single room 
        if (socketRooms.length > 0 || connectedSockets && connectedSockets.size >= 8) {
            socket.emit("room_join_error", {
                error: "Room is full please choose another room to play"
            })

        } else {
            await socket.join(message.roomId); // Ifn the room exists joins it, if not creates and joins it
            socket.emit("room_joined");
            if (io.sockets.adapter.rooms.get(message.roomId).size >= 3) {
                socket.emit("room_ready"); //socket.id el cliente que join_room
                socket.to(message.roomId).emit("room_ready"); //manda evento a los clientes que ya estaban en el room
            }
        }
    }
}