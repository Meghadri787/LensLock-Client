import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            // Login user
            login: (userData, token) =>
                set(() => ({
                    user: userData,
                    token: token,
                    isAuthenticated: true,
                })),

            // Logout user
            logout: () =>
                set(() => ({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                })),

            // Update user profile
            updateUser: (newUserData) =>
                set((state) => ({
                    user: { ...state.user, ...newUserData },
                })),
        }),
        {
            name: "auth-storage", // key in localStorage
            getStorage: () => localStorage, // (by default it uses localStorage)
        }
    )
);

export default useAuthStore;
