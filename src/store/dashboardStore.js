import { create } from "zustand";

export const useDashboardStore = create((set) => ({
    buckets: [],
    storageUsed: 0,

    addBucket: (bucket) =>
        set((state) => ({
            buckets: [...state.buckets, bucket],
        })),

    uploadImage: (bucketId, image) =>
        set((state) => {
            const updatedBuckets = state.buckets.map((b) => {
                if (b.id === bucketId) {
                    return {
                        ...b,
                        images: [...b.images, image],
                    };
                }
                return b;
            });
            return {
                buckets: updatedBuckets,
                storageUsed: state.storageUsed + 5, // assume 5MB per image
            };
        }),

    toggleLike: (bucketId, imageId) =>
        set((state) => {
            const updatedBuckets = state.buckets.map((b) => {
                if (b.id === bucketId) {
                    return {
                        ...b,
                        images: b.images.map((img) =>
                            img.id === imageId
                                ? { ...img, likedByClient: !img.likedByClient }
                                : img
                        ),
                    };
                }
                return b;
            });
            return { buckets: updatedBuckets };
        }),
}));
