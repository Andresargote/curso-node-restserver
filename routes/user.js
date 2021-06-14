const { Router } = require("express");
const { check } = require("express-validator");
const {validateFields} = require("../middlewares/validateFields");

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} = require("../controllers/user");
const { isValidRole, emailIsExist, existUserId } = require("../helpers/db-validators");

const router = Router();

router.post("/",[
  check("name", "El nombre es obligatoria").not().isEmpty(),
  check("password", "El password debe der ser mas de 6 letras").isLength({min: 6}),
  check("email", "El correo no es valido").isEmail(),
  check("email").custom(emailIsExist),
  check("role").custom(isValidRole),
  validateFields
],usersPost);

router.get("/", usersGet);

router.put("/:id",[
  check("_id", "No es un ID valido").isMongoId(),
  check("_id").custom(existUserId),
  check("role").custom(isValidRole),
  validateFields
] , usersPut);


router.delete("/:id",[
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(existUserId),
  validateFields
], usersDelete);

module.exports = router;
