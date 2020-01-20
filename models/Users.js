'use strict';

let moment = require('moment');

module.exports = (sequelize, DataTypes) => {

	// Model definition
	let Users = sequelize.define('users', {
		id: {
			field: 'id',
			type: DataTypes.INTEGER,
			allowNull: false,	
			autoIncrement: true,
			primaryKey: true,
			validate: {
				isInt: true
			}
		},
		username: {
			field: 'username',
			type: DataTypes.STRING,
			allowNull: false
		},
		firstname: {
			field: 'firstname',
			type: DataTypes.STRING,
			allowNull: false
		},
		lastname: {
			field: 'lastname',
			type: DataTypes.STRING,
			allowNull: false
		},
		dni: {
			field: 'dni',
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			field: 'phone',
			type: DataTypes.STRING,
			allowNull: true
		},
		dir: {
			field: 'direction',
			type: DataTypes.STRING,
			allowNull: true
		},
		fechCre: {
			field: 'create_time',
			type: DataTypes.DATE,
			defaultValue: moment()
		}
	});

	// Class Methods

	Users.associate = (models) => {
		// Relationship here
	};

	Users.addUser = (obj) => {
		return Users.create(obj, {
			returning: true
		});
	};

	Users.findOneUser = (condition) => {
		return Users.findOne(condition);
	};

	Users.findAllUser = (condition, limit, offset) => {
		return Users.findAndCountAll({
			limit: limit,
			offset: offset,
			order: [['fechCre', 'ASC']],
			where: condition
		});
	};

	Users.updateUser = (obj, condition) => {
		return Users.update(obj, condition)
	};

	Users.deleteUser = (condition) => {
		return Users.destroy(condition);
	};

	return Users;
};

