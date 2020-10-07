/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('students', {
    student_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    student_marks: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'students',
    schema: 'public'
    });
};
