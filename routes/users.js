const router = require("express").Router();
const userController = require("../controllers/userController");
const { validateNewUser, validateFinishUser } = require("../middleware/validator/userValidator"); 

router.get("/users", userController.getAllUsers);

router.get("/users/:userId", userController.getUserById);

router.post("/users", validateNewUser, userController.createUser);

router.delete("/users/:userId", userController.deleteUser);

router.patch("/users/:userId",validateFinishUser ,userController.updateUser);

module.exports = router;