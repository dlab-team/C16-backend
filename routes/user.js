const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers);

router.get("/users/:userId", userController.getUserById);

router.post("/users", userController.createUser);

router.delete("/users/:userId", userController.deleteUser);

module.exports = router;