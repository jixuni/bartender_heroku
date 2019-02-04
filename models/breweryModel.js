module.exports = function(sequelize, DataTypes) {
  const Brewery = sequelize.define(
    "Brewery",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },

    { freezeTableName: true, timestamps: false }
  );

  Brewery.associate = function(models) {
    Brewery.belongsTo(models.Country, {
      foreignKey: {
        name: "country_id",
        allowNull: false
      }
    });
  };
  return Brewery;
};
