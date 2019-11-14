import socketio

sio=socketio.Client()
sio.connect('http://localhost:3000')

sio.emit('join', "Cris7Kiani")
print('Cris7Kiani join')

sio.emit('join', "Obiwan")
print('Obiwan join')

sio.emit('join', "Alguien")
print('Alguien join')
sio.emit('disconnect')




@sio.event
def connect():
    print("I'm connected!")

