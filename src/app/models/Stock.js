import Sequelize, { Model } from 'sequelize';

class Stock extends Model {
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
        product_quant: {
          type: Sequelize.DataTypes.INTEGER,
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
      },
      {
        sequelize,
        schema: 'supplies',
        tableName: 'stocks',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id',
    });

    this.belongsTo(models.Region, {
      as: 'region',
      foreignKey: 'region_id',
    });
  }
}

export default Stock;
