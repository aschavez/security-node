'use strict';

module.exports = function(sequelize, DataTypes) {
  var Permission = sequelize.define('Permission', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    },
    value: {
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
        Permission.belongsToMany(models.Role, {through: 'PermissionsRoles'});
      }
    }
  });
  return Permission;
};
