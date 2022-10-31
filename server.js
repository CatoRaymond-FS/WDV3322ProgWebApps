const http = require('http');
const app = require('./app/app');
require('dotenv').config();

http.createServer(app).listen(process.env.PORT || 3001, () => console.log(`Server running on port ${process.env.PORT || 3001}`));