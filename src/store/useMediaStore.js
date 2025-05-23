import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance";
import { ApiName } from "../constants/apiName";
import { makeGetRequest, makePostRequest } from "../utils/request.handler";
import axios from "axios";

export const useMediaStore = create(
    persist(
        (set, get) => ({
            mediaList: [],
            selectedBucket: {},
            isLoading: false,
            message: null,
            success: false,

            fetchBuckets: async () => {
                set({ isLoading: true });
                const res = await makeGetRequest({
                    path: `${ApiName.BUCKET_REST_URL}`,
                });
                if (res.success) {
                    set({
                        isLoading: false,
                        buckets: res.data,
                        message: res.message,
                        success: true,
                    });
                } else {
                    set({
                        isLoading: false,
                        buckets: [],
                        message: res.message,
                        success: false,
                    });
                }
                return res;
            },

            // create bucket
            uploadMedia: async (body) => {
                set({ isLoading: true });
                const res = await makePostRequest({
                    path: `${ApiName.MEDIA_REST_URL}`,
                    body,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (res.success) {
                    const currentList = get().mediaList; // ✅ use get() instead of state param inside set
                    set({
                        isLoading: false,
                        mediaList: [...currentList, res.data],
                        message: res.message,
                        success: true,
                    });
                } else {
                    set({
                        isLoading: false,
                        message: res.message,
                        success: false,
                    });
                }

                return res;
            },

            deleteMedia: async (mediaId) => {
                set({ isLoading: true });
                const res = await axiosInstance.delete(`/media/${mediaId}`);
                if (res.success) {
                    set({
                        isLoading: false,
                        selectedBucket: res.data,
                        message: res.message,
                        success: true,
                    });
                } else {
                    set({
                        isLoading: false,
                        selectedBucket: {},
                        message: res.message,
                        success: false,
                    });
                }
                return res;
            },

            fetchBucketInfo: async (bucketId) => {
                set({ isLoading: true });
                const res = await makeGetRequest({
                    path: `${ApiName.BUCKET_REST_URL}/${bucketId}`,
                });
                if (res.success) {
                    set({
                        isLoading: false,
                        selectedBucket: res.data,
                        message: res.message,
                        success: true,
                    });
                } else {
                    set({
                        isLoading: false,
                        selectedBucket: {},
                        message: res.message,
                        success: false,
                    });
                }
                return res;
            },

            bucketAccessRequest: async (id) => {
                set({ isLoading: true });
                const res = await makePostRequest({
                    path: `${ApiName.BUCKET_REST_URL}/request-access/${id}`,
                    body: {},
                });

                if (res.success) {
                    set({
                        isLoading: false,
                        message: res.message,
                        success: true,
                    });
                } else {
                    set({
                        isLoading: false,
                        message: res.message,
                        success: false,
                    });
                }
                return res;
            },

            manageAccessRequest: async ({ id, requestId, response }) => {
                set({ isLoading: true });
                const res = await makePostRequest({
                    path: `${ApiName.BUCKET_REST_URL}/${id}/access-requests/${requestId}/respond`,
                    body: { response },
                });

                if (res.success) {
                    set({
                        isLoading: false,
                        message: res.message,
                        success: true,
                    });
                } else {
                    set({
                        isLoading: false,
                        message: res.message,
                        success: false,
                    });
                }
                return res;
            },
            likeMedia: async (id) => {
                console.log(id);

                set({ isLoading: true });
                const res = await axiosInstance.patch(`/media/like/${id}`);
                if (res.success) {
                    set({
                        isLoading: false,
                        message: res.message,
                        success: true,
                    });
                } else {
                    set({
                        isLoading: false,
                        message: res.message,
                        success: false,
                    });
                }
                return res;
            },
        }),
        {
            name: "media-storage", // name of the storage (must be unique)
        }
    )
);
