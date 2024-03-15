const Router = require("express");
const router = Router();
const materialController = require("../controllers/materialController");

router.get("/materials", materialController.getAllMaterials);

router.get("/materials/:id", materialController.getMaterialsById);

router.post("/materials", materialController.createMaterials);

router.put("/materials/:id", materialController.updateMaterials);

router.delete("/materials/:id", materialController.deleteMaterials);

module.exports = router;
