const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");

// GET /api/resources
router.get("/resources", resourceController.getAllResources);

// GET /api/resources/:id
router.get("/resources/:id", resourceController.getResourceById);

// POST /api/resources
router.post("/resources", resourceController.createResource);

// PUT /api/resources/:id
router.put("/resources/:id", resourceController.updateResource);

// DELETE /api/resources/:id
router.delete("/resources/:id", resourceController.deleteResource);

module.exports = router;
