import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL;
console.log("Base URL =>", baseUrl);

export const appApi = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
            baseUrl,
           prepareHeaders: (headers, { getState})=>{
                 const token = getState().auth.token;
                  if(token) headers.set("authorization",`Bearer ${token}`);
                  headers.set("content-type","application/json");
                  return headers
           }      
    }),
    endpoints:(builder)=>({
        register:builder.mutation({
             query:(payload)=>({
                url:"/auth/register",
                method:"POST",
                body:payload
            })
        }),
        login:builder.mutation({
            query:(payload)=>({
                url:"/auth/login",
                method:"POST",
                body:payload
            })
        }),
        getMe:builder.query({
            query:() =>({
                url:"/auth/me"
            })
        }),
        getAllTasks:builder.query({
            query:()=>({
                url:"/tasks"
            })
        }),
         getAllUsers:builder.query({
            query:()=>({
                url:"/users"
            })
        }),
         createTask:builder.mutation({
            query:(payload)=>({
                url:"/tasks",
                method:"POST",
                body:payload
            })
        }),
    })
})




export const {
    useRegisterMutation,
    useLoginMutation,
    useGetAllTasksQuery,
    useGetAllUsersQuery,
    useCreateTaskMutation
} = appApi;