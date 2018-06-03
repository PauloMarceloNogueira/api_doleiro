const BaseController = require('./BaseController');
const PartyModel = require('../models/PartyModel');

module.exports = class PartyController extends BaseController {
	constructor(express) {
		super();

		if (express) {
			this.express = express;
			this.applyRouters();
		}
	}

  /*
  ** applyRouters - Adiciona a rota HTTP
  */
  applyRouters() {
    // Rotas públicas
    this.express.post('/api/party/create', this.authenticate, (request, response) => this.create(request, response));
  }

  /**
  * create - Cadastra um Partido
  *
  * @param {object} request do Objeto de requisição recebida
  * @param {object} response Objeto do retorno da requisição
  **/
  create(request, response) {
    const party = new PartyModel(request.body);
    party.save()
      .then(party => response.json(party))
      .catch((error) => {
        const message = Object.values(error.errors).map(error => error.message);
        response.status(400).json(message);
      });
  }
}