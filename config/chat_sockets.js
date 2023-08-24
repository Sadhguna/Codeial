import {Server} from 'socket.io';
import Chat from '../models/chat.js';

export function chatSockets(socketServer){
    let io = new Server(socketServer, {
        cors: {
          origin: "http://localhost:8000",
          methods: ["GET", "POST"]
        }
      });

    io.sockets.on('connection',function(socket){
        console.log("new connection received",socket.id);

        socket.on('disconnect', function(){
            console.log("socker disconnected......!");
        });

        socket.on('join_room',async function(data){
            console.log('joining request',data);
            const messages = await Chat.find().sort({ timestamp: 1 });
           
            
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',messages);
        });

        socket.on('send_message', async function(data){
            //console.log(data);
            const newMessage = await Chat.create({
                content : data.message,
                name : data.user_name,
                mail : data.user_email
            });
            //console.log('hii');
            //const messages = await Chat.find().sort({ timestamp: 1 });
            //console.log(messages);
            io.in(data.chatroom).emit('receive_message',newMessage);
        })
    });
    
}

