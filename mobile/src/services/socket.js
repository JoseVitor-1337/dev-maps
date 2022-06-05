import socketio from 'socket.io-client'

const socket = socketio("http://192.168.0.114:3333", {
  autoConnect: false
})

function connect(params) {
  socket.io.opts.query = params

  socket.connect()
}

function disconnect() {
  if (socket.connected) socket.disconnect()
}

function subscribeToNewDevs(subscribeFunction) {
  if (socket.connected) {
    socket.on("new-dev", subscribeFunction)
  }
}

export { connect, disconnect, subscribeToNewDevs }