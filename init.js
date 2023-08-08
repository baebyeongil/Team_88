const App = require('./app.js');
const models = require('./db/models/index.js');

const app = new App();

app.setup();
app.connector.testConnectDB();
app.connector.connectDB();
app.runServer();
