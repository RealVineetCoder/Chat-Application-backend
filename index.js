import {WebSocketServer} from 'ws';

const wss = new WebSocketServer({port: 8080});
const allSocket = [];

wss.on("connection", function(socket){
    console.log("server connected");

    socket.on("message", (message)=>{
        const parsedMsg = JSON.parse(message);

        if(parsedMsg.type === "join"){
            console.log("user joined")
            allSocket.push({
                socket,
                room: parsedMsg.payload.room,
                userId : parsedMsg.payload.userId
            })
        }

        if(parsedMsg.type === "chat"){
            let currentRoom = null;
            let currentId = null;
          for(let i=0; i<allSocket.length; i++){
            if(allSocket[i].socket == socket){
                currentRoom = allSocket[i].room;
                currentId = allSocket[i].userId;
            }
        }

        for(let i=0; i<allSocket.length; i++){
            if(allSocket[i].room === currentRoom){
                allSocket[i].socket.send(JSON.stringify({"message": parsedMsg.payload.message, "userId": currentId}));
            }
        }
    
}})
});
