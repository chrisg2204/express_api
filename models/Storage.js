'use strict';

let moment = require('moment');

module.exports = (sequelize, DataTypes) => {
	let Storage = sequelize.define("storage", {
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
		nombre: {
			field: 'name',
			type: DataTypes.STRING,
			allowNull: false
		},
		modelo: {
			field: 'model',
			type: DataTypes.STRING,
			allowNull: false
		},
		color: {
			field: 'color',
			type: DataTypes.STRING,
			allowNull: false
		},
		rodado: {
			field: 'ring',
			type: DataTypes.STRING,
			allowNull: false
		},
		precio: {
			field: 'price',
			type: DataTypes.FLOAT,
			allowNull: false
		},
		fechaCreacion: {
			field: 'create_time',
			type: DataTypes.DATE,
			defaultValue: moment()
		}
	}, {
		classMethods: {
			associate: (models) => {

			},
			addBike: (dataObj) => {
				return Storage.create(dataObj, {
					returning: true
				});
			},
			findAllBikes: (condition, limit, offset) => {
				return Storage.findAndCountAll({
					limit: limit,
					offset: offset,
					order: '"fechaCreacion" ASC',
					where: condition
				});
			},
			findOneBike: (condition) => {
				return Storage.findOne(condition);
			},
			destroyBike: (condition) => {
				return Storage.destroy({
					where: condition
				});
			},
			updateBike: (data, condition) => {
				return Storage.update(data, condition)
			}
		}
	});

	return Storage;
};