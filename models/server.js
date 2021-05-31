const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    //Middlewares
    this.middlewares();

    //Rutas
    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    // Parseo y lectura del body JSON
    this.app.use(express.json());

    //Directorio Publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Aplicacion escuchando en el puerto:", this.port);
    });
  }
}

module.exports = Server;
