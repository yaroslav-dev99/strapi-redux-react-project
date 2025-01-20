module.exports = {
    async afterCreate(event) {
      const { result } = event;
      strapi.io.emit('product-created', result);
    },
    async afterUpdate(event) {
      const { result } = event;
      strapi.io.emit('product-updated', result);
    },
    async afterDelete(event) {
      const { result } = event;
      strapi.io.emit('product-deleted', result);
    },
};
  