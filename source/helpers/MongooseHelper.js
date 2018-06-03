const mongoose = require('mongoose');

module.exports = (() => {
  let mongooseInstance = null;

  /**
   * @static getInstance - Singleton que retorna o objeto do Mongoose
   * configurado com as necessidades da aplicação.
   */
  return class MongooseHelper {
    static getInstance() {
      if (mongooseInstance) {
        return mongooseInstance;
      }

      // Carrega a instancia do Mongoose para o escopo do classe
      mongooseInstance = mongoose;

      // Conexão do mongodb
      const uri = `mongodb://localhost/doleiro`;
      const options = {
        autoIndex: false
      };

      mongooseInstance.connect(uri, options, (error) => {
        if (error) {
          console.error(`Failed to connect to MongoDB: ${error}`);

          process.exit(1);
        }
      });

      return mongooseInstance;
    }
  }
})()