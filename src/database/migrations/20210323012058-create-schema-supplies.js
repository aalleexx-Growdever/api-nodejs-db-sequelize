module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createSchema('supplies');
  },

  down: async (queryInterface) => {
    await queryInterface.dropSchema('supplies');
  },
};
