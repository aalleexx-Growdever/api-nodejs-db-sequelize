module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      { tableName: 'reasons', schema: 'supplies' },
      [
        {
          description: 'Badly packed',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Broke',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Defective',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Missing pieces',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      { tableName: 'reasons', schema: 'supplies' },
      null,
      {}
    );
  },
};
