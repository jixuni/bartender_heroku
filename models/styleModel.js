module.exports = function(sequelize, DataTypes) {
  const Style = sequelize.define(
    "Style",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },

    { freezeTableName: true, timestamps: false }
  );

  return Style;
};
