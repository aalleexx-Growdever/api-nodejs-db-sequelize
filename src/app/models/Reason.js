import Sequelize, { Model } from 'sequelize';

class Reason extends Model {
  static init(sequelize) {
    super.init(
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
      },
      {
        sequelize,
        schema: 'supplies',
        tableName: 'reasons',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Devolution, {
      as: 'devolutions',
      foreignKey: 'reason_id',
    });
  }
}

export default Reason;
