const BaseController = require('./BaseController');
const UserModel = require('../models/UserModel');

module.exports = class AuthenticationController extends BaseController {
	constructor(express) {
    
    super();

    if (express) {
      console.log('express')
      this.express = express;
      this.applyRoutes();
    }
  }

  /**
   * applyRoutes - Adiciona as rotas HTTP
   */
  applyRoutes() {
    // Rotas públicas
    this.express.post('/api/authentication/sign_in', (request, response) => this.signin(request, response));
    this.express.post('/api/authentication/sign_up', (request, response) => this.signup(request, response));
    this.express.get('/test', this.authenticate, (request, response) => this.test(request, response));
  }

  /**
   * signin - Efetua a autenticação de usuário
   *
   * @param {object} request  Objeto da requisição recebida
   * @param {object} response Objeto do retorno da requisição
   */
  signin(request, response) {
    const { email, password } = request.body;
    console.log(email, password)
    UserModel.getAuthenticated(email, password, (error, user) => {
      if (error) {
        return response.status(400).json(error);
      }

      response.json(user);
    });
  }

  /**
   * signup - Efetua o cadastro de usuário
   *
   * @param {object} request  Objeto da requisição recebida
   * @param {object} response Objeto do retorno da requisição
   */
  signup(request, response) {
    const user = new UserModel(request.body);
    user.save()
      .then(user => response.json(user))
      .catch((error) => {
        const messages = Object.values(error.errors).map(error => error.message);

        response.status(400).json(messages);
      });
  }

  /**
   * signoff - Efetua a desautenticação do usuário
   *
   * @param {object} request  Objeto da requisição recebida
   * @param {object} response Objeto do retorno da requisição
   */
  test(request, response) {
    console.log('Privado entrou')
  }
}

