export default {
    async addProduct(ctx) {
      try {
        ctx.body = { message: 'Custom route works!' };
      } catch (error) {
        ctx.throw(500, 'Internal Server Error');
      }
    },
};
  