import Sequelize, { Model } from 'sequelize';

class Category extends Model {
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
      },
      {
        sequelize,
        schema: 'supplies',
        tableName: 'categories',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Product, {
      as: 'category_product',
      foreignKey: 'category_id',
    });

    this.hasMany(models.Devolution, {
      as: 'category',
      foreignKey: 'category_id',
    });

    this.hasMany(models.Sale, {
      as: 'category_sale',
      foreignKey: 'category_id',
    });
  }
}

export default Category;
