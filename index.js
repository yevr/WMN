const fastify = require('fastify')({ logger: true });

fastify.get('/', async (request, reply) => {
  fastify.log.debug(`request received: ${JSON.stringify(request)}`);
  reply.type('application/json').code(200);
  return { hello: 'world' };
});

fastify.listen(4444, (err, address) => {
  if (err) {
    throw err;
  }
  fastify.log.info(`server listening on ${address}`);
});
