const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersGet = async (req, res) => {
  //const { q, nombre, apikey } = req.query;
  const {limit = 5, since = 0} = req.query;

  //usamos el primise.all porq queremos que el count y find se hagan al mismo tiempo
  const [total, users] = await Promise.all([
    User.countDocuments({state: true}),
    User.find({state: true})
      .skip(Number(since))
      .limit(Number(limit))
  ]);

  res.json({
    msg: "get API",
    total,
    users
  });
};

const usersPut = async (req, res) => {
  const { id } = req.params;
  const {_id, password, google, email, ...resto } = req.body;

  //TODO validar contra base de datos
  if (password) {
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);

  res.json({
    msg: "put API",
    user
  });
};

const usersPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { name, email, password, role } = req.body;
  const user = new User({
    name,
    email,
    password,
    role,
  });

  //verificar si el correo existe
  const existEmail = await User.findOne({ email });

  if (existEmail) {
    return res.status(400).json({
      msg: "El correo ya esta en uso",
    });
  }

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json({
    msg: "post API",
    user,
  });
};

const usersDelete = async (req, res) => {
  const {id} = req.params;

  //borrarlo fisicamente
  //const user = await User.findByIdAndDelete(id);

  //borrarlo no totalmente
  const user = await User.findByIdAndUpdate(id, {state: false})


  res.json({
    user
  });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
};
