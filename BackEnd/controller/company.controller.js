import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register Company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists.",
        success: false
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      success: false
    });
  }
};

// Get all companies for logged-in user
export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found.",
        success: false
      });
    }

    return res.status(200).json({
      companies,
      success: true
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      success: false
    });
  }
};

// Get a company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    console.log("Fetching company with ID:", companyId);

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: `Company with ID ${companyId} not found.`,
        success: false
      });
    }

    return res.status(200).json({
      company,
      success: true
    });

  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({
      message: "Internal server error.",
      success: false
    });
  }
};


// Update company details
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    const { name, description, website, location } = req.body;

    if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;

    // Handle logo upload
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudUpload = await cloudinary.uploader.upload(fileUri.content);
      company.logo = cloudUpload.secure_url;
    }

    await company.save();

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

