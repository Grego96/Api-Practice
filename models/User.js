const bcrypt = require("bcryptjs");

module.exports = (sequelize, Model, DataTypes) => {
  class User extends Model {
    async validatePassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          validateEmail(value) {
            var validRegex =
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!value.match(validRegex)) {
              throw new Error("Invalid Email format");
            }
          },
        },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  User.beforeBulkCreate(async (users) => {
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};
