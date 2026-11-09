import express from "express";
import { validate } from "../middleware/validate";
import {
    createChildController,
    deleteChildController,
    findAllChildrenController,
    findChildController,
    updateChildController,
} from "../controller/child.controller";
import { createChildSchema, params, updateChildSchema } from "../controller/child.schema";

const router = express.Router();

router.route("/").get(findAllChildrenController).post(validate(createChildSchema), createChildController);
router
    .route("/:childId")
    .get(validate(params), findChildController)
    .patch(validate(updateChildSchema), updateChildController)
    .delete(validate(params), deleteChildController);
     router.get('/hello', function (req, res) {
         res.render("hello world");
     })

export default router;
