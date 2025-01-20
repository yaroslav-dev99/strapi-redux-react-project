// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};

const socketIO = require('socket.io');

module.exports = ({ strapi }) => {
  const io = socketIO(strapi.server.httpServer, {
    cors: {
      origin: 'http://localhost:3000', // Your frontend URL
      methods: ['GET', 'POST'],
    },
  });

  // io.on('connection', (socket) => {
  //   console.log('A user connected');
  //   socket.emit('message', 'Hello from Strapi WebSocket');
  //   socket.on('disconnect', () => {
  //     console.log('User disconnected');
  //   });
  // });
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Emit events when data changes in Strapi (example: when a product is created)
    // strapi.db.lifecycles.subscribe(async ({ model, action, result }) => {
    //   if (model === 'api::product.product' && action === 'create') {
    //     io.emit('product-created', result); // Emit event to frontend
    //   }
    // });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
  strapi.io = io;  // Allow access to io from other parts of Strapi
};

