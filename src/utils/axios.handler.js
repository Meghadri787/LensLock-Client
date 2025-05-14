
import axios from "axios";
import { ApiName } from "../constants/apiName";

// Create an Axios instance
const API = axios.create({
  baseURL: ApiName.BASE_URL,
  withCredentials: true , 
  headers: {
    "Content-Type": "application/json",
  },
});


export default API;
