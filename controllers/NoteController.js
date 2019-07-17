const NoteModel = require('./../models/NoteModel');
const { routePrefix } = require('./../config/server');

const addPrefixToRoute = url => routePrefix + url;
let fastifyInstance = null;

const addNote = (request, reply) => {
  reply.code(200).send({ invoked: 'addNotes' });
};
const getOrFindNotes = async (request, reply) => {
  reply.code(200).send(await NoteModel.getAllNotes());
};
const overwriteNotes = (request, reply) => {
  reply.code(200).send({ invoked: 'overwriteNotes' });
};
const deleteNotes = (request, reply) => {
  reply.code(200).send({ invoked: 'deleteNotes' });
};

const notAllowed = (request, reply) => {
  reply.code(405).send({ message: 'This call is not allowed without specifying resource IDs' });
};

const routeMappings = [
  {
    method: 'POST', // Return state of created note, with the generated ID.
    url: addPrefixToRoute('/'),
    handler: addNote,
  },
  {
    method: 'GET', // Get by id, search, or return all (together for brevity).
    url: addPrefixToRoute('/:params'),
    handler: getOrFindNotes,
  },
  {
    method: 'PUT', // To inform API consumer.
    url: addPrefixToRoute('/'),
    handler: notAllowed,
  },
  {
    method: 'PUT', // Overwrite a note.
    url: addPrefixToRoute('/:id'),
    handler: overwriteNotes,
  },
  {
    method: 'DELETE', // To inform API consumer.
    url: addPrefixToRoute('/'),
    handler: notAllowed,
  },
  {
    method: 'DELETE', // Delete a note.
    url: addPrefixToRoute('/:id'),
    handler: deleteNotes,
  },
];

const setFastifyInstance = (fastify) => {
  if (fastifyInstance) {
    throw new Error('Framework already set!');
  } else {
    fastifyInstance = fastify;
  }
};

const registerRoutes = () => {
  if (!fastifyInstance) {
    throw new Error('Framework is not set!');
  } else {
    routeMappings.forEach(route => fastifyInstance.route(route));
  }
};

module.exports = Object.freeze({
  setFastifyInstance,
  registerRoutes,
});
