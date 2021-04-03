import Sequelize, { Model } from 'sequelize';

class NearbyRegion extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        base_region_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'regions',
            key: 'id',
          },
        },
        nearby_region_id: {
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
        tableName: 'nearby_regions',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Region, {
      as: 'base_region',
      foreignKey: 'base_region_id',
    });

    this.belongsTo(models.Region, {
      as: 'nearby_region',
      foreignKey: 'nearby_region_id',
    });
  }
}

export default NearbyRegion;
