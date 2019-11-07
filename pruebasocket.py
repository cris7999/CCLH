import socketio

sio=socketio.Client()
sio.connect('http://localhost:3000')

sio.emit('join', "Cris7Kiani")
print('my sid is', sio.sid)
sio.emit('disconnect')


@sio.event
def connect():
    print("I'm connected!")

