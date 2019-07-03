const fastify = require('fastify')({ logger: false });

fastify.get('/', async (request, reply) => {
  reply.type('application/json').code(200);
  return { hello: 'world' };
});

fastify.listen(4444, (err, address) => {
  if (err) {
    throw err;
  }
  // fastify.log.info(`server listening on ${address}`);
});
