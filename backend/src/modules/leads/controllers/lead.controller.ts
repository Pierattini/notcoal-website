import { Request, Response } from "express";
import {
  createLeadService,
  getLeadsService,
  updateLeadService,
} from "../services/lead.service";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await createLeadService(req.body);

    return res.status(201).json(lead);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error creating lead",
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const leads = await getLeadsService();

    return res.json(leads);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error getting leads",
    });
  }
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const paramId = req.params.id;
    const id = Array.isArray(paramId) ? paramId[0] : paramId;

    if (!id) {
      return res.status(400).json({
        message: "Lead id is required",
      });
    }

    const lead = await updateLeadService(
      id,
      req.body
    );

    return res.json(lead);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error updating lead",
    });
  }
};
