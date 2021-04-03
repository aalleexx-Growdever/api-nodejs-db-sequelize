module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      { tableName: 'nearby_regions', schema: 'supplies' },
      [
        {
          base_region_id: 1,
          nearby_region_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          base_region_id: 2,
          nearby_region_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          base_region_id: 2,
          nearby_region_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          base_region_id: 3,
          nearby_region_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      { tableName: 'nearby_regions', schema: 'supplies' },
      null,
      {}
    );
  },
};
