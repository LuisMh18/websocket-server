const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 9000;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}

        //Middlewares
        this.middlewares();

        //rutas de mi aplicación
        this.routes();

        //sockets
        this.sockets();
    }
  

    middlewares(){
        //CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio Público
        this.app.use( express.static('public') );

    }

    routes(){
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets(){
        this.io.on('connection', socketController);
    }

    listen(){ 
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);    
        });
    }

}



module.exports = Server;