const assert = require('assert');
const PartyModel = require('../source/models/PartyModel');

/*
** Finaliza o processo após terminar os testes
*/
after(() => {
	process.exit();
})

describe('partyModel', () => {
	describe('name', () => {
		it('should pass if not blank', () => {
			const partyModel = new PartyModel({
				name: 'Partido de Teste',
				initials: 'PdT',
				createdAt: new Date(),
				userId: '5b1328d14bac121990ce1031'
			});

			const actual = partyModel.validateSync();
			const expected = undefined;
			assert.deepStrictEqual(actual, expected);
		});

		it('should return error message if blank', () => {
			const partyModel = new PartyModel({
				name: '',
				initials: 'PdT',
				createdAt: new Date(),
				userId: '5b1328d14bac121990ce1031'
			});

			const actual = partyModel.validateSync();
			assert.deepStrictEqual(actual.errors.name.message, 'Name is required!');
		});
	});

	describe('initials', () => {
		it('should pass if not blank', () => {
			const partyModel = new PartyModel({
				name: 'Partido de Teste',
				initials: 'PdT',
				createdAt: new Date(),
				userId: '5b1328d14bac121990ce1031'
			});

			const actual = partyModel.validateSync();
			assert.deepStrictEqual(actual, undefined);
		});

		it('should return error message if blank', () => {
			const partyModel = new PartyModel({
				name: 'Partido de Teste',
				initials: '',
				createdAt: new Date(),
				userId: '5b1328d14bac121990ce1031'
			});

			const actual = partyModel.validateSync();
			assert.deepStrictEqual(actual.errors.initials.message, 'Initials is required!');
		});

		it('should return error message if invalid', () => {
			const partyModel = new PartyModel({
				name: 'Partido de Teste',
				initials: 'P34Invalido',
				createdAt: new Date(),
				userId: '5b1328d14bac121990ce1031'
			});

			const actual = partyModel.validateSync();
			assert.deepStrictEqual(actual.errors.initials.message, 'Initials is invalid!');
		})
	});

	describe('userId', () => {
		it('should pass if not blank', () => {
			const partyModel = new PartyModel({
				name: 'Partido de Teste',
				initials: 'PdT',
				createdAt: new Date(),
				userId: '5b1328d14bac121990ce1031'
			});

			const actual = partyModel.validateSync();
			assert.deepStrictEqual(actual, undefined);
		});

		it('should return error message if blank', () => {
			const partyModel = new PartyModel({
				name: 'Partido de Teste',
				initials: 'PdT',
				createdAt: new Date(),
				userId: ''
			});

			const actual = partyModel.validateSync();
			assert.deepStrictEqual(actual.errors.userId.message, 'UserId is required!');
		});
	});
});
