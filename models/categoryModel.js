module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },

    { freezeTableName: true, timestamps: false }
  );

  return Category;
};
