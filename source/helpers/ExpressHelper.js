const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = (() => {
	let expressInstance = null;

	return class ExpressHelper {
		/**
		@static getInstance - Singleton que retorna o objeto do Express
		configurado com as necessidades de aplicações'

		@returns {object} Instancia do Express
		**/

		static getInstance() {
			if (expressInstance) {
				return expressInstance;
			}
			// Inicia o Express.js
			expressInstance = express();

			// Configura o bodyParser
			expressInstance.use(bodyParser.json());
			expressInstance.use(bodyParser.urlencoded({extended:true}));

			// Configura o acesso de arquivos estáticos
			expressInstance.use('/', express.static(`${__dirname}/../../public`));

			// Configurea log de requisições HTTP'
			expressInstance.use(morgan('combined'));

			return expressInstance;

		}

	}
})()