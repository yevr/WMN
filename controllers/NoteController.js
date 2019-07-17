let fastifyInstance;
let controllerPrefix = '/notes'; // TODO move to config.
const addPrefixToRoute = url => controllerPrefix + url;
const noteModel = require('./../models/NoteModel');

const getNote = (request, reply) => {
  reply.code(200).send({ invoked: 'getNote' });
};
const getNotes = (request, reply) => {
  reply.code(200).send({ invoked: 'getNotes' });
};
const addNote = (request, reply) => {
  reply.code(200).send({ invoked: 'addNote' });
};
const overwriteNote = (request, reply) => {
  reply.code(200).send({ invoked: 'overwriteNote' });
};
const updateNote = (request, reply) => {
  reply.code(200).send({ invoked: 'updateNote' });
};
const deleteNote = (request, reply) => {
  reply.code(200).send({ invoked: 'deleteNote' });
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
    method: 'GET', // Gets a note
    url: addPrefixToRoute('/:id'),
    handler: getNote,
  },
  {
    method: 'PUT', // Overwrite a note.
    url: addPrefixToRoute('/:id'),
    handler: overwriteNote,
  },
  {
    method: 'PATCH', // Partially update a note.
    url: addPrefixToRoute('/:id'),
    handler: updateNote,
  },
  {
    method: 'DELETE', // No wildcard deletes. No multiple deletes since it'd require transactional support.
    url: addPrefixToRoute('/:id'),
    handler: deleteNote,
  },
];

// fastifyInstance.route({
//   method: 'GET',
//   url: '/',
//   schema: {
//     querystring: {
//       name: { type: 'string' },
//       excitement: { type: 'integer' },
//     },
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           hello: { type: 'string' },
//         },
//       },
//     },
//   },
//   handler(request, reply) {
//     reply.send({ hello: 'world' });
//   },
// });

const setFastifyInstance = (framework) => {
  if (fastifyInstance) {
    throw new Error('Framework already set!');
  } else {
    fastifyInstance = framework;
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
