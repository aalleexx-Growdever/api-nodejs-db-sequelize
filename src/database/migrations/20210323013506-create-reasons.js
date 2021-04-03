module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'reasons',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        description: {
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
    await queryInterface.dropTable('reasons', {
      schema: 'supplies',
    });
  },
};
