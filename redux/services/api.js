import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'http://59.152.62.177:8085'
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/api/`,
        // credentials: 'same-origin',
    }),

    endpoints: (builder) => ({
        employeeData: builder.mutation({
            query: () => ({
                url: 'Employee/EmployeeData',
                method: 'GET',
            }),
        }),

        employeeData: builder.mutation({
            query: () => ({
                url: 'Employee/EmployeeData',
                method: 'GET',
            }),
        }),

        division: builder.mutation({
            query: () => ({
                url: 'Employee/Division',
                method: 'GET',
            }),
        }),

        district: builder.mutation({
            query: (id) => ({
                url: `Employee/District/${id}`,
                method: 'GET',
            }),
        }),

        createEmployee: builder.mutation({
            query: (data) => ({
                url: 'SaveEmployeeInformation',
                method: 'POST',
                body: data,
            }),
        }),

        updateEmployee: builder.mutation({
            query: ({ empID, data }) => ({
                url: `UpdateEmployeeInformation/${empID}`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const {
    useEmployeeDataMutation,
    useDistrictMutation,
    useDivisionMutation,
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation
} = api
