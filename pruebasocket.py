import socketio

sio=socketio.Client()
sio.connect('http://localhost:8080')

sio.emit('join', {'Hola': 'Hola'})
print('Cris7Kiani join')

#sio.emit('join', 'Obiwan')
print('Obiwan join')

#sio.emit('join', 'Alguien')
print('Alguien join')
#sio.emit('disconnect')




@sio.event
def connect():
    print("I'm connected!")
@sio.event
def disconnect():
    print("I'm disconnected!")


@sio.event
def message(data):
    print('I received a message!')
