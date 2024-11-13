import http from 'http';
import express from 'express';
import logger from "morgan";

import indexRouter from './routes/index.js';

class Server {
    app = null;
    port = null;
    instance = null;

    constructor() {
        this.#initialiseServer();
    }

    #initialiseServer() {
        this.port = this.#normalizePort(process.env.PORT || '3000');
        this.app = express();
        this.app
            .set('port', this.port)
            .use(logger('dev'))
            .use(express.json())
            .use('/', indexRouter);
        this.instance =  http.createServer(this.app)
            .listen(this.port)
            .on('error', this.#onError.bind(this))
            .on('listening', this.#onListening.bind(this));
    }

    #normalizePort(val) {
        const port = parseInt(val, 10);
        if (isNaN(port)) { return val } // named pipe
        if (port >= 0) { return port } // port number
        return false;
    }

    #onListening() {
        const addr = this.instance.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + (addr ? addr.port : 'Unknown');
        console.log('Listening on ' + bind);
    }

    #onError(error) {
        if (error.syscall !== 'listen') throw error;
        const bind = `${typeof this.port === 'string' ? 'Pipe' : 'Port'} ${this.port}`;
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

new Server();
