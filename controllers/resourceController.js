const Resource = require("../models/Resource");

// GET /api/resources
exports.getAllResources = async (req, res) => {
  try {
    let whereClause = {};
    if (req.query.type) {
      whereClause.type = req.query.type;
    }

    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const offset = (page - 1) * limit;

    const { count, rows } = await Resource.findAndCountAll({
      where: whereClause,
      offset,
      limit,
    });

    if (count === 0 && req.query.type) {
      return res
        .status(404)
        .json({ message: `No resources with type=${req.query.type} found` });
    }

    const totalPages = Math.ceil(count / limit);

    res.json({
      data: rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
      },
    });
  } catch (error) {
    console.error("Error retrieving resources:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/resources/:id
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);

    if (resource) {
      res.json(resource);
    } else {
      res
        .status(404)
        .json({ message: `Resource with id=${req.params.id} not found` });
    }
  } catch (error) {
    console.error("Error retrieving resource:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/resources
exports.createResource = async (req, res) => {
  try {
    const { author, title, content, image, type } = req.body;

    // Create a new resource instance
    const newResource = await Resource.create({
      author,
      title,
      content,
      image,
      type,
    });

    res.status(201).json(newResource);
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/resources/:id
exports.updateResource = async (req, res) => {
  try {
    const { author, title, content, image, type } = req.body;

    // Update the resource with the new values
    const numAffectedRows = await Resource.update(
      {
        author,
        title,
        content,
        image,
        type,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (numAffectedRows[0] > 0) {
      const updatedResource = await Resource.findByPk(req.params.id);
      res.json(updatedResource);
    } else {
      res
        .status(404)
        .json({ message: `Resource with id=${req.params.id} not found` });
    }
  } catch (error) {
    console.error("Error updating resource:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/resources/:id
exports.deleteResource = async (req, res) => {
  try {
    const numDeleted = await Resource.destroy({
      where: { id: req.params.id },
    });

    if (numDeleted) {
      res.status(204).json({ message: "Resource deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: `Resource with id=${req.params.id} not found` });
    }
  } catch (error) {
    console.error("Error deleting resource:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
