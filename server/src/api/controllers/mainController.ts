import { ConnectedSocket, OnConnect, SocketController, SocketIO } from "socket-controllers";
import { Server, Socket } from "socket.io"

@SocketController()
export class MainController {
    // whenever a new client is connected this function will fire up
    @OnConnect()
    public onConnection(@ConnectedSocket() socket: Socket, @SocketIO() io: Server) {
        console.log("New Socket(0) Connected: ", socket.id);

        socket.on("custom_event", (data: any) => {
            console.log("Data: ", data);
        });
    }
}