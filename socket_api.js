const io = require( "socket.io" )();
const socket_api = { 
    io: io
};

// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    console.log( "A user connected" );
    socket.emit("hello", "world");
});
// end of socket.io logic

module.exports = socket_api;