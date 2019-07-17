const NoteModel = require('./../models/NoteModel');
const { routePrefix } = require('./../config/server');

const addPrefixToRoute = url => routePrefix + url;
let fastifyInstance = null;

const getNotes = (request, reply) => {
  reply.code(200).send({ invoked: 'getNotes', note: new NoteModel({}).id, params: request });
};
const addNote = (request, reply) => {
  reply.code(200).send({ invoked: 'addNotes' });
};
const overwriteNotes = (request, reply) => {
  reply.code(200).send({ invoked: 'overwriteNotes' });
};
const updateNotes = (request, reply) => {
  reply.code(200).send({ invoked: 'updateNotes' });
};
const deleteNotes = (request, reply) => {
  reply.code(200).send({ invoked: 'deleteNotes' });
};

const notAllowed = (request, reply) => {
  reply.code(405).send({ message: 'This call is not allowed without specifying resource IDs' });
};

const routeMappings = [
  {
    method: 'POST', // Return state of created object, with the generated ID.
    url: addPrefixToRoute('/'),
    handler: addNote,
  },
  {
    method: 'GET', // Gets all notes
    url: addPrefixToRoute('/'),
    handler: getNotes,
  },
  {
    method: 'GET', // Search for notes - by ID, title or text.
    url: addPrefixToRoute('/:params'),
    handler: getNotes,
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
    method: 'PATCH', // To inform API consumer.
    url: addPrefixToRoute('/'),
    handler: notAllowed,
  },
  {
    method: 'PATCH', // Partially update a note.
    url: addPrefixToRoute('/:id'),
    handler: updateNotes,
  },
  {
    method: 'DELETE', // To inform API consumer.
    url: addPrefixToRoute('/'),
    handler: notAllowed,
  },
  {
    method: 'DELETE', // No wildcard deletes. No multiple deletes since it'd require transactional support.
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
