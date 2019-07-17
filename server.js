const { port, logger } = require('./config/server');
// eslint-disable-next-line import/order
const fastify = require('fastify')({ logger }); // Per requirements, no logging.
const notesController = require('./controllers/NotesController');

notesController.setFastifyInstance(fastify);
notesController.registerRoutes(null);

fastify.listen(port);
