import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getJobById, getAllJobs, postJob, getAdminJobs, updateJob  } from "../controller/job.controller.js";



const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjob").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/update/:id").put(isAuthenticated, updateJob);

export default router;