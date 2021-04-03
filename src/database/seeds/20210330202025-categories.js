module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      { tableName: 'categories', schema: 'supplies' },
      [
        {
          name: 'Consoles',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Fornitures',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Mobiles',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Tools',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Utensils',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Home Appliances',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      { tableName: 'categories', schema: 'supplies' },
      null,
      {}
    );
  },
};
