module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'nearby_regions',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        base_region_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'regions',
            key: 'id',
          },
        },
        nearby_region_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'regions',
            key: 'id',
          },
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        schema: 'supplies',
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable({
      tableName: 'nearby_regions',
      schema: 'supplies',
    });
  },
};
