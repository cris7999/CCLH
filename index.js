const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
const PORT = process.env.PORT || 3030;

var logins=[];
var questions=[];
var answers=[];
var indice=0;
var numberPlayers=0;
app.get('/', (req, res) => {

res.send('Chat Server is running on port 3030')
});
io.on('connection', (socket) => {

console.log('server connected')

socket.on('join', function(userNickname) {

        console.log(userNickname +" : has joined the chat with the index:"+indice);
        
        logins.push(indice);
        indice++;        
        
        io.emit('(ioemit)userjoinedthechat',userNickname +" : has joined the chat con id:",indice);
        
    
    
    })
socket.on('test', function(testigo) {

        console.log(testigo +" probando probando");        
        numberPlayers++;
        io.emit('number_players',numberPlayers);
        
    
    
    })

    

socket.on('messagedetection', (senderNickname,messageContent) => {

       //log the message in console 

       console.log(senderNickname+" : " +messageContent);

      //create a message object 

      let  message = {"message":messageContent, "senderNickname":senderNickname}

       // send the message to all users including the sender  using io.emit() 

      io.emit('message', message );

      })

socket.on('disconnect', function() {

        //console.log(userNickname +' has left ');
        numberPlayers--;
        io.emit('number_players',numberPlayers);
        
        //io.emit('message', message );

        //var pos = logins.indexOf(userNickname);
        //var elementoEliminado = logins.splice(pos, 1);

    })



socket.on('addquestion', (messageContent,userNickname) => {

        //log the message in console 
    
        console.log(senderNickname+" send question : " +messageContent);
    
       //create a message object 
        questions.push(messageContent);
       
    
        // send the message to all users including the sender  using io.emit() 
    
        io.emit('message', "Question added" );
    
    })
    

})

server.listen(PORT,()=>{

console.log('Node app is running on port 3030')

})