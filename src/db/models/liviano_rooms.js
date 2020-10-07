/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('liviano_rooms', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdat: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    updatedat: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'liviano_rooms',
    schema: 'public'
    });
};
