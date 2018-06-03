const assert = require('assert');
const UserModel = require('../source/models/UserModel');

/*
** Finaliza o processo após terminar os testes
*/
after(() => {
	process.exit();
});

describe('userModel', () => {
	describe('name', () => {
		it('should pass if not blank', () => {
	      const userModel = new UserModel({
	        name: 'Paulo Marcelo',
	        email: 'paulomarceloa.nogueira@gmail.com',
	        password: 'XzOL39n8WN7bnemRaIcfR7a3sId3fEgx',
	      });

	      const actual = userModel.validateSync();
	      const expected = undefined;

	      assert.deepStrictEqual(actual, expected);
	    });

	    it('should return error message if not blank', () => {
	    	const userModel = new UserModel({
	    		name: '',
	    		email: 'paulomarceloa.nogueira@gmail.com',
	    		password: 'XzOL39n8WN7bnemRaIcfR7a3sId3fEgx'
	    	});

	    	const actual = userModel.validateSync();
	    	assert.deepStrictEqual(actual.errors.name.message, 'Name is required!')
	    });
	});

	describe('email', () => {
		it('should pass if not blank', () => {
			const userModel = new UserModel({
				name: 'Paulo Marcelo',
				email: 'paulomarceloa.nogueira@gmail.com.br',
				password: 'XzOL39n8WN7bnemRaIcfR7a3sId3fEgx'
			});

			const actual = userModel.validateSync();
			assert.deepStrictEqual(actual, undefined);
		});

		it('should return error message if blank', () => {
			const userModel = new UserModel({
				name: 'Paulo Marcelo',
				email: '',
				password: 'XzOL39n8WN7bnemRaIcfR7a3sId3fEgx'
			});

			const actual = userModel.validateSync();
			assert.deepStrictEqual(actual.errors.email.message, 'Email is required!')
		});

		it('should return error message if invalid', () => {
			const userModel = new UserModel({
				name: 'Paulo Marcelo',
				email: 'paulo@invalid',
				password: 'XzOL39n8WN7bnemRaIcfR7a3sId3fEgx'
			});

			const actual = userModel.validateSync();
			assert.deepStrictEqual(actual.errors.email.message, 'paulo@invalid is not a valid email!');
		});
	});

	describe('password', () => {
		it('should pass if not blank', () => {
			const userModel = new UserModel({
				name: 'Paulo Marcelo',
				email: 'paulomarceloa.nogueira@gmail.com.br',
				password: 'XzOL39n8WN7bnemRaIcfR7a3sId3fEgx'
			});

			const actual = userModel.validateSync();
			assert.deepStrictEqual(actual, undefined)
		});

		it('should return error if blank', () => {
			const userModel = new UserModel({
				name: 'Paulo Marcelo',
				email: 'paulomarceloa.nogueira@gmail.com',
				password: ''
			});

			const actual = userModel.validateSync();
			assert.deepStrictEqual(actual.errors.password.message, 'Password is required!');
		});
	});

});

