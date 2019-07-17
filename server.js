const { port, logger } = require('./config/server');
// eslint-disable-next-line import/order
const fastify = require('fastify')({ logger });
const notesController = require('./controllers/NoteController');

notesController.setFastifyInstance(fastify);
notesController.registerRoutes();

fastify.listen(port);
console.log(`Notes listening on port ${port}`);
