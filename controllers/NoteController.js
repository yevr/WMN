const NoteModel = require('./../models/NoteModel');
const { routePrefix } = require('./../config/server');

const addPrefixToRoute = url => routePrefix + url;
let fastifyInstance = null;

const addNote = async (request, reply) => {
  const { body } = request;
  let createdNote;

  if (body && !body.id && body.text && body.title) {
    try {
      createdNote = await NoteModel.create(new NoteModel({
        text: body.text,
        title: body.title,
      }));
    } catch (err) {
      reply.code(500).send(JSON.stringify(err));
    }
  }
  createdNote ? reply.code(200).send(NoteModel.getAsJson(createdNote)) : reply.code(400).send();
};
const getOrFindNotes = async (request, reply) => { // This should be broken down.
  // Extremely hacky for brevity. Our magic functionality here is:
  // First, if request.params.id is not empty, getOne - return the item.
  // Then, if title is supplied, search for many by title (and then by text)
  // Else, it's a clear request so we return all items.
  if (request.params.id) {
    const result = await NoteModel.findById(request.params.id);
    result ? reply.code(200).send(NoteModel.getAsJson(result)) : reply.code(404).send();
  } else if (request.query.title) {
    const result = await NoteModel.findByTitle(request.query.title);
    result ? reply.code(200).send(result.map(item => NoteModel.getAsJson(item))) : reply.code(404).send();
  } else if (request.query.text) {
    const result = await NoteModel.findByText(request.query.text);
    result ? reply.code(200).send(result.map(item => NoteModel.getAsJson(item))) : reply.code(404).send();
  }
  reply.code(200).send(await NoteModel.getAllNotes());
};
const overwriteNote = async (request, reply) => {
  // Overall, this is likely what I'm least happy with in this sample project. Great conversation topic :)
  // For starters: update ID is taken from the URL, replaced with the one in body. Line breaks are also an issue.
  console.log('overwriteNotes');
  console.log(`body ${JSON.stringify(request.body)}`);
  console.log(`query ${JSON.stringify(request.query)}`);
  console.log(`params ${JSON.stringify(request.params)}`);
  if (!request.params.id || !request.body || !request.body.text || !request.body.title) {
    // This validation is inadequate, but still better than nothing.
    reply.code(400).send();
  }
  let result;
  try {
    result = await NoteModel.update(new NoteModel({
      id: request.params.id,
      text: request.body.text,
      title: request.body.title,
    }));
  } catch (err) {
    reply.code(500).send(JSON.stringify(err));
  }
  // This is an interesting one... let's assume failure means 422 here (See rushed NoteModel implementation)
  result ? reply.code(200).send() : reply.code(422).send({ message: 'Unprocessable entity.' });
};
const deleteNote = async (request, reply) => {
  let result;
  try {
    result = await NoteModel.deleteById(request.params.id);
  } catch (err) {
    reply.code(500).send(JSON.stringify(err));
  }
  reply.code(result ? 200 : 404).send();
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
    url: addPrefixToRoute('/:id'),
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
    handler: overwriteNote,
  },
  {
    method: 'DELETE', // To inform API consumer.
    url: addPrefixToRoute('/'),
    handler: notAllowed,
  },
  {
    method: 'DELETE', // Delete a note.
    url: addPrefixToRoute('/:id'),
    handler: deleteNote,
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
