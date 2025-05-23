import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance";
import { ApiName } from "../constants/apiName";
import { makeGetRequest, makePostRequest } from "../utils/request.handler";
import axios from "axios";

export const useBucketStore = create(
    // persist(
    (set, get) => ({
        buckets: [],
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
        createBucket: async (body) => {
            set({ isLoading: true });
            const res = await makePostRequest({
                path: `${ApiName.BUCKET_REST_URL}`,
                body,
            });

            if (res.success) {
                const currentBuckets = get().buckets; // ✅ use get() instead of state param inside set
                set({
                    isLoading: false,
                    buckets: [...currentBuckets, res.data],
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

        deleteBucket: async (id) => {
            set({ isLoading: true });
            const res = await axiosInstance.delete(`/bucket/${id}`);

            if (res.success) {
                set({
                    isLoading: false,
                    message: res.message,
                    success: true,
                });
                useBucketStore.setState().fetchBuckets();
            } else {
                set({
                    isLoading: false,
                    message: res.message,
                    success: false,
                });
            }
            return res;
        },
    })
    // {
    //     name: "bucket-storage", // name of the storage (must be unique)
    // }
    // )
);
