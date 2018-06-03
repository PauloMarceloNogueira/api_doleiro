const MongooseHelper = require('../helpers/MongooseHelper');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;
const UserModel = require('./UserModel');

// Instancia do Mongoose
const mongoose = MongooseHelper.getInstance();

/*
* Definir o Schema com propriedades, caracteristicas e validações
*/
const schema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required!'],
		trim: true
	},

	initials: {
		type: String,
		required: [true, 'Initials is required!'],
		trim: true,
		validate: {
			validator: initial => /^.[a-zA-Z].{1,5}$/.test(initial),
			message: 'Initials is invalid!'
		}
	},

	createdAt: {
		type: Date,
		default: Date.now(),
		required: [true, 'CreatedAt is required!']
	},

	userId: {
		type: String,
		required: [true, 'UserId is required!']
	}
});

/*
* Normaliza os dados ao salvar no banco, removendo o campo
* _v
*/
schema.options.toObject = {
	transform: (doc, ret) => {
		delete ret.__v;
	}
};

module.exports = mongoose.model('Party', schema);