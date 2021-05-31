const usersGet = (req, res) => {

  const {q, nombre, apikey} = req.query;

  res.json({
    msg: "get API",
    q,
    nombre,
    apikey
  });
};

const usersPut = (req, res) => {

  const {id} = req.params;

  res.json({
    msg: "put API",
    id
  });
};

const usersPost = (req, res) => {

  const {nombre, edad} = req.body;

  res.status(201).json({
    msg: "post API",
    nombre,
    edad
  });
};

const usersDelete = (req, res) => {
  res.json({
    msg: "delete API",
  });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
};
