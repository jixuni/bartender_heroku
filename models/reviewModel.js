module.exports = function(sequelize, DataTypes) {
  const Review = sequelize.define(
    "Review",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },

    { freezeTableName: true, underscored: true }
  );

  Review.associate = function(models) {
    Review.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    });
    Review.belongsTo(models.Beer, {
      foreignKey: {
        name: "beer_id",
        allowNull: false
      }
    });
  };

  return Review;
};
