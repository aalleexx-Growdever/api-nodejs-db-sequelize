import Sequelize, { Model } from 'sequelize';

class Region extends Model {
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
        tableName: 'regions',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Sale, {
      as: 'sales',
      foreignKey: 'region_id',
    });

    this.hasOne(models.NearbyRegion, {
      as: 'base_region',
      foreignKey: 'base_region_id',
    });

    this.hasOne(models.NearbyRegion, {
      as: 'nearby_regions',
      foreignKey: 'nearby_region_id',
    });

    this.hasMany(models.Stock, {
      as: 'stocks',
      foreignKey: 'region_id',
    });
  }
}

export default Region;
