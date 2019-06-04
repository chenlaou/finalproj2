var bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [1],
                isEmail: true
            }
        },
        user_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [1 - 20]
            }
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6 - 15]
            }
        },
    });

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.beforeCreate(function (user) {
        user.user_password = bcrypt.hashSync(
            user.user_password,
            bcrypt.genSaltSync(10),
            null
        );
    });

    User.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Article, {
            onDelete: "cascade"
        });
    };

    return User
}
