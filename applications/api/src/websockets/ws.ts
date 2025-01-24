import type { FastifyInstance } from 'fastify';

const heartbeatInterval = 30000;

export const registerWsWebsocket = (api: FastifyInstance) => {
  // this needs to be inside a register to make sure the websocket plugin is available
  api.register(async (api) => {
    api.get('/ws', { websocket: true }, async (websocket, request) => {
      api.log.info('registering websocket connection and starting heartbeat');

      const heartbeatTimer = setInterval(() => {
        websocket.ping();
      }, heartbeatInterval);

      websocket.on('pong', () => {
        api.log.info('websocket pong received');
      });

      websocket.on('message', (message) => {
        api.log.info('websocket received message');

        // this handle both buffer and string data types which are most common, if others are need, this will need to
        // update
        const messageString = message.toString();

        // @todo(remove) remove once first use case is implemented
        console.log(messageString);
      });

      websocket.on('close', () => {
        api.log.info('websocket connection closed');

        clearInterval(heartbeatInterval);
      });

      websocket.on('error', (error) => {
        api.log.error(error);

        clearInterval(heartbeatInterval);
      });

      websocket.send('hello from server');
    });
  });
};
