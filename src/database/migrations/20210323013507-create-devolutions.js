module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'devolutions',
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
        category_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'id',
          },
        },
        quantity: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        reason_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'reasons',
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
      tableName: 'devolutions',
      schema: 'supplies',
    });
  },
};
