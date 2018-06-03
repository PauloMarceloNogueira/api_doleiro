const MongooseHelper = require('../helpers/MongooseHelper');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;

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

	email: {
		type: String,
		required: [true, 'Email is required!'],
		index: {unique:true},
		trim: true,
		validate: {
			validator:email => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email),
			message: '{VALUE} is not a valid email!'
		}
	},
	password: {
		type: String,
		required: [true, 'Password is required!'],
	},
  token: {
    type: String
  }
});

/*
* Normaliza os dados ao salvar no banco, removendo o campo
* _v e a senha
*/
schema.options.toObject = {
	transform: (doc, ret) => {
		delete ret._v;
		delete ret.password;
	}
};
	
/*
* Hook chamado sempre que o schema é salvo.
* Gera a senha criptografada pra salvar no banco
*/
schema.pre('save', function preSave(next) {
	const user = this;

	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.hash(user.password, parseInt(10,10), (error, hash) => {
		user.password = hash;
		next();
	})
});

schema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

/*
* Método estático que captura o usuário e, se autenticado, persiste um novo Token
*/
schema.statics.getAuthenticated = function getAuthenticated(email, password, callback) {
	this.findOne({ email }, (error, user) => {

		if (error) {
			return callback(error);
		}

		user.comparePassword(password, (error, isMatch) => {
      if (error) {
				return callback(error);
			}

			if (isMatch) {
        const token = uuidv4();

        return user.set({ token }).save((error, updatedUser) => {
          if (error) {
            return callback(error);
          }

          callback(null, updatedUser);
        });
      } else {
        callback({status:404,message:"User not found"})
      }

		})
	})
}


module.exports = mongoose.model('User', schema);
