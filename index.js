const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
const PORT = process.env.PORT || 3030;

var logins=[];
var questions=[];
var answers=[];
var numberPlayers=0;
var listos=0;
var juegoEnMarcha=false;
var zar="";
var numMinPlayers=2;

app.get('/', (req, res) => {

res.send('Chat Server is running on port 3030')
});
io.on('connection', (socket) => {

console.log('server connected');
questions[0]="Bebo para olvidar _____";
questions[1]="_____: bueno hasta la ultima gota";
questions[2]="¿Qué es ese sonido?";
questions[3]="¿A qué huele?";

answers[0]="Barack Obama";
answers[1]="Txeroki";
answers[2]="Esperanza Aguirre";
answers[3]="Correrse en una piscina llena de niños";

function repartirPregunta() {
    var elegida=Math.random() * ((questions.length) - 0) + (questions.length);
    io.emit('pregunta',elegida);
  }



function eleccionZar() {
    var elegido=Math.random() * ((numberPlayers) - 0) + (numberPlayers);
    io.emit('zar',elegido);
    io.emit('zarnombre',"Se ha elegido el zar:"+logins[elegido]);

  }
  


socket.on('join', function(userNickname) {

        console.log(userNickname +" : has joined the chat with the index:"+indice);
        
        logins.push(numberPlayers);
        numberPlayers++;
        io.emit('number_players',numberPlayers);                        
    })
socket.on('test', function(testigo) {

        console.log(testigo +" probando probando");        
        
    
    
    })

socket.on('listo', function() {

    console.log("jugador listo");        
    listos++;
    if ((listos == numberPlayers) && listos>numMinPlayers && numberPlayers>numMinPlayers) {
        juegoEnMarcha = true;
        eleccionZar();

    }else{
        console.log("Esperando por jugadores,actualmente listos:"+listos);
    }

        
})




socket.on('messagedetection', (senderNickname,messageContent) => {

       //log the message in console 

       console.log(senderNickname+" : " +messageContent);

      //create a message object 

      let  message = {"message":messageContent, "senderNickname":senderNickname}

       // send the message to all users including the sender  using io.emit() 

      io.emit('message', message );

      })
socket.on('disconnect_user', function(userNickname){

    console.log(userNickname +' has left ');
    numberPlayers--;
    io.emit('number_players',numberPlayers);
    
    //io.emit('message', message );

    var pos = logins.indexOf(userNickname);
    var elementoEliminado = logins.splice(pos, 1);



})
socket.on('disconnect', function(userNickname) {

     //   console.log(userNickname +' has left ');
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