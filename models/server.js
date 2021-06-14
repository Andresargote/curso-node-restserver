const express = require("express");
const cors = require("cors");

const {dbConnection} = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    // Conectar a base de datos
    this.connectDB();

    //Middlewares
    this.middlewares();

    //Rutas
    this.routes();
  }

  async connectDB() {
    await dbConnection();
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
