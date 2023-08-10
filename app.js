const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connector = require('./db/db.js');
const config = require('./config/config.js');
const router = require('./routes/index.js');
const morgan = require('morgan');
const http = require('http');
const socketIO = require('socket.io');

class App {
  constructor() {
    this.app = express();
    this.connector = connector;
    this.server = http.createServer(this.app);
    this.io = socketIO(this.server);
  }
  setup() {
    this.app.use(
      cors({
        origin: 'http://127.0.0.1:5500',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      })
    );
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
    this.app.use('/', router);
    //frontend 폴더 자체를 들고 갈게 프론트 작업시
    this.app.use(express.static('frontend'));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use('/', router);
    this.app.get('/', (req, res) => {
      res.sendFile(__dirname + '/frontend/main.html');
    });
    this.app.get('/card', (req, res) => {
      res.sendFile(__dirname + '/frontend/card.html');
    });

    this.io.on('connection', socket => {
      console.log('사용자가 연결되었습니다.');

      socket.on('chat message', msg => {
        this.io.emit('chat message', msg);
      });

      socket.on('disconnect', () => {
        console.log('사용자가 연결이 끊어졌습니다.');
      });
    });
  }

  runServer() {
    this.server.listen(config.server.port, () => {
      console.log('🔥'.repeat(40));
      console.log(
        `Server is running on http://localhost:${config.server.port}`
      );
    });
  }
}

module.exports = App;
