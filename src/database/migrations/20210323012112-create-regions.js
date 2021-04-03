module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'regions',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
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
      tableName: 'regions',
      schema: 'supplies',
    });
  },
};
