import axios from "axios";
import { setAllAppliedJobs } from "../jobSlice"; // correct import based on your folder structure
import { APPLICATION_API_END_POINT } from "@/utils/constant";

export const fetchAppliedJobs = () => async (dispatch) => {
  try {
    const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
      withCredentials: true,
    });

    dispatch(setAllAppliedJobs(res.data.application)); // assuming backend returns { application: [...] }
  } catch (error) {
    console.error("Error fetching applied jobs:", error.response?.data || error.message);
  }
};
