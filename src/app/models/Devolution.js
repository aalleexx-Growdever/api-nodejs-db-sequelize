import Sequelize, { Model } from 'sequelize';

class Devolution extends Model {
  static init(sequelize) {
    super.init(
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
      },
      {
        sequelize,
        schema: 'supplies',
        tableName: 'devolutions',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id',
    });

    this.belongsTo(models.Reason, {
      as: 'reason',
      foreignKey: 'reason_id',
    });

    this.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id',
    });
  }
}

export default Devolution;
