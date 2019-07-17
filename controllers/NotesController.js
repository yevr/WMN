let fastifyInstance = null;

const noteModel = require('./../models/NoteModel');
const logLevel = require('./../config/server');

const getNote = (request, reply) => {
  reply.code(200).send({});
};
const getNotes = (request, reply) => {
  reply.code(200).send({});
};
const addNote = (request, reply) => {
  reply.code(200).send({});
};
const addNotes = (request, reply) => {
  reply.code(200).send({});
};
const overwriteNote = (request, reply) => {
  reply.code(200).send({});
};
const overwriteNotes = (request, reply) => {
  reply.code(200).send({});
};
const updateNote = (request, reply) => {
  reply.code(200).send({});
};
const updateNotes = (request, reply) => {
  reply.code(200).send({});
};
const deleteNote = (request, reply) => {
  reply.code(200).send({});
};
const deleteNotes = (request, reply) => {
  reply.code(200).send({});
};

const setFastifyInstance = (framework) => {
  if (fastifyInstance) {
    throw new Error('Framework already set!');
  } else {
    fastifyInstance = framework;
  }
};

const registerRoutes = (args) => {
  if (!fastifyInstance) {
    throw new Error('Framework is not set!');
  } else {
    console.log('register routes here');
  }
};

module.exports = Object.freeze({
  setFastifyInstance,
  registerRoutes,
});
