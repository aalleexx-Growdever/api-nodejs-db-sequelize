import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
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
        price: {
          type: Sequelize.DataTypes.FLOAT,
          allowNull: false,
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
        tableName: 'products',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'categories',
      foreignKey: 'category_id',
    });

    this.hasMany(models.Devolution, {
      as: 'devolutions',
      foreignKey: 'product_id',
    });

    this.hasMany(models.Stock, {
      as: 'stocks',
      foreignKey: 'product_id',
    });
  }
}

export default Product;
