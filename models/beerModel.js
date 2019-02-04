const Joi = require("joi");

module.exports = function(sequelize, DataTypes) {
  const Beer = sequelize.define(
    "Beer",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      abv: {
        type: DataTypes.DECIMAL(4, 1),
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },

    { freezeTableName: true, timestamps: false, underscored: true }
  );

  Beer.associate = function(models) {
    Beer.belongsTo(models.Brewery, {
      foreignKey: {
        name: "brewery_id",
        allowNull: true
      }
    });
    Beer.belongsTo(models.Flavor, {
      foreignKey: {
        name: "flavor_id",
        allowNull: true
      }
    });
    Beer.belongsTo(models.Category, {
      foreignKey: {
        name: "category_id",
        allowNull: true
      }
    });
    Beer.belongsTo(models.Style, {
      foreignKey: {
        name: "style_id",
        allowNull: true
      }
    });
  };

  return Beer;
};
