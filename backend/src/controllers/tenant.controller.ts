import { RequestHandler } from "express";
import tenantSchema from "../models/tenant.schema";
import { createTenantDTO } from "../types/tenant.types";

export const createTenant: RequestHandler<{}, {}, createTenantDTO> = async (req, res) => {
  try {
    const newTenant = await tenantSchema.create(req.body);

    res.status(201).json({
      success: true,
      message: "Tenant added successfully",
      data: newTenant
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const getTenant: RequestHandler = async (req, res) => {
  try {
    const tenants = await tenantSchema.find();

    res.status(200).json({
      success: true,
      message: "Tenant retrieved successfully",
      data: tenants
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}