'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: { msg: "Por favor, ingrese un correo electrónico valido." } },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('validated', 'unvalidated'),
      allowNull: false,
      defaultValue: 'unvalidated'
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastLogin: {
      type: DataTypes.DATE
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['username', 'email']
      }
    ],
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Role);
      }
    }
  });
  return User;
};
