const ExpressHelper = require('../helpers/ExpressHelper');
const AuthenticationController = require('./AuthenticationController');
const PartyController = require('./PartyController');

module.exports = class DoleiroController {
	// constructor
	constructor() {
		this.express = ExpressHelper.getInstance()
		this.authenticationController = new AuthenticationController(this.express);
		this.partyController = new PartyController(this.express);
	}

	/**
	run - inicializa a aplicação
	@param {function} callback Método executado após iniciar a aplicação
	**/

	run(callback) {
		this.express.listen(3000, callback)
	}
}
