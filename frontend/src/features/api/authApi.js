import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:8000/api/v1/user/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.error("Error registering user: ", error);
                }
            }
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.error("Error logging in user: ", error);
                }
            }
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch }) {
                try {
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.error("Error logging out user: ", error);
                }
            }
        }),
        userProfile: builder.query({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
        }),
        uploadPhotos: builder.mutation({
            query: (inputData) => ({
                url: "my-photos",
                method: "POST",
                body: inputData,
            }),
        }),
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useUserProfileQuery, useUploadPhotosMutation } = authApi;