'use strict';

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['slug']
      }
    ],
    classMethods: {
      associate: function(models) {
        Role.hasMany(models.User);
        Role.belongsToMany(models.Permission, {through: 'PermissionsRoles'});
      }
    }
  });
  return Role;
};
