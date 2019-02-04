module.exports = function(sequelize, DataTypes) {
  const Country = sequelize.define(
    "Country",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },

    { freezeTableName: true, timestamps: false }
  );

  return Country;
};
