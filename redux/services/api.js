import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'http://59.152.62.177:8085'
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/api/`,
        credentials: 'same-origin',
    }),

    endpoints: (builder) => ({
        employeeData: builder.mutation({
            query: () => ({
                url: 'Employee/EmployeeData',
                method: 'GET',
            }),
        }),
    }),
});

export const { useEmployeeDataMutation } = api
