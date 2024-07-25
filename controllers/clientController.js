import Client from "../models/Client.js";
import APIFeatures from "../utils/apiFeatures.js";

export const getAllClients = async (req, res, next) => {
  try {
    const features = new APIFeatures(Client.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const clients = await features.query;

    res.status(200).json({
      status: "success",
      results: clients.length,
      data: {
        clients,
      },
    });
  } catch (error) {
    console.log("Error occurred", error);
  }
};

export const getClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        status: "fail",
        message: "Client not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        client,
      },
    });
  } catch (error) {
    console.log("Error occurred", error);
  }
};

/**
 * TODO
 *  1. Ensure all mandatory fields are present
 *  2. Enforce data validation. Such as mobile number with country code, GSTIN format, email id format, start date, end date etc.
 */
export const createClient = async (req, res, next) => {
  try {
    const newClient = await Client.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        client: newClient,
      },
    });
  } catch (error) {
    console.log("Error occurred", error);
  }
};

/**
 * TODO
 *  1. Enforce data validation. Same as in create client method above
 *  2. Ensure that mandatory fields are not unset anyhow
 */
export const updateClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!client) {
      return res.status(404).json({
        status: "fail",
        message: "Client not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        client,
      },
    });
  } catch (error) {
    console.log("Error occurred", error);
  }
};

/**
 * TODO
 *  1. Soft Delete Only
 */

export const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({
        status: "fail",
        message: "Client not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.log("Error occurred", error);
  }
};