import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance";
import { ApiName } from "../constants/apiName";
import { makeGetRequest, makePostRequest } from "../utils/request.handler";
import axios from "axios";

export const useAuthStore = create(
    persist(
        (set) => ({
            user: {} || null,
            isAuthenticated: false,
            isLoading: false,
            message: null,      
            success: false,

            // resgister user 
            registerUser : async (body) =>{
              
                
                    set({ isLoading: true });
                    const res = await makePostRequest({
                        path: `${ApiName.USER_REST_URL}/register`,
                        body,
                    });

                    if( res.success){
                        set({
                            isLoading: false,
                            user: res.data,
                            isAuthenticated: true,
                            message: res.message,
                            success: true,
                        });

                    } else {

                        set({
                            isLoading: false,
                            user: {},
                            message: res.message,
                            isAuthenticated: false,
                            success: false,
                        });
                    }
                    return res;
               
            } , 

            // login user 
            loginUser: async (body) => {

                try {
                    set({ isLoading: true });
                    const res = await makePostRequest({
                        path: `${ApiName.USER_REST_URL}/login`,
                        body,
                    });
                    set({
                        isLoading: false,
                        user: res.data,
                        isAuthenticated: true,
                        message: res.message,
                        success: true,
                    });
                    return res;
                } catch (error) {
                    console.log("not ok ");

                    set({
                        isLoading: false,
                        user: {},
                        message: error.message,
                        isAuthenticated: false,
                        success: false,
                        error: error.message,
                    });
                    console.error(error);
                    return error;
                }
            },

            // logout user
            logoutUser: async() => {
               
                try {
                    set({ isLoading: true });
                    const res = await makeGetRequest({
                        path : `${ApiName.USER_REST_URL}/logout`,

                    }
                    );
                    set({
                        isLoading: false,
                        user:{},
                        isAuthenticated: false,
                        message: res.message,
                        success: true,
                    });
                    return res;
                } catch (error) {
                    console.log("not ok ");

                    set({
                        isLoading: false,
                        message: error.message,
                        success: false,
                        error: error.message,
                    });
                    console.error(error);
                    return error;
                }

            },
        }),
     {
    name: "auth-storage", // name of the storage (must be unique)
    }
    )
);
