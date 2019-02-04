module.exports = function(sequelize, DataTypes) {
  const Flavor = sequelize.define(
    "Flavor",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },

    { freezeTableName: true, timestamps: false }
  );

  return Flavor;
};
