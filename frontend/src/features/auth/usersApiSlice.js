import { apiSlice } from "../../api/apiSlice";
const USERS_URL = 'http://localhost:5000/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                credentials: 'include',
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
                credentials: 'include',
            })
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            })
        })
    })
});

export const {
    useLoginMutation, // GET will be "useLoginQuery" for something like the profile (delete me)
    useLogoutMutation,
    useRegisterMutation,
    useUpdateMutation,
} = usersApiSlice;