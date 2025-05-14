
import axios from "axios";
import { ApiName } from "@/constants/apiName";
import API from "./axios.handler";

// Helper function to handle errors
const handleError = (error) => {
  console.error("error = =====> " , error.response?.data || error);
  
  return error.response?.data || { message: "An error occurred", error };
};

export const makeGetRequest = async ({ path="" , body = {} , headers = {} }) => {
  try {
    const url = `${path}`;
    const res = await API.get(url, body
     );
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const makePostRequest = async ({ path="" , body = {}, headers = {} }) => {
  try {
    const url = `${path}`;
    const response = await API.post(url, body, {
      headers, // Set headers if provided
    });
    
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const makePatchRequest = async ({ path="" , body = {}, headers = {} }) => {
  try {
    const url = `${path}`;
    const response = await API.put(url, body, {
      headers, // Set headers if provided
    });

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const makeDeleteRequest = async ({ path ="" , body = {}, headers = {} }) => {
  try {
    const url = `${path}`;
    const response = await API.delete(url, {
      data: body, // Use data to send a body with DELETE
      headers, // Set headers if provided
    });

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
