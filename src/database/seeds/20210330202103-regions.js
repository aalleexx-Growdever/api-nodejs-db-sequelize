module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      { tableName: 'regions', schema: 'supplies' },
      [
        {
          name: 'Novo Hamburgo',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Sapiranga',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Taquara',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      { tableName: 'regions', schema: 'supplies' },
      null,
      {}
    );
  },
};
