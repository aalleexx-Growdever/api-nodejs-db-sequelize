module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      { tableName: 'products', schema: 'supplies' },
      [
        {
          name: 'Play 4',
          price: 2000,
          category_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Play 5',
          price: 6000,
          category_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Play 4 Pro',
          price: 3000,
          category_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Sofa',
          price: 2000,
          category_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Bed',
          price: 2800,
          category_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Iphone',
          price: 5450,
          category_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Xiomi',
          price: 3770,
          category_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Drill',
          price: 330,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Drill Case',
          price: 225,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cutlery',
          price: 450,
          category_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Fridge',
          price: 2450,
          category_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Toaster',
          price: 150,
          category_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      { tableName: 'products', schema: 'supplies' },
      null,
      {}
    );
  },
};
