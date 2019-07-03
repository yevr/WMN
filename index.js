const fastify = require('fastify')({ logger: false });

const basicReply = { r: 'ok ' };

fastify.get('/', async (request, reply) => {
  reply.type('application/json').code(200);
  return basicReply;
});

fastify.listen(4444, (err, address) => {
  if (err) {
    throw err;
  }
  // fastify.log.info(`server listening on ${address}`);
});
