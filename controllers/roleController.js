const { Role } = require("../models/index");

// GET /api/roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({order: [['id', 'ASC']] });
        if (!roles) {
            return res
                .status(404)
                .json({ message: "No roles found" });
        }
        res.json(roles);
    } catch (error) {
        console.error("Error retrieving roles:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// GET /api/roles/:id
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
            res.json(role);
        } else {
            res
                .status(404)
                .json({ message: `Role with id ${req.params.id} not found` });
        }
    } catch (error) {
        console.error("Error retrieving role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// POST /api/roles
exports.createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const existingRole = await Role.findOne({ where: { name } });
        if (existingRole) {
            return res
                .status(409)
                .json({ message: `Role with name ${name} already exists` });
        }
        const newRole = await Role.create({ name });
        res.status(201).json(newRole);
    } catch (error) {
        console.error("Error creating role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// PUT /api/roles/:id
exports.updateRole = async (req, res) => {
    try {
        const { name } = req.body;
        const existingRole = await Role.findOne({ where: { name } });
        if (existingRole) {
            return res
                .status(409)
                .json({ message: `Role with name ${name} already exists` });
        }
        const numAffectedRows = await Role.update({ name }, { where: { id: req.params.id } });
        if (numAffectedRows[0] > 0) {
            const updatedRole = await Role.findByPk(req.params.id);
            res.json(updatedRole);
        } else {
            res
                .status(404)
                .json({ message: `Role with id ${req.params.id} not found` });
        }
    } catch (error) {
        console.error("Error updating role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// DELETE /api/roles/:id
exports.deleteRole = async (req, res) => {
    try {
        const numDeleted = await Role.destroy({ where: { id: req.params.id } });
        if (numDeleted) {
            res.status(204).json({ message: "Role deleted successfully" });
        } else {
            res
                .status(404)
                .json({ message: `Role with id: ${req.params.id} not found` });
        }
    } catch (error) {
        console.error("Error deleting role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



