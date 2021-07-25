const Client = require('./bot/Struct/Client');
require('dotenv').config();

const client = new Client();
require('./api/server');
require('./bot/Handlers/CommandsHandler')(client);
require('./bot/Handlers/EventsHandler')(client);

void client.login(process.env.TOKEN);