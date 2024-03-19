const User = require("../models/user");
const { Op } = require("sequelize");
const {
  getPagination,
  getPaginationData,
} = require("../utils/paginationHelper");

//GET /api/users
exports.getAllUsers = async (req, res) => {
  
  try {
    const { page, size, name } = req.query;
    const condition = name ? { 
      [Op.or]: [
        { firstname: { [Op.iLike]: `%${name}%` } },
        { lastname: { [Op.iLike]: `%${name}%` } }
      ] 
    } : null;

    const { currentPage, pageSize, offset } = getPagination(page, size);

    const { count, rows } = await User.findAndCountAll({
      where: condition,
      offset,
      limit: pageSize,
      attributes: { exclude: ["updatedAt"] },
    });

    const response = getPaginationData({ count, rows }, currentPage, pageSize);

    if (response.data.length === 0 && name) {
      return res
        .status(404)
        .json({ message: `No users with name: ${name} were found` });
    }

    res.json(response);
  } catch (error) {
    console.error("Error retrieving users: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//GET /api/users/:userId
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id: ${req.params.userId} not found!` });
    }

    res.json(user);
  } catch (error) {
    console.error("Error retrieving user: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//POST /api/users
exports.createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exist" });
    }

    const newUser = await User.create({
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Unable to create user" });
  }
};

//DELETE /api/users/:userId
exports.deleteUser = async (req, res) => {
  try {
    const numDeleted = await User.destroy({
      where: { id: req.params.userId },
    });

    if (numDeleted) {
      return res.status(204).json({ message: "user deleted" });
    } else {
      res
        .status(400)
        .json({ message: `user with id: ${req.params.id} not found.` });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const numUpdated = await User.update(req.body, {
      where: { id: req.params.userId },
    });

    if (numUpdated) {
      const updatedUser = await User.findByPk(req.params.userId);
      res.json(updatedUser);
    } else {
      res
        .status(400)
        .json({ message: `user with id: ${req.params.id} not found.` });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}