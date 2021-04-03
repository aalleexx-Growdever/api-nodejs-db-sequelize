module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      { tableName: 'stocks', schema: 'supplies' },
      [
        {
          product_id: 1,
          product_quant: 20,
          region_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: 2,
          product_quant: 13,
          region_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: 4,
          product_quant: 45,
          region_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: 7,
          product_quant: 46,
          region_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: 12,
          product_quant: 56,
          region_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: 4,
          product_quant: 34,
          region_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: 7,
          product_quant: 45,
          region_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: 8,
          product_quant: 23,
          region_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: 2,
          product_quant: 22,
          region_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: 11,
          product_quant: 65,
          region_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: 3,
          product_quant: 32,
          region_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: 6,
          product_quant: 12,
          region_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      { tableName: 'stocks', schema: 'supplies' },
      null,
      {}
    );
  },
};
