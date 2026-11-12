import { RequestHandler } from "express";
import tenantSchema from "../models/tenant.schema";
import { createTenantDTO } from "../types/tenant.types";
import { IdParams, updateRoomDto } from "../types/room.types";

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

export const updateTenant: RequestHandler<IdParams, {}, updateRoomDto> = async (req, res) => {
  try {
    const tenant = await tenantSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );

    if (!tenant) return res.status(404).json({ message: "Tenant not found! "});

    res.status(200).json({
      success: true,
      message: "Tenant updated successfully",
      data: tenant
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const deleteTenant: RequestHandler<IdParams> = async (req, res) => {
  try {
    const tenant = await tenantSchema.findByIdAndDelete(req.params.id);

    if (!tenant) return res.status(404).json({ message: "Tenant not found!" })

    res.status(200).json({
      success: true,
      message: "Tenant deleted successfully",
      data: tenant
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
    // search filter by fullName;
    const fullNameQuery = req.query.fullName;
    const filter: {
      fullName?: string 
    } = {};

    if (fullNameQuery !== undefined){
      if(typeof fullNameQuery !== "string" || fullNameQuery.trim() === ""){
        return res.status(400).json({
          success: false,
          message: "Full Name must be valid "
        })
      }

      filter.fullName = fullNameQuery;
    }

    const tenants = await tenantSchema.find(filter);

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