import { Router } from "express";
import {
  createLead,
  getLeads,
  updateLead,
} from "../controllers/lead.controller";

const router = Router();

router.get("/", getLeads);
router.post("/", createLead);
router.patch("/:id", updateLead);

export default router;
