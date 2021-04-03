module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'sales',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        product_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
        },
        quantity: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        total: {
          type: Sequelize.DataTypes.FLOAT,
          allowNull: false,
        },
        region_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'regions',
            key: 'id',
          },
        },
        category_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
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
      tableName: 'sales',
      schema: 'supplies',
    });
  },
};
