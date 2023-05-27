import express from "express";
import { ShortLinkController } from "../controllers/shortLinkcontroller";

const router = express.Router()

router.post("/", ShortLinkController.create_shortlink)
router.get("/:slug", ShortLinkController.get_shortlink)
router.get("/", ShortLinkController.getAll_shortlink)
router.put("/:slug", ShortLinkController.edit_shortlink)

export { router } 