const { Router } = require("express");

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} = require("../controllers/user");

const router = Router();

router.post("/create", usersPost);

router.get("/", usersGet);

router.put("/:id", usersPut);


router.delete("/", usersDelete);

module.exports = router;
