

class ChatEngine{
    constructor(chatBoxId, userEmail, userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName;

        this.socket = io.connect('http://3.110.193.3/:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                data.forEach((message)=>{
                    //console.log('message');
                    let newMessage = $('<li>');
    
                    let messageType = 'other-message';
        
                    if (message.mail == self.userEmail){
                        messageType = 'self-message';
                    }
        
                    newMessage.append($('<span>', {
                        'html': message.content
                    }));
                    newMessage.append($('<br>'));
                    newMessage.append($('<sub>', {
                        'html': message.name
                    }));
        
                    newMessage.addClass(messageType);
        
                    $('#chat-messages-list').append(newMessage);
                    scrollToBottom();
                });
                //console.log('a user joined!', data);
            })


        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email : self.userEmail,
                    user_name : self.userName,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function(message){
            //console.log('hii3');
            //data.forEach((message)=>{
                console.log('message');
                let newMessage = $('<li>');

                let messageType = 'other-message';
    
                if (message.mail == self.userEmail){
                    messageType = 'self-message';
                }
    
                newMessage.append($('<span>', {
                    'html': message.content
                }));
                newMessage.append($('<br>'));
    
                newMessage.append($('<sub>', {
                    'html': message.name
                }));
    
                newMessage.addClass(messageType);
    
                $('#chat-messages-list').append(newMessage);
                scrollToBottom();
           // });
            //console.log('message received', data.message);
           
        });
        function scrollToBottom() {
            const chatBox = document.getElementById('chat-messages-list'); // Replace with your chat box element
            chatBox.scrollTop = chatBox.scrollHeight;
          }
          
    }
}