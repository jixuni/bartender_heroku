const Joi = require("joi");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },

    { freezeTableName: true, underScored: true }
  );

  // validate new user creation
  User.validateUser = function(user) {
    const schema = {
      name: Joi.string()
        .min(5)
        .max(50)
        .required(),
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .min(5)
        .max(255)
        .required()
    };

    return Joi.validate(user, schema);
  };

  // validate user login
  User.validateLogin = function(req) {
    const schema = {
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string().required()
    };

    return Joi.validate(req, schema);
  };

  return User;
};
