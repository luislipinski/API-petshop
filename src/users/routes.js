const { Router } = require('express');
const controller = require('./controller')

const router = Router();

router.get("/search", controller.verifyJWT, controller.getUsers);
router.post("/register", controller.verifyJWT, controller.addUsers);
router.post("/login", controller.loginUser)
router.get("/search/:id", controller.verifyJWT, controller.getUsersById);
router.put("/edit/:id", controller.verifyJWT, controller.updateUsers)
router.delete("/:id", controller.verifyJWT, controller.removeUsers);


module.exports = router;