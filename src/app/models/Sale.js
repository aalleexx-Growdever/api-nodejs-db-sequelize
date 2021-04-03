import Sequelize, { Model } from 'sequelize';

class Sale extends Model {
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
      },
      {
        sequelize,
        schema: 'supplies',
        tableName: 'sales',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Region, {
      as: 'region',
      foreignKey: 'region_id',
    });

    this.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id',
    });

    this.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id',
    });
  }
}

export default Sale;
