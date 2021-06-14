const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (rol = "") => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error("No es un rol valido");
  }
};

const emailIsExist = async (email = "") => {
  const existEmail = await User.findOne({email: email});

  if (existEmail) {
    throw new Error(`El email ${email}, ya existe`)
  }
};

const existUserId = async (id) => {
  const existUser = await User.findById(id);

  if (!existUser) {
    throw new Error(`El usuario con ${id}, no existe`)
  }
};




module.exports = {
    isValidRole,
    emailIsExist,
    existUserId
}
