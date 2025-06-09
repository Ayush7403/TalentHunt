import express from "express";
import {
  getAllCompanies,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controller/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";


const router = express.Router();

router.route("/register").post(isAuthenticated, singleUpload, registerCompany);
router.route("/get").get(isAuthenticated, getAllCompanies);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);


export default router;
